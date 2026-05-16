document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // Custom cursor
  // ------------------------------

  const cursor = document.querySelector(".custom-cursor");
  const hoverElements = document.querySelectorAll(
    "a, button, .gallery-item, .lightbox-prev, .lightbox-next, .lightbox-close"
  );

  if (cursor) {
    window.addEventListener("mousemove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");
    });

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hovering");
      });

      element.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hovering");
      });
    });
  }

  // ------------------------------
  // Active navigation by current page
  // ------------------------------

  const navLinks = document.querySelectorAll(".nav-link");
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.remove("active");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // ------------------------------
  // Work lightbox
  // ------------------------------

  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxTitle = document.querySelector(".lightbox-title");
  const lightboxDetails = document.querySelector(".lightbox-details");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxCounter = document.querySelector(".lightbox-counter");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  let currentImages = [];
  let currentImageIndex = 0;
  let currentTitle = "";

  function updateLightboxImage() {
    if (!lightboxImage || currentImages.length === 0) return;

    lightboxImage.src = currentImages[currentImageIndex];
    lightboxImage.alt = currentTitle;

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }

    if (lightboxPrev && lightboxNext) {
      if (currentImages.length === 1) {
        lightboxPrev.classList.add("is-hidden");
        lightboxNext.classList.add("is-hidden");
      } else {
        lightboxPrev.classList.remove("is-hidden");
        lightboxNext.classList.remove("is-hidden");
      }
    }
  }

  function openLightbox(item) {
    const title = item.dataset.title || "";
    const details = item.dataset.details || "";
    const fullImages = item.dataset.full || "";

    currentImages = fullImages
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);

    // If there is no full image, do not open lightbox
    if (currentImages.length === 0) return;

    currentImageIndex = 0;
    currentTitle = title;

    if (lightboxTitle) {
      lightboxTitle.textContent = title;

      if (title.toLowerCase() === "untitled") {
        lightboxTitle.classList.add("is-untitled");
      } else {
        lightboxTitle.classList.remove("is-untitled");
      }
    }

    if (lightboxDetails) {
      lightboxDetails.textContent = details;
    }

    updateLightboxImage();

    if (lightbox) {
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
    }

    if (lightboxImage) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }

    currentImages = [];
    currentImageIndex = 0;
    currentTitle = "";
  }

  function showPreviousImage() {
    if (currentImages.length <= 1) return;

    currentImageIndex =
      (currentImageIndex - 1 + currentImages.length) % currentImages.length;

    updateLightboxImage();
  }

  function showNextImage() {
    if (currentImages.length <= 1) return;

    currentImageIndex = (currentImageIndex + 1) % currentImages.length;

    updateLightboxImage();
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      openLightbox(item);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPreviousImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", showNextImage);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }
  });

  // ------------------------------
  // Hide footer on Work page when scrolling
  // ------------------------------

  const footer = document.querySelector(".footer");

  if (document.body.classList.contains("work-page") && footer) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        footer.classList.add("footer-hidden");
      } else {
        footer.classList.remove("footer-hidden");
      }
    });
  }
});

// ------------------------------
// Local visitor time
// ------------------------------

const localTime = document.querySelector("#local-time");

function updateLocalTime() {
  if (!localTime) return;

  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  localTime.textContent = `${hours}:${minutes}:${seconds}`;
}

updateLocalTime();
setInterval(updateLocalTime, 1000);

// ------------------------------
// Home media scenes
// ------------------------------

const homeMediaItems = document.querySelectorAll(".home-media");

const homeScenes = [
  [
    {
      type: "image",
      src: "images/home_1.png",
      left: "6%",
      top: "42%",
      width: "160px",
      ratio: "2 / 3"
    },
    {
      type: "video",
      src: "videos/home_4.mp4",
      left: "30%",
      top: "30%",
      width: "200px",
      ratio: "3 / 5"
    },
    {
      type: "image",
      src: "images/home_3.jpeg",
      left: "80%",
      top: "25%",
      width: "200px",
      ratio: "1 / 1"
    },
    {
      type: "video",
      src: "videos/home_3.mp4",
      left: "55%",
      top: "35%",
      width: "260px",
      ratio: "5 / 4"
    }
  ],

  [
    {
      type: "image",
      src: "images/home_2.JPG",
      left: "8%",
      top: "40%",
      width: "200px",
      ratio: "3 / 4"
    },
    {
      type: "image",
      src: "images/home_8.png",
      left: "20%",
      top: "25%",
      width: "210px",
      ratio: "1 / 1"
    },
    {
      type: "image",
      src: "images/home_7.png",
      left: "57%",
      top: "27%",
      width: "280px",
      ratio: "1 / 1.44"
    },
    {
      type: "image",
      src: "images/home_6.png",
      left: "67%",
      top: "34%",
      width: "480px",
      ratio: "4 / 3"
    }
  ],

  [
    {
      type: "image",
      src: "images/boi.jpg",
      left: "20%",
      top: "20%",
      width: "260px",
      ratio: "4 / 5"
    },
    {
      type: "video",
      src: "videos/home_5.mp4",
      left: "8%",
      top: "30%",
      width: "200px",
      ratio: "1 / 1"
    },
    {
      type: "image",
      src: "images/home_5.png",
      left: "75%",
      top: "30%",
      width: "220px",
      ratio: "3 / 4"
    },
    {
      type: "image",
      src: "images/home_9.png",
      left: "52%",
      top: "40%",
      width: "240px",
      ratio: "3 / 4"
    }
  ]
];

let homeSceneIndex = 0;

const sceneDuration = 5000;
const pauseBeforeFirstScene = 700;
const pauseBeforeNextScene = 700;
const appearStagger = 220;

// Controls the appearing order:
// 0 = media-1, 1 = media-2, 2 = media-3, 3 = media-4
const appearOrder = [0, 2, 1, 3];

function createHomeMediaElement(itemData) {
  if (itemData.type === "video") {
    return `
      <video autoplay muted loop playsinline>
        <source src="${itemData.src}" type="video/mp4">
      </video>
    `;
  }

  return `<img src="${itemData.src}" alt="">`;
}

function applyHomeScene() {
  if (homeMediaItems.length === 0) return;

  const scene = homeScenes[homeSceneIndex];

  homeMediaItems.forEach((item, index) => {
    const itemData = scene[index];

    if (!itemData) return;

    item.classList.remove("is-visible");

    item.style.left = itemData.left;
    item.style.top = itemData.top;
    item.style.width = itemData.width;
    item.style.aspectRatio = itemData.ratio;
    item.innerHTML = createHomeMediaElement(itemData);
  });

  appearOrder.forEach((itemIndex, orderIndex) => {
    const item = homeMediaItems[itemIndex];

    if (!item) return;

    setTimeout(() => {
      item.classList.add("is-visible");
    }, orderIndex * appearStagger);
  });

  homeSceneIndex = (homeSceneIndex + 1) % homeScenes.length;
}

function changeHomeScene() {
  homeMediaItems.forEach((item) => {
    item.classList.remove("is-visible");
  });

  setTimeout(() => {
    applyHomeScene();
  }, pauseBeforeNextScene);
}

if (homeMediaItems.length > 0) {
  setTimeout(() => {
    applyHomeScene();
  }, pauseBeforeFirstScene);

  setInterval(changeHomeScene, sceneDuration);
}
