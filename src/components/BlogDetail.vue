<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BlogCard from './BlogCard.vue'
import LoadingTemp from './LoadingTemp.vue'

const route = useRoute()
const router = useRouter()

const blog = ref(null)
const isLoading = ref(true)
const error = ref('')
const allBlogs = ref([])
const relatedBlogs = ref([])

const fetchBlogs = async () => {
  try {
    const res = await axios.get('https://6763a70217ec5852cae97d13.mockapi.io/api/blog')
    allBlogs.value = res.data
  } catch (err) {
    console.log('Error fetching blogs:', err)
    error.value = 'Error: Unable to fetch articles. Please try again.'
  }
}

const fetchBlog = async () => {
  try {
    const res = await axios.get(
      `https://6763a70217ec5852cae97d13.mockapi.io/api/blog/${route.params.id}`,
    )
    blog.value = res.data

    // filter follow category
    relatedBlogs.value = allBlogs.value.filter(
      (b) => b.category === blog.value.category && b.id !== blog.value.id,
    )
  } catch (error) {
    console.log('Error fetching blog:', error)
    error.value = 'Error: Unable to fetch article. Please try again.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchBlogs()
  fetchBlog()
})

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="article-details p-6 bg-gray-50 min-h-screen">
    <div v-if="isLoading" class="text-center mt-12">
      <LoadingTemp />
    </div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div
      v-else
      class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-24 md:mt-16 flex flex-col justify-center"
    >
      <img :src="blog.image" alt="Article Image" class="w-full h-64 object-cover rounded-lg" />
      <h1 class="text-3xl font-bold mt-4">{{ blog.title }}</h1>
      <p class="text-gray-600 mt-2 text-sm">
        Category: <span class="text-blue-500">{{ blog.category }}</span>
      </p>
      <p class="text-gray-800 mt-4">{{ blog.description }}</p>
      <div class="mt-4">
        <p class="font-semibold text-lg">Content:</p>
        <p class="text-gray-700 mt-2">{{ blog.content }}</p>
      </div>
      <button
        @click="goBack"
        class="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
      >
        Back to Articles
      </button>
    </div>

    <div v-if="relatedBlogs.length" class="mt-12">
      <h2 class="text-xl font-bold mb-4">Other Articles in "{{ blog.category }}"</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <BlogCard v-for="article in relatedBlogs" :key="article.id" :article="article" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-details {
  max-width: 100%;
}

.article-details img {
  object-fit: cover;
}
</style>
