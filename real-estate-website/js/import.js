const properties = JSON.parse(localStorage.getItem("properties")) || []; // Load existing properties from Local Storage

document.getElementById("import-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const propertyType = document.getElementById("property-type").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const imageUrl = document.getElementById("image-url").value;
    const imageFile = document.getElementById("image-file").files[0];

    // Create a property object
    const property = {
        type: propertyType,
        description: description,
        price: price,
        imageUrl: imageUrl || '' // Initialize with an empty string if no URL is provided
    };

    // If a file is uploaded, convert it to a base64 string
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            property.imageUrl = e.target.result; // Use the base64 string for the image
            saveProperty(property); // Call the save function after image is loaded
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveProperty(property); // Save the property if no file is uploaded
    }
});

function saveProperty(property) {
    properties.push(property);
    localStorage.setItem("properties", JSON.stringify(properties));

    // Display success message
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = "تم إضافة العقار بنجاح!";
    messageDiv.classList.remove("hidden");

    // Clear the form fields
    document.getElementById("import-form").reset();
}

function previewImage(event) {
    const imagePreview = document.getElementById("image-preview");
    const preview = document.getElementById("preview");
    
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
        imagePreview.classList.remove("hidden");
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}
