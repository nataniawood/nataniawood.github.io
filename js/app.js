// ✅ Firebase & Auth Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAr_Y7ZbXCPH--Oe3j8l2Zg0RCmAkV8iBk",
  authDomain: "natania-9a7c1.firebaseapp.com",
  projectId: "natania-9a7c1",
  storageBucket: "natania-9a7c1.appspot.com",
  messagingSenderId: "1051121387245",
  appId: "1:1051121387245:web:d3bef085cee8aa29af2ee4",
  measurementId: "G-1X0QJT74QT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Scroll Lock State
window.heroLocked = true;

// ✅ Login
function submitLoginForm(e) {
  e.preventDefault();
  const email = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "portfolio.html")
    .catch(err => alert("Login failed: " + err.message));
}

function submitSignUp() {
  const email = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Sign-up successful! You can now log in."))
    .catch(err => alert("Sign-up failed: " + err.message));
}

// ✅ Contact Form Submit
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
    console.error("Contact form failed:", err);
    alert("Something went wrong. Try again.");
  });
}

// ✅ Music Toggle
function playMusic() {
  const audio = document.getElementById("background-music");
  const playBtn = document.querySelector(".play-btn");
  if (!audio || !playBtn) return;

  if (audio.paused) {
    audio.play().catch(err => console.error("Audio error:", err));
    playBtn.classList.add("playing");
  } else {
    audio.pause();
    playBtn.classList.remove("playing");
  }
}

// ✅ Prevent autoplay on refresh (iOS bug fix)
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-music");
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
});

// ✅ Scroll Lock Logic
function shouldLockScroll() {
  return window.heroLocked && window.scrollY < window.innerHeight;
}

function handleScrollLock(e) {
  if (shouldLockScroll()) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function scrollToFeatures() {
  window.heroLocked = false;
  document.body.classList.remove("noscroll");
  const target = document.getElementById("features");
  const arrow = document.getElementById("scroll-arrow");
  const label = document.getElementById("scroll-label");
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

// ✅ Scroll-Based Video Zoom
function setupVideoZoom() {
  let ticking = false;
  function updateZoom() {
    const scrollY = window.scrollY;
    const trigger = window.innerHeight / 2;
    if (!window.heroLocked && scrollY > trigger) {
      const progress = (scrollY - trigger) / (document.body.scrollHeight - window.innerHeight - trigger);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const scale = 1 + clamped * 0.5;
      document.documentElement.style.setProperty('--video-zoom', scale);
    } else {
      document.documentElement.style.setProperty('--video-zoom', 1);
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateZoom);
    }
  });
}

// ✅ Popup Logic
function showLoginForm() {
  const popup = document.getElementById('login-form-popup');
  popup?.classList.remove("hidden");
  popup.style.display = 'flex';
  document.body.classList.add('blur-active');
  document.documentElement.classList.add('blur-active');
  document.body.classList.add("noscroll");
}

function closeLoginForm() {
  const popup = document.getElementById('login-form-popup');
  popup?.classList.add("hidden");
  popup.style.display = 'none';
  document.body.classList.remove('blur-active', 'noscroll');
  document.documentElement.classList.remove('blur-active');
  if (window.scrollY >= window.innerHeight) window.heroLocked = false;
}

function openContactForm() {
  const popup = document.getElementById('contact-form-popup');
  popup?.classList.remove("hidden");
  popup.style.display = 'flex';
  document.body.classList.add('blur-active');
  document.documentElement.classList.add('blur-active');
  document.body.classList.add("noscroll");

  const msgInput = document.querySelector("textarea[name='message']");
  if (msgInput) {
    setTimeout(() => msgInput.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  }
}

function closeContactForm() {
  const popup = document.getElementById('contact-form-popup');
  popup?.classList.add("hidden");
  popup.style.display = 'none';
  document.body.classList.remove('blur-active', 'noscroll');
  document.documentElement.classList.remove('blur-active');
  if (window.scrollY >= window.innerHeight) window.heroLocked = false;
}

function setupPopupHandlers() {
  document.querySelectorAll('.contact-form-popup, .login-form-popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
      const container = popup.querySelector('.contact-form-container, .login-form-container');
      if (!container.contains(e.target)) {
        popup.style.display = 'none';
        document.body.classList.remove('blur-active', 'noscroll');
        document.documentElement.classList.remove('blur-active');
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLoginForm();
      closeContactForm();
    }
  });
}

function adjustHeroHeight() {
  const hero = document.querySelector('.hero');
  if (hero) hero.style.height = `${window.innerHeight}px`;
}

// ✅ Hard Reset State on Load
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  window.heroLocked = true;
  document.body.classList.add("noscroll");
  document.documentElement.classList.remove("blur-active");
  document.body.classList.remove("blur-active");
  document.documentElement.style.scrollSnapType = "y mandatory";
  document.body.style.scrollSnapType = "y mandatory";
});

// ✅ Init Everything
window.addEventListener("DOMContentLoaded", () => {
  emailjs.init("9erwDRBB7eGa9wAV3");

  adjustHeroHeight();
  setupVideoZoom();
  setupPopupHandlers();

  document.querySelector(".play-btn")?.addEventListener("click", playMusic);
  document.getElementById("scroll-arrow")?.addEventListener("click", scrollToFeatures);
  document.getElementById("login-btn")?.addEventListener("click", showLoginForm);
  document.getElementById("contact-btn")?.addEventListener("click", openContactForm);
  document.getElementById("login-form")?.addEventListener("submit", submitLoginForm);
  document.getElementById("contact-form")?.addEventListener("submit", submitContactForm);

  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      submitSignUp();
    });
  }

  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      closeLoginForm();
      closeContactForm();
    });
  });

  window.addEventListener("wheel", handleScrollLock, { passive: false });
  window.addEventListener("touchmove", handleScrollLock, { passive: false });
});
