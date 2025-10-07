// Season data with complete content for each season
const seasonData = {
  "2024-2025": {
    hero: {
      title: "Support Rowan Rocketry",
      description: "Join us in our mission to push the boundaries of student rocketry and aerospace innovation.",
    },
    about: {
      content: `
        <p>The Rowan University Rocketry Team participates in the annual International Rocket Engineering Competition, the world's largest intercollegiate rocket engineering competition. With over 150 schools from 22 countries, this event brings together thousands of students, faculty, and industry professionals.</p>
        <p>Our team of 20 interdisciplinary engineering students is divided into six sub-teams: airframe, avionics, payload, recovery, propulsion, and fins. Each sub-team is integral to the rocket's development, from structural design to data transmission and recovery.</p>
        <p>This project not only pushes technical boundaries but also fosters teamwork, problem-solving, and professional development, preparing us for careers in aerospace engineering.</p>
      `,
      teamPhoto: "2024Group.jpg",
    },
    teamCaptain: {
      name: "Rowen Christianson",
      image: "rowenh.jpg",
    },
    teamLeads: [
      { name: "AIDAN SHARPE", role: "AVIONICS", image: "tAidan.jpg" },
      { name: "BAMIDELE OBADINA", role: "AIRFRAME", image: "tbamidale.jpg" },
      { name: "NOLAN HEANEY", role: "FINS", image: "tNolan.jpg" },
      { name: "JARED CRANE", role: "PROPULSION", image: "tJared.jpg" },
      { name: "JAMES LEE", role: "PAYLOAD", image: "tjames.jpg" },
      { name: "DANIEL RODRIGUEZ", role: "RECOVERY", image: "tdaniel.jpg" },
    ],
    rocket: {
      title: "PAST ROCKET",
      diagram: "RowanRocket.PNG",
      history:
        "Rowan Rocketry made history last year with the successful launch at nationals, at the 2023 Spaceport America Cup. Competing against 75 teams, we proudly placed first and achieved a major milestone. Our rocket soared to new heights, breaking all team records and proving our talent and skill, yet having all the lessons learned and getting us just to succeed, but to win, at the 2024 launch.",
      images: ["fullR.png", "Rocketfar.png"],
    },
    subSystems: {
      recovery: "recovery.png",
      avionics: "avionics.png",
      airframe: "airframe.png",
      propulsion: "propulsion.png",
      payload: "payload.png",
      fins: "fins.png",
    },
    sponsors: {
      tier1: [
        {
          name: "JMJ Profile Inc",
          logo: "JMJ.svg",
          description: "Specializing in Machining Plastic & Phenolic Sheets.",
          website: "https://www.jmjprofile.com/",
        },
      ],
      tier2: [],
      tier3: [],
      tier4: [],
    },
  },
  "2025-2026": {
    hero: {
      title: "Support Our Next Mission",
      description:
        "Help us reach new heights in the 2025-2026 season with advanced rocket technology and expanded team capabilities.",
    },
    about: {
      content: `
        <p>Hailing from Glassboro, New Jersey, the Rowan University Rocketry
Team competes in the International Rocket Engineering Competition—
the world's largest intercollegiate rocket engineering challenge
featuring over 150 universities from 22 countries. Our 2026 mission:
design, build, and launch a sounding rocket reaching 10,000 feet in
altitude.</p>
        <p>Our team of 20 interdisciplinary engineering students operates
through six specialized sub-teams: airframe, avionics, payload,
recovery, propulsion, and aerodynamics. This hands-on experience
develops skills that directly translate to careers at leading aerospace
companies like NASA, SpaceX, Boeing, and Lockheed Martin. When
you support Rowan Rocketry, you're investing in tomorrow's
aerospace innovators.</p>
      `,
      teamPhoto: "2025-2026/2025-2026TeamPhoto.jpg",
    },
    teamCaptain: {
      name: "James Lee",
      image: "2025-2026/James.jpg",
    },
    teamLeads: [
      { name: "Marian Yanka", role: "AVIONICS", image: "2025-2026/Marian.jpg" },
      { name: "Nolan Heaney", role: "AIRFRAME/FINS", image: "2025-2026/Nolan.jpg" },
      { name: "Kuba Jadoga", role: "PROPULSION", image: "2025-2026/Kuba.jpg" },
      { name: "Dharma Upadhyay", role: "PAYLOAD", image: "2025-2026/Dharma.jpg" },
      { name: "Paul Porreca", role: "RECOVERY", image: "2025-2026/Paul.jpg" },
    ],
    rocket: {
      title: "CURRENT ROCKET DEVELOPMENT",
      diagram: "2025-2026/TechRocket.png?height=400&width=600&query=advanced rocket design blueprint 2025",
      history:
        "Rowan Rocketry is back for the 2025–2026 IREC competition. We return with greater ambition and sharper focus. This year, our mission is to push the boundaries of engineering, teamwork, and innovation even further—designing a rocket capable of not only exceeding 10,000 feet, but also showcasing advanced avionics, payload integration, and recovery systems. With lessons learned from our previous season, we aim to raise the bar for what Rowan Rocketry can achieve on the national stage.",
      images: [
        "fullR.png?height=300&width=400&query=futuristic rocket launch",
        "Rocketfar.png?height=300&width=400&query=advanced rocket in flight",
      ],
    },
    subSystems: {
      recovery: "recovery.png?height=300&width=400&query=advanced recovery system 2025",
      avionics: "avionics.png?height=300&width=400&query=AI powered flight computer PCB",
      airframe: "airframe.png?height=300&width=400&query=carbon fiber rocket airframe",
      propulsion: "propulsion.png?height=300&width=500&query=hybrid rocket engine 2025",
      payload: "payload.png?height=300&width=500&query=autonomous rover payload 2025",
      fins: "fins.png?height=300&width=500&query=advanced rocket fins design",
    },
    sponsors: {
      tier1: [
        {
         name: "JMJ Profile Inc",
          logo: "JMJ.svg",
          description: "Specializing in Machining Plastic & Phenolic Sheets.",
          website: "https://www.jmjprofile.com/",
        },
        {
          name: "Dekker",
          logo: "2025-2026/Dekker.jpg",
          description: "Full-Service Architecture and Design Firm",
          website: "https://www.dekkerdesign.org/",
        },
      ],
        tier2: [
        {
          name: "TriState Construction",
          logo: "TriState.png",
          description: "Delivers expert concrete solutions for commercial and residential projects.",
          website: "https://www.tristateconstructionnj.com/",
        },
      ],
        tier4: [
       {
          name: "Southco",
          logo: "Southcopic.jpg",
          description: "Global designer and manufacturer of engineered access solutions.",
          website: "https://southco.com/en_us_int/",
        },
      ],
        tier5: [
      ],
    },
  },
}

