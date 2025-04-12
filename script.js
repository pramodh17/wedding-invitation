const container = document.getElementById('intro-container');
const card = document.getElementById('intro-card');
//const audio = document.getElementById('background-music');
const muteButton = document.getElementById('mute-button');
const volumeIcon = document.getElementById('volume-icon');
const engagementImg = document.getElementById('engagement-img');
const popup = document.getElementById('image-popup');
const popupImg = document.getElementById('popup-img');
const popup1 = document.getElementById('image-popup1');
const popupImg1 = document.getElementById('popup-img1');
const engagementImg1 = document.getElementById('engagement-img1');
const placeholder = document.getElementById('video-placeholder');
const engagementVideo = document.getElementById('engagement-video');
const audioFiles = ['ranjhana.mp3']; // your two files
const randomTrack = audioFiles[Math.floor(Math.random() * audioFiles.length)];
const audio = document.getElementById('background-music');
document.getElementById('audio-source').src = randomTrack;
audio.load();

placeholder.addEventListener('click', () => {
  placeholder.style.display = 'none';
  engagementVideo.style.display = 'block';
  engagementVideo.play();
  // Pause background music
  if (!audio.paused) audio.pause();

  // Resume after video ends
  engagementVideo.addEventListener('ended', () => {
    audio.play();
  });
});
// Array of image URLs
const imageUrls = [
  "1.JPG", // Image 1
  "2.JPG", // Image 2
  "3.JPG", // Image 3
  "4.JPG", // Image 4
  "5.JPG", // Image 5
  "6.JPG", // Image 6	
];

// Counter to track which image to display
let currentImageIndex = 0;

// Function to update the image in the popup
function updateImage() {
  popupImg1.src = imageUrls[currentImageIndex];
}

// Event listener to display the image popup when clicking on the Engagement image
engagementImg1.addEventListener('click', () => {
  // Show the popup and update the image
  popup1.style.display = 'flex';
  updateImage();  // Display the first image
});

document.getElementById('left-arrow').addEventListener('click', (event) => {
  event.stopPropagation(); // ✅ Prevents the click from closing the popup
  currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
  updateImage();
});

document.getElementById('right-arrow').addEventListener('click', (event) => {
  event.stopPropagation(); // ✅ Prevents the click from closing the popup
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
  updateImage();
});


// Close the popup when clicking anywhere outside the image
window.addEventListener('click', (event) => {
  if (event.target === popup1 || event.target === popupImg1) {
    popup1.style.display = 'none'; // Hide the popup if clicking outside the image
  }
});

  // Event listener to display the image popup when clicking on the Engagement image
  engagementImg.addEventListener('click', () => {
    // Replace the source with your actual image URL
    popupImg.src = "Ghibli_image.png"; // Replace with your image URL
    popup.style.display = 'flex'; // Show the popup
  });


  // Close the popup when clicking anywhere outside the image
  window.addEventListener('click', (event) => {
    if (event.target === popup || event.target === popupImg) {
      popup.style.display = 'none'; // Hide the popup if clicking outside the image
    }
  });
  // Mute/Unmute Button Logic
  muteButton.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      volumeIcon.classList.remove('fa-volume-mute');
      volumeIcon.classList.add('fa-volume-up');
    } else {
      audio.muted = true;
      volumeIcon.classList.remove('fa-volume-up');
      volumeIcon.classList.add('fa-volume-mute');
    }
  });

card.addEventListener('click', () => {
  // Play background music
  audio.play();

  // Fade out intro container
  container.style.opacity = '0';

  // Hide after fade transition completes
      setTimeout(() => {
        container.style.display = 'none';
        home.style.display = 'block';

        // Trigger fade-in for home
        requestAnimationFrame(() => {
          home.style.opacity = '1';
        });
      }, 1000); // Match this to your transition duration
    });


  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      audio.pause();
    } else {
      audio.play();
    }
  });

  // Particle.js for the firework/particle background
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 80 },
      "color": { "value": "#ff6f91" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.7 },
      "size": { "value": 4 },
      "line_linked": { "enable": true, "distance": 150, "color": "#ffa5ab", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 3 }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "repulse" },
        "onclick": { "enable": true, "mode": "push" }
      }
    },
    "retina_detect": true
  });

  // Audio Loop Logic (play the music twice, max)
  let playCount = 0;
  const maxPlays = 3; // 1 initial play + 1 loop = 2 total plays

  audio.addEventListener('ended', () => {
    playCount++;
    if (playCount < maxPlays) {
      audio.currentTime = 0; // Reset audio to the start
      audio.play();
    } else {
      audio.pause(); // Stop audio after the max plays
    }
  });