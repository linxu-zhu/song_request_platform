<script setup>
import { computed } from 'vue';

const props = defineProps({
  copied: {
    type: Boolean,
    default: false,
  },
  song: {
    type: Object,
    required: true,
  },
});

defineEmits(['copy']);

const displayTags = computed(() => (props.song.tags.length ? props.song.tags : ['未分类']));
</script>

<template>
  <li class="song-item">
    <button
      class="song-card"
      :class="{ copied }"
      type="button"
      @click="$emit('copy', song)"
    >
      <div class="song-main">
        <div class="song-heading">
          <div>
            <h3>{{ song.song }}</h3>
            <p>{{ song.singer }}</p>
          </div>
          <span class="copy-state">
            {{ copied ? '已复制' : '点击点歌' }}
          </span>
        </div>

        <div class="tag-row">
          <span
            v-for="tag in displayTags"
            :key="`${song.uid}-${tag}`"
            class="song-tag"
          >
            {{ tag }}
          </span>
        </div>

        <p v-if="song.note" class="song-note">
          {{ song.note }}
        </p>
      </div>

      <div class="song-action">
        <span class="request-text">点歌 {{ song.song }}</span>
      </div>
    </button>
  </li>
</template>

<style scoped>
.song-item {
  list-style: none;
}

.song-card {
  width: 100%;
  display: grid;
  gap: 1rem;
  text-align: left;
  padding: 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  color: inherit;
  background:
    linear-gradient(140deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
    rgba(18, 20, 31, 0.76);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.song-card:hover {
  transform: translateY(-4px);
  border-color: rgba(242, 154, 76, 0.34);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
}

.song-card.copied {
  border-color: rgba(255, 209, 102, 0.55);
  box-shadow: 0 18px 40px rgba(242, 154, 76, 0.18);
}

.song-main {
  display: grid;
  gap: 0.9rem;
}

.song-heading {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.song-heading h3 {
  margin: 0;
  font-size: 1.2rem;
}

.song-heading p {
  margin: 0.35rem 0 0;
  color: rgba(245, 239, 230, 0.72);
}

.copy-state {
  flex-shrink: 0;
  align-self: flex-start;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  color: rgba(255, 245, 235, 0.92);
  background: rgba(242, 154, 76, 0.18);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.song-tag {
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  color: rgba(255, 245, 235, 0.85);
  background: rgba(255, 255, 255, 0.06);
}

.song-note {
  margin: 0;
  color: rgba(245, 239, 230, 0.6);
}

.song-action {
  display: flex;
  justify-content: flex-end;
}

.request-text {
  color: #ffd166;
  font-size: 0.95rem;
}
</style>
