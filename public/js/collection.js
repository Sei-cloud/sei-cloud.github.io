document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("fullCollectionModal");
    const modalMainImg = document.getElementById("modalMainImg");
    const thumbnailRow = document.querySelector(".thumbnail-row");
    const closeBtn = modal.querySelector(".close-collection");

    // Image collections
    const collections = {
      dreamweaver: [
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
      ],
    };

    document.querySelectorAll(".see-full-collection-btn button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const collectionEl = btn.closest(".collection");
        if (!collectionEl) return;

        const collectionId = collectionEl.dataset.collectionId;
        const images = collections[collectionId];
        if (!images) return;

        // Clear previous
        thumbnailRow.innerHTML = "";
        modalMainImg.src = images[0];
        modalMainImg.alt = `Image 1 of ${collectionId} collection`;

        // Create thumbnails
        images.forEach((src, index) => {
          const thumb = document.createElement("img");
          thumb.src = src;
          thumb.alt = `Thumbnail ${index + 1} of ${collectionId}`;
          if (index === 0) thumb.classList.add("active");

          thumb.addEventListener("click", () => {
            modalMainImg.src = src;
            modalMainImg.alt = `Image ${index + 1} of ${collectionId} collection`;
            document.querySelectorAll(".thumbnail-row img").forEach(i => i.classList.remove("active"));
            thumb.classList.add("active");
          });

          thumbnailRow.appendChild(thumb);
        });

        modal.classList.add("active");
      });
    });

    // Close modal on click close button
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      modalMainImg.src = "";
      thumbnailRow.innerHTML = "";
    });

    // Optional: Close modal on clicking outside the image
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        modalMainImg.src = "";
        thumbnailRow.innerHTML = "";
      }
    });

    // Optional: Close modal on Esc key press
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        modal.classList.remove("active");
        modalMainImg.src = "";
        thumbnailRow.innerHTML = "";
      }
    });
  });