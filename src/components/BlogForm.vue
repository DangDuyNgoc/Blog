<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'

const router = useRouter()

const title = ref('')
const content = ref('')
const category = ref('')
const isLoading = ref(false)
const error = ref('')
const toast = useToast()
const emit = defineEmits(['blogCreated'])

const createBlog = async () => {
  isLoading.value = true
  error.value = ''

  const newBlog = {
    title: title.value,
    content: content.value,
    category: category.value,
    image: 'https://loremflickr.com/640/480/abstract',
  }

  try {
    const { data } = await axios.post(
      'https://6763a70217ec5852cae97d13.mockapi.io/api/blog',
      newBlog,
    )
    toast.success('Blog created successfully!', {
      position: 'top-right',
    })
    emit('blogCreated', data)
    router.push('/')
  } catch (error) {
    console.error(error)
    error.value = 'Failed to create blog. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
    <form class="bg-white shadow-md rounded-lg p-8 max-w-lg w-full" @submit.prevent="createBlog">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">Create Blog</h2>
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
          {{ isLoading ? 'Creating...' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>
