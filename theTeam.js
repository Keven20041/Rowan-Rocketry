document.addEventListener("DOMContentLoaded", () => {
  // Star field animation
  
  const canvas = document.createElement("canvas")
  canvas.id = "starField"
  document.body.prepend(canvas)
  const ctx = canvas.getContext("2d")

  canvas.style.zIndex = "-1"
  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.overflow = "hidden"

  let width, height, stars
  const FPS = 60
  const STAR_COUNT = 100

  function init() {
    resizeCanvas()
    createStars()
    animate()
  }

  function resizeCanvas() {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.5,
      brightness: Math.random(),
    }))
  }

  function drawStars() {
    ctx.clearRect(0, 0, width, height)
    stars.forEach((star) => {
      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  function updateStars() {
    stars.forEach((star) => {
      star.y += star.speed
      if (star.y > height) {
        star.y = 0
        star.x = Math.random() * width
        star.brightness = Math.abs(Math.sin(Date.now() * 0.01 * star.speed))
      }
    })
  }

  function animate() {
    drawStars()
    updateStars()
    requestAnimationFrame(animate)
  }

  init()

  // Utility functions
  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Responsive design
  window.addEventListener("resize", debounce(init, 200))

  // Header scroll effect
  const header = document.querySelector("header")
  const scrollThreshold = 100

  // Scroll to top button
  const scrollTopButton = document.querySelector(".scroll-top")

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")
  let touchStartY = 0

  if (mobileMenuToggle && navList) {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation()
      navList.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
      mobileMenuToggle.setAttribute("aria-expanded", navList.classList.contains("active"))
    })
  }

  // Improved touch event handling for mobile
  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.touches[0].clientY
    },
    { passive: true },
  )

  document.addEventListener(
    "touchend",
    (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchEndY - touchStartY

      // Close menu when swiping up
      if (deltaY < -50 && navList && navList.classList.contains("active")) {
        navList.classList.remove("active")
        if (mobileMenuToggle) {
          mobileMenuToggle.classList.remove("active")
          mobileMenuToggle.setAttribute("aria-expanded", "false")
        }
      }
    },
    { passive: true },
  )

  // Scroll event listener
  let ticking = false
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset

          // Update header
          if (header) {
            header.classList.toggle("scrolled", currentScroll > 100)
          }

          // Update scroll to top button
          if (scrollTopButton) {
            scrollTopButton.classList.toggle("visible", currentScroll > 300)
          }

          ticking = false
        })
        ticking = true
      }
    },
    { passive: true },
  )

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (header && navList && mobileMenuToggle && !header.contains(e.target) && navList.classList.contains("active")) {
      navList.classList.remove("active")
      mobileMenuToggle.classList.remove("active")
      mobileMenuToggle.setAttribute("aria-expanded", "false")
    }
  })

  // Smooth scrolling for anchor links (fixed)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip if it's just "#" (no valid target)
      if (!href || href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
        if (navList && mobileMenuToggle) {
          navList.classList.remove("active")
          mobileMenuToggle.classList.remove("active")
          mobileMenuToggle.setAttribute("aria-expanded", "false")
        }
      }
    })
  })

  // Image slider functionality
  const sliders = document.querySelectorAll(".image-slider")

  sliders.forEach((slider) => {
    const container = slider.querySelector(".slider-container")
    const prevButton = slider.querySelector(".slider-button-left")
    const nextButton = slider.querySelector(".slider-button-right")
    const items = slider.querySelectorAll(".slider-item")
    const progressBar = slider.querySelector(".progress-bar")
    let currentIndex = 0
    let autoAdvanceInterval

    if (!container || !prevButton || !nextButton || !items.length || !progressBar) {
      return // Skip this slider if essential elements are missing
    }

    const updateSlider = () => {
      container.style.transform = `translateX(-${currentIndex * 100}%)`
      progressBar.style.transform = `translateX(${currentIndex * 100}%)`
    }

    const goToNext = () => {
      currentIndex = (currentIndex + 1) % items.length
      updateSlider()
    }

    const goToPrev = () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length
      updateSlider()
    }

    prevButton.addEventListener("click", goToPrev)
    nextButton.addEventListener("click", goToNext)

    autoAdvanceInterval = setInterval(goToNext, 5000)

    // Touch events for mobile swipe
    let touchStartX = 0
    let touchEndX = 0

    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX
        clearInterval(autoAdvanceInterval)
      },
      { passive: true },
    )

    slider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX
        if (touchStartX - touchEndX > 50) {
          goToNext()
        } else if (touchEndX - touchStartX > 50) {
          goToPrev()
        }
        autoAdvanceInterval = setInterval(goToNext, 5000)
      },
      { passive: true },
    )

    // Pause auto-advance on hover for desktop
    slider.addEventListener("mouseenter", () => clearInterval(autoAdvanceInterval))
    slider.addEventListener("mouseleave", () => (autoAdvanceInterval = setInterval(goToNext, 5000)))
  })

  // Scroll to top button click event
  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    })
  }

  // Dropdown menu functionality
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const dropdownContent = dropdown.querySelector(".dropdown-content")
    const dropdownToggle = dropdown.querySelector(".dropdown-toggle")

    if (!dropdownContent || !dropdownToggle) {
      return // Skip this dropdown if essential elements are missing
    }

    dropdownToggle.addEventListener("click", (e) => {
      e.preventDefault()
      dropdownContent.classList.toggle("visible")
      dropdownToggle.setAttribute("aria-expanded", dropdownContent.classList.contains("visible"))
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdownContent.classList.remove("visible")
        dropdownToggle.setAttribute("aria-expanded", "false")
      }
    })

    // Support keyboard navigation
    dropdown.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdownContent.classList.remove("visible")
        dropdownToggle.setAttribute("aria-expanded", "false")
        dropdownToggle.focus()
      }
    })
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add will-change to optimize animations
          entry.target.style.willChange = "transform, opacity"
          entry.target.classList.add("fade-in-up")

          console.log("[v0] Element faded in:", entry.target.className)

          // Cleanup will-change after animation
          setTimeout(() => {
            entry.target.style.willChange = "auto"
          }, 1000)
        }
      })
    },
    {
      threshold: 0.1,
      // Reduce motion on mobile
      rootMargin: window.innerWidth < 768 ? "50px" : "0px",
    },
  )

  document.querySelectorAll(".team-card, .team-card1").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Check if the clicked element is a link or inside a link
      const clickedLink = e.target.closest("a")

      if (clickedLink) {
        // Allow link to work normally, prevent card flip
        e.stopPropagation()
        console.log("[v0] Link clicked, preventing card flip:", clickedLink.href)
        return false
      }

      // Only handle flip on touch devices or when hover is not available
      if (!window.matchMedia("(hover: hover)").matches) {
        e.preventDefault()
        e.stopPropagation()
        card.classList.toggle("flipped")
        console.log("[v0] Card flipped on mobile:", card.classList.contains("flipped"))
      }
    })

    const links = card.querySelectorAll("a")
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Stop all propagation to prevent card flip
        e.stopPropagation()
        e.stopImmediatePropagation()

        console.log("[v0] Link clicked:", link.href)
        // Link will work normally since we're not preventing default
      })

      // Prevent card flip on link hover/touch
      link.addEventListener("mouseenter", (e) => {
        e.stopPropagation()
      })

      link.addEventListener(
        "touchstart",
        (e) => {
          e.stopPropagation()
        },
        { passive: true },
      )
    })

    // Add loading="lazy" to images within team cards
    const img = card.querySelector("img")
    if (img) {
      img.loading = "lazy"
      img.decoding = "async"
    }
    observer.observe(card)
  })

  document.querySelectorAll(".team-members h1, .team-members h2").forEach((el) => {
    observer.observe(el)
  })
})

console.log("JavaScript code for mobile compatibility has been updated and optimized.")
