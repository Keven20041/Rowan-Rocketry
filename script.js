document.addEventListener("DOMContentLoaded", () => {
  // Season data for different years
  const seasonData = {
    "2024-2025": {
      overview: {
        text: "The Rowan University Rocketry Team participates in the Spaceport America Cup, the world's largest intercollegiate rocket engineering competition, which will take place in June 2025. Each year, over 150 schools from around the globe gather in New Mexico to compete, with thousands of students, faculty, and industry professionals in attendance. This event provides a unique opportunity for students to apply their knowledge by designing, building, and launching rockets.",
        image: "/launch.jpg",
      },
      mission: {
        text: `<p>Our mission for this year's competition is to construct a sounding rocket capable of exceeding an altitude of 10,000 feet. The team is organized into six specialized sub-teams—airframe, avionics, payload, recovery, propulsion, and operations/logistics. Each sub-team plays a critical role in the development process, from structural design to data transmission and safe recovery, ensuring the success of our rocket.</p>
               <p>Beyond the technical aspects, the project fosters hands-on learning and professional development in areas such as problem-solving, teamwork, and project management. By engaging with real-world aerospace applications, our team members acquire essential skills for careers in the aerospace industry, gaining both practical experience and a solid foundation in rocket science.</p>`,
        image: "/GroupPhoto.jpg",
      },
      about: {
        text: "Rowan Rocketry is a student organization dedicated to the advancement of rocketry and aerospace engineering. Our mission is to provide students with the opportunity to gain hands-on experience in the field of aerospace engineering and to foster a community of like-minded individuals who are passionate about space exploration.",
        image: "/openpic.png",
      },
    },
    "2025-2026": {
      overview: {
        text: "The Rowan University Rocketry Team is competing in the International Rocketry Engineering Competition (IREC), the world’s largest intercollegiate rocketry competition, set for June 2026. Each year, more than 150 universities from across the globe converge in Midland, Texas, to showcase their designs, with thousands of students, faculty, and industry professionals in attendance. This event offers students an unparalleled chance to put their skills into practice as they design, build, and launch high-powered rockets.",
        image: "2025-2026/2025-2026Profecy.png",
      },
      mission: {
        text: `<p>Our mission for this year's competition is to design and launch a rocket that will reach an altitude of more than 10,000 feet. To achieve this goal, our team is organized into six specialized sub-teams, including airframe, avionics, payload, recovery, propulsion, and operations/logistics. Each sub-team contributes a vital piece of the process, ranging from structural design to data transmission and safe recovery, ensuring a fully integrated and successful launch.</p>
               <p>Besides building the rocket itself, the project provides members with hands-on experience and professional development, beyond the classroom in areas such as problem-solving, teamwork, and project management. By working on real-world aerospace challenges, our team members not only gain practical knowledge but also prepare themselves for impactful careers in the aerospace industry. </p>`,
        image: "2025-2026/2025-2026TeamL.jpg",
      },
      about: {
        text: `Rowan Rocketry is a student-led organization focused on advancing rocketry and aerospace innovation. We strive to give students hands-on opportunities to design, build, and launch rockets while developing technical skills that extend beyond the classroom. Our mission is to create and inspire a collaborative community of aspiring engineers in the field of aerospace engineering who share a passion for pushing the boundaries of space exploration. `,
        image: "/openpic.png",
      },
    },
  }

  // DOM elements
  const header = document.querySelector(".cosmic-header")
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")
  const navItems = document.querySelectorAll(".nav-item")
  const scrollTopBtn = document.querySelector(".scroll-top")
  const tabButtons = document.querySelectorAll(".tab-button")

  // Content elements
  const overviewText = document.getElementById("overview-text")
  const overviewImage = document.getElementById("overview-image")
  const missionText = document.getElementById("mission-text")
  const missionImage = document.getElementById("mission-image")
  const aboutText = document.getElementById("about-text")
  const aboutImage = document.getElementById("about-image")

  // Current season
  let currentSeason = "2024-2025"

  // Season tab functionality
  function switchSeason(season) {
    if (season === currentSeason) return

    // Add fade out effect
    const contentElements = [overviewText, overviewImage, missionText, missionImage, aboutText, aboutImage]
    contentElements.forEach((el) => el.classList.add("content-fade"))

    setTimeout(() => {
      // Update content
      const data = seasonData[season]

      overviewText.textContent = data.overview.text
      overviewImage.src = data.overview.image
      overviewImage.alt = season === "2024-2025" ? "Spaceport America Cup" : "Advanced Rocket Design"

      missionText.innerHTML = data.mission.text
      missionImage.src = data.mission.image
      missionImage.alt = season === "2024-2025" ? "Rowan Rocketry Team" : "Advanced Rocket Team"

      aboutText.textContent = data.about.text
      aboutImage.src = data.about.image
      aboutImage.alt = season === "2024-2025" ? "Rowan Rocketry Team" : "Large Rowan Rocketry Team"

      // Update active tab
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      document.querySelector(`[data-season="${season}"]`).classList.add("active")

      currentSeason = season

      // Fade back in
      contentElements.forEach((el) => {
        el.classList.remove("content-fade")
        el.classList.add("content-visible")
      })
    }, 300)
  }

  // Tab button event listeners
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const season = button.getAttribute("data-season")
      switchSeason(season)
    })
  })

  // Create menu overlay if it doesn't exist
  let menuOverlay = document.querySelector(".menu-overlay")
  if (!menuOverlay) {
    menuOverlay = document.createElement("div")
    menuOverlay.className = "menu-overlay"
    document.body.appendChild(menuOverlay)
  }

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

  // Initialize content visibility
  const contentElements = [overviewText, overviewImage, missionText, missionImage, aboutText, aboutImage]
  contentElements.forEach((el) => el.classList.add("content-visible"))
})
