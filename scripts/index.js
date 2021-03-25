/*
   TODO: 
   * Throttle onScroll
   * Highlight correct button according to section in onScroll
*/
/*======== Static Variables ==========*/
// For sticky nav
var navbar = document.getElementById("navbar");
var stickyNavLoc = navbar.offsetTop;
// For slides navigation
var slideIndex = 0;
var slides = Array.from(document.getElementsByClassName("slide"));
var dots = Array.from(document.getElementsByClassName("dot"));

/*======== onScroll Functionality ==========*/
window.onscroll = function() {onScroll()};

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function onScroll() {
  if (window.pageYOffset >= stickyNavLoc) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

/*======== #About Slideshow Functionality ==========*/
function showSlide(n) {
  slides[slideIndex].style.display = "none";
  dots[slideIndex].classList.remove("active");

  slideIndex = (n + slides.length) % slides.length; // janky JS modulo

  slides[slideIndex].style.display = "flex";  
  dots[slideIndex].classList.add("active");
}

function nextSlide(n) {
  showSlide(slideIndex + n);
}
