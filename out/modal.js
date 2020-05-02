// Adapted from w3schools
// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img1 = document.getElementById("img1");
var img2 = document.getElementById("img2");
var img3 = document.getElementById("img3");

var modalImg = document.getElementById("modalImg");
var captionText = document.getElementById("caption");

function displayModal(img) {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML =img.alt;
}

img1.onclick = function() {
    displayModal(this);
};
img2.onclick = function() {
    displayModal(this);
};
img3.onclick = function() {
    displayModal(this);
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
} 