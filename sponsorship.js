document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".cosmic-header")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")
  const menuOverlay = document.querySelector(".menu-overlay")
  const scrollTopBtn = document.querySelector(".scroll-top")

  // Mobile menu toggle functionality
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener("click", () => {
      const isActive = navList.classList.contains("active")

      // Toggle all necessary classes
      mobileMenuToggle.classList.toggle("active")
      navList.classList.toggle("active")
      if (menuOverlay) menuOverlay.classList.toggle("active")
      if (header) header.classList.toggle("menu-open")

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? "" : "hidden"

      // Update aria-expanded for accessibility
      mobileMenuToggle.setAttribute("aria-expanded", !isActive)
    })
  }

  // Close menu when clicking overlay
  if (menuOverlay) {
    menuOverlay.addEventListener("click", () => {
      closeMenu()
    })
  }

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMenu()
      }
    })
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!header?.contains(e.target) && navList?.classList.contains("active")) {
      closeMenu()
    }
  })

  // Close menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navList?.classList.contains("active")) {
      closeMenu()
    }
  })

  // Helper function to close menu
  function closeMenu() {
    if (mobileMenuToggle) mobileMenuToggle.classList.remove("active")
    if (navList) navList.classList.remove("active")
    if (menuOverlay) menuOverlay.classList.remove("active")
    if (header) header.classList.remove("menu-open")
    document.body.style.overflow = ""
    if (mobileMenuToggle) mobileMenuToggle.setAttribute("aria-expanded", "false")
  }

  // Header scroll effects
  let lastScroll = 0
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
      header?.classList.remove("scroll-up")
      return
    }

    if (currentScroll > lastScroll && !header?.classList.contains("scroll-down")) {
      header?.classList.remove("scroll-up")
      header?.classList.add("scroll-down")
    } else if (currentScroll < lastScroll && header?.classList.contains("scroll-down")) {
      header?.classList.remove("scroll-down")
      header?.classList.add("scroll-up")
    }
    lastScroll = currentScroll

    // Scroll to top button visibility
    if (scrollTopBtn) {
      if (currentScroll > 300) {
        scrollTopBtn.classList.add("visible")
      } else {
        scrollTopBtn.classList.remove("visible")
      }
    }
  })

  // Scroll to top functionality
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: "smooth",
        })
        // Close mobile menu after clicking anchor link
        closeMenu()
      }
    })
  })

  // Tab switching functionality
  const initializeTabs = () => {
    const tabSections = [document.querySelector(".sponsorship-section"), document.querySelector(".sponsors-section")]

    tabSections.forEach((section) => {
      if (!section) return

      const tabs = section.querySelectorAll(".tab-btn")
      const contents = section.querySelectorAll(".tab-content")

      if (tabs.length > 0 && contents.length > 0) {
        tabs.forEach((tab) => {
          tab.addEventListener("click", function () {
            const target = this.dataset.tab

            // Remove active class from all tabs and contents in this section
            tabs.forEach((t) => t.classList.remove("active"))
            contents.forEach((c) => c.classList.remove("active"))

            // Add active class to clicked tab and corresponding content
            this.classList.add("active")
            const targetContent = section.querySelector(`#${target}`)
            if (targetContent) {
              targetContent.classList.add("active")
            }
          })
        })
      }
    })
  }

  // Initialize tabs
  initializeTabs()

  // Sponsor card animations
  const observeSponsors = () => {
    const sponsorCards = document.querySelectorAll(".sponsor-card")

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1"
              entry.target.style.transform = "translateY(0)"
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )

      sponsorCards.forEach((card) => {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        observer.observe(card)
      })
    } else {
      sponsorCards.forEach((card) => {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      })
    }
  }

  // Initialize sponsor card animations
  observeSponsors()

  // Sponsor logo hover effects
  const sponsorLogos = document.querySelectorAll(".sponsor-logo")
  sponsorLogos.forEach((logo) => {
    logo.addEventListener("mouseenter", () => {
      logo.style.transform = "scale(1.05)"
    })

    logo.addEventListener("mouseleave", () => {
      logo.style.transform = "scale(1)"
    })
  })
})
