<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const keyword = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <section class="search-bar">
    <label class="search-label" for="song-search">搜索歌曲 / 歌手</label>
    <div class="search-input-wrap">
      <input
        id="song-search"
        v-model="keyword"
        class="search-input"
        type="search"
        placeholder="输入歌名或歌手，例如：周杰伦 / 晴天"
      />
      <button
        v-if="keyword"
        class="clear-button"
        type="button"
        @click="keyword = ''"
      >
        清空
      </button>
    </div>
  </section>
</template>

<style scoped>
.search-bar {
  display: grid;
  gap: 0.75rem;
}

.search-label {
  color: rgba(245, 239, 230, 0.8);
  font-size: 0.95rem;
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 0.85rem 1rem;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.search-input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #fff5eb;
  background: transparent;
}

.search-input::placeholder {
  color: rgba(245, 239, 230, 0.42);
}

.clear-button {
  flex-shrink: 0;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  color: #221a17;
  background: #ffd166;
}
</style>
