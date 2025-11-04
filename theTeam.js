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
  const STAR_COUNT = 500

  function initialize() {
    resizeCanvas()
    createStars()
    animateStars()
  }

  let rafId = null

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1
    width = Math.floor(window.innerWidth)
    height = Math.floor(window.innerHeight)

    // CSS size (keeps layout)
    canvas.style.width = width + "px"
    canvas.style.height = height + "px"

    // Actual backing store size for crisp rendering on HiDPI
    canvas.width = width * dpr
    canvas.height = height * dpr

    // Scale drawing operations to CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function animateStars() {
    drawStars()
    updateStars()
    rafId = requestAnimationFrame(animateStars)
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

  initialize()

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
  window.addEventListener("resize", debounce(initialize, 200))

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

          console.log(" Element faded in:", entry.target.className)

          // Cleanup will-change after animation
          setTimeout(() => {}, 1000)
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
        console.log(" Link clicked, preventing card flip:", clickedLink.href)
        return false
      }
      // Only handle flip on touch devices or when hover is not available
      if (!window.matchMedia("(hover: hover)").matches) {
        e.preventDefault()
        e.stopPropagation()
        card.classList.toggle("flipped")
        console.log(" Card flipped on mobile:", card.classList.contains("flipped"))
      }
    })

    const links = card.querySelectorAll("a")
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Stop all propagation to prevent card flip
        e.stopPropagation()
        e.stopImmediatePropagation()

        console.log(" Link clicked:", link.href)
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

  const seasonTabs = document.querySelectorAll(".season-tab")
  const seasonContents = document.querySelectorAll(".season-content")

  const teamData = {
    "2025-2026": {
      captain: {
        name: "James Lee",
        title: "Team Captain",
        image: "2025-2026/James.jpg",
        major: "Mechanical Engineering",
        grade: "Senior",
        year: "2026",
        college: "Engineering",
        email: "rowanrocketry@gmail.com",
        linkedin: "https://www.linkedin.com/in/james-lee-2164501b7/",
      },
      managerial: [
        {
          name: "Sarah Ely",
          title: "Logistics Coordinator",
          image: "2025-2026/Sarah.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "elysar72@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/-sarah-ely/",
        },
        {
          name: "Victoria Van",
          title: "Clinic Consultant",
          image: "2025-2026/Victoria.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "vanvic84@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/victoria-van-ru/",
        },
      ],
      recovery: [
        {
          name: "Paul Porreca",
          title: "Recovery Lead",
          image: "2025-2026/Paul.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "porrec34@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/paul-porreca",
        },
        {
          name: "Vanessa Hutchison",
          title: "Recovery Engineer",
          image: "2025-2026/Vanessa.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "hutchi68@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/vanessahutchinson",
        },
        {
          name: "Brody Schneider",
          title: "Recovery Engineer",
          image: "2025-2026/Brody.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "schnei47@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/brodyschneider618",
        },
      ],
      avionics: [
        {
          name: "Marian Yanka",
          title: "Avionics Lead",
          image: "2025-2026/Marian.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "yankam32@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
        {
          name: "Victoria Van",
          title: "Avionics Engineer",
          image: "2025-2026/Victoria.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "vanvic84@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/victoria-van-ru/",
        },
        {
          name: "Marcelo Bisicchia",
          title: "Avionics Engineer",
          image: "2025-2026/Marcelo.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "bisicc35@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/marcelo-bisicchia-6792b228b/",
        },
        {
          name: "Keven Guzman",
          title: "Avionics Engineer",
          image: "2025-2026/Keven.jpg",
          major: "Computer Science",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "guzman37@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/keven-guzman-33a31a261/",
        },
        {
          name: "Thomas Rasa",
          title: "Avionics Engineer",
          image: "2025-2026/Thomas.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "rasath87@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/thomas-r-2b915b229/",
        },
        {
          name: "Noelle Ross",
          title: "Avionics Engineer",
          image: "2025-2026/Noelle.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "rossno75@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/noelle-ross-ba4a2527a/",
        },
        {
          name: "Sarah Ely",
          title: "Avionics Engineer",
          image: "2025-2026/Sarah.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "rossno75@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/-sarah-ely/",
        },
      ],
      payload: [
        {
          name: "Dharma Upadhyay",
          title: "Payload Lead",
          image: "2025-2026/Dharma.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "upadhy52@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/dharma-upadhyay-0155252a2/",
        },
        {
          name: "Emma Ferrarese",
          title: "Payload Engineer",
          image: "2025-2026/Emma.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "ferrar19@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/emma-ferrarese",
        },
        {
          name: "Aiden Aschoff",
          title: "Payload Engineer",
          image: "2025-2026/Aiden.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "aschof77@rowan.edu",
          linkedin: "https://www.linkedin.com/in/aiden-aschoff-366487212/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        },
      ],
      fins: [
        {
          name: "Nolan Heaney",
          title: "Fins/Airframe Lead",
          image: "2025-2026/Nolan.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "heaney47@students.rowan.edu",
          linkedin: "",
        },
        {
          name: "Jeremiah Francois",
          title: "Fins/Airframe Engineer",
          image: "2025-2026/Jeremiah.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "franco82@rowan.edu",
          linkedin: "",
        },
        {
          name: "Jakub Gajda",
          title: "Fins/Airframe Engineer",
          image: "2025-2026/Jakub.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "gajdaj88@rowan.edu",
          linkedin: "",
        },
        {
          name: "Shawn Smith",
          title: "Fins/Airframe Engineer",
          image: "2025-2026/Shawn.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "smiths22@students.rowan.edu",
          linkedin: "",
        },
        {
          name: "Harrison Roy",
          title: "Fins/Airframe Engineer",
          image: "2025-2026/Harrison.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "royhar83@rowan.edu",
          linkedin: "",
        },
      ],
      propulsion: [
        {
          name: "Jakub Jagoda",
          title: "Propulsion Lead",
          image: "2025-2026/Kuba.jpg",
          major: "Mechanical Engineering & Physics",
          grade: "Junior",
          year: "2027",
          college: "Engineering",
          email: "jagoda36@students.rowan.edu",
          linkedin: "",
        },
        {
          name: "Dean Siedlecki",
          title: "Propulsion Engineer",
          image: "2025-2026/Dean.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "siedle48@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/dean-siedlecki-121323332/",
        },
        {
          name: "Jared Crane",
          title: "Propulsion Engineer",
          image: "2025-2026/Jared.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2026",
          college: "Engineering",
          email: "cranej22@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/jared-crane-1530a5336/",
        },
      ],
      webdev: [
        {
          name: "Keven Guzman",
          title: "Web Master",
          image: "2025-2026/Keven.jpg",
          major: "Computer Science",
          grade: "Senior",
          year: "2026",
          college: "Science & Math",
          email: "guzman37@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/keven-guzman-33a31a261/",
        },
      ],
    },
    "2024-2025": {
      captain: {
        name: "Rowen Christianson",
        title: "Team Captain",
        image: "rowenh.jpg",
        major: "Mechanical Engineering",
        grade: "",
        year: "2025",
        college: "Engineering",
        email: "rowanrocketry@gmail.com",
        linkedin: "https://www.linkedin.com/in/rowen-christianson-199949180/",
      },
      managerial: [
        {
          name: "Elise Heim",
          title: "Administrative Assistant",
          image: "Elise.jpg",
          major: "Electrical & Computer Engineering",
          grade: "",
          year: "2025",
          college: "Engineering",
          email: "heimel27@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/elise-heim-5847842aa/",
        },
      ],
      recovery: [
        {
          name: "Daniel Rodriguez",
          title: "Recovery Lead",
          image: "tdaniel.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "rodrig102@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/daniel-rodriguez-247aa1224/",
        },
        {
          name: "Jake Robinson",
          title: "Recovery Engineer",
          image: "Rowan.png",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "robins106@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
        {
          name: "LLinca Vilceanu",
          title: "Recovery Engineer",
          image: "Llincah.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "vileea55@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/ilinca-vilceanu-1b6aa3254/",
        },
        {
          name: "Caleb Slusarski",
          title: "Recovery Engineer",
          image: "Rowan.png",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "slusar26@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
        {
          name: "Nina Stonitsch",
          title: "Recovery Engineer",
          image: "ninah.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "stonit23@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/nina-stonitsch-532656263/",
        },
      ],
      avionics: [
        {
          name: "Aidan Sharpe",
          title: "Avionics Lead",
          image: "tAidan.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "sharpe23@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/aidan-sharpe-b86955224/",
        },
        {
          name: "Marian Yanka",
          title: "Avionics Engineer",
          image: "Rowan.png",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "yankam32@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
        {
          name: "Sarah Ely",
          title: "Avionics Engineer",
          image: "sarah.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "elysar72@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/-sarah-ely/",
        },
        {
          name: "Victoria Van",
          title: "Avionics Engineer",
          image: "vich.jpg",
          major: "Electrical & Computer Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "vanvic84@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/victoria-van-ru/",
        },
        {
          name: "Justin Dougherty",
          title: "Avionics Engineer",
          image: "Rowan.png",
          major: "Electrical & Computer Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "doughe18@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/justin-dougherty-79921830b/",
        },
        {
          name: "Marcelo Bisicchia",
          title: "Avionics Engineer",
          image: "Rowan.png",
          major: "Electrical & Computer Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "bisicc35@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/marcelo-bisicchia-6792b228b/",
        },
        {
          name: "Jeremiah Francois",
          title: "Avionics Engineer",
          image: "Rowan.png",
          major: "Mechnical Engineer",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "franco82@rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
      ],
      payload: [
        {
          name: "James Lee",
          title: "Payload Lead",
          image: "tjames.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "leejam88@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/james-lee-2164501b7/",
        },
        {
          name: "Nolan Heaney",
          title: "Payload Engineer",
          image: "tNolan.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "heaney47@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
      ],
      fins: [
        {
          name: "Nolan Heaney",
          title: "Fins Lead",
          image: "tNolan.jpg",
          major: "Mechanical Engineering",
          grade: "Junior",
          year: "2026",
          college: "Engineering",
          email: "heaney47@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/rowan-profile",
        },
      ],
      airframe: [
        {
          name: "Bamidele Obadina",
          title: "Airframe Lead",
          image: "tbamidale.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "obadin43@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/dele-obadina-63a45b268/",
        },
        {
          name: "Ryan Kane",
          title: "Airframe Engineer",
          image: "ryanh.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "kanery53@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/ryan-kane-603174255/",
        },
        {
          name: "Kevin Osborn",
          title: "Airframe Engineer",
          image: "kevinh.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "osborn54@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/kevin-osborn-55a63a29b/",
        },
        {
          name: "Tyler Jones",
          title: "Airframe Engineer",
          image: "tylerh.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "jonest97@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/tyler-jones-4a57bb224/",
        },
      ],
      propulsion: [
        {
          name: "Jared Crane",
          title: "Propulsion Lead",
          image: "tJared.jpg",
          major: "Mechanical Engineering",
          grade: "Senior",
          year: "2025",
          college: "Engineering",
          email: "cranej22@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/jared-crane-1530a5336/",
        },
      ],
      webdev: [
        {
          name: "Keven Guzman",
          title: "Web Master",
          image: "Kevent.jpg",
          major: "Computer Science",
          grade: "Junior",
          year: "2026",
          college: "Science & Math",
          email: "guzman37@students.rowan.edu",
          linkedin: "https://www.linkedin.com/in/keven-guzman-33a31a261/",
        },
      ],
    },
  }

  function createTeamCard(member, isLarge = false) {
    const cardClass = isLarge ? "team-card1" : "team-card"
    const innerClass = isLarge ? "team-card-inner1" : "team-card-inner"
    const frontClass = isLarge ? "team-card-front1" : "team-card-front"
    const backClass = isLarge ? "team-card-back1" : "team-card-back"
    const imageContainerClass = isLarge ? "image-container1" : "image-container"

    const linkedinHTML = member.linkedin
      ? `<a href="${member.linkedin}" class="linkedin-link" aria-label="${member.name}'s LinkedIn Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="linkedin-icon">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </a>`
      : ""

    const gradeHTML = member.grade ? `<p>Grade: ${member.grade}</p>` : ""

    return `
      <div class="${cardClass}">
        <div class="${innerClass}">
          <div class="${frontClass}">
            <div class="${imageContainerClass}">
              <img src="${member.image}" alt="${member.name}" loading="lazy" decoding="async">
            </div>
            <h3>${member.name}</h3>
            <p id="job-title">${member.title}</p>
          </div>
          <div class="${backClass}">
            <h3>${member.name}</h3>
            <p>${member.title}</p>
            ${gradeHTML}
            <p>Major: ${member.major}</p>
            <p>Graduation Year: ${member.year}</p>
            <p>College: ${member.college}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
            ${linkedinHTML}
          </div>
        </div>
      </div>
    `
  }

  function populateTeamMembers(season) {
    const data = teamData[season]
    if (!data) {
      console.log(" No data found for season:", season)
      return
    }

    console.log(" Populating team members for season:", season)

    const seasonContent = document.querySelector('.season-content[data-season="' + season + '"]')
    if (!seasonContent) {
      console.log(" Season content not found for:", season)
      return
    }

    // Find all the team sections within the specific season content
    const captainGrid = seasonContent.querySelector(".team-grid1")
    const allH1s = seasonContent.querySelectorAll("h1")
    const allTeamGrids = seasonContent.querySelectorAll(".team-grid")
    const allTeamGrids1 = seasonContent.querySelectorAll(".team-grid1")

    // Captain is always first
    if (captainGrid && data.captain) {
      captainGrid.innerHTML = createTeamCard(data.captain, true)
    }

    // Managerial is always second (team-grid1)
    if (allTeamGrids1[1] && data.managerial) {
      allTeamGrids1[1].innerHTML = data.managerial.map((m) => createTeamCard(m, true)).join("")
    }

    // Recovery is always first team-grid
    if (allTeamGrids[0] && data.recovery) {
      allTeamGrids[0].innerHTML = data.recovery.map((m) => createTeamCard(m, false)).join("")
    }

    // Avionics is always second team-grid
    if (allTeamGrids[1] && data.avionics) {
      allTeamGrids[1].innerHTML = data.avionics.map((m) => createTeamCard(m, false)).join("")
    }

    // Payload is always third team-grid
    if (allTeamGrids[2] && data.payload) {
      allTeamGrids[2].innerHTML = data.payload.map((m) => createTeamCard(m, false)).join("")
    }

    if (season === "2025-2026") {
      // For 2025-2026: Fins/Airframe combined is 4th team-grid
      if (allTeamGrids[3] && data.fins) {
        if (data.airframe) {
          const combinedMembers = [...data.fins, ...data.airframe]
          allTeamGrids[3].innerHTML = combinedMembers.map((m) => createTeamCard(m, false)).join("")
        } else {
          allTeamGrids[3].innerHTML = data.fins.map((m) => createTeamCard(m, false)).join("")
        }
      }
      // Propulsion is 5th team-grid for 2025-2026
      if (allTeamGrids[4] && data.propulsion) {
        allTeamGrids[4].innerHTML = data.propulsion.map((m) => createTeamCard(m, false)).join("")
      }
      // Web Development is 6th team-grid for 2025-2026
      if (allTeamGrids[5] && data.webdev) {
        allTeamGrids[5].innerHTML = data.webdev.map((m) => createTeamCard(m, false)).join("")
      }
    } else if (season === "2024-2025") {
      // For 2024-2025: Fins is 4th team-grid
      if (allTeamGrids[3] && data.fins) {
        allTeamGrids[3].innerHTML = data.fins.map((m) => createTeamCard(m, false)).join("")
      }
      // Airframe is 5th team-grid for 2024-2025
      if (allTeamGrids[4] && data.airframe) {
        allTeamGrids[4].innerHTML = data.airframe.map((m) => createTeamCard(m, false)).join("")
      }
      // Propulsion is 6th team-grid for 2024-2025
      if (allTeamGrids[5] && data.propulsion) {
        allTeamGrids[5].innerHTML = data.propulsion.map((m) => createTeamCard(m, false)).join("")
      }
      // Web Development is 7th team-grid for 2024-2025
      if (allTeamGrids[6] && data.webdev) {
        allTeamGrids[6].innerHTML = data.webdev.map((m) => createTeamCard(m, false)).join("")
      }
    }

    // Re-attach event listeners to new cards
    attachCardEventListeners()
  }

  function attachCardEventListeners() {
    document.querySelectorAll(".team-card, .team-card1").forEach((card) => {
      // Remove old listeners by cloning
      const newCard = card.cloneNode(true)
      card.parentNode.replaceChild(newCard, card)

      newCard.addEventListener("click", (e) => {
        const clickedLink = e.target.closest("a")
        if (clickedLink) {
          e.stopPropagation()
          console.log(" Link clicked, preventing card flip:", clickedLink.href)
          return false
        }

        if (!window.matchMedia("(hover: hover)").matches) {
          e.preventDefault()
          e.stopPropagation()
          newCard.classList.toggle("flipped")
          console.log(" Card flipped on mobile:", newCard.classList.contains("flipped"))
        }
      })

      const links = newCard.querySelectorAll("a")
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.stopPropagation()
          e.stopImmediatePropagation()
          console.log(" Link clicked:", link.href)
        })

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

      observer.observe(newCard)
    })
  }

  if (seasonTabs.length > 0 && seasonContents.length > 0) {
    seasonTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const season = tab.getAttribute("data-season")

        console.log(" Season tab clicked:", season)

        // Remove active class from all tabs and contents
        seasonTabs.forEach((t) => t.classList.remove("active"))
        seasonContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        tab.classList.add("active")
        const targetContent = document.querySelector(`.season-content[data-season="${season}"]`)
        if (targetContent) {
          targetContent.classList.add("active")

          // Populate team members for the selected season
          populateTeamMembers(season)

          console.log(" Season content switched to:", season)
        }
      })
    })

    const activeSeason = document.querySelector(".season-tab.active")
    if (activeSeason) {
      const initialSeason = activeSeason.getAttribute("data-season")
      populateTeamMembers(initialSeason)
      console.log(" Initialized with season:", initialSeason)
    }
  }
})

console.log("JavaScript code for mobile compatibility has been updated and optimized.")
