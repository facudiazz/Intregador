document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('survey-form');
    const nameInput = document.getElementById('name');
    const priceInput = document.getElementById('price');
    const descriptionInput = document.getElementById('description');
    
    const nameError = document.getElementById('name-error');
    const priceError = document.getElementById('price-error');
    const descriptionError = document.getElementById('description-error');
    
    form.addEventListener('submit', function(event) {
        clearErrors();
        let valid = true;

        if (!validateName(nameInput.value)) {
            valid = false;
            displayError(nameInput, nameError, 'El nombre debe tener al menos 3 caracteres.');
        }

        if (!validatePrice(priceInput.value)) {
            valid = false;
            displayError(priceInput, priceError, 'Ingresa un precio válido.');
        }

        if (!validateDescription(descriptionInput.value)) {
            valid = false;
            displayError(descriptionInput, descriptionError, 'La descripción debe tener entre 8 y 22 caracteres.');
        }

        if (!valid) {
            event.preventDefault();
        }
    });

    function validateName(name) {
        return /^[A-Za-z\s]{3,}$/.test(name);
    }

    function validatePrice(price) {
        return /^\d+(\.\d{1,2})?$/.test(price);
    }

    function validateDescription(description) {
        return description.length >= 8 && description.length <= 22;
    }

    function displayError(inputElement, errorElement, errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("error-message");
      
        inputElement.classList.add("input-error");
    }

    function clearErrors() {
        nameError.textContent = '';
        priceError.textContent = '';
        descriptionError.textContent = '';
        
        nameInput.classList.remove("input-error");
        priceInput.classList.remove("input-error");
        descriptionInput.classList.remove("input-error");
    }
});
