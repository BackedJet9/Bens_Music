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


/** Audio Player Logic */
document.addEventListener('DOMContentLoaded', () => {
    console.log("JS is linked and page is ready!");

    const cards = document.querySelectorAll('.song-card');
    
    // Check if JS even found the cards
    console.log("Found " + cards.length + " song cards.");

    cards.forEach((card, index) => {
        const audio = card.querySelector('.song-audio');
        const playBtn = card.querySelector('.play-trigger');
        const progressFill = card.querySelector('.progress-fill');
        

        if (!playBtn || !audio) {
            console.error("Card " + index + " is missing a button or audio tag!");
            return;
        }
        // Add click listener to play/pause the audio
        playBtn.addEventListener('click', () => {
            console.log("Attempting to play song " + index);
            
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
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = percentage + "%";
        });
    });
});
