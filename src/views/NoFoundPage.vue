<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <p class="text-2xl text-gray-700 mb-6">Oops! The page you are looking for does not exist.</p>
    <img alt="page-found-error" src="/src/assets/images/page-not-found.png" />
    <button class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" @click="goHome">
      Go Back Home
    </button>
  </div>
</template>
