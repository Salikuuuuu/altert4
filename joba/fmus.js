// Получаем элементы управления
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackImage = document.getElementById('track-image');

// Плейлист треков
const playlist = [
    {
        src: 'Lana Del Rey - Cinnamon Girl.mp3',
        title: 'Cinnamon girl',
        artist: 'Lana Del Rey',
        image: 'girl.jfif'
    },
    {
        src: 'fashionkilla.mp3',
        title: 'Fashion Killa',
        artist: 'A$AP Rocky',
        image: 'asaa.jpg'
    },
    {
        src: 'Lil Peep feat. rainy bear - nuts.mp3',
        title: 'nuts',
        artist: 'Lil Peep',
        image: 'nuts.jfif'
    }
];

let currentTrackIndex = 0;

// Функция для загрузки трека
function loadTrack(index) {
    const track = playlist[index];
    audioPlayer.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackImage.src = track.image;
}

// Функция для воспроизведения/паузы
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = '⏸'; // Меняем иконку на паузу
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = '▶'; // Меняем иконку на воспроизведение
    }
}

// Функция для перехода к предыдущему треку
function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
}

// Функция для перехода к следующему треку
function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
}

// События для кнопок
playPauseBtn.addEventListener('click', togglePlayPause);
prevBtn.addEventListener('click', playPreviousTrack);
nextBtn.addEventListener('click', playNextTrack);

// Загрузка первого трека при загрузке страницы
loadTrack(currentTrackIndex);

// Функция для обновления плеера
function updatePlayer(src, title, artist, image) {
    trackImage.src = image;
    trackTitle.textContent = title;
    trackArtist.textContent = artist;
    audioPlayer.src = src;
    audioPlayer.play(); // Автоматически начинает воспроизведение
}

// Функция для добавления трека в библиотеку (если нужно)
function addToLibrary(audioFile, title, artist, image) {
    const libraryKey = 'userLibrary';
    let library = JSON.parse(localStorage.getItem(libraryKey)) || [];

    // Проверяем, есть ли уже трек в библиотеке
    const trackExists = library.some(track => track.title === title && track.artist === artist);
    if (trackExists) {
        alert('Этот трек уже добавлен в библиотеку.');
        return;
    }

    // Добавляем трек в библиотеку
    library.push({ audioFile, title, artist, image });
    localStorage.setItem(libraryKey, JSON.stringify(library));

    alert(`Трек "${title}" исполнителя "${artist}" добавлен в библиотеку!`);
}

// Функция для воспроизведения трека
function playSong(audioFile, button, title, artist, image) {
    const audioPlayer = document.getElementById('audio-player');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackImage = document.getElementById('track-image');

    // Устанавливаем информацию о треке
    audioPlayer.src = audioFile;
    trackTitle.textContent = title;
    trackArtist.textContent = artist;
    trackImage.src = image;

    // Воспроизводим трек
    audioPlayer.play();
}


