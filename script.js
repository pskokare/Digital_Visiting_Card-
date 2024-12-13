

document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');
    const signUpLink = document.querySelector('.signUp-link');
    const signInLink = document.querySelector('.signIn-link');
    const digitalCard = document.getElementById('digital-card');
    const companyLogoInput = document.getElementById('company-logo');
    const cardServices = document.getElementById('card-services');
    const cardProduct = document.getElementById('card-product');
    const uploadButton = document.getElementById('upload-button');
    const logoNameDisplay = document.getElementById('logo-name-display');

    // Function to show registration form
    function showSignUpForm() {
        wrapper.classList.add('animate-signIn');
        wrapper.classList.remove('animate-signUp');
        digitalCard.style.display = 'none'; // Hide digital card
    }

    // Function to show login form
    function showSignInForm() {
        wrapper.classList.add('animate-signUp');
        wrapper.classList.remove('animate-signIn');
        digitalCard.style.display = 'none'; // Hide digital card
    }

    // Handle registration form submission
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const userData = {
            name: document.getElementById('name').value,
            position: document.getElementById('position').value,
            contact: document.getElementById('contact').value,
            personalEmail: document.getElementById('personal-email').value,
            businessEmail: document.getElementById('business-email').value,
            password: document.getElementById('password').value,
            services: document.getElementById('services').value,
            product: document.getElementById('product').value,
            address: document.getElementById('address').value,
            companyLogo: localStorage.getItem('companyLogo')
        };

        localStorage.setItem('user', JSON.stringify(userData));

        // Generate QR code
        const qrCodeData = `
            Name: ${userData.name}
            Position: ${userData.position}
            Contact: ${userData.contact}
            Personal Email: ${userData.personalEmail}
            Business Email: ${userData.businessEmail}
            Services: ${userData.services}
            Product: ${userData.product}
            Address: ${userData.address}`;
        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: qrCodeData,
            width: 80,
            height: 60,
        });

        // Optionally reset the form fields
        document.getElementById('register-form').reset();

        // Show the login form after registration
        showSignInForm();
    });

    // Switch between Sign Up and Sign In forms
    signUpLink.addEventListener('click', showSignUpForm);
    signInLink.addEventListener('click', showSignInForm);

    // Handle file upload and display file name
    uploadButton.addEventListener('click', () => {
        companyLogoInput.click();
    });

    companyLogoInput.addEventListener('change', function() {
        const file = companyLogoInput.files[0];
        if (file) {
            logoNameDisplay.textContent = file.name;

            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('companyLogo', e.target.result);
            }
            reader.readAsDataURL(file);
        } else {
            logoNameDisplay.textContent = '';
            localStorage.removeItem('companyLogo');
        }
    });

    // Handle login form submission
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const storedUserData = JSON.parse(localStorage.getItem('user'));
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (storedUserData && storedUserData.personalEmail === email && storedUserData.password === password) {
            // Display digital card after successful login
            digitalCard.style.display = 'block';
            wrapper.classList.remove('animate-signIn');
            wrapper.classList.remove('animate-signUp');

            // Update card details
            document.getElementById('card-name').innerText = storedUserData.name;
            document.getElementById('card-position').innerText = storedUserData.position;
            document.getElementById('contact-number').innerHTML = `<a href="tel:${storedUserData.contact}"><img src="contacts.png" class="icon" style="height: 20px; width: 20px;"> ${storedUserData.contact}</a>`;
            document.getElementById('email-address').innerHTML = `<a href="mailto:${storedUserData.personalEmail}"><img src="gmail.png" class="icon" style="height: 20px; width: 20px;"> ${storedUserData.personalEmail}</a>`;
            cardServices.innerText = storedUserData.services;
            cardProduct.innerText = storedUserData.product;
            document.querySelector('.company-logo').src = storedUserData.companyLogo;
            
            const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storedUserData.address)}`;
            document.getElementById('address-details').innerHTML = `<a href="${mapLink}" target="_blank">${storedUserData.address}</a>`; // Update address

            // Hide the login forms after successful login
            document.querySelector('.form-wrapper.sign-in').style.display = 'none';
            document.querySelector('.form-wrapper.sign-up').style.display = 'none';
        } else {
            alert('Invalid email or password');
        }
    });

    // Initially show the sign-in form
    showSignInForm();
});









