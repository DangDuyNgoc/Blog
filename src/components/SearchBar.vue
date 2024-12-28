<script setup>
import { ref } from 'vue'

const inputText = ref('')

const emit = defineEmits(['search'])

defineProps({
  filteredArticles: {
    type: Array,
    default: () => [],
  },
  searchText: {
    type: String,
    default: '',
  },
})

// Emit search event to parent
function onSearch() {
  if (inputText.value.trim() !== '') {
    emit('search', inputText.value)
  }
}
</script>

<template>
  <div class="search-bar relative flex items-center space-x-2">
    <input
      type="text"
      v-model="inputText"
      @keyup.enter="onSearch"
      placeholder="Search here....."
      class="border rounded-lg px-4 py-2 w-full outline-none"
    />
    <button @click="onSearch" class="absolute top-2.5 right-7 text-gray-500 hover:text-gray-700">
      <img src="/src/assets/icons/searchIcon.svg" class="search-icon" />
    </button>
  </div>

  <div
    v-if="searchText && filteredArticles.length === 0"
    class="text-center text-gray-500 mt-4 flex flex-col items-center justify-center"
  >
    <div>No articles found matching "{{ searchText }}".</div>
    <img src="/src/assets/images/empty_state.png" alt="No Result Found!" class="img-search mt-4" />
  </div>
</template>

<style scoped>
.search-bar {
  max-width: 600px;
  margin: auto;
  padding: 0 16px;
}

.search-icon {
  width: 24px;
  height: 24px;
}

.img-search {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
}

/* Mobile */
@media (max-width: 768px) {
  .search-bar {
    margin-top: 100px;
  }

  .search-bar input {
    width: 100%;
  }

  .search-bar button {
    position: absolute;
    right: 20px;
    top: 22px;
    transform: translate(-50%, -50%);
  }
}

@media (max-width: 480px) {
  .img-search {
    max-width: 200px;
  }
}
</style>
