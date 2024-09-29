let properties = []; // Array to hold property data

// Load properties from localStorage on page load
window.onload = function() {
    loadProperties();
    showWelcomeMessage();
    checkLoginStatus(); // Check login status on load
};

// Function to load properties from localStorage
function loadProperties() {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    properties = storedProperties;
    displayProperties();
    checkUserRole(); // Check user role to show/hide add property section
}

// Function to display properties on the page
function displayProperties() {
    const propertyList = document.getElementById('property-list');
    propertyList.innerHTML = ''; // Clear previous listings

    properties.forEach((property, index) => {
        const propertyItem = document.createElement('div');
        propertyItem.innerHTML = `
            <h3>${property.type}</h3>
            <p>${property.description}</p>
            <p>سعر: ${property.price}</p>
            <button onclick="showDetails(${index})">عرض التفاصيل</button>
            ${localStorage.getItem('userRole') === 'admin' ? `<button onclick="deleteProperty(${index})">حذف العقار</button>` : ''}
        `;
        propertyList.appendChild(propertyItem);
    });
}

// Function to check user role to show/hide the add property section
function checkUserRole() {
    const userRole = localStorage.getItem('userRole');
    const addPropertySection = document.getElementById('add-property');
    
    if (userRole === 'admin') {
        addPropertySection.classList.remove('hidden'); // Show add property section for admin
    } else {
        addPropertySection.classList.add('hidden'); // Hide add property section for users
    }
}

// Function to show property details
function showDetails(index) {
    const property = properties[index];
    const detailsSection = document.getElementById('details-section');
    const details = document.getElementById('details');
    
    details.innerHTML = `
        <h3>${property.type}</h3>
        <p>${property.description}</p>
        <p>سعر: ${property.price}</p>
        <div class="image-gallery">
            ${property.images.map(img => `<img src="${img}" alt="Property Image" onclick="openModal(this.src)">`).join('')}
        </div>
    `;
    detailsSection.classList.remove('hidden'); // Show the details section
}

// Function to hide details section
function hideDetails() {
    const detailsSection = document.getElementById('details-section');
    detailsSection.classList.add('hidden');
}

// Function to add a new property
function addProperty() {
    const newProperty = {
        type: document.getElementById('new-property-type').value,
        description: document.getElementById('new-property-description').value,
        price: document.getElementById('new-property-price').value,
        images: Array.from(document.getElementById('new-image-input').files).map(file => URL.createObjectURL(file))
    };

    properties.push(newProperty); // Add new property to the array
    saveProperties(); // Save properties to localStorage
    loadProperties(); // Reload listings

    // Clear input fields
    document.getElementById('new-property-type').value = ''; // Clear the dropdown
    document.getElementById('new-property-description').value = '';
    document.getElementById('new-property-price').value = '';
    document.getElementById('new-image-input').value = '';
}

// Function to save properties to localStorage
function saveProperties() {
    localStorage.setItem('properties', JSON.stringify(properties));
}

// Function to delete a property
function deleteProperty(index) {
    properties.splice(index, 1); // Remove property from array
    saveProperties(); // Update localStorage
    loadProperties(); // Reload listings
}

// Function to open modal for image
function openModal(src) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = src;
    captionText.innerHTML = ""; // Optional caption
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Function to show welcome message
function showWelcomeMessage() {
    const message = document.getElementById('welcome-message');
    message.classList.remove('hidden');
    setTimeout(() => {
        message.classList.add('hidden');
    }, 3000); // Hide after 3 seconds
}

// Function to check login status and update UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const logoutButton = document.getElementById('logout-button');
    const loginButton = document.getElementById('login-button');

    if (isLoggedIn === 'true') {
        logoutButton.classList.remove('hidden'); // Show logout button
        loginButton.classList.add('hidden'); // Hide login button
    } else {
        logoutButton.classList.add('hidden'); // Hide logout button
        loginButton.classList.remove('hidden'); // Show login button
    }
}

// Function to log out
function logout() {
    localStorage.removeItem('isLoggedIn'); // Remove login status
    localStorage.removeItem('userRole'); // Remove user role
    location.reload(); // Reload the page to update UI
}
