<script setup>
import { onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import SongList from './components/SongList.vue';
import TagFilter from './components/TagFilter.vue';
import { useSongs } from './composables/useSongs';

const petals = [
  { left: '3%', delay: '0s', duration: '12.4s', drift: '-18px', scale: 0.72 },
  { left: '9%', delay: '1.2s', duration: '10.8s', drift: '16px', scale: 0.88 },
  { left: '15%', delay: '2.2s', duration: '14.6s', drift: '-12px', scale: 0.84 },
  { left: '22%', delay: '0.4s', duration: '11.4s', drift: '18px', scale: 1.02 },
  { left: '29%', delay: '3s', duration: '13.2s', drift: '-8px', scale: 0.78 },
  { left: '37%', delay: '1.6s', duration: '15s', drift: '24px', scale: 1.12 },
  { left: '44%', delay: '4s', duration: '12.6s', drift: '-20px', scale: 0.92 },
  { left: '51%', delay: '2.6s', duration: '16.2s', drift: '14px', scale: 1.08 },
  { left: '58%', delay: '0.8s', duration: '11.9s', drift: '-22px', scale: 0.82 },
  { left: '66%', delay: '3.5s', duration: '14.2s', drift: '20px', scale: 0.98 },
  { left: '73%', delay: '1.8s', duration: '12.8s', drift: '-14px', scale: 0.86 },
  { left: '81%', delay: '4.6s', duration: '15.5s', drift: '15px', scale: 1.04 },
  { left: '89%', delay: '2.8s', duration: '11.6s', drift: '-16px', scale: 0.76 },
  { left: '95%', delay: '5.1s', duration: '13.4s', drift: '12px', scale: 0.9 },
];

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
    <div class="petal-layer" aria-hidden="true">
      <span
        v-for="(petal, index) in petals"
        :key="index"
        class="petal"
        :style="{
          left: petal.left,
          animationDelay: petal.delay,
          animationDuration: petal.duration,
          '--petal-drift': petal.drift,
          '--petal-scale': petal.scale,
        }"
      />
    </div>

    <img
      class="float-paw float-paw-one"
      src="https://api.iconify.design/noto/paw-prints.svg"
      alt=""
      aria-hidden="true"
      referrerpolicy="no-referrer"
    />

    <section class="profile panel">
      <div class="profile-avatar" aria-hidden="true">
        <span>汐</span>
      </div>
      <div class="profile-copy">
        <p class="eyebrow">Sweet Playlist Space</p>
        <div class="title-stack">
          <img
            class="title-cat"
            src="/images/cat-sit.png"
            alt=""
            aria-hidden="true"
          />
          <h1>汐芽Liora 的点歌房</h1>
        </div>
        <p class="nickname">@汐芽Liora</p>
        <p class="hero-text">
          今天也来挑一首心动 BGM 吧。这里可以搜索歌名、筛选标签，或者一键随机点歌。
        </p>
      </div>
      <div class="profile-side">
        <div class="random-button-wrap">
          <img
            class="button-cat"
            src="/images/cat-lie.png"
            alt=""
            aria-hidden="true"
          />
          <button
            class="random-button"
            type="button"
            :disabled="loading || !filteredSongs.length"
            @click="randomRequest"
          >
            随机点歌
          </button>
        </div>
        <p class="action-message">{{ actionMessage }}</p>
        <article v-if="lastRandomSong" class="random-card">
          <span class="random-label">上次随机结果</span>
          <strong>{{ lastRandomSong.song }}</strong>
          <small>{{ lastRandomSong.singer }}</small>
        </article>
      </div>
    </section>

    <section class="toolbar panel">
      <img
        class="panel-paw panel-paw-toolbar"
        src="https://api.iconify.design/noto/paw-prints.svg"
        alt=""
        aria-hidden="true"
        referrerpolicy="no-referrer"
      />
      <div class="toolbar-head">
        <div>
          <p class="toolbar-kicker">Search & Filter</p>
          <h2>检索面板</h2>
        </div>
        <span class="toolbar-badge">
          <img
            class="badge-paw"
            src="https://api.iconify.design/tabler/paw.svg?color=%234f6f69"
            alt=""
            aria-hidden="true"
            referrerpolicy="no-referrer"
          />
          少女歌单模式
        </span>
      </div>
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
  position: relative;
  width: min(var(--page-width), calc(100% - 1rem));
  margin: 0 auto;
  padding: 0.75rem 0 2.5rem;
}

