// Toggle Background Music Play/Pause
function playMusic() {
    var audio = document.getElementById("background-music");
    var playBtn = document.querySelector(".play-btn");

    // Check if audio is paused or playing
    if (audio.paused) {
        audio.play();  // Play the audio
        playBtn.classList.add("playing");  // Show the pause icon
    } else {
        audio.pause();  // Pause the audio
        playBtn.classList.remove("playing");  // Show the play icon
    }
}

// Display Login Form Popup
function showLoginForm() {
    document.getElementById('login-form-popup').style.display = 'flex';  // Show the login form popup
}

// Close Login Form Popup
function closeLoginForm() {
    document.getElementById('login-form-popup').style.display = 'none';  // Hide the login form popup
}

// Handle Login Form Submission
function submitLoginForm(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    // Get form data
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    // Validate username and password
    if (username === "natania" && password === "1995") {
        window.location.href = "twitter-app.html";  // Redirect to another page
    } else {
        alert("Incorrect username or password!");  // Show error message
    }
}



// Open Contact Form Popup
function openContactForm() {
    // Show the contact form by changing its display property to flex (centered)
    document.getElementById('contact-form-popup').style.display = 'flex';
}

// Close Contact Form Popup
function closeContactForm() {
    // Hide the contact form by setting display to none
    document.getElementById('contact-form-popup').style.display = 'none';
}

// Handle Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();  // Prevent the default form submission behavior to keep the popup open

    // Get form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Display a thank you message and close the form
    alert("Thank you for reaching out, " + name + "! We have received your message and will get back to you soon.");

    // You can also process the data or send it to a server here if needed

    // Close the contact form after submission
    closeContactForm();
}





document.getElementById("post-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();  // Prevent the default Enter action (like submitting the form)
        postMessage();           // Trigger the post function
    }
});

// Function to post a new message
function postMessage() {
    const postContent = document.getElementById("post-input").value.trim();
    const username = document.getElementById("username").value.trim();
    const photoUpload = document.getElementById("photo-upload");
    const imagePreviewContainer = document.getElementById("image-preview-container");

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Format to "MM/DD/YYYY, HH:MM AM/PM"

    if (postContent && username) {
        // Create the new post element
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Create the post header with the username and timestamp
        const postHeader = document.createElement("div");
        postHeader.classList.add("post-header");

        const postUsername = document.createElement("span");
        postUsername.classList.add("post-username");
        postUsername.textContent = username;

        const postTime = document.createElement("span");
        postTime.classList.add("post-time");
        postTime.textContent = formattedDate;

        postHeader.append(postUsername, postTime);

        // Create the post content (text the user entered)
        const postText = document.createElement("p");
        postText.classList.add("post-text");
        postText.textContent = postContent;

        // If there's an image, add it to the post
        if (imagePreviewContainer.children.length > 0) {
            const image = imagePreviewContainer.querySelector('img');
            const imageElement = document.createElement('img');
            imageElement.src = image.src;
            imageElement.classList.add('post-image');
            postElement.appendChild(imageElement);
        }

        // Append the header and text to the post element
        postElement.append(postHeader, postText);

        // Add the post to the top of the posts container
        document.getElementById("posts-container").prepend(postElement);

        // Save the post to localStorage
        savePosts();

        // Clear the input fields
        document.getElementById("post-input").value = "";
        document.getElementById("username").value = "";
        document.getElementById("image-preview-container").innerHTML = ""; // Clear image preview
        photoUpload.value = ''; // Reset the file input
    } else {
        alert("Please fill in both username and post content.");
    }
}

// Function to save posts to localStorage
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

    localStorage.setItem("posts", JSON.stringify(postsArray)); // Save posts as JSON in localStorage
}

// Function to load posts from localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts"));
    if (posts) {
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            // Create post header with username and timestamp
            const postHeader = document.createElement("div");
            postHeader.classList.add("post-header");

            const postUsername = document.createElement("span");
            postUsername.classList.add("post-username");
            postUsername.textContent = post.username;

            const postTime = document.createElement("span");
            postTime.classList.add("post-time");
            postTime.textContent = post.time;

            postHeader.append(postUsername, postTime);

            // Create post content
            const postText = document.createElement("p");
            postText.classList.add("post-text");
            postText.textContent = post.content;

            // If there's an image, include it
            if (post.image) {
                const postImage = document.createElement("img");
                postImage.classList.add('post-image');
                postImage.src = post.image;
                postElement.appendChild(postImage);
            }

            // Append header and text to the post element
            postElement.append(postHeader, postText);

            // Add the post to the top of the posts container
            document.getElementById("posts-container").prepend(postElement);
        });
    }
}

// Load posts when the page loads
window.onload = loadPosts;

// Listen for file input changes
document.getElementById('photo-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('image-preview');
            document.getElementById('image-preview-container').innerHTML = ''; // Clear previous preview
            document.getElementById('image-preview-container').appendChild(img); // Append image preview
        };
        reader.readAsDataURL(file);
    }
});

// JavaScript for handling image preview and posting functionality

// Get references to elements
const photoUploadInput = document.getElementById('photo-upload');
const imagePreviewContainer = document.getElementById('image-preview-container');
const imagePreview = document.getElementById('image-preview');
const postButton = document.getElementById('post-button');
const usernameInput = document.getElementById('username');
const postInput = document.getElementById('post-input');
const postsContainer = document.getElementById('posts-container');

// Handle file input (image upload)
photoUploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Show the image preview
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Handle post button click
postButton.addEventListener('click', function() {
    const username = usernameInput.value.trim();
    const postText = postInput.value.trim();

    if (username === "" || postText === "") {
        alert("Please fill in both your name and the post content.");
        return;
    }

    // Create a new post element
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    // Add username and post text
    postElement.innerHTML = `
        <div class="post-header">
            <span class="post-username">${username}</span>
        </div>
        <div class="post-text">${postText}</div>
    `;

    // Check if there's an image to add to the post
    if (imagePreview.src) {
        const imageElement = document.createElement('img');
        imageElement.src = imagePreview.src;
        imageElement.classList.add('image-preview');
        postElement.appendChild(imageElement);
    }

    // Add the new post to the posts container
    postsContainer.prepend(postElement);

    // Reset form and preview
    usernameInput.value = '';
    postInput.value = '';
    imagePreviewContainer.style.display = 'none';
    imagePreview.src = ''; // Reset image preview
});

