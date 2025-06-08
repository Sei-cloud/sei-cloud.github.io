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
      container.scrollBy({
        left: thumbRect.left - containerRect.left - 10,
        behavior: "smooth",
      });
    } else if (thumbRect.right > containerRect.right) {
      // Scroll right to show thumbnail
      container.scrollBy({
        left: thumbRect.right - containerRect.right + 10,
        behavior: "smooth",
      });
    }
  }

  const collections = {
    dreamweaver: [
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365438/4.0_hazqzg.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365437/3.0_rft3oy.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365436/2.0_sk8wq3.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365436/1.0_uuoy1k.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/8.0_phoqkr.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365440/7.0_ucuiix.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749365439/5.0_k3cp3t.jpg",
    ],

    SaintsAndShadows: [
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367734/SteiningerC_SedoPortfolio-Web-5_eo3efm.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367735/SteiningerC_SedoPortfolio-Web-6_nd5ga8.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367733/SteiningerC_SedoPortfolio-Web-4_lcqo6s.jpg",

      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367737/SteiningerC_SedoPortfolio-Web-8_tvnllt.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367736/SteiningerC_SedoPortfolio-Web-7_ozuasa.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367738/SteiningerC_SedoPortfolio-Web-9_xihs3z.jpg",

      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367740/SteiningerC_SedoPortfolio-Web-11_j8ebcc.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367739/SteiningerC_SedoPortfolio-Web-10_ivwvmc.jpg",

      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367741/SteiningerC_SedoPortfolio-Web-13_po5z17.jpg",

      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367732/SteiningerC_SedoPortfolio-Web-3_twpcs4.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367731/SteiningerC_SedoPortfolio-Web-2_a7y6am.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749367730/SteiningerC_SedoPortfolio-Web-1_apaj4f.jpg",
    ],

    myrtleBroadway: [
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370661/compressed-66360014_mogcbl.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370672/compressed-66360018_jicrih.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370663/compressed-66360019_eziksv.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370671/compressed-66360016_egoxnx.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370658/compressed-66360013_pvtibs.jpg",

      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370674/compressed-66360009_fbc12x.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370675/compressed-66360003_efpdnm.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370670/compressed-66360011_c4ykwl.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370660/compressed-66360008_qzx9oh.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370659/compressed-66360012_prrn1c.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370666/compressed-66360010_apxdic.jpg",

      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370668/compressed-66360034_z6ndb9.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370669/compressed-66360035_sryqou.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370664/compressed-66360033_efifrc.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370666/compressed-66360032_ji9oef.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370681/compressed-66360025_h9xf3m.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370680/compressed-66360023_m0hpjz.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370678/compressed-66360030_exc6qa.jpg",
      "https://res.cloudinary.com/dpo4wcevn/image/upload/v1749370681/compressed-66360022_gihvvr.jpg",
    ],
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

  document
    .querySelectorAll(".see-full-collection-btn button")
    .forEach((btn) => {
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
