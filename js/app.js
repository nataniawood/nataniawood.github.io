// Toggle Background Music Play/Pause
function playMusic() {
    const audio = document.getElementById("background-music");
    const playBtn = document.querySelector(".play-btn");

    if (!audio || !playBtn) return;

    if (audio.paused) {
        audio.play().catch((error) => {
            console.log("User interaction required before playing audio:", error);
        });
        playBtn.classList.add("playing");
    } else {
        audio.pause();
        playBtn.classList.remove("playing");
    }
}


// Lock scrolling only if we're at the top of the page
function shouldLockScroll() {
  return heroLocked && window.scrollY < window.innerHeight;
}

(function() {
    emailjs.init("9erwDRBB7eGa9wAV3"); // Your public key
  })();

let heroLocked = true;

document.addEventListener("DOMContentLoaded", () => {
  // HERO VIDEO fallback
  const video = document.getElementById("hero-video");
  if (video) {
    video.muted = true;
    video.play().catch(() => {
      console.log("Autoplay is blocked, showing fallback.");
      video.style.backgroundImage = "url('fallback-image.jpg')";
    });
  }

  // Scroll arrow and label
  const arrow = document.getElementById("scroll-arrow");
  const label = document.getElementById("scroll-label");

  if (arrow) {
    arrow.addEventListener("click", () => {
      heroLocked = false;
      document.getElementById('features').scrollIntoView({ behavior: 'smooth' });

      arrow.classList.add("hidden");
      if (label) {
        label.classList.add("hidden");
      }
    });
  }

  // ✅ Unified scroll-lock handler
function handleScrollLock(e) {
  if (heroLocked && window.scrollY < window.innerHeight) {
    e.preventDefault();
    e.stopPropagation();
  }
}

if (window.innerWidth <= 768) {
  window.addEventListener('touchmove', handleScrollLock, { passive: false });
}
window.addEventListener('wheel', handleScrollLock, { passive: false }); // always for desktop

function adjustHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.height = `${window.innerHeight}px`;
    }
  }

  // Only apply on mobile
  if (window.innerWidth <= 768) {
    window.addEventListener('DOMContentLoaded', adjustHeroHeight);
    window.addEventListener('resize', adjustHeroHeight);
  }
  

  // Scroll-based video zoom
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const triggerPoint = window.innerHeight / 2;

    if (scrollY > triggerPoint) {
      const progress = (scrollY - triggerPoint) / (document.body.scrollHeight - window.innerHeight - triggerPoint);
      const clamped = Math.min(Math.max(progress, 0), 1);
      const scale = 1 + clamped * 0.5;
      document.documentElement.style.setProperty('--video-zoom', scale);
    } else {
      document.documentElement.style.setProperty('--video-zoom', 1);
    }
  });


    // Scroll-to helper
    window.scrollToSection = function (id) {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };




    // POST SYSTEM & INTERACTIONS
    const postInput = document.getElementById("post-input");
    if (postInput) {
        postInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                postMessage();
            }
        });
    }

    const photoUploadInput = document.getElementById('photo-upload');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const postButton = document.getElementById('post-button');
    const usernameInput = document.getElementById('username');
    const postsContainer = document.getElementById('posts-container');

    if (photoUploadInput) {
        photoUploadInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    if (imagePreview) {
                        imagePreview.src = event.target.result;
                        imagePreviewContainer.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (postButton) {
        postButton.addEventListener('click', function () {
            const username = usernameInput.value.trim();
            const postText = postInput.value.trim();

            if (username === "" || postText === "") {
                alert("Please fill in both your name and the post content.");
                return;
            }

            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-username">${username}</span>
                </div>
                <div class="post-text">${postText}</div>
            `;

            if (imagePreview && imagePreview.src) {
                const imageElement = document.createElement('img');
                imageElement.src = imagePreview.src;
                imageElement.classList.add('image-preview');
                postElement.appendChild(imageElement);
            }

            postsContainer.prepend(postElement);

            usernameInput.value = '';
            postInput.value = '';
            imagePreviewContainer.style.display = 'none';
            if (imagePreview) imagePreview.src = '';
        });
    }

    const scrollBackground = document.getElementById("scroll-background");
    if (scrollBackground && window.innerWidth <= 768) {
        scrollBackground.style.animation = "none";
        scrollBackground.style.backgroundAttachment = "scroll";
    }

    loadPosts();
});

// ==============================
// Popup Forms
// ==============================
function showLoginForm() {
  const loginPopup = document.getElementById('login-form-popup');
  if (loginPopup) {
    loginPopup.style.display = 'flex';
    document.body.classList.add('blur-active');
    document.body.classList.add("noscroll");

  }
}

function closeLoginForm() {
  const loginPopup = document.getElementById('login-form-popup');
  if (loginPopup) loginPopup.style.display = 'none';
  document.body.classList.remove('blur-active');
  document.body.classList.remove("noscroll");

}
function submitLoginForm(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === "natania" && password === "1995") {
        window.location.href = "twitter-app.html";
    } else {
        alert("Incorrect username or password!");
    }
}

function openContactForm() {
  const contactPopup = document.getElementById('contact-form-popup');
  if (contactPopup) {
    contactPopup.style.display = 'flex';
    document.body.classList.add('blur-active', 'noscroll');
  }
}

function closeContactForm() {
  const contactPopup = document.getElementById('contact-form-popup');
  if (contactPopup) contactPopup.style.display = 'none';
  document.body.classList.remove('blur-active', 'noscroll');
}

function submitContactForm(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");

  // Send email to YOU
  emailjs.sendForm("service_9g98ue4", "template_g5n2ytd", form)
    .then(() => {
      // Then send auto-reply to the user
      emailjs.sendForm("service_9g98ue4", "template_pee5gbh", form)
        .then(() => {
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
        }, (error) => {
          console.error("Auto-reply failed:", error);
        });
    }, (error) => {
      console.error("Form submission failed:", error);
      alert("Oops! Something went wrong.");
    });
}


// ✅ Setup on page load
document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("9erwDRBB7eGa9wAV3");

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", submitContactForm);
  }
});


// ==============================
// Post + LocalStorage Logic
// ==============================
function postMessage() {
    const postContent = document.getElementById("post-input").value.trim();
    const username = document.getElementById("username").value.trim();
    const photoUpload = document.getElementById("photo-upload");
    const imagePreviewContainer = document.getElementById("image-preview-container");

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    if (postContent && username) {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");

        const postUsername = document.createElement("span");
        postUsername.classList.add("post-username");
        postUsername.textContent = username;

        const postTime = document.createElement("span");
        postTime.classList.add("post-time");
        postTime.textContent = formattedDate;

        postHeader.append(postUsername, postTime);

        const postText = document.createElement("p");
        postText.classList.add("post-text");
        postText.textContent = postContent;

        if (imagePreviewContainer.children.length > 0) {
            const image = imagePreviewContainer.querySelector('img');
            const imageElement = document.createElement('img');
            imageElement.src = image.src;
            imageElement.classList.add('post-image');
            postElement.appendChild(imageElement);
        }

        postElement.append(postHeader, postText);
        document.getElementById("posts-container").prepend(postElement);
        savePosts();

        document.getElementById("post-input").value = "";
        document.getElementById("username").value = "";
        document.getElementById("image-preview-container").innerHTML = "";
        photoUpload.value = '';
    } else {
        alert("Please fill in both username and post content.");
    }
}

function savePosts() {
    const posts = document.querySelectorAll(".post");
    const postsArray = Array.from(posts).map(post => {
        return {
            content: post.querySelector(".post-text").textContent,
            username: post.querySelector(".post-username").textContent,
            time: post.querySelector(".post-time").textContent,
            image: post.querySelector('.post-image') ? post.querySelector('.post-image').src : ''
        };
    });

    localStorage.setItem("posts", JSON.stringify(postsArray));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts"));
    if (posts) {
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            const postHeader = document.createElement("div");
            postHeader.classList.add("post-header");

            const postUsername = document.createElement("span");
            postUsername.classList.add("post-username");
            postUsername.textContent = post.username;

            const postTime = document.createElement("span");
            postTime.classList.add("post-time");
            postTime.textContent = post.time;

            postHeader.append(postUsername, postTime);

            const postText = document.createElement("p");
            postText.classList.add("post-text");
            postText.textContent = post.content;

            if (post.image) {
                const postImage = document.createElement("img");
                postImage.classList.add('post-image');
                postImage.src = post.image;
                postElement.appendChild(postImage);
            }

            postElement.append(postHeader, postText);
            document.getElementById("posts-container").prepend(postElement);
        });
    }
}
