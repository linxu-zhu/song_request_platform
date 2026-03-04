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
      <img
        class="card-paw"
        src="https://api.iconify.design/twemoji/paw-prints.svg"
        alt=""
        aria-hidden="true"
        referrerpolicy="no-referrer"
      />

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
  position: relative;
  width: 100%;
  display: grid;
  gap: 0.65rem;
  text-align: left;
  padding: 0.72rem 0.82rem;
  border: 1px solid rgba(212, 151, 188, 0.2);
  border-radius: 26px;
  color: inherit;
  background:
    radial-gradient(circle at top right, rgba(255, 204, 227, 0.34), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 246, 250, 0.96)),
    rgba(255, 255, 255, 0.88);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.card-paw {
  position: absolute;
  top: 10px;
  right: 12px;
  width: 18px;
  height: 18px;
  opacity: 0.85;
  object-fit: contain;
}

.song-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-soft-strong);
  box-shadow: 0 16px 32px rgba(196, 143, 176, 0.16);
}

.song-card.copied {
  border-color: rgba(233, 107, 153, 0.42);
  box-shadow: 0 16px 28px rgba(233, 107, 153, 0.15);
}

.song-main {
  display: grid;
  gap: 0.45rem;
}

.song-heading {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.45rem;
}

.song-heading h3 {
  margin: 0;
  color: var(--text);
  font-size: 1rem;
  line-height: 1.2;
}

.song-heading p {
  margin: 0.16rem 0 0;
  color: var(--text-soft);
  font-size: 0.88rem;
}

.copy-state {
  flex-shrink: 0;
  align-self: flex-start;
  border-radius: 999px;
  padding: 0.22rem 0.52rem;
  color: #cc4f84;
  background: rgba(255, 173, 205, 0.2);
  font-size: 0.76rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.36rem;
}

.song-tag {
  border-radius: 999px;
  padding: 0.22rem 0.48rem;
  color: #5e6f6b;
  background: rgba(133, 216, 198, 0.18);
  font-size: 0.74rem;
}

.song-note {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.78rem;
  line-height: 1.45;
}

.song-action {
  display: flex;
  justify-content: flex-start;
}

.request-text {
  color: var(--accent-strong);
  font-size: 0.82rem;
  font-weight: 600;
}

@media (min-width: 640px) {
  .song-card {
    padding: 0.8rem 0.92rem;
  }

  .song-heading {
    flex-direction: row;
    gap: 0.8rem;
  }

  .song-action {
    justify-content: flex-end;
  }
}
</style>
