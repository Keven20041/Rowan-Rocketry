document.addEventListener("DOMContentLoaded", () => {
    // Existing code from the provided JavaScript
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
    const navList = document.querySelector(".nav-list")
    const header = document.querySelector("header")
    const scrollTopBtn = document.querySelector(".scroll-top")
  
    // Mobile menu toggle
    mobileMenuToggle.addEventListener("click", () => {
      navList.classList.toggle("active")
      // Add aria-expanded attribute for accessibility
      const isExpanded = navList.classList.contains("active")
      mobileMenuToggle.setAttribute("aria-expanded", isExpanded)
    })
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && navList.classList.contains("active")) {
        navList.classList.remove("active")
        mobileMenuToggle.setAttribute("aria-expanded", false)
      }
    })
  
    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navList.classList.contains("active")) {
        navList.classList.remove("active")
        mobileMenuToggle.setAttribute("aria-expanded", false)
      }
    })
  
    // Scroll to top button visibility
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("visible")
      } else {
        scrollTopBtn.classList.remove("visible")
      }
  
      // Header background change on scroll
      if (window.pageYOffset > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }
  
    // Throttle scroll event
    let ticking = false
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    })
  
    // Scroll to top functionality
    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          })
          // Close mobile menu after clicking a link
          navList.classList.remove("active")
          mobileMenuToggle.setAttribute("aria-expanded", false)
        }
      })
    })
  
    // Initialize tab switching for all tab sections
    const initializeTabs = () => {
      const tabSections = [
        // Existing tabs
        document.querySelector(".sponsorship-section"),
        // New sponsors section tabs
        document.querySelector(".sponsors-section"),
      ]
  
      tabSections.forEach((section) => {
        if (!section) return
  
        const tabs = section.querySelectorAll(".tab-btn")
        const contents = section.querySelectorAll(".tab-content")
  
        if (tabs.length > 0 && contents.length > 0) {
          tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
              const target = tab.dataset.tab
  
              // Remove active class from all tabs and contents in this section
              tabs.forEach((t) => t.classList.remove("active"))
              contents.forEach((c) => c.classList.remove("active"))
  
              // Add active class to clicked tab and corresponding content
              tab.classList.add("active")
              const targetContent = section.querySelector(`#${target}`)
              if (targetContent) {
                targetContent.classList.add("active")
              }
            })
          })
        }
      })
    }
  
    // Initialize all tabs
    initializeTabs()
  
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
  
    // Add animation to sponsor cards when they come into view
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
        // Fallback for browsers that don't support IntersectionObserver
        sponsorCards.forEach((card) => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        })
      }
    }
  
    // Call the function to observe sponsor cards
    observeSponsors()
  })
  
  