let currentSeason = "2024-2025"

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  initializeSeasonTabs()
  initializeSponsorTabs()
  initializeMobileMenu()
  initializeScrollEffects()
  updateSeasonContent(currentSeason)
})

function initializeSeasonTabs() {
  const seasonTabs = document.querySelectorAll(".season-tab")

  seasonTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const season = this.dataset.season

      // Update active tab
      seasonTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Update content
      updateSeasonContent(season)
      currentSeason = season

      // Reset sponsor tabs to tier4
      const sponsorTabs = document.querySelectorAll(".tab-btn")
      const sponsorContents = document.querySelectorAll(".tab-content")

      sponsorTabs.forEach((t) => t.classList.remove("active"))
      sponsorContents.forEach((c) => c.classList.remove("active"))

      document.querySelector('[data-tab="tier4"]').classList.add("active")
      document.getElementById("tier4").classList.add("active")
    })
  })
}

function updateSeasonContent(season) {
  const data = seasonData[season]

  // Add fade transition
  const mainContent = document.querySelector("main")
  mainContent.classList.add("fade-transition")

  setTimeout(() => {
    // Update hero section
    document.getElementById("hero-title").textContent = data.hero.title
    document.getElementById("hero-description").textContent = data.hero.description

    // Update about section
    document.getElementById("about-content").innerHTML = data.about.content
    document.getElementById("team-photo").src = data.about.teamPhoto

    updateTeamCaptain(data.teamCaptain)

    // Update team leads
    updateTeamLeads(data.teamLeads)

    updateSubSystemImages(data.subSystems)

    // Update rocket section
    document.getElementById("rocket-section-title").textContent = data.rocket.title
    document.getElementById("rocket-diagram").src = data.rocket.diagram
    document.getElementById("rocket-history").textContent = data.rocket.history

    // Update launch images
    const launchImages = document.getElementById("launch-images")
    launchImages.innerHTML = data.rocket.images
      .map((img) => `<img src="${img}" alt="Rocket launch image" class="launch-image">`)
      .join("")

    // Update sponsors
    updateSponsors(data.sponsors)

    // Remove fade transition
    mainContent.classList.remove("fade-transition")
    mainContent.classList.add("active")
  }, 150)
}

