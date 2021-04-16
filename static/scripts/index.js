/*======== Static Variables ==========*/
// For sticky nav
var navBar = document.getElementById("navbar");
// For highlighting nav links
let sections = Array.from(document.getElementsByClassName("section"));
const navLinksMap = new Map();
document.querySelectorAll("nav ul li a").forEach(link => {navLinksMap.set(link.hash, link)});

// For slides navigation
var slideIndex = 0;
var slides = Array.from(document.getElementsByClassName("slide"));
var dots = Array.from(document.getElementsByClassName("dot"));

/*======== stickyNav Functionality ==========*/
const navObserver = new IntersectionObserver((entries, navObserver) => {
  if(!entries[0].isIntersecting)
    navBar.classList.add("sticky");
  else
    navBar.classList.remove("sticky");
});
navObserver.observe(document.getElementById("nav-sentinel"));

/*======== Nav Link Highlighting Functionality ==========*/
const sectionsObserver = new IntersectionObserver((entries, sectionsObserver) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let link = navLinksMap.get("#" + entry.target.id);
      if(link) {
        // Remove active from current active link
        let el = document.querySelector("nav .active")
        if(el)
          el.classList.remove("active");
        // Add active to intersecting link
        link.classList.add("active");
        return;
      }
    }
  });
}, {rootMargin: "0% 0% -75% 0%"});
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
async function handleFormSubmit(id) {
  var form;
  var url;

  switch(id) {
    case "contact-submit":
    default:
      form = document.getElementById("contact-form");
      url = "https://jonodnelson-portfolio.herokuapp.com/contact";
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
