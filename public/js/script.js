// Select all gallery images
const images = document.querySelectorAll("[data-fullscreen]");
const viewer = document.getElementById("fullscreen-viewer");
const fullscreenImg = document.getElementById("fullscreen-img");
const closeBtn = document.querySelector(".close-btn");

// Open fullscreen image on click
images.forEach((img) => {
  img.addEventListener("click", () => {
    fullscreenImg.src =
      img.tagName === "IMG" ? img.src : img.querySelector("img").src;
    viewer.style.display = "flex";
    document.body.style.overflow = "hidden"; // Disable scrolling when image is fullscreen
  });
});

// Close fullscreen viewer
closeBtn.addEventListener("click", () => {
  viewer.style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling again
});

// Close on clicking outside the image
viewer.addEventListener("click", (e) => {
  if (e.target !== fullscreenImg) {
    viewer.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
