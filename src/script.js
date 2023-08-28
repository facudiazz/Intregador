function openMenu(){
    let links = document.getElementById('links');
    if(links.style.display == 'flex'){
        links.style.display = "none";
    }
    else{
        links.style.display = 'flex';
    }
}

function handleFileSelect(input) {
    const fileUploadLabel = input.parentNode.querySelector('.custom-file-upload');
    const selectedText = fileUploadLabel.querySelector('span');
  
    if (input.files && input.files.length > 0) {
      fileUploadLabel.classList.add('selected');
      selectedText.classList.add('selected-text');
      selectedText.textContent = 'Foto seleccionada';
    } else {
      fileUploadLabel.classList.remove('selected');
      selectedText.classList.remove('selected-text');
      selectedText.textContent = 'Seleccionar foto';
    }
  }
  