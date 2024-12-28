<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const searchText = ref('')
const isMenuOpen = ref(false)

const navigateToAddBlog = () => {
  router.push('/blog/addBlog')
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigateToBlogs = () => {
  isMenuOpen.value = false
  router.push('/blog')
}

const navigateToHome = () => {
  searchText.value = ''
  isMenuOpen.value = false
  router.push('/')
}
</script>

<template>
  <header
    class="bg-white shadow-md px-6 py-4 flex items-center justify-between mb-4 md:relative fixed top-0 left-0 w-full z-50"
  >
    <div
      class="text-2xl font-bold flex items-center justify-center md:justify-start w-full md:w-auto"
    >
      <RouterLink to="/" class="flex items-center" @click="navigateToHome">
        <img class="mr-2" alt="logo" src="/src/assets/icons/logo.svg" />
        Cats Blog
      </RouterLink>
    </div>
    <div class="flex space-x-4 text-gray-700 relative md:block hidden">
      <RouterLink
        to="/"
        :class="route.path === '/' ? 'text-purple-500 font-bold' : 'hover:text-purple-500'"
        >Blogs</RouterLink
      >
      <RouterLink
        to="/blog"
        :class="route.path === '/blog' ? 'text-purple-500 font-bold' : 'hover:text-purple-500'"
        @click="navigateToBlogs"
        >View list</RouterLink
      >
    </div>
    <button
      @click="navigateToAddBlog"
      class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 md:block hidden"
    >
      Create
    </button>
  </header>

  <!-- Mobile -->
  <div class="md:hidden fixed top-4 left-4 z-50">
    <button @click="toggleMenu" class="text-whit p-3 rounded-full shadow-md">
      <img alt="menu" src="/src/assets/icons/menu.svg" />
    </button>
  </div>

  <!-- Slide Menu -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-40"
    @click="toggleMenu"
  ></div>
  <div
    class="fixed top-0 left-0 w-64 h-full bg-white shadow-md transform z-50 transition-transform"
    :class="isMenuOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-4 bg-purple-500 text-white font-bold">Cats Blog</div>
    <ul class="p-4 space-y-4">
      <li>
        <button
          @click="navigateToAddBlog"
          class="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          Create
        </button>
      </li>
      <li>
        <button
          @click="navigateToBlogs"
          class="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
        >
          View List
        </button>
      </li>
    </ul>
  </div>
</template>
