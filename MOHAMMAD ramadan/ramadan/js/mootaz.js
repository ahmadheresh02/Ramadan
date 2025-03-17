document.addEventListener('DOMContentLoaded', function() {
    function validateForm(formId, fields, callback) {
      const form = document.getElementById(formId);
      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          let valid = true;
          
          fields.forEach(field => {
            const input = document.getElementById(field);
            if (!input || !input.value.trim()) {
              valid = false;
            }
          });
          
          if (valid) {
            callback();
          } else {
            alert('Please fill in all fields');
          }
        });
      }
    }
  
    // Login Form Validation
    validateForm('loginForm', ['loginEmail', 'loginPassword'], function() {
      alert('Login successful! (This is a demo)');
    });
  
    // Register Form Validation
    validateForm('registerForm', ['registerName', 'registerEmail', 'registerPassword', 'registerConfirmPassword'], function() {
      const password = document.getElementById('registerPassword').value;
      const confirmPassword = document.getElementById('registerConfirmPassword').value;
      const termsAgree = document.getElementById('termsAgree').checked;
  
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (!termsAgree) {
        alert('Please agree to the Terms & Conditions');
        return;
      }
      alert('Registration successful! (This is a demo)');
    });
  
    // Donation Form Validation
    validateForm('donationForm', ['donationAmount'], function() {
      const amount = document.getElementById('donationAmount').value;
      if (amount <= 0) {
        alert('Please enter a valid donation amount');
        return;
      }
      alert('Thank you for your generous donation! (This is a demo)');
    });
  
    // Contact Form Validation
    validateForm('contactForm', ['contactName', 'contactEmail', 'contactSubject', 'contactMessage'], function() {
      alert('Your message has been sent! We will get back to you soon. (This is a demo)');
    });
  
    // Volunteer Form Validation
    validateForm('volunteerForm', ['volunteerName', 'volunteerEmail', 'volunteerPhone'], function() {
      alert('Thank you for your interest in volunteering! We will contact you soon. (This is a demo)');
      const volunteerModal = bootstrap.Modal.getInstance(document.getElementById('volunteerModal'));
      if (volunteerModal) volunteerModal.hide();
    });
  
    // New Post Form Validation
    validateForm('newPostForm', ['postTitle', 'postContent'], function() {
      alert('Your post has been published! (This is a demo)');
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  
    // Activate Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
    window.addEventListener('scroll', function() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
  
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  });
  