.petal-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.petal {
  --petal-drift: 0px;
  --petal-scale: 1;
  position: absolute;
  top: -10%;
  width: 14px;
  height: 20px;
  border-radius: 70% 30% 70% 35%;
  background: linear-gradient(180deg, rgba(255, 177, 208, 0.95), rgba(255, 214, 228, 0.92));
  box-shadow: inset -2px -3px 0 rgba(255, 255, 255, 0.35);
  opacity: 0.82;
  transform: rotate(-12deg) scale(var(--petal-scale));
  animation: petal-fall linear infinite;
}

.petal::after {
  content: '';
  position: absolute;
  inset: 1px 5px 7px 5px;
  border-radius: 50%;
  background: rgba(255, 245, 248, 0.3);
}

.float-paw {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.float-paw {
  width: 70px;
  height: 70px;
  opacity: 0.66;
  object-fit: contain;
}

.float-paw-one {
  left: -10px;
  bottom: 150px;
  transform: rotate(-18deg);
}

.panel-paw {
  pointer-events: none;
  position: absolute;
  z-index: 0;
}

.panel-paw-toolbar {
  width: 54px;
  height: 54px;
  right: 12px;
  bottom: 12px;
  opacity: 0.7;
  object-fit: contain;
}

.panel {
  position: relative;
  z-index: 1;
  border: 1px solid var(--card-border);
  border-radius: 28px;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(14px);
}

.profile {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.15rem;
  background:
    radial-gradient(circle at top left, rgba(255, 194, 225, 0.62), transparent 32%),
    radial-gradient(circle at bottom right, rgba(183, 238, 228, 0.42), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 244, 249, 0.92));
}

.profile-avatar {
  width: 76px;
  height: 76px;
  display: grid;
  place-items: center;
  border: 3px solid rgba(255, 255, 255, 0.88);
  border-radius: 24px;
  color: #ffffff;
  background:
    linear-gradient(135deg, #ff9fc0 0%, #ffb4cf 52%, #8de0cf 100%);
  box-shadow:
    0 10px 24px rgba(233, 107, 153, 0.2),
    inset 0 2px 6px rgba(255, 255, 255, 0.35);
}

.profile-avatar span {
  font-size: 1.8rem;
  font-weight: 800;
}

.profile-copy {
  display: grid;
  gap: 0.55rem;
  align-content: start;
}

.title-stack {
  position: relative;
  display: inline-block;
  min-height: 104px;
  padding: 0.2rem 90px 1.2rem 0;
}

.title-cat {
  position: absolute;
  right: 0;
  top: 4px;
  width: 82px;
  max-width: 28vw;
  opacity: 0.96;
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgba(120, 90, 120, 0.1));
  z-index: 0;
}

.eyebrow {
  margin: 0;
  color: var(--accent-strong);
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  font-weight: 700;
}

.profile h1 {
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: "YouYuan", "STZhongsong", "Noto Serif SC", serif;
  color: #56395e;
  font-size: clamp(1.45rem, 7vw, 2.6rem);
  line-height: 1.08;
  white-space: nowrap;
}

.nickname {
  margin: 0;
  color: var(--text-faint);
  font-size: 0.93rem;
}

.hero-text {
  margin: 0;
  color: var(--text-soft);
  font-size: 0.98rem;
  line-height: 1.75;
}

.profile-side {
  display: grid;
  gap: 0.85rem;
  align-content: start;
}

.random-button-wrap {
  position: relative;
  padding-top: 18px;
}

.button-cat {
  position: absolute;
  top: -2px;
  right: 12px;
  width: 84px;
  max-width: 32vw;
  object-fit: contain;
  filter: drop-shadow(0 5px 10px rgba(120, 90, 120, 0.1));
  pointer-events: none;
  z-index: 2;
}

.random-button {
  width: 100%;
  min-height: 52px;
  border-radius: 18px;
  padding: 0.95rem 1.1rem;
  color: #fff9f2;
  background: linear-gradient(135deg, #ff9abb 0%, #ea78a2 55%, #dc6e97 100%);
  font-weight: 700;
  transition:
    transform 160ms ease,
    box-shadow 160ms ease;
}

.random-button:hover:enabled {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(233, 107, 153, 0.24);
}

.random-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.action-message {
  min-height: 1.5rem;
  margin: 0;
  color: var(--text-soft);
  font-size: 0.94rem;
}

.random-card {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border: 1px solid rgba(212, 151, 188, 0.18);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 245, 250, 0.92));
}

.random-label {
  color: #d95c92;
  font-size: 0.82rem;
}

.random-card strong {
  color: #573d60;
  font-size: 1.1rem;
}

.random-card small {
  color: var(--text-faint);
}

.toolbar {
  margin-top: 1rem;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  background:
    radial-gradient(circle at top right, rgba(141, 225, 209, 0.24), transparent 25%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 248, 252, 0.9));
}

.toolbar-head {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.toolbar-kicker {
  margin: 0 0 0.2rem;
  color: var(--text-faint);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.toolbar-head h2 {
  margin: 0;
  color: #553b5d;
  font-size: 1.25rem;
}

.toolbar-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  align-self: flex-start;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  color: #4f6f69;
  background: var(--mint-soft);
  font-size: 0.85rem;
  font-weight: 700;
}

.badge-paw {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1rem 0;
}

.summary-card {
  display: grid;
  gap: 0.3rem;
  min-height: 92px;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(212, 151, 188, 0.16);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.74);
}

.summary-card span {
  color: var(--text-faint);
  font-size: 0.9rem;
}

.summary-card strong {
  color: #56395f;
  font-size: 1.35rem;
}

.summary-card:last-child {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .page {
    width: min(var(--page-width), calc(100% - 2rem));
    padding-top: 1.5rem;
  }

  .profile {
    grid-template-columns: auto minmax(0, 1.4fr) minmax(260px, 0.9fr);
    align-items: start;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .profile-avatar {
    width: 94px;
    height: 94px;
    border-radius: 28px;
  }

  .title-stack {
    min-height: 0px;
    padding: 0.2rem 112px 1rem 0;
  }

  .title-cat {
    top: -2px;
    width: 104px;
    max-width: none;
  }

  .button-cat {
    right: 14px;
    width: 96px;
    max-width: none;
  }

  .panel-paw-toolbar {
    width: 60px;
    height: 60px;
  }

  .toolbar {
    margin-top: 1.25rem;
    padding: 1.25rem;
  }

  .toolbar-head {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .summary {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.9rem;
    margin: 1.35rem 0;
  }

  .summary-card:last-child {
    grid-column: auto;
  }
}

@media (min-width: 1024px) {
  .hero-text {
    font-size: 1.03rem;
  }

  .float-paw-one {
    left: 14px;
  }
}

@media (max-width: 420px) {
  .page {
    width: min(var(--page-width), calc(100% - 0.75rem));
  }

  .profile,
  .toolbar {
    padding: 0.9rem;
  }

  .title-stack {
    min-height: 82px;
    padding: 0.2rem 76px 0.85rem 0;
  }

  .title-cat {
    width: 72px;
  }

  .button-cat {
    right: 8px;
    width: 72px;
  }

  .summary {
    grid-template-columns: 1fr;
  }

  .summary-card:last-child {
    grid-column: auto;
  }

  .petal {
    width: 11px;
    height: 16px;
  }
}

@keyframes petal-fall {
  0% {
    transform: translate3d(0, -8vh, 0) rotate(0deg) scale(var(--petal-scale));
  }

  50% {
    transform: translate3d(var(--petal-drift), 55vh, 0) rotate(140deg) scale(var(--petal-scale));
  }

  100% {
    transform: translate3d(calc(var(--petal-drift) * -0.45), 108vh, 0) rotate(300deg) scale(var(--petal-scale));
  }
}

</style>
