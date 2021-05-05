/*======== Static Variables ==========*/
// Timings for displaying success/failure
const messageTime = 8000;
// For sticky nav
const navBar = document.getElementById("navbar");
// For highlighting nav links
const sections = Array.from(document.getElementsByClassName("section"));
const navLinksMap = new Map();
document.querySelectorAll("nav ul li a").forEach(link => {navLinksMap.set(link.hash, link)});

// For slides navigation
var slideIndex = 0;
const slides = Array.from(document.getElementsByClassName("slide"));
const dots = Array.from(document.getElementsByClassName("dot"));

/*======== stickyNav Functionality ==========*/
const navObserver = new IntersectionObserver((entries, navObserver) => {
  if(!entries[0].isIntersecting && window.scrollY >= 25)
    navBar.classList.add("sticky");
  else
    navBar.classList.remove("sticky");
},{threshold: 1});
navObserver.observe(document.getElementById("nav-sentinel"));

/*======== Nav Link Highlighting Functionality ==========*/
const sectionsObserver = new IntersectionObserver((entries, sectionsObserver) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let targetLink = navLinksMap.get("#" + entry.target.id);
      if(targetLink) {
        // Remove active from all nav links
        navLinksMap.forEach(navLink => {navLink.classList.remove("active")});
        // Add active to intersecting link
        targetLink.classList.add("active");
        return;
      }
    }
  });
}, {rootMargin: "-10% 0% -75% 0%"});
sections.forEach(section => {
  sectionsObserver.observe(section);
})

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
// Actually submitting the form
async function handleFormSubmit(buttonID) {
  var form;
  var url;
  var button = document.getElementById(buttonID);

  switch(buttonID) {
    case "contact-submit":
    default:
      form = document.getElementById("contact-form");
      url = "https://jonodnelson-portfolio.herokuapp.com/contact";
  }

  // Don't submit if the form is invalid
  if(form.reportValidity()) {
    try {
      button.classList.toggle("button-loading");
      const responseData = await postJSON( url, new FormData(form) );
      displayOutcome(button, "success");
      console.log({ responseData });
    } catch (error) {
      displayOutcome(button, "failure");
      console.error(error);
    }
    button.classList.toggle("button-loading");
  }
}

// Sending the form data
async function postJSON( url, data ) {
  const dataObj = Object.fromEntries(data);
  const dataJSON = JSON.stringify(dataObj);

  const options = {
    method: "POST",
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

// Button/div success states
function displayOutcome(button, outcome) {
  button.classList.toggle("button-" + outcome);
  switch(button.id) {
    case "contact-submit": default:
      let el = document.getElementById("contact-" + outcome);
      if(el) {
        el.classList.toggle("expand");
        setTimeout(function(){el.classList.toggle("expand"); }, messageTime);
      }
      break;
  }
  setTimeout(function(){button.classList.toggle("button-" + outcome); }, messageTime);
}
