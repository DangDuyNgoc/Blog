<script setup>
import BlogCard from '@/components/BlogCard.vue'
import LoadingTemp from '@/components/LoadingTemp.vue'
import SearchBar from '@/components/SearchBar.vue'
import axios from 'axios'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// State
const articles = ref([])
const loading = ref(true)
const error = ref('')
const categories = ref([])
const selectedCategory = ref(null)

const route = useRoute()
const router = useRouter()

const searchText = ref(route.query.search || '')

// Fetch articles từ API
async function fetchArticles() {
  try {
    const response = await axios.get('https://6763a70217ec5852cae97d13.mockapi.io/api/blog')
    articles.value = response.data
    categories.value = [...new Set(response.data.map((article) => article.category))]
    loading.value = false
  } catch (err) {
    console.error(err)
    error.value = 'Failed to fetch articles.'
    loading.value = false
  }
}

onMounted(() => {
  searchText.value = route.query.search || ''
  selectedCategory.value = route.query.category || null
  fetchArticles()
})

const filteredArticles = computed(() => {
  let filtered = articles.value

  if (searchText.value) {
    filtered = filtered.filter((article) =>
      article.title.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((article) => article.category === selectedCategory.value)
  }

  return filtered
})

watch(
  () => route.query.search,
  (newSearch) => {
    searchText.value = newSearch || ''
  },
)

watch(
  () => route.query.category,
  (newCategory) => {
    selectedCategory.value = newCategory || null
  },
)

function handleSearch(input) {
  searchText.value = input
  router.push({ query: { search: input } })
}

function handleCategorySelect(category) {
  selectedCategory.value = category
  router.push({ query: { category: category } })
}

function handleAll() {
  selectedCategory.value = null
  router.push({ query: {} })
}
</script>

<template>
  <div>
    <div class="p-4">
      <SearchBar
        @search="handleSearch"
        :search-text="searchText"
        :filtered-articles="filteredArticles"
      />
    </div>

    <!-- Topics for Mobile -->
    <div class="flex overflow-x-auto gap-4 p-4 md:hidden">
      <button
        class="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium"
        :class="{ 'bg-gray-300': selectedCategory === null }"
        @click="handleAll"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        class="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium"
        :class="{ 'bg-gray-300': selectedCategory === category }"
        @click="handleCategorySelect(category)"
      >
        {{ category }}
      </button>
    </div>

    <div class="flex md:ml-6">
      <!-- Topic for desktop -->
      <div
        v-if="categories.length > 0"
        class="w-64 p-4 hidden md:block bg-gray-100 border-l h-fit rounded-lg"
      >
        <h2 class="text-xl font-semibold mb-4">Topics</h2>
        <div class="space-y-2">
          <div
            v-for="category in categories"
            :key="category"
            class="cursor-pointer p-2 rounded-lg hover:bg-gray-200"
            :class="{ 'bg-gray-300': selectedCategory === category }"
            @click="handleCategorySelect(category)"
          >
            {{ category }}
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div v-if="loading" class="text-center">
          <LoadingTemp />
        </div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

        <div v-else>
          <div
            v-if="filteredArticles.length === 0"
            class="text-center flex items-center justify-center"
          >
            <img alt="no data" src="/src/assets/images/no-result.png" />
          </div>
          <div
            v-else
            class="articles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
          >
            <BlogCard v-for="article in filteredArticles" :key="article.id" :article="article" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.articles-grid {
  margin-top: 20px;
}

.w-64 {
  width: 16rem;
}

.cursor-pointer:hover {
  background-color: #e2e8f0;
}

.bg-gray-300 {
  background-color: #d1d5db;
}

.flex.overflow-x-auto {
  scrollbar-width: thin;
}
</style>
