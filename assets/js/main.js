(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);
})();

window.addEventListener("scroll", function () {
  let header = document.getElementById("header");
  if (window.scrollY > 50) {
    // Jab 50px se jyada scroll ho
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// document
//   .getElementById("contactForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault(); // Form ko direct submit hone se rokna hai

//     const formData = {
//       name: document.querySelector('input[name="name"]').value,
//       email: document.querySelector('input[name="email"]').value,
//       number: document.querySelector('input[name="number"]').value,
//       qualification: document.querySelector('input[name="qualification"]')
//         .value,
//       subject: document.querySelector('input[name="subject"]').value,
//       message: document.querySelector('textarea[name="message"]').value,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/form/submit", {
//       // const response = await fetch("https://website-backend-oc1g.onrender.com/api/form/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Form submit hone par success message dikhayein
//         document.querySelector(".sent-message").style.display = "block";
//         document.querySelector(".error-message").style.display = "none";

//         // Form ko reset karke khali kar dein
//         document.getElementById("contactForm").reset();

//         // Success message ko 5 seconds baad hide kar dena
//         setTimeout(() => {
//           document.querySelector(".sent-message").style.display = "none";
//         }, 5000);
//       } else {
//         document.querySelector(".error-message").innerText = result.error;
//         document.querySelector(".error-message").style.display = "block";
//         document.querySelector(".sent-message").style.display = "none";
//       }
//     } catch (error) {
//       document.querySelector(".error-message").innerText =
//         "Something went wrong. Try again.";
//       document.querySelector(".error-message").style.display = "block";
//       document.querySelector(".sent-message").style.display = "none";
//     }
//   });
 



document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  const submitButton = document.getElementById("submitBtn");
  submitButton.disabled = true; // Disable button
  submitButton.textContent = "Sending..."; // Show loading state

  const formData = {
    name: document.querySelector('input[name="name"]').value.trim(),
    email: document.querySelector('input[name="email"]').value.trim(),
    number: document.querySelector('input[name="number"]').value.trim(),
    qualification: document.querySelector('input[name="qualification"]').value.trim(),
    subject: document.querySelector('input[name="subject"]').value.trim(),
    message: document.querySelector('textarea[name="message"]').value.trim(),
  };

  // **Email validation**
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(formData.email)) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
    });
    resetButton(submitButton);
    return;
  }

  // **Mobile number validation**
  if (!/^\d{10}$/.test(formData.number)) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Mobile Number",
      text: "Please enter a valid 10-digit mobile number.",
    });
    resetButton(submitButton);
    return;
  }

  try {
    const response = await fetch("https://website-backend-oc1g.onrender.com/api/form/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Your message has been sent successfully.",
      });

      document.getElementById("contactForm").reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.error || "Something went wrong. Try again.",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong. Try again.",
    });
  } finally {
    resetButton(submitButton);
  }
});

// Function to reset button state
function resetButton(button) {
  button.disabled = false;
  button.textContent = "Send Message";
}
