// Load header and footer
function loadHTML(selector, url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then((data) => {
      const target = document.querySelector(selector);
      if (target) {
        target.innerHTML = data;
      } else {
        console.warn(`Selector ${selector} not found in the document.`);
      }
    })
    .catch((error) => console.error(`Error loading HTML into ${selector}:`, error));
}

loadHTML("header", "/header.html");
loadHTML("footer", "/footer.html");

// Fullscreen viewer
document.addEventListener("DOMContentLoaded", () => {
  try {
    const images = document.querySelectorAll("img[data-fullscreen]");
    const viewer = document.getElementById("fullscreen-viewer");
    const fullscreenImg = document.getElementById("fullscreen-img");
    const closeBtn = document.querySelector(".close-btn");

    if (!viewer || !fullscreenImg || !closeBtn) {
      console.error("Fullscreen viewer elements not found in HTML.");
      return;
    }

    images.forEach((img) => {
      img.addEventListener("click", () => {
        fullscreenImg.src = img.src;
        viewer.style.display = "flex";
        document.body.style.overflow = "hidden"; // Disable scrolling
      });
    });

    closeBtn.addEventListener("click", () => {
      viewer.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scrolling
    });

    viewer.addEventListener("click", (e) => {
      if (e.target === viewer) {
        viewer.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  } catch (error) {
    console.error("Error in fullscreen viewer setup:", error);
  }
});

// Modal for lookbook
try {
  const galleryImages = document.querySelectorAll(".gallery-img");
  const modal = document.getElementById("gallery-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".close-btn");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (!modal || !modalImg || !closeBtn || !leftArrow || !rightArrow) {
    throw new Error("Modal elements are missing in the HTML.");
  }

  let currentGroup = [];
  let currentIndex = 0;

  galleryImages.forEach((img) => {
    img.addEventListener("click", (e) => {
      const groupName = e.target.dataset.group;
      currentGroup = Array.from(
        document.querySelectorAll(`.gallery-img[data-group="${groupName}"]`)
      );
      currentIndex = currentGroup.findIndex(
        (i) => i.dataset.src === e.target.dataset.src
      );
      if (currentIndex !== -1) {
        showModal(currentGroup[currentIndex].dataset.src);
      } else {
        console.warn("Clicked image not found in current group.");
      }
    });
  });

  function showModal(src) {
    modal.style.display = "flex";
    modalImg.src = src;
  }

  function changeImage(step) {
    if (!currentGroup.length) return;
    currentIndex = (currentIndex + step + currentGroup.length) % currentGroup.length;
    modalImg.src = currentGroup[currentIndex].dataset.src;
  }

  closeBtn.onclick = () => (modal.style.display = "none");

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  leftArrow.onclick = () => changeImage(-1);
  rightArrow.onclick = () => changeImage(1);

  document.addEventListener("keydown", (e) => {
    if (!modal || modal.style.display !== "flex") return;
    if (e.key === "Escape") modal.style.display = "none";
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
  });
} catch (error) {
  console.error("Error in gallery modal setup:", error);
}
