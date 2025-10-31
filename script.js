const musicList = [
  {
 
  }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const musicListElement = document.getElementById("musicList");
const addMusicForm = document.getElementById("addMusicForm");
const musicTitleInput = document.getElementById("musicTitle");
const musicFileInput = document.getElementById("musicFile");
const coverFileInput = document.getElementById("coverFile");

let current = 0;

// Atualiza a lista
function renderList() {
  musicListElement.innerHTML = "";
  musicList.forEach((music, index) => {
    const li = document.createElement("li");
    li.textContent = music.title;
    li.addEventListener("click", () => loadMusic(index));
    musicListElement.appendChild(li);
  });
}
renderList();

function loadMusic(index) {
  const music = musicList[index];
  current = index;
  title.textContent = music.title;
  audio.src = music.src;
  cover.src = music.cover;
  audio.play();
  playBtn.textContent = "⏸️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + musicList.length) % musicList.length;
  loadMusic(current);
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % musicList.length;
  loadMusic(current);
});

// Adicionar música personalizada
addMusicForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = musicTitleInput.value.trim();
  const file = musicFileInput.files[0];
  const coverFile = coverFileInput.files[0];

  if (!title || !file) {
    alert("Por favor, preencha o nome e selecione um arquivo de música.");
    return;
  }

  const audioURL = URL.createObjectURL(file);
  let coverURL = "https://cdn.pixabay.com/photo/2015/07/31/22/09/turntable-869219_1280.jpg";

  if (coverFile) {
    coverURL = URL.createObjectURL(coverFile);
  }

  const newMusic = { title, src: audioURL, cover: coverURL };
  musicList.push(newMusic);
  renderList();

  musicTitleInput.value = "";
  musicFileInput.value = "";
  coverFileInput.value = "";

  alert(`🎶 Música "${title}" adicionada com sucesso!`);
});
