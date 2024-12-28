<script setup>
import { useRouter } from 'vue-router'

defineProps({
  article: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const goToDetails = (id) => {
  router.push(`/blog/${id}`)
}
</script>

<template>
  <div>
    <div
      class="article-card border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200"
    >
      <img :src="article.image" alt="Article Image" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="font-bold text-lg truncate">{{ article.title }}</h2>
        <p class="text-gray-600 text-sm truncate">{{ article.description }}</p>
        <p class="text-gray-500 text-xs mt-2">{{ article.category }}</p>
        <!-- Render category here -->
        <button
          @click="goToDetails(article.id)"
          class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Read More
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-card {
  max-width: 400px;
}
</style>
