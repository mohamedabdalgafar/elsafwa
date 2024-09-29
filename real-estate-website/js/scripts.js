let properties = []; // Array to hold property data

// Load properties from localStorage on page load
window.onload = function() {
    showWelcomeMessage();
    loadProperties();
};

// Function to show the welcome message
function showWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.style.display = 'block'; // Show the message

    setTimeout(() => {
        welcomeMessage.style.display = 'none'; // Hide after 2 seconds
    }, 2000); // 2000 milliseconds = 2 seconds
}

// Function to load properties from localStorage
function loadProperties() {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    properties = storedProperties;
    displayProperties();
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
            <button onclick="deleteProperty(${index})">حذف العقار</button>
        `;
        propertyList.appendChild(propertyItem);
    });
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
            ${property.images.map(img => `<img src="${img}" alt="Property Image" onclick="openModal('${img}')">`).join('')}
        </div>
    `;
    detailsSection.classList.remove('hidden'); // Show the details section
    const detailsContent = detailsSection.querySelector('.details-content');
    detailsContent.classList.add('show'); // Add class for fade-in
}

// Function to hide details section
function hideDetails() {
    const detailsSection = document.getElementById('details-section');
    detailsSection.classList.add('hidden');
    const detailsContent = detailsSection.querySelector('.details-content');
    detailsContent.classList.remove('show'); // Remove class for fade-out
}

// Function to open modal
function openModal(img) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = img;
    captionText.innerHTML = img;
    modal.classList.add('show'); // Add class to fade-in modal
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.classList.remove('show'); // Remove class for fade-out
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
    saveProperties(); // Save to localStorage
    displayProperties(); // Refresh property list
}

// Function to save properties to localStorage
function saveProperties() {
    localStorage.setItem('properties', JSON.stringify(properties));
}

// Function to delete a property
function deleteProperty(index) {
    properties.splice(index, 1); // Remove property from the array
    saveProperties(); // Save changes to localStorage
    displayProperties(); // Refresh property list
}

// Function to logout
function logout() {
    // Logic to handle logout
    document.getElementById('logout-button').classList.add('hidden'); // Hide logout button
}
