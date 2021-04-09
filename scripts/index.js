/*
   TODO: 
   * Throttle onScroll
   * CONTACT FORM
*/
/*======== Static Variables ==========*/
// For sticky nav
var navbar = document.getElementById("navbar");
const fromTopOffsetBuffer = 25;
var stickyNavLoc = navbar.offsetTop;
// For highlighting nav links
let navLinks = document.querySelectorAll("nav ul li a");
let sections = Array.from(document.getElementsByClassName("section"));

// For slides navigation
var slideIndex = 0;
var slides = Array.from(document.getElementsByClassName("slide"));
var dots = Array.from(document.getElementsByClassName("dot"));

/*======== onScroll Functionality ==========*/
window.onscroll = function() {

  // For sticky nav
  // Add sticky class to the navbar when you reach its scroll position.
  // Remove "sticky" when you leave the scroll position
  if (window.pageYOffset >= stickyNavLoc) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }

  // For highlighting nav links
  let fromTop = window.scrollY + fromTopOffsetBuffer;
  let el = document.querySelector('nav .active')
  if(el) {
    el.classList.remove('active');
  }
  
  if(fromTop < sections[1].offsetTop) {
    navLinks[0].classList.add('active');
  } else if (fromTop < sections[2].offsetTop) {
    navLinks[1].classList.add('active');
  } else if (fromTop < sections[3].offsetTop) {
    navLinks[2].classList.add('active');
  } else {
      navLinks[3].classList.add('active');
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

/*======== Form Submissions ==========*/
  async function handleFormSubmit(id) {
    var form;
    var url;

    switch(id) {
      case 'contact-submit':
      default:
        form = document.getElementById("contact-form");
        url = 'http://localhost:5000/contact';
    }
  
    if(form.reportValidity()) {
      try {
        const responseData = await postJSON( url, new FormData(form) );
        // Show success w/submit button here.
        console.log({ responseData });
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  async function postJSON( url, data ) {
    const dataObj = Object.fromEntries(data);
    const dataJSON = JSON.stringify(dataObj);
  
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: dataJSON,
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      const errorMessage = `Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
