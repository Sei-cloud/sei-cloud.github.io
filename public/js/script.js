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
