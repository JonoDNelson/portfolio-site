/*
   TODO: 
   * Throttle onScroll
   * Highlight correct button according to section in onScroll
*/

/*======== onScroll Functionality ==========*/
window.onscroll = function() {onScroll()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function onScroll() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

/*======== #About Slideshow Functionality ==========*/
var slideIndex = 0;

function showSlides(n) {
  var slides = Array.from(document.getElementsByClassName("slide"));
  var dots = Array.from(document.getElementsByClassName("dot"));

  slideIndex = (slideIndex + slides.length) % slides.length; // janky JS modulo

  slides.forEach(slide => {slide.style.display = "none"});
  dots.forEach(dot => {dot.className = dot.className.replace(" active", "")});

  slides[slideIndex].style.display = "flex";  
  dots[slideIndex].className += " active";
}

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
