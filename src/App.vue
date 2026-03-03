<script setup>
import { onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import SongList from './components/SongList.vue';
import TagFilter from './components/TagFilter.vue';
import { useSongs } from './composables/useSongs';

const {
  actionMessage,
  allTags,
  copiedUid,
  error,
  filteredSongs,
  lastRandomSong,
  loading,
  searchQuery,
  selectedTag,
  songs,
  copySong,
  loadSongs,
  randomRequest,
} = useSongs();

onMounted(() => {
  loadSongs();
});
</script>

<template>
  <main class="page">
    <section class="hero panel">
      <div class="hero-copy">
        <p class="eyebrow">Song Request Playlist</p>
        <h1>点歌歌单网站</h1>
        <p class="hero-text">
          纯前端静态项目，直接从本地 <code>songs.csv</code> 读取歌曲数据。
          支持搜索、标签筛选、点击复制点歌口令和随机点歌。
        </p>
      </div>

      <div class="hero-side">
        <button
          class="random-button"
          type="button"
          :disabled="loading || !filteredSongs.length"
          @click="randomRequest"
        >
          随机点歌
        </button>
        <p class="action-message">{{ actionMessage }}</p>

        <article v-if="lastRandomSong" class="random-card">
          <span class="random-label">上次随机结果</span>
          <strong>{{ lastRandomSong.song }}</strong>
          <small>{{ lastRandomSong.singer }}</small>
        </article>
      </div>
    </section>

    <section class="toolbar panel">
      <SearchBar v-model="searchQuery" />
      <TagFilter v-model="selectedTag" :tags="allTags" />
    </section>

    <section class="summary">
      <div class="summary-card">
        <span>总歌曲数</span>
        <strong>{{ songs.length }}</strong>
      </div>
      <div class="summary-card">
        <span>当前结果</span>
        <strong>{{ filteredSongs.length }}</strong>
      </div>
      <div class="summary-card">
        <span>当前标签</span>
        <strong>{{ selectedTag }}</strong>
      </div>
    </section>

    <SongList
      :copied-uid="copiedUid"
      :error="error"
      :loading="loading"
      :songs="filteredSongs"
      @copy="copySong"
    />
  </main>
</template>

<style scoped>
.page {
  width: min(var(--page-width), calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.panel {
  border: 1px solid var(--card-border);
  border-radius: 30px;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(18px);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 0.9fr);
  gap: 1.5rem;
  padding: 1.5rem;
}

.hero-copy {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.eyebrow {
  margin: 0;
  color: var(--accent-strong);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.82rem;
}

.hero h1 {
  margin: 0;
  font-family: "STZhongsong", "Noto Serif SC", serif;
  font-size: clamp(2.2rem, 5vw, 4.2rem);
  line-height: 1.05;
}

.hero-text {
  max-width: 62ch;
  margin: 0;
  color: var(--muted);
  font-size: 1.03rem;
}

.hero-text code {
  padding: 0.08rem 0.35rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
}

.hero-side {
  display: grid;
  gap: 1rem;
  align-content: start;
}

.random-button {
  border-radius: 18px;
  padding: 1rem 1.1rem;
  color: #221a17;
  background: linear-gradient(135deg, #f29a4c 0%, #ffd166 100%);
  font-weight: 700;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.random-button:hover:enabled {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(242, 154, 76, 0.28);
}

.random-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.action-message {
  min-height: 1.5rem;
  margin: 0;
  color: rgba(245, 239, 230, 0.78);
}

.random-card {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
}

.random-label {
  color: var(--accent-strong);
  font-size: 0.82rem;
}

.random-card strong {
  font-size: 1.1rem;
}

.random-card small {
  color: rgba(245, 239, 230, 0.62);
}

.toolbar {
  margin-top: 1.5rem;
  padding: 1.25rem;
  display: grid;
  gap: 1.25rem;
}

.summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
  margin: 1.5rem 0;
}

.summary-card {
  display: grid;
  gap: 0.3rem;
  padding: 1rem 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
}

.summary-card span {
  color: rgba(245, 239, 230, 0.66);
}

.summary-card strong {
  font-size: 1.5rem;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .summary {
    grid-template-columns: 1fr;
  }
}
</style>
