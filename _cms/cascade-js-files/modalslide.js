// JavaScript Document
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

var slideIndex = 1;
$('.modal').each(function(i, modal) {
    showSlides(slideIndex, modal.id);
});

function plusSlides(n, modal) {
  showSlides(slideIndex += n, modal);
}

function currentSlide(n, modal) {
  showSlides(slideIndex = n, modal);
}

function showSlides(n, modal) {
  var i;
  console.log(modal);
  var slides = $("#"+modal + " .mySlides");
  console.log(slides);
  var dots = $("#"+modal + " .demo");
  var captionText = $("#" + modal + " #caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}