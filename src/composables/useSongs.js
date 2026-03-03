import { computed, ref } from 'vue';
import { parseCsv } from '../utils/parseCsv';

const ALL_TAG = '全部';
const DEFAULT_MESSAGE = '点击歌曲卡片即可复制点歌口令。';

function normalizeTags(rawTags = '') {
  return rawTags
    .split(/[|/、，,]+/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export function useSongs() {
  const songs = ref([]);
  const searchQuery = ref('');
  const selectedTag = ref(ALL_TAG);
  const loading = ref(false);
  const error = ref('');
  const copiedUid = ref('');
  const actionMessage = ref(DEFAULT_MESSAGE);
  const lastRandomSong = ref(null);

  let messageTimer = 0;

  const allTags = computed(() => {
    const tags = new Set();

    songs.value.forEach((song) => {
      song.tags.forEach((tag) => tags.add(tag));
    });

    return Array.from(tags).sort((left, right) => left.localeCompare(right, 'zh-CN'));
  });

  const filteredSongs = computed(() => {
    const keyword = searchQuery.value.trim().toLowerCase();

    return songs.value.filter((song) => {
      const matchesKeyword =
        !keyword ||
        song.song.toLowerCase().includes(keyword) ||
        song.singer.toLowerCase().includes(keyword);

      const matchesTag = selectedTag.value === ALL_TAG || song.tags.includes(selectedTag.value);

      return matchesKeyword && matchesTag;
    });
  });

  function resetMessageLater() {
    window.clearTimeout(messageTimer);

    messageTimer = window.setTimeout(() => {
      copiedUid.value = '';
      actionMessage.value = DEFAULT_MESSAGE;
    }, 2200);
  }

  function setActionMessage(message) {
    actionMessage.value = message;
    resetMessageLater();
  }

  async function loadSongs() {
    loading.value = true;
    error.value = '';

    try {
      const response = await fetch('/songs.csv');

      if (!response.ok) {
        throw new Error(`songs.csv 加载失败（HTTP ${response.status}）`);
      }

      const text = await response.text();
      const records = parseCsv(text);

      if (!records.length) {
        throw new Error('songs.csv 为空或格式不正确。');
      }

      songs.value = records.map((record, index) => ({
        uid: record.uid || String(index + 1),
        song: record.song || '未命名歌曲',
        singer: record.singer || '未知歌手',
        tags: normalizeTags(record.tags),
        note: record.note || '',
      }));
    } catch (loadError) {
      songs.value = [];
      error.value = loadError instanceof Error ? loadError.message : '歌曲数据加载失败。';
    } finally {
      loading.value = false;
    }
  }

  async function copySong(song) {
    if (!song) {
      return;
    }

    const requestText = `点歌 ${song.song}`;

    try {
      await copyText(requestText);
      copiedUid.value = song.uid;
      setActionMessage(`已复制：${requestText}`);
    } catch (copyError) {
      setActionMessage('复制失败，请检查浏览器剪贴板权限。');
    }
  }

  async function randomRequest() {
    if (!filteredSongs.value.length) {
      setActionMessage('当前列表为空，无法随机点歌。');
      return;
    }

    const randomIndex = Math.floor(Math.random() * filteredSongs.value.length);
    const selectedSong = filteredSongs.value[randomIndex];
    lastRandomSong.value = selectedSong;
    await copySong(selectedSong);
  }

  return {
    allTags,
    actionMessage,
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
  };
}
