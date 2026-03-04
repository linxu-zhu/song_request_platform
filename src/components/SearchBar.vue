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
  color: var(--text-soft);
  font-size: 0.95rem;
  font-weight: 600;
}

.search-input-wrap {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  border: 1px solid rgba(142, 105, 73, 0.12);
  border-radius: 18px;
  padding: 0.8rem 0.9rem;
  background: var(--surface);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.search-input {
  width: 100%;
  border: 0;
  outline: 0;
  min-height: 40px;
  color: var(--text);
  background: transparent;
}

.search-input::placeholder {
  color: var(--text-faint);
}

.clear-button {
  align-self: flex-end;
  border-radius: 999px;
  padding: 0.5rem 0.85rem;
  color: var(--accent-strong);
  background: var(--accent-soft);
}

@media (min-width: 640px) {
  .search-input-wrap {
    flex-direction: row;
    align-items: center;
    padding: 0.85rem 1rem;
  }

  .clear-button {
    align-self: auto;
    flex-shrink: 0;
  }
}
</style>
