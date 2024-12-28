<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
import LoadingTemp from './LoadingTemp.vue'

const blogs = ref([])
const isLoading = ref(true)
const errorMessage = ref('')
const showModal = ref(false)
const blogToDelete = ref(null)

const toast = useToast()

const confirmDelete = (blog) => {
  blogToDelete.value = blog
  showModal.value = true
}

const fetchBlogs = async () => {
  try {
    const response = await axios.get('https://6763a70217ec5852cae97d13.mockapi.io/api/blog/')
    blogs.value = response.data
  } catch (error) {
    console.log(error)
    errorMessage.value = 'Failed to fetch blogs. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const deleteBlog = async () => {
  if (!blogToDelete.value) return
  try {
    await axios.delete(
      `https://6763a70217ec5852cae97d13.mockapi.io/api/blog/${blogToDelete.value.id}`,
    )
    blogs.value = blogs.value.filter((blog) => blog.id !== blogToDelete.value.id)
    toast.success('Blog deleted successfully!', {
      position: 'top-right',
    })
  } catch (error) {
    console.log(error)
    toast.success('Failed to delete the blog. Please try again!', {
      position: 'top-right',
    })
  } finally {
    closeModal()
  }
}

const closeModal = () => {
  showModal.value = false
  blogToDelete.value = null
}

onMounted(() => {
  fetchBlogs()
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Blog List</h1>
    <div v-if="isLoading" class="text-center">
      <LoadingTemp />
    </div>
    <div v-else-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
    <div v-else>
      <div
        v-if="blogs.length === 0"
        class="flex flex-col items-center justify-center mt-12 text-center text-gray-500"
      >
        <img alt="no data" src="/src/assets/images/no-result.png" />
        <div class="mt-4">
          No blogs available. Please check back later or
          <RouterLink to="/blog/addBlog" class="text-purple-500 hover:text-purple-700"> add a new blog! </RouterLink>
        </div>
      </div>
      <div v-else>
        <!-- Desktop -->
        <table class="hidden md:table table-auto w-full border-collapse border border-gray-300">
          <thead class="bg-gray-100">
            <tr>
              <th class="border border-gray-300 px-4 py-2">Title</th>
              <th class="border border-gray-300 px-4 py-2">Topics</th>
              <th class="border border-gray-300 px-4 py-2">Image</th>
              <th class="border border-gray-300 px-4 py-2">Created At</th>
              <th class="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in blogs" :key="blog.id" class="hover:bg-gray-50">
              <td class="border border-gray-300 px-4 py-2">{{ blog.title }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ blog.category }}</td>
              <td class="border border-gray-300 px-4 py-2">
                <img :src="blog.image" alt="Blog Image" class="w-20 h-20 object-cover rounded" />
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ new Date(blog.createdAt).toLocaleString() }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                <button
                  class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  @click="$router.push({ name: 'edit-blog', params: { id: blog.id } })"
                >
                  Update
                </button>
                <button
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  @click="confirmDelete(blog)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Mobile -->
        <div class="md:hidden space-y-4 mt-12">
          <div
            v-for="blog in blogs"
            :key="blog.id"
            class="border border-gray-300 rounded-lg p-4 shadow-md"
          >
            <h2 class="text-lg font-bold mb-2">{{ blog.title }}</h2>
            <p class="text-gray-500 mb-2"><strong>Topic:</strong> {{ blog.category }}</p>
            <img :src="blog.image" alt="Blog Image" class="w-full h-40 object-cover rounded mb-2" />
            <p class="text-sm text-gray-500 mb-2">
              <strong>Created At:</strong> {{ new Date(blog.createdAt).toLocaleString() }}
            </p>
            <div class="flex space-x-4">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex-1"
                @click="$router.push({ name: 'edit-blog', params: { id: blog.id } })"
              >
                Update
              </button>
              <button
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex-1"
                @click="confirmDelete(blog)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3">
        <h2 class="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p class="mb-4">
          Are you sure you want to delete the blog titled
          <span class="font-bold">{{ blogToDelete?.title }}</span
          >?
        </p>
        <div class="flex justify-end space-x-4">
          <button
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            @click="closeModal"
          >
            Cancel
          </button>
          <button
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            @click="deleteBlog"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
