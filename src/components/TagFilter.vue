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
  color: var(--text-soft);
  font-weight: 600;
}

.filter-header small {
  color: var(--text-faint);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.tag-chip {
  min-height: 40px;
  border: 1px solid rgba(142, 105, 73, 0.12);
  border-radius: 999px;
  padding: 0.6rem 0.95rem;
  color: var(--text-soft);
  background: var(--surface);
  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease;
}

.tag-chip:hover {
  transform: translateY(-1px);
  border-color: var(--accent-soft-strong);
}

.tag-chip.active {
  color: #fff9f2;
  border-color: transparent;
  background: linear-gradient(135deg, #eb8d40 0%, #d86d23 100%);
}
</style>