function updateTeamCaptain(captain) {
  const captainElement = document.getElementById("team-captain")
  if (captainElement) {
    captainElement.innerHTML = `
      <img src="${captain.image}" alt="${captain.name} - Team Captain">
      <h3>Team Captain</h3>
      <p>${captain.name}</p>
    `
  }
}

function updateTeamLeads(leads) {
  const grid = document.getElementById("team-leads-grid")
  grid.innerHTML = leads
    .map(
      (lead) => `
    <div class="profile-card">
      <img src="${lead.image}" alt="${lead.name} - ${lead.role} Lead">
      <h4>${lead.role}</h4>
      <p>${lead.name}</p>
    </div>
  `,
    )
    .join("")
}

function updateSponsors(sponsors) {
  // Update each tier
  Object.keys(sponsors).forEach((tier) => {
    const container = document.getElementById(`${tier}-content`)
    if (container) {
      container.innerHTML = sponsors[tier]
        .map(
          (sponsor) => `
        <div class="sponsor-card">
          <img src="${sponsor.logo}" alt="${sponsor.name} Logo" class="sponsor-logo">
          <h3 class="sponsor-name">${sponsor.name}</h3>
          <p class="sponsor-description">${sponsor.description}</p>
          <a href="${sponsor.website}" class="sponsor-link">Visit Website</a>
        </div>
      `,
        )
        .join("")
    }
  })

  // Update all sponsors tab
  const allSponsors = Object.values(sponsors).flat()
  const allContainer = document.getElementById("all-content")
  allContainer.innerHTML = allSponsors
    .map((sponsor, index) => {
      const tierNum = Object.keys(sponsors)
        .find((key) => sponsors[key].includes(sponsor))
        .replace("tier", "")
      return `
      <div class="sponsor-card tier-${tierNum}-card">
        <div class="tier-badge">Tier ${tierNum}</div>
        <img src="${sponsor.logo}" alt="${sponsor.name} Logo" class="sponsor-logo">
        <h3 class="sponsor-name">${sponsor.name}</h3>
        <p class="sponsor-description">${sponsor.description}</p>
        <a href="${sponsor.website}" class="sponsor-link">Visit Website</a>
      </div>
    `
    })
    .join("")
}

// Existing sponsor tab functionality
function initializeSponsorTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.dataset.tab

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(targetTab).classList.add("active")
    })
  })
}

function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navList = document.querySelector(".nav-list")
  const menuOverlay = document.querySelector(".menu-overlay")
  const cosmicHeader = document.querySelector(".cosmic-header")

  mobileMenuToggle.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true"

    this.setAttribute("aria-expanded", !isExpanded)
    this.classList.toggle("active")
    navList.classList.toggle("active")
    menuOverlay.classList.toggle("active")
    cosmicHeader.classList.toggle("menu-open")

    document.body.style.overflow = isExpanded ? "auto" : "hidden"
  })

  menuOverlay.addEventListener("click", () => {
    mobileMenuToggle.click()
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("active")) {
        mobileMenuToggle.click()
      }
    })
  })
}

function initializeScrollEffects() {
  const scrollTopButton = document.querySelector(".scroll-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add("visible")
    } else {
      scrollTopButton.classList.remove("visible")
    }
  })

  scrollTopButton.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

function updateSubSystemImages(subSystems) {
  // Update recovery system image
  const recoveryImg = document.querySelector(".system-item:nth-child(1) .system-image img")
  if (recoveryImg) recoveryImg.src = subSystems.recovery

  // Update avionics system image
  const avionicsImg = document.querySelector(".system-item:nth-child(2) .system-image img")
  if (avionicsImg) avionicsImg.src = subSystems.avionics

  // Update airframe system image
  const airframeImg = document.querySelector(".system-item:nth-child(3) .system-image img")
  if (airframeImg) airframeImg.src = subSystems.airframe

  // Update propulsion system image
  const propulsionImg = document.querySelector(".system-item:nth-child(4) .system-image img")
  if (propulsionImg) propulsionImg.src = subSystems.propulsion

  // Update payload system image
  const payloadImg = document.querySelector(".system-item:nth-child(5) .system-image img")
  if (payloadImg) payloadImg.src = subSystems.payload

  // Update fins system image
  const finsImg = document.querySelector(".system-item:nth-child(6) .system-image img")
  if (finsImg) finsImg.src = subSystems.fins
}
