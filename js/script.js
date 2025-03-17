const h1 = document.querySelector(".heading-primary");

/* h1.addEventListener("click", function () {
  h1.textContent = "any text";
  h1.style.backgroundColor = "red";
  h1.style.padding = "32px";
  }); */

///////////////////////////////////////////////////////////
//add current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// make mobile navigation work
const btnNavEl = document.querySelector(".btn-menu-nav");
const mainNavLinkEl = document.querySelectorAll(".main-nav-link");
const headerEl = document.querySelector(".header");
const htmlEl = document.querySelector("html");
const bodyEl = document.querySelector("body");

btnNavEl.addEventListener("click", function () {
  /* if (headerEl.classList.contains("nav-open")) {
    headerEl.classList.remove("nav-open");
  } else {
    headerEl.classList.add("nav-open");
  } */
  headerEl.classList.toggle("nav-open");
  htmlEl.classList.toggle("stop-v-scroll");
  bodyEl.classList.toggle("stop-v-scroll");
});

mainNavLinkEl.forEach(function (element) {
  element.addEventListener("click", function () {
    htmlEl.classList.remove("stop-v-scroll");
    bodyEl.classList.remove("stop-v-scroll");
  });
});

///////////////////////////////////////////////////////////
// Fixing scrolling behavior smooth that missing in some Safari versions

//to select all anchor elements with links
const allLinks = document.querySelectorAll("a:link");
//we need to select each one of them giving it parameter:link
allLinks.forEach(function (link) {
  //add event listener of click for each of them and parameter:e
  link.addEventListener("click", function (e) {
    //to get the element href attribute written in html file
    const href = link.getAttribute("href");

    //make scroll to top
    if (href === "#") {
      //disable the default behavior of this click event
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    //make scroll to desired section
    if (href !== "#" && href.startsWith("#")) {
      //disable the default behavior of this click event
      e.preventDefault();
      //close mobile navigation if its open
      if (headerEl.classList.contains("nav-open")) {
        headerEl.classList.toggle("nav-open");
      }
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

///////////////////////////////////////////////////////////
// making the header sticky

const sectionHeroEl = document.querySelector(".section-hero");

//this to make new object IntersectionObserver
const obs = new IntersectionObserver(
  // we define an function and an options
  function (entries) {
    //the function takes array of entities and we only one input
    const ent = entries[0];

    //if intersecting is false means the section is out of view port
    if (ent.isIntersecting === false) {
      document.querySelector("body").classList.add("sticky");
      /* document.querySelector(".header").classList.add("sticky-animation"); */
    }

    //if intersecting is true means the section is in the view port
    if (ent.isIntersecting === true) {
      document.querySelector("body").classList.remove("sticky");
      /* document.querySelector(".header").classList.remove("sticky-animation"); */
    }
  },
  {
    //means inside the view port
    root: null,
    //means all the section being observed is full out of view port
    threshold: 0,
    //define part before it out of view port fully
    rootMargin: "-80px",
  }
);

/* const obs2 = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.querySelector(".header").classList.add("sticky-animation");
    }

    if (ent.isIntersecting === true) {
      document.querySelector(".header").classList.remove("sticky-animation");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-400px",
  }
);

obs2.observe(sectionHeroEl); */
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
