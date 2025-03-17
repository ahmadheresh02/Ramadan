document.addEventListener('DOMContentLoaded', () => {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userNameElement = document.getElementById('userName');
    const logoutButton = document.getElementById('logoutButton');
  
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      updateNavbar(user.name); // Update navbar with user's name
    }
  
    // Handle Login Form Submission
    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
  
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Save user data
        updateNavbar(user.name); // Update navbar
        document.getElementById('authModal').querySelector('.btn-close').click(); // Close modal
      } else {
        alert('Invalid credentials. Please try again.');
      }
    });
  
    // Handle Registration Form Submission
    document.getElementById('registerForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const existingUser = users.find(u => u.email === email);
  
      if (existingUser) {
        alert('Email already registered.');
        return;
      }
  
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users)); // Save updated users list
  
      localStorage.setItem('user', JSON.stringify(newUser)); // Log in the new user
      updateNavbar(name); // Update navbar
      document.getElementById('authModal').querySelector('.btn-close').click(); // Close modal
    });
  
    // Handle Logout
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('user'); // Clear user data
      userNameDisplay.classList.add('d-none'); // Hide name
      logoutButton.classList.add('d-none'); // Hide logout button
      document.querySelector('.btn-outline-light.me-2').classList.remove('d-none'); // Show Sign In button
      alert('You have been logged out.');
    });
  });
  
  // Function to Update Navbar
  function updateNavbar(userName) {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userNameElement = document.getElementById('userName');
    const logoutButton = document.getElementById('logoutButton');
    const signInButton = document.querySelector('.btn-outline-light.me-2');
  
    userNameElement.textContent = userName; // Set the user's name
    userNameDisplay.classList.remove('d-none'); // Show the name
    logoutButton.classList.remove('d-none'); // Show the logout button
    signInButton.classList.add('d-none'); // Hide Sign In button
  }
  ////////////////////////////////
  document.addEventListener('DOMContentLoaded', () => {
    const storedUser = localStorage.getItem('user');
    const isLoggedIn = !!storedUser; // Check if user is logged in
  
    const postForm = document.getElementById('newPostForm');
    const postTitle = document.getElementById('postTitle');
    const postCategory = document.getElementById('postCategory');
    const postContent = document.getElementById('postContent');
    const postButton = document.getElementById('postButton');
    const getRepliesButton = document.getElementById('getRepliesButton');
    const repliesDisplay = document.getElementById('repliesDisplay');
  
    // Function to update forum features based on login state
    function updateForumFeatures() {
      if (isLoggedIn) {
        postTitle.disabled = false;
        postCategory.disabled = false;
        postContent.disabled = false;
        postButton.disabled = false;
        getRepliesButton.style.display = 'inline-block'; // Show "Get Replies" button
      } else {
        postTitle.disabled = true;
        postCategory.disabled = true;
        postContent.disabled = true;
        postButton.disabled = true;
        getRepliesButton.style.display = 'none'; // Hide "Get Replies" button
        repliesDisplay.style.display = 'none'; // Hide replies display
      }
    }
  
    // Initialize forum features
    updateForumFeatures();
  
    // Handle Post Submission
    postForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      if (!isLoggedIn) {
        showMessage('Error', 'You must be logged in to post a discussion.');
        return;
      }
  
      const title = postTitle.value.trim();
      const category = postCategory.value;
      const content = postContent.value.trim();
  
      if (!title || !category || !content) {
        showMessage('Error', 'Please fill out all fields.');
        return;
      }
  
      // Simulate saving the post to localStorage
      const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
      const newPost = {
        title,
        category,
        content,
        userId: JSON.parse(storedUser).email, // Use email as unique identifier
        replies: [], // Placeholder for replies
      };
      posts.push(newPost);
      localStorage.setItem('forumPosts', JSON.stringify(posts));
  
      // Clear the form
      postTitle.value = '';
      postCategory.value = '';
      postContent.value = '';
  
      showMessage('Success', 'Your post has been submitted successfully!');
    });
  
    // Handle Get Replies Button
    getRepliesButton.addEventListener('click', () => {
      if (!isLoggedIn) {
        showMessage('Error', 'You must be logged in to view replies.');
        return;
      }
  
      const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
      const currentUserEmail = JSON.parse(storedUser).email;
  
      // Find posts by the current user
      const userPosts = posts.filter(post => post.userId === currentUserEmail);
  
      if (userPosts.length === 0) {
        showMessage('Info', 'You have no posts yet.');
        return;
      }
  
      // Display replies
      const repliesList = document.getElementById('repliesList');
      repliesList.innerHTML = ''; // Clear previous replies
      userPosts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
          <strong>${post.title}</strong><br>
          ${post.replies.length > 0 ? post.replies.join('<br>') : 'No replies yet.'}
        `;
        repliesList.appendChild(listItem);
      });
  
      repliesDisplay.style.display = 'block'; // Show replies display
    });
  });
  
  // Function to Show Custom Message Box
  function showMessage(title, message) {
    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'), {});
    document.getElementById('messageModalTitle').textContent = title; // Set the title
    document.getElementById('messageModalBody').textContent = message; // Set the message
    messageModal.show(); // Show the modal
  }