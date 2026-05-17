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

/**
 * Updates the cart total using Float arithmetic.
 * @param {number} price - The item cost passed from the data-price attribute.
 */
function updateCart(price) {
    totalPrice += price;
    cartTotalDisplay.innerText = totalPrice.toFixed(2);
}
/**script to set dark  */
document.addEventListener('DOMContentLoaded', () => {
    console.log("King Gizzard Site Loaded Successfully.");

    //  if it's late at night "Night Mode"
    const hour = new Date().getHours();
    if (hour > 21 || hour < 6) {
        console.log("Late night browsing detected. Applying eye-saver mode.");
        document.body.style.borderColor = "var(--accent-gold)";
    }
});

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

/** Store Page*/

// Store Logic - Add this inside your existing DOMContentLoaded listener
const cartButtons = document.querySelectorAll('.add-to-cart');
const cartCountDisplay = document.getElementById('cart-count');
const cartTotalDisplay = document.getElementById('cart-total');
const clearBtn = document.getElementById('clear-cart');

let itemCount = 0;
let totalPrice = 0.00;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the price from the data-price attribute
        const price = parseFloat(button.getAttribute('data-price'));
        
        // Update variables
        itemCount++;
        totalPrice += price;

        // Update UI
        cartCountDisplay.innerText = itemCount;
        cartTotalDisplay.innerText = totalPrice.toFixed(2);
        
        console.log(`Added item. New total: $${totalPrice}`);
    });
});

// Clear cart logic
clearBtn.addEventListener('click', () => {
    // 1. Reset the logic variables (Floats and Integers)
    itemCount = 0;
    totalPrice = 0.00;

    // 2. Update the main UI displays
    cartCountDisplay.innerText = itemCount;
    cartTotalDisplay.innerText = totalPrice.toFixed(2);
    
    // 3. Update the overlay total
    document.getElementById('overlay-total').innerText = "0.00";

    // 4. FIX: Clear the actual HTML list so old items don't stay visible
    // This removes all 'p' tags we appended earlier
    cartItemsContainer.innerHTML = ""; 

    console.log("Cart has been fully purged.");
});

const overlay = document.getElementById('cart-overlay');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeBtn = document.querySelector('.close-overlay');
const cartItemsContainer = document.getElementById('cart-items-list');

// Open Overlay
viewCartBtn.addEventListener('click', () => {
    overlay.style.display = "block";
    document.getElementById('overlay-total').innerText = totalPrice.toFixed(2);
});

// Close Overlay
closeBtn.addEventListener('click', () => {
    overlay.style.display = "none";
});

// Updated Add to Cart Logic
cartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Find the specific card this button belongs to
        const card = e.target.closest('.product-card');
        const itemName = card.querySelector('h3').innerText;
        
        // Find the select element (handling your different class names)
        const selector = card.querySelector('select');
        const selectionText = selector.options[selector.selectedIndex].text;
        
        const price = parseFloat(button.getAttribute('data-price'));

        // Logic: Add to the running total (Float calculation)
        itemCount++;
        totalPrice += price;

        // UI Update
        cartCountDisplay.innerText = itemCount;
        cartTotalDisplay.innerText = totalPrice.toFixed(2);

        // Add item string to the overlay list
        const itemEntry = document.createElement('p');
        itemEntry.innerText = `${itemName} (${selectionText}) - $${price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemEntry);

        console.log(`Added: ${itemName} [${selectionText}]`);
    });
});