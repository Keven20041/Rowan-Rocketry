document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const header = document.querySelector(".cosmic-header")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")
  const navItems = document.querySelectorAll(".nav-item")
  const scrollTopBtn = document.querySelector(".scroll-top")

  // Create menu overlay if it doesn't exist
  let menuOverlay = document.querySelector(".menu-overlay")
  if (!menuOverlay) {
    menuOverlay = document.createElement("div")
    menuOverlay.className = "menu-overlay"
    document.body.appendChild(menuOverlay)
  }

  // Remove the code that creates a new close button if it doesn't exist
  // Replace the mobile menu close button creation code with this simplified version:

  // Find and remove any existing mobile menu close buttons first
  const existingCloseButtons = document.querySelectorAll(".mobile-menu-close")
  existingCloseButtons.forEach((button) => button.remove())

  // Create a single mobile menu close button
  const mobileMenuClose = document.createElement("button")
  mobileMenuClose.className = "mobile-menu-close"
  mobileMenuClose.setAttribute("aria-label", "Close menu")
  mobileMenuClose.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `
  document.querySelector(".nav-list").appendChild(mobileMenuClose)

  // Toggle mobile menu
  function toggleMenu() {
    const isOpen = navList.classList.contains("active")

    // Toggle classes
    mobileMenuToggle.classList.toggle("active", !isOpen)
    navList.classList.toggle("active", !isOpen)
    menuOverlay.classList.toggle("active", !isOpen)

    // Set aria-expanded attribute
    mobileMenuToggle.setAttribute("aria-expanded", !isOpen)

    // Prevent body scrolling when menu is open
    document.body.style.overflow = !isOpen ? "hidden" : ""

    // Add transition delays to nav items for staggered animation
    if (!isOpen) {
      navItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`
      })
    }
  }

  // Event listeners
  mobileMenuToggle.addEventListener("click", toggleMenu)
  mobileMenuClose.addEventListener("click", toggleMenu)
  menuOverlay.addEventListener("click", toggleMenu)

  // Close menu when clicking a nav link
  navList.addEventListener("click", (e) => {
    if (e.target.closest(".nav-link")) {
      toggleMenu()
    }
  })

  // Handle scroll events
  window.addEventListener("scroll", () => {
    // Add scrolled class to header when scrolled
    header.classList.toggle("scrolled", window.scrollY > 50)

    // Show/hide scroll to top button
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 300)
    }
  })

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1)
      if (targetId) {
        e.preventDefault()
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    })
  })

  // Scroll to top button functionality
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }


  document.addEventListener('DOMContentLoaded', function() {
    // Accordion menu functionality
    const navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach((link) => {
      // Set initial state for links with submenus
      const submenu = link.nextElementSibling;
      if (submenu && submenu.classList.contains("nav-submenu")) {
        link.style.setProperty("--content", '"+"');
      }
      link.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
          const submenu = this.nextElementSibling;
          
          if (submenu && submenu.classList.contains("nav-submenu")) {
            e.preventDefault(); // Only prevent default if there's a submenu
            
            submenu.classList.toggle("active");
  
            // Update the + to - or vice versa
            if (submenu.classList.contains("active")) {
              this.style.setProperty("--content", '"-"');
            } else {
              this.style.setProperty("--content", '"+"');
            }
          }
        }
      });
    });
  });
})

