<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '全部',
  },
  tags: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedTag = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <section class="tag-filter">
    <header class="filter-header">
      <span>标签筛选</span>
      <small>{{ tags.length }} 个标签</small>
    </header>

    <div class="tag-list">
      <button
        class="tag-chip"
        :class="{ active: selectedTag === '全部' }"
        type="button"
        @click="selectedTag = '全部'"
      >
        全部
      </button>

      <button
        v-for="tag in tags"
        :key="tag"
        class="tag-chip"
        :class="{ active: selectedTag === tag }"
        type="button"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.tag-filter {
  display: grid;
  gap: 0.85rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  color: rgba(245, 239, 230, 0.8);
}

.filter-header small {
  color: rgba(245, 239, 230, 0.55);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.tag-chip {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  padding: 0.6rem 0.95rem;
  color: rgba(245, 239, 230, 0.85);
  background: rgba(255, 255, 255, 0.04);
  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease;
}

.tag-chip:hover {
  transform: translateY(-1px);
  border-color: rgba(255, 255, 255, 0.18);
}

.tag-chip.active {
  color: #221a17;
  border-color: transparent;
  background: linear-gradient(135deg, #f29a4c 0%, #ffd166 100%);
}
</style>
