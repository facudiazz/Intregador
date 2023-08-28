document.addEventListener("DOMContentLoaded", function() {
const form = document.getElementById('survey-form');
    const nameInput = document.getElementById('name');
    const lastNameInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');

    const nameError = document.getElementById('name-error');
    const lastNameError = document.getElementById('last-name-error');
    const emailError = document.getElementById('email-error');
    const commentsError = document.getElementById('comments-error');

    form.addEventListener('submit', function(event) {
      clearErrors();
      let valid = true;

      if (!validateName(nameInput.value)) {
        valid = false;
        displayError(nameError, 'El nombre debe tener al menos 3 caracteres.');
      }

      if (!validateName(lastNameInput.value)) {
        valid = false;
        displayError(lastNameError, 'El apellido debe tener al menos 3 caracteres.');
      }

      if (!validateEmail(emailInput.value)) {
        valid = false;
        displayError(emailError, 'Ingresa un email válido.');
      }

      if (!validateComments(commentsInput.value)) {
        valid = false;
        displayError(commentsError, 'El comentario debe tener entre 8 y 22 caracteres.');
      }

      if (!valid) {
        event.preventDefault();
      }
    });

    function validateName(name) {
      return /^[A-Za-z]{3,}$/.test(name);
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateComments(comments) {
      return comments.length === 0 || (comments.length >= 8 && comments.length <= 22);
    }

    function displayError(element, message) {
      element.textContent = message;
    }

    function clearErrors() {
      nameError.textContent = '';
      lastNameError.textContent = '';
      emailError.textContent = '';
      commentsError.textContent = '';
    }
});