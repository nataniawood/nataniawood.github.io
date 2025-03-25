// ✅ Toggle Background Music
function playMusic() {
  const audio = document.getElementById("background-music");
  const playBtn = document.querySelector(".play-btn");
  if (!audio || !playBtn) return;

  if (audio.paused) {
    audio.play().catch((err) => console.log("Audio play error:", err));
    playBtn.classList.add("playing");
  } else {
    audio.pause();
    playBtn.classList.remove("playing");
  }
}

// ✅ Scroll Lock Logic
window.heroLocked = true;

function shouldLockScroll() {
  return window.heroLocked && window.scrollY < window.innerHeight;
}

function handleScrollLock(e) {
  if (shouldLockScroll()) {
    e.preventDefault();
    e.stopPropagation();
  }
}

// ✅ Adjust Hero Height (Mobile Only)
function adjustHeroHeight() {
  const hero = document.querySelector('.hero');
  if (hero) hero.style.height = `${window.innerHeight}px`;
}

// ✅ Scroll-to-Features and Unlock Scroll
function scrollToFeatures() {
  window.heroLocked = false;
  document.body.classList.remove("noscroll");
  const arrow = document.getElementById("scroll-arrow");
  const label = document.getElementById("scroll-label");
  const target = document.getElementById("features");

  arrow?.classList.add("hidden");
  label?.classList.add("hidden");

  if (window.innerWidth <= 768) {
    document.documentElement.style.scrollSnapType = "none";
    document.body.style.scrollSnapType = "none";

    setTimeout(() => {
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        document.documentElement.style.scrollSnapType = "y mandatory";
        document.body.style.scrollSnapType = "y mandatory";
      }, 600);
    }, 50);
  } else {
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ✅ Setup Video Zoom After Scroll Unlock
function setupVideoZoom() {
  let zoomTicking = false;

  function updateVideoZoom() {
    const scrollY = window.scrollY;
    const triggerPoint = window.innerHeight / 2;

    if (!window.heroLocked && scrollY > triggerPoint) {
      const progress = (scrollY - triggerPoint) / (document.body.scrollHeight - window.innerHeight - triggerPoint);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const scale = 1 + clamped * 0.5;

      document.documentElement.style.setProperty('--video-zoom', scale);
    } else {
      document.documentElement.style.setProperty('--video-zoom', 1);
    }

    zoomTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!zoomTicking) {
      zoomTicking = true;
      requestAnimationFrame(updateVideoZoom);
    }
  });
}

// ✅ Popup Forms
function showLoginForm() {
  const popup = document.getElementById('login-form-popup');
  popup.style.display = 'flex';
  document.body.classList.add('blur-active');
  if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) document.body.classList.add("noscroll");
}

function closeLoginForm() {
  const popup = document.getElementById('login-form-popup');
  popup.style.display = 'none';
  document.body.classList.remove('blur-active', 'noscroll');
}

function openContactForm() {
  const popup = document.getElementById('contact-form-popup');
  popup.style.display = 'flex';
  document.body.classList.add('blur-active');
  if (!/iPhone|iPad|iPod/.test(navigator.userAgent)) document.body.classList.add("noscroll");

  const messageInput = document.querySelector("textarea[name='message']");
  if (messageInput) setTimeout(() => messageInput.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
}

function closeContactForm() {
  const popup = document.getElementById('contact-form-popup');
  popup.style.display = 'none';
  document.body.classList.remove('blur-active', 'noscroll');
}

function submitLoginForm(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  if (username === "natania" && password === "1995") {
    window.location.href = "portfolio.html";
  } else {
    alert("Incorrect username or password!");
  }
}

function submitContactForm(e) {
  e.preventDefault();
  const form = document.getElementById("contact-form");

  emailjs.sendForm("service_9g98ue4", "template_g5n2ytd", form).then(() => {
    emailjs.sendForm("service_9g98ue4", "template_pee5gbh", form).then(() => {
      const animation = document.getElementById("success-animation");
      if (animation) {
        animation.classList.remove("hidden");
        animation.classList.add("active");
        setTimeout(() => {
          animation.classList.remove("active");
          animation.classList.add("hidden");
          closeContactForm();
        }, 2000);
      }
      form.reset();
    });
  }).catch(err => {
    console.error("Form failed:", err);
    alert("Oops! Something went wrong.");
  });
}


// ✅ Initialization
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("9erwDRBB7eGa9wAV3");

  adjustHeroHeight();
  setupVideoZoom();
  setupPopupHandlers(); // ✅ add this

  document.getElementById("scroll-arrow")?.addEventListener("click", scrollToFeatures);
  document.body.classList.add("noscroll");

  window.addEventListener('wheel', handleScrollLock, { passive: false });
  window.addEventListener('touchmove', handleScrollLock, { passive: false });
});

function setupPopupHandlers() {
  document.querySelectorAll('.contact-form-popup, .login-form-popup').forEach(popup => {
    // Close when clicking outside the inner container
    popup.addEventListener('click', (e) => {
      const container = popup.querySelector('.contact-form-container, .login-form-container');
      if (!container.contains(e.target)) {
        popup.style.display = 'none';
        document.body.classList.remove('blur-active', 'noscroll');
      }
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLoginForm();
      closeContactForm();
    }
  });
}



