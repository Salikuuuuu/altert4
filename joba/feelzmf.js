document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playButtons = document.querySelectorAll('.play-btn');
    const searchInput = document.getElementById('searchInput'); // Поле поиска
    const playlistItems = document.querySelectorAll('.playlist-item'); // Элементы плейлиста
    const libraryKey = 'userLibrary'; // Ключ для хранения данных в LocalStorage

    let currentTrackIndex = null; // Индекс текущего трека

    // Функция воспроизведения или паузы трека
    function playOrPauseTrack(index) {
        if (currentTrackIndex === index) {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        } else {
            currentTrackIndex = index;
            audioPlayer.src = playButtons[index].getAttribute('data-audio');
            audioPlayer.play();
        }
        updatePlayButtons();
    }

    // Обновление состояния кнопок
    function updatePlayButtons() {
        playButtons.forEach((button, index) => {
            if (index === currentTrackIndex && !audioPlayer.paused) {
                button.textContent = '⏸'; // Пауза
            } else {
                button.textContent = '▶'; // Воспроизведение
            }
        });
    }

    // Обработчик кнопок воспроизведения
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            playOrPauseTrack(index);
        });
    });

    // Событие для обновления кнопок при завершении трека
    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = null;
        updatePlayButtons();
    });

    // Реализация поиска
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        playlistItems.forEach(item => {
            const title = item.querySelector('h4').textContent.toLowerCase();
            const artist = item.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || artist.includes(query)) {
                item.style.display = ''; // Показываем элемент
            } else {
                item.style.display = 'none'; // Скрываем элемент
            }
        });
    });

    // Обработчик кликов на кнопки "♡"
    document.querySelectorAll('.add-to-library-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const trackElement = event.target.closest('.playlist-item');
            const trackId = trackElement.dataset.id;
            const trackTitle = trackElement.querySelector('h4').textContent;
            const trackArtist = trackElement.querySelector('p').textContent;

            // Получаем текущую библиотеку из LocalStorage
            let library = JSON.parse(localStorage.getItem(libraryKey)) || [];

            // Проверяем, есть ли трек в библиотеке
            if (!library.some(track => track.id === trackId)) {
                // Добавляем трек в библиотеку
                library.push({ id: trackId, title: trackTitle, artist: trackArtist });
                localStorage.setItem(libraryKey, JSON.stringify(library));
                alert(`${trackTitle} by ${trackArtist} added to your library!`);
            } else {
                alert(`${trackTitle} is already in your library.`);
            }
        });
    });
});

document.querySelectorAll('.more-btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('More options button clicked!');
    });
});

function addToLibrary(audioFile, title, artist, image) {
    const libraryKey = 'userLibrary';
    let library = JSON.parse(localStorage.getItem(libraryKey)) || [];

    // Проверяем, достигнут ли лимит
    if (library.length >= 30) {
        alert('Вы не можете добавить больше 30 треков в библиотеку.');
        return;
    }

    // Добавляем новый трек
    library.push({ audioFile, title, artist, image });
    localStorage.setItem(libraryKey, JSON.stringify(library));

    alert(`Трек "${title}" исполнителя "${artist}" добавлен в библиотеку!`);
}
const tracks = [
    {
        title: "NIGHTS LIKE THIS",
        artist: "The Kid LAROI",
        audioFile: "night.mp3",
        image: "night.png"
    },
    {
        title: "Fashion Killa",
        artist: "A$AP Rocky",
        audioFile: "fashionkilla.mp3",
        image: "asaa.jpg"
    },
    {
        title: "Cinnamon girl",
        artist: "Lana del Rey",
        audioFile: "cinnamon.mp3",
        image: "girl.jfif"
    }
];

let currentTrackIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const trackImage = document.getElementById("track-image");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Функция для загрузки трека
function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.audioFile;
    trackImage.src = track.image;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
}

// Функция для воспроизведения/паузы
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
}

// Функция для переключения на следующий трек
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
}

// Функция для переключения на предыдущий трек
function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
}

// События
playPauseBtn.addEventListener("click", togglePlayPause);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Загрузка первого трека
loadTrack(currentTrackIndex);

