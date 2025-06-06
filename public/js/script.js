// Load header and footer
function loadHTML(selector, url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    });
}

loadHTML("header", "/header.html");
loadHTML("footer", "/footer.html");

// Fullscreen viewer
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-fullscreen]");
  const viewer = document.getElementById("fullscreen-viewer");
  const fullscreenImg = document.getElementById("fullscreen-img");
  const closeBtn = document.querySelector(".close-btn");

  if (!viewer || !fullscreenImg || !closeBtn) {
    console.error("Fullscreen viewer elements not found in HTML.");
    return;
  }

  // Open fullscreen image on click
  images.forEach((img) => {
    img.addEventListener("click", () => {
      fullscreenImg.src = img.src;
      viewer.style.display = "flex";
      document.body.style.overflow = "hidden"; // Disable scrolling
    });
  });

  // Close when clicking the close button
  closeBtn.addEventListener("click", () => {
    viewer.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scrolling
  });

  // Close when clicking outside the image
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      viewer.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});


const galleryImages = document.querySelectorAll('.gallery-img');
        const modal = document.getElementById('gallery-modal');
        const modalImg = document.getElementById('modal-img');
        const closeBtn = document.querySelector('.close-btn');
        const leftArrow = document.querySelector('.left-arrow');
        const rightArrow = document.querySelector('.right-arrow');
      
        let currentGroup = [];
        let currentIndex = 0;
      
        galleryImages.forEach(img => {
          img.addEventListener('click', (e) => {
            const groupName = e.target.dataset.group;
            currentGroup = Array.from(document.querySelectorAll(`.gallery-img[data-group="${groupName}"]`));
            currentIndex = currentGroup.findIndex(i => i.dataset.src === e.target.dataset.src);
            showModal(currentGroup[currentIndex].dataset.src);
          });
        });
      
        function showModal(src) {
          modal.style.display = 'flex';
          modalImg.src = src;
        }
      
        function changeImage(step) {
          currentIndex = (currentIndex + step + currentGroup.length) % currentGroup.length;
          modalImg.src = currentGroup[currentIndex].dataset.src;
        }
      
        closeBtn.onclick = () => modal.style.display = 'none';
        leftArrow.onclick = () => changeImage(-1);
        rightArrow.onclick = () => changeImage(1);
      
        document.addEventListener('keydown', (e) => {
          if (!modal.style.display.includes('flex')) return;
          if (e.key === 'Escape') modal.style.display = 'none';
          if (e.key === 'ArrowLeft') changeImage(-1);
          if (e.key === 'ArrowRight') changeImage(1);
        });