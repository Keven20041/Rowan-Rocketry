document.addEventListener("DOMContentLoaded", () => {
  const seasonSelect = document.getElementById("season-select")
  const projectSections = document.querySelectorAll(".project-section")

  // Function to show/hide sections based on selected season
  function updateSeasonContent(selectedSeason) {
    projectSections.forEach((section) => {
      const sectionSeason = section.getAttribute("data-season")

      if (sectionSeason === selectedSeason) {
        section.style.display = "block"
        // Fade in animation
        section.style.opacity = "0"
        setTimeout(() => {
          section.style.transition = "opacity 0.5s ease-in"
          section.style.opacity = "1"
        }, 10)
      } else {
        section.style.display = "none"
      }
    })

    // Reinitialize sliders for the newly visible sections
    initializeSliders()

    // Store the selected season in localStorage
    localStorage.setItem("selectedSeason", selectedSeason)
  }

  // Function to initialize image sliders for visible sections
  function initializeSliders() {
    const visibleSliders = document.querySelectorAll('.project-section[style*="display: block"] .image-slider')

    visibleSliders.forEach((slider) => {
      const container = slider.querySelector(".slider-container")
      const items = slider.querySelectorAll(".slider-item")

      // Reset slider position
      if (container) {
        container.style.transform = "translateX(0)"
      }
    })
  }

  // Event listener for season selector
  if (seasonSelect) {
    seasonSelect.addEventListener("change", (e) => {
      const selectedSeason = e.target.value
      updateSeasonContent(selectedSeason)

      // Smooth scroll to first project section
      const firstVisibleSection = document.querySelector('.project-section[style*="display: block"]')
      if (firstVisibleSection) {
        setTimeout(() => {
          firstVisibleSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    })

    const savedSeason = localStorage.getItem("selectedSeason") || "2024-2025"
    seasonSelect.value = savedSeason
    updateSeasonContent(savedSeason)
  }
})
