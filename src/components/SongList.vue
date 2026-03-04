<script setup>
import SongItem from './SongItem.vue';

defineProps({
  copiedUid: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  songs: {
    type: Array,
    default: () => [],
  },
});

defineEmits(['copy']);
</script>

<template>
  <section class="song-list-wrap">
    <div v-if="loading" class="panel-state">
      正在加载 songs.csv ...
    </div>

    <div v-else-if="error" class="panel-state error">
      {{ error }}
    </div>

    <div v-else-if="!songs.length" class="panel-state">
      没有匹配的歌曲，换个关键词或标签试试。
    </div>

    <ul v-else class="song-list">
      <SongItem
        v-for="song in songs"
        :key="song.uid"
        :copied="copiedUid === song.uid"
        :song="song"
        @copy="$emit('copy', $event)"
      />
    </ul>
  </section>
</template>

<style scoped>
.song-list-wrap {
  min-height: 280px;
}

.song-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
  margin: 0;
  padding: 0;
}

.panel-state {
  display: grid;
  place-items: center;
  min-height: 240px;
  padding: 1.5rem;
  border: 1px dashed rgba(142, 105, 73, 0.2);
  border-radius: 24px;
  color: var(--text-soft);
  background: rgba(255, 255, 255, 0.5);
}

.panel-state.error {
  color: var(--danger);
  border-color: rgba(199, 90, 75, 0.35);
}

</style>
