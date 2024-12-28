<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const router = useRouter()
const route = useRoute()

const title = ref('')
const content = ref('')
const category = ref('')
const isLoading = ref(false)
const error = ref('')
const toast = useToast()

// Lấy ID từ URL
const blogId = route.params.id

// Lấy thông tin blog hiện tại để hiển thị lên form
const fetchBlog = async () => {
  try {
    const { data } = await axios.get(
      `https://6763a70217ec5852cae97d13.mockapi.io/api/blog/${blogId}`,
    )
    title.value = data.title
    content.value = data.content
    category.value = data.category
  } catch (error) {
    console.error(error)
    error.value = 'Failed to fetch the blog. Please try again.'
  }
}

// Cập nhật blog
const updateBlog = async () => {
  isLoading.value = true
  error.value = ''

  const updatedBlog = {
    title: title.value,
    content: content.value,
    category: category.value,
    image: 'https://loremflickr.com/640/480/abstract',
  }

  try {
    await axios.put(`https://6763a70217ec5852cae97d13.mockapi.io/api/blog/${blogId}`, updatedBlog)
    toast.success('Blog updated successfully!', {
      position: 'top-right',
    })
    router.push('/blog')
  } catch (error) {
    console.error(error)
    error.value = 'Failed to update the blog. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBlog()
})
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
    <form class="bg-white shadow-md rounded-lg p-8 max-w-lg w-full" @submit.prevent="updateBlog">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Update Blog</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          v-model="title"
          class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
          required
          placeholder="Enter the title of blog"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Content</label>
        <textarea
          rows="5"
          v-model="content"
          placeholder="Enter the content of blog"
          class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold mb-2">Category</label>
        <select
          v-model="category"
          class="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-300 outline-none"
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
          <option value="Business">Business</option>
        </select>
      </div>

      <div class="flex justify-between items-center">
        <button
          type="button"
          @click="router.push('/')"
          class="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Updating...' : 'Update' }}
        </button>
      </div>
    </form>
  </div>
</template>
