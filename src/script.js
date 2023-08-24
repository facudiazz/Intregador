function openMenu(){
  let links = document.getElementById('links');
  if(links.style.display == 'flex'){
      links.style.display = "none";
  }
  else{
      links.style.display = 'flex';
  }
}
