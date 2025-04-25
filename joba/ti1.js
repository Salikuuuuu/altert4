let currentAudio = null;
        let currentButton = null;
        const seekBar = document.getElementById("seek-bar");

        function playSong(src, button, title, artist, imgSrc) {
            const playerTitle = document.getElementById("player-title");
            const playerArtist = document.getElementById("player-artist");
            const playerImg = document.getElementById("player-img");
            const playerBtn = document.getElementById("player-btn");

            if (currentAudio && currentAudio.src === new URL(src, window.location.href).href) {
                if (currentAudio.paused) {
                    currentAudio.play();
                    button.textContent = "⏸";
                    playerBtn.textContent = "⏸";
                } else {
                    currentAudio.pause();
                    button.textContent = "▶";
                    playerBtn.textContent = "▶";
                }
                return;
            }

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                if (currentButton) {
                    currentButton.textContent = "▶";
                }
            }
            currentAudio = new Audio(src);
            currentAudio.play();
            currentButton = button;
            button.textContent = "⏸";
            playerBtn.textContent = "⏸";

            playerTitle.textContent = title;
            playerArtist.textContent = artist;
            playerImg.src = imgSrc;

            currentAudio.addEventListener("timeupdate", updateSeekBar);
            currentAudio.addEventListener("loadedmetadata", () => {
                seekBar.max = currentAudio.duration;
            });
            seekBar.value = 0;

            // Автопереход на следующую песню
            currentAudio.addEventListener("ended", () => {
                const playlistItems = Array.from(document.querySelectorAll(".playlist-item"));
                const currentIndex = playlistItems.findIndex(item => item.contains(button));
                const nextIndex = (currentIndex + 1) % playlistItems.length; // Цикличный переход
                const nextItem = playlistItems[nextIndex];
                const nextButton = nextItem.querySelector(".play-btn");
                const nextSrc = nextButton.getAttribute("onclick").match(/playSong\('(.*?)'/)[1];
                const nextTitle = nextItem.querySelector("h4").textContent;
                const nextArtist = nextItem.querySelector("p").textContent;
                const nextImg = nextItem.querySelector("img").src;

                playSong(nextSrc, nextButton, nextTitle, nextArtist, nextImg);
            });
        }

        function togglePlayer() {
            if (currentAudio) {
                if (currentAudio.paused) {
                    currentAudio.play();
                    currentButton.textContent = "⏸";
                    document.getElementById("player-btn").textContent = "⏸";
                } else {
                    currentAudio.pause();
                    currentButton.textContent = "▶";
                    document.getElementById("player-btn").textContent = "▶";
                }
            }
        }

        function updateSeekBar() {
            if (currentAudio) {
                seekBar.value = currentAudio.currentTime;
            }
        }

        function seekTrack() {
            if (currentAudio) {
                currentAudio.currentTime = seekBar.value;
            }
        }

        function scrollArtists(direction) {
            const container = document.querySelector('.artists-container');
            const scrollAmount = 300;
            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (direction === 'right') {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }

        document.getElementById("searchInput").addEventListener("input", function () {
            const query = this.value.toLowerCase();
            const playlistItems = document.querySelectorAll(".playlist-item");

            playlistItems.forEach(item => {
                const title = item.querySelector("h4").textContent.toLowerCase();
                const artist = item.querySelector("p").textContent.toLowerCase();

                if (title.includes(query) || artist.includes(query)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        }); 

        const tracks = [
           
        ];

        const playlistContainer = document.querySelector(".playlist");
        tracks.forEach(track => {
            const item = document.createElement("div");
            item.className = "playlist-item";
            item.innerHTML = `
                <img src="${track.img}" alt="${track.artist}">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
                <button class="play-btn" onclick="playSong('${track.src}', this, '${track.title}', '${track.artist}', '${track.img}')">▶</button>
            `;
            playlistContainer.appendChild(item);
        });

        function addToLibrary(src, title, artist, imgSrc) {
            const library = JSON.parse(localStorage.getItem('library')) || [];
            const track = { src, title, artist, imgSrc };

            // Проверка на дублирование
            if (!library.some(item => item.src === src)) {
                library.push(track);
                localStorage.setItem('library', JSON.stringify(library));
                alert(`${title} добавлен в библиотеку!`);
            } else {
                alert(`${title} уже есть в библиотеке.`);
            }
        }