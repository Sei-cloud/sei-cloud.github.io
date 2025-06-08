document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("fullCollectionModal");
    const modalMainImg = document.getElementById("modalMainImg");
    const thumbnailRow = document.querySelector(".thumbnail-row");
    const closeBtn = modal.querySelector(".close-collection");
    function scrollThumbnailIntoView(activeThumb) {
        const container = thumbnailRow;
        const containerRect = container.getBoundingClientRect();
        const thumbRect = activeThumb.getBoundingClientRect();
      
        if (thumbRect.left < containerRect.left) {
          // Scroll left to show thumbnail
          container.scrollBy({ left: thumbRect.left - containerRect.left - 10, behavior: 'smooth' });
        } else if (thumbRect.right > containerRect.right) {
          // Scroll right to show thumbnail
          container.scrollBy({ left: thumbRect.right - containerRect.right + 10, behavior: 'smooth' });
        }
      }
  
    const collections = {
      dreamweaver: [
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365452/SEDOBIBA_ROGELIO9.5_od4pay.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
        "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
      ]
    };
  
    let currentIndex = 0;
    let currentImages = [];
  
    function showImage(index) {
        if (!currentImages.length) return;
        currentIndex = (index + currentImages.length) % currentImages.length; // loop around
        modalMainImg.classList.remove("fade-in");
        void modalMainImg.offsetWidth; // trigger reflow for restart
        modalMainImg.src = currentImages[currentIndex];
        modalMainImg.classList.add("fade-in");
      
        const thumbnails = document.querySelectorAll(".thumbnail-row img");
        thumbnails.forEach((img, i) => {
          img.classList.toggle("active", i === currentIndex);
        });
      
        // Scroll active thumbnail into view
        const activeThumb = thumbnails[currentIndex];
        if (activeThumb) scrollThumbnailIntoView(activeThumb);
      }
      
  
    document.querySelectorAll(".see-full-collection-btn button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const collectionEl = btn.closest(".collection");
        const collectionId = collectionEl.dataset.collectionId;
        currentImages = collections[collectionId] || [];
        if (!currentImages.length) return;
  
        thumbnailRow.innerHTML = "";
        currentImages.forEach((src, index) => {
          const thumb = document.createElement("img");
          thumb.src = src;
          if (index === 0) thumb.classList.add("active");
          thumb.addEventListener("click", () => showImage(index));
          thumbnailRow.appendChild(thumb);
        });
  
        showImage(0);
        modal.classList.add("active");
      });
    });
  
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  
    function closeModal() {
      modal.classList.remove("active");
      modalMainImg.src = "";
      thumbnailRow.innerHTML = "";
      currentImages = [];
    }
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    
    leftArrow.addEventListener("click", () => showImage(currentIndex - 1, -1));
    rightArrow.addEventListener("click", () => showImage(currentIndex + 1, 1));
    
    // ← → arrow key navigation
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "Escape") closeModal();
    });
    
    // Touch swipe support
    let startX = 0;
    modal.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
  
    modal.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      const delta = endX - startX;
  
      if (Math.abs(delta) > 50) {
        if (delta < 0) showImage(currentIndex + 1); // swipe left
        else showImage(currentIndex - 1); // swipe right
      }
    });
  });
  