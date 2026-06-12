/**
 * ICS4U Project: King Gizzard Fan Site
 * Author: Ben F
 * * DESCRIPTION:
 * This script manages custom audio playback, store calculations, 
 * and interactive form handling for a multi-page website.
 */
/** Home Page*/ 
/**Mailing List form submission*/
const contactForm = document.getElementById('mailing-list');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('user-name').value;
        alert(`Welcome to the Weirdo Swarm, ${name}!`);
        console.log("Newsletter signup processed for: " + name);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("JS is linked and page is ready!");

    const cards = document.querySelectorAll('.song-card');
    console.log("Found " + cards.length + " song cards.");

    cards.forEach((card, index) => {
        const audio = card.querySelector('.song-audio');
        const playBtn = card.querySelector('.play-trigger');
        const progressFill = card.querySelector('.progress-fill');

        // Safety check
        if (!playBtn || !audio || !progressFill) {
            console.error("Card " + index + " is missing vital elements (button, audio, or progress fill)!");
            return;
        }

        // Handle Play/Pause Click
        playBtn.addEventListener('click', () => {
            console.log("Attempting to play song index: " + index);
            
            if (audio.paused) {
                audio.play()
                    .then(() => {
                        playBtn.innerText = "⏸";
                    })
                    .catch(error => {
                        console.error("Playback blocked or file missing: ", error);
                    });
            } else {
                audio.pause();
                playBtn.innerText = "▶";
            }
        });

        // Update progress bar as the song plays
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = percentage + "%";
            }
        });

        // Reset button when audio naturally ends
        audio.addEventListener('ended', () => {
            playBtn.innerText = "▶";
            progressFill.style.width = "0%";
        });
    });
});

// Slow down concert video playback rate
document.addEventListener("DOMContentLoaded", () => {
    const concertVideo = document.querySelector(".custom-video");
    
    if (concertVideo) {
        // Sets the playback speed to 50% (half speed)
        concertVideo.playbackRate = 0.5; 
        
        console.log("Concert video playback speed successfully set to slow motion (0.5x).");
    }
});