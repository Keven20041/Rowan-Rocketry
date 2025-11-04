document.addEventListener("DOMContentLoaded", () => {
  // Create modal container if it doesn't exist
  let modalContainer = document.querySelector(".modal-container")
  if (!modalContainer) {
    modalContainer = document.createElement("div")
    modalContainer.className = "modal-container"
    document.body.appendChild(modalContainer)

    // Add modal styles
    const modalStyles = document.createElement("style")
    modalStyles.textContent = `
              .modal-container {
                  display: none;
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.8);
                  z-index: 2000;
                  justify-content: center;
                  align-items: center;
                  backdrop-filter: blur(5px);
              }
              .modal {
                  background: linear-gradient(45deg, #000000, #1a1a1a);
                  border: 2px solid var(--secondary);
                  border-radius: 10px;
                  padding: 2rem;
                  max-width: 800px;
                  width: 90%;
                  max-height: 80vh;
                  overflow-y: auto;
                  position: relative;
                  box-shadow: 0 0 30px rgba(255, 204, 0, 0.5);
                  color: var(--text);
              }
              .modal-close {
                  position: absolute;
                  top: 15px;
                  right: 15px;
                  background: none;
                  border: none;
                  color: var(--secondary);
                  font-size: 1.5rem;
                  cursor: pointer;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  transition: background-color 0.3s;
              }
              .modal-close:hover {
                  background-color: rgba(255, 204, 0, 0.2);
              }
              .modal h2 {
                  color: var(--secondary);
                  margin-bottom: 1.5rem;
                  font-family: 'Orbitron', sans-serif;
              }
              .modal-content {
                  margin-bottom: 1rem;
              }
              .design-item, .estimate-item {
                  margin-bottom: 2rem;
                  padding-bottom: 1rem;
                  border-bottom: 1px solid rgba(255, 204, 0, 0.3);
              }
              .design-item:last-child, .estimate-item:last-child {
                  border-bottom: none;
              }
              .design-item h3, .estimate-item h3 {
                  color: var(--accent);
                  margin-bottom: 0.5rem;
                  font-family: 'Orbitron', sans-serif;
              }
              .design-item img {
                  max-width: 100%;
                  border-radius: 8px;
                  margin: 1rem 0;
                  box-shadow: 0 0 15px rgba(255, 204, 0, 0.3);
              }
              .estimate-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 1rem 0;
              }
              .estimate-table th, .estimate-table td {
                  padding: 0.75rem;
                  text-align: left;
                  border-bottom: 1px solid rgba(255, 204, 0, 0.3);
              }
              .estimate-table th {
                  color: var(--secondary);
                  font-weight: bold;
              }
              .estimate-table tr:last-child td {
                  border-bottom: none;
              }
              .total-row {
                  font-weight: bold;
                  color: var(--secondary);
              }
              @media screen and (max-width: 768px) {
                  .modal {
                      padding: 1.5rem;
                      width: 95%;
                  }
              }
          `
    document.head.appendChild(modalStyles)
  }

  // Function to open modal
  function openModal(content) {
    modalContainer.innerHTML = `
              <div class="modal">
                  <button class="modal-close" aria-label="Close modal">×</button>
                  ${content}
              </div>
          `
    modalContainer.style.display = "flex"

    // Add event listener to close button
    const closeButton = modalContainer.querySelector(".modal-close")
    closeButton.addEventListener("click", closeModal)

    // Close modal when clicking outside
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        closeModal()
      }
    })

    // Close modal with Escape key
    document.addEventListener("keydown", handleEscKey)

    // Prevent body scrolling
    document.body.style.overflow = "hidden"
  }

  // Function to close modal
  function closeModal() {
    modalContainer.style.display = "none"
    document.removeEventListener("keydown", handleEscKey)
    document.body.style.overflow = ""
  }

  // Function to handle Escape key
  function handleEscKey(e) {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  const designs2024Content = `
                  <h2>Preliminary Designs - 2024 Season</h2>
                  <div class="modal-content">
                      <div class="design-item">
                          <h3>Nose Cone Design</h3>
                          <p>Our aerodynamic nose cone is designed to minimize drag and optimize the rocket's flight path. The ogive shape provides the best balance between aerodynamic efficiency and structural integrity.</p>
                          <img src="Nose-Cone.png" alt="Nose Cone Design" />
                          <p>Key specifications:</p>
                          <ul>
                              <li>Material: Fiber Glass</li>
                              <li>Length: 39.11 inches </li>
                              <li>Base diameter: 6.18 inches</li>
                          </ul>
                      </div>
                      
                      <div class="design-item">
                          <h3>Recovery System</h3>
                          <p>Our dual-deployment recovery system ensures safe retrieval of the rocket after flight. The system uses redundant altimeters for reliability.</p>
                          <img src="RecoverySection.png" alt="Recovery System Design" />
                          <p>Components:</p>
                          <ul>
                                <li> Material: Ripstop Nylon </li>
                                <li> Recovery System: 27.34 inches | 5.98" diameter</li>
                              <li>Main parachute: 20 inches | 4" diameter | deployed at 1500 ft</li>
                              <li>Drogue parachute: 5.66 inches | 4" in diameter | deployed at apogee</li>
                          </ul>
                      </div>
                      <div class="design-item">
                          <h3>Payload Section</h3>
                          <p>The payload section houses our scientific experiment and telemetry systems. It's designed for easy access and integration.</p>
                          <img src="PayloadSection.png" alt="Payload Section Design" />
                          <p>Features:</p>
                          <ul>
                              <li>Material: Carbon fiber</li>
                              <li>Payload bay: 11.82 inches long | 3.94" diameter</li>
                              <li>GPS tracking system</li>
                              <li>Live data transmission capabilities</li>
                          </ul>
                      </div>
                      
                      <div class="design-item">
                          <h3>Motor Section</h3>
                          <p>The motor section is engineered to safely house our solid rocket motor and provide structural support during the high-stress launch phase.</p>
                          <img src="MotorSection.png" alt="Motor Section Design" />
                          <p>Specifications:</p>
                          <ul>
                            <li> Material: Fiber Glass</li>
                              <li>Motor mount: 38.05 inches | 6" diameter</li>
                              <li> Sustainer Body Tube: 43.75 inches | 6.22" DIameter</li>
                          </ul>
                      </div>
                      
                      <div class="design-item">
                          <h3>Fin Design</h3>
                          <p>Our trapezoidal fins provide stability during flight while minimizing drag. The design has been optimized through extensive CFD analysis.</p>
                          <img src="FinsSection.png" alt="Fin Design" />
                          <p>Details:</p>
                          <ul>
                              <li>Material: G10 (Woven Fiberglass cloth & Epoxy resin) </li>
                              <li>Configuration: 4 fins | 90° apart</li>
                          </ul>
                      </div>
                  </div>
              `

  const estimates2024Content = `
                  <h2>Project Cost Estimates - 2024 Season</h2>
                  <div class="modal-content">
                      <p>Below is a breakdown of our estimated costs for the 2024 Spaceport America Cup competition. These figures represent our best estimates based on current market prices and previous experience.</p>
                      
                      <div class="estimate-item">
                          <h3>Materials and Components</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Item</th>
                                      <th>Quantity</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>6" Dia. 9.6 oz/sq yrd Fiberglass tubular sleeve</td>
                                      <td>11</td>
                                      <td>$35.86</td>
                                  </tr>
                                  <tr>
                                      <td>g12 fiberglass 6" coupler</td>
                                      <td>1</td>
                                      <td>$71</td>
                                  </tr>
                                  <tr>
                                      <td>6 Inch Light Fiberglass Sleeving</td>
                                      <td>32</td>
                                      <td>$101.12</td>
                                  </tr>
                                  <tr>
                                      <td>Motor reloads</td>
                                      <td>3</td>
                                      <td>$900</td>
                                  </tr>
                                  <tr>
                                      <td>Recovery system components</td>
                                      <td>1 set</td>
                                      <td>$650</td>
                                  </tr>
                                  <tr>
                                      <td>Electronics and avionics</td>
                                      <td>1 set</td>
                                      <td>$1,200</td>
                                  </tr>
                                  <tr>
                                      <td>Miscellaneous hardware</td>
                                      <td>Various</td>
                                      <td>$400</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td colspan="2">Subtotal</td>
                                      <td>$4,430</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      
                      <div class="estimate-item">
                          <h3>Travel and Competition Expenses</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Item</th>
                                      <th>Details</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Competition registration</td>
                                      <td>Team entry fee</td>
                                      <td>$850</td>
                                  </tr>
                                  <tr>
                                      <td>Airfare</td>
                                      <td>10 team members</td>
                                      <td>$5,000</td>
                                  </tr>
                                  <tr>
                                      <td>Lodging</td>
                                      <td>5 nights, 3 rooms</td>
                                      <td>$2,250</td>
                                  </tr>
                                  <tr>
                                      <td>Vehicle rental</td>
                                      <td>2 vehicles, 6 days</td>
                                      <td>$1,200</td>
                                  </tr>
                                  <tr>
                                      <td>Meals and incidentals</td>
                                      <td>10 people, 6 days</td>
                                      <td>$3,000</td>
                                  </tr>
                                  <tr>
                                      <td>Shipping and logistics</td>
                                      <td>Equipment transport</td>
                                      <td>$800</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td colspan="2">Subtotal</td>
                                      <td>$13,100</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      
                      <div class="estimate-item">
                          <h3>Testing and Development</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Item</th>
                                      <th>Details</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Subscale test rockets</td>
                                      <td>2 prototypes</td>
                                      <td>$600</td>
                                  </tr>
                                  <tr>
                                      <td>Test motors</td>
                                      <td>4 small motors</td>
                                      <td>$320</td>
                                  </tr>
                                  <tr>
                                      <td>Wind tunnel testing</td>
                                      <td>3 hours</td>
                                      <td>$450</td>
                                  </tr>
                                  <tr>
                                      <td>Software and simulation</td>
                                      <td>Licenses and computing</td>
                                      <td>$300</td>
                                  </tr>
                                  <tr>
                                      <td>Test launch fees</td>
                                      <td>2 launches</td>
                                      <td>$400</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td colspan="2">Subtotal</td>
                                      <td>$2,070</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      
                      <div class="estimate-item">
                          <h3>Total Project Budget</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Category</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Materials and Components</td>
                                      <td>$4,430</td>
                                  </tr>
                                  <tr>
                                      <td>Travel and Competition Expenses</td>
                                      <td>$13,100</td>
                                  </tr>
                                  <tr>
                                      <td>Testing and Development</td>
                                      <td>$2,070</td>
                                  </tr>
                                  <tr>
                                      <td>Contingency (10%)</td>
                                      <td>$1,960</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td><strong>TOTAL ESTIMATED BUDGET</strong></td>
                                      <td><strong>$21,560</strong></td>
                                  </tr>
                              </tbody>
                          </table>
                          <p class="mt-4">Note: This budget represents our best estimate based on current prices and previous experience. Actual costs may vary. We are actively seeking sponsorships to help cover these expenses.</p>
                      </div>
                  </div>
              `
              
  const designs2025Content = `
                  <h2>Design Innovations - 2025 Season</h2>
                  <div class="modal-content">
                      <div class="design-item">
                          <h3>Advanced Carbon Fiber Nose Cone</h3>
                          <p>Our 2025 nose cone features a next-generation carbon fiber composite construction with improved aerodynamic efficiency. The advanced layup schedule provides superior strength-to-weight ratio.</p>
                          <p>Key specifications:</p>
                          <ul>
                              <li>Material: Carbon Fiber Composite (T700)</li>
                              <li>Length: 42 inches</li>
                              <li>Base diameter: 6.5 inches</li>
                              <li>Weight reduction: 25% vs 2024 design</li>
                              <li>Integrated GPS antenna housing</li>
                          </ul>
                      </div>
                      
                      <div class="design-item">
                          <h3>Black Powder Recovery System</h3>
                          <p>Enhanced recovery system with redundant altimeters and improved parachute deployment mechanism. Features real-time telemetry for deployment confirmation.</p>
                          <p>Components:</p>
                          <ul>
                              <li>Material: High-strength Ripstop Nylon</li>
                              <li>Recovery bay: 30 inches | 6.5" diameter</li>
                              <li>Main parachute: 24 inches | deployed at 1000 ft</li>
                              <li>Drogue parachute: 8 inches | deployed at apogee</li>
                              <li>Redundant altimeters with GPS backup</li>
                              <li>CO2 ejection system for reliability</li>
                          </ul>
                      </div>
                      <div class="design-item">
                          <h3>Modular Payload Bay</h3>
                          <p>Revolutionary modular design allows for quick payload swaps and easier maintenance. Features advanced vibration dampening and thermal management.</p>
                          <p>Features:</p>
                          <ul>
                              <li>Material: Carbon fiber with aluminum bulkheads</li>
                              <li>Payload bay: 14 inches long | 4.5" diameter</li>
                              <li>Modular mounting system</li>
                              <li>Real-time data transmission (5.8 GHz)</li>
                              <li>Integrated power distribution system</li>
                              <li>Temperature-controlled environment</li>
                          </ul>
                      </div>
                      
                      <div class="design-item">
                          <h3>Enhanced Motor Section</h3>
                          <p>Redesigned motor section with improved structural integrity and thermal protection. Optimized for higher thrust motors while maintaining safety margins.</p>
                          <p>Specifications:</p>
                          <ul>
                              <li>Material: Carbon Fiber with Phenolic liner</li>
                              <li>Motor mount: 40 inches | 6.5" diameter</li>
                              <li>Sustainer Body Tube: 48 inches | 6.5" diameter</li>
                              <li>Enhanced thermal protection system</li>
                              <li>Integrated motor retention system</li>
                          </ul>
                      </div>
                      
                      <div class="design-item">
                          <h3>Optimized Fin Design</h3>
                          <p>CFD-optimized fin design with swept leading edges for reduced drag. Features through-the-wall construction for maximum strength.</p>
                          <p>Details:</p>
                          <ul>
                              <li>Material: Carbon Fiber G10 composite</li>
                              <li>Configuration: 4 fins | 90° apart</li>
                              <li>Swept design for reduced drag</li>
                              <li>Through-the-wall mounting</li>
                              <li>Tip-to-tip fiberglass reinforcement</li>
                          </ul>
                      </div>
                      <div class="design-item">
                          <h3>Avionics Design</h3>
                          <p>Advanced avionics system with integrated flight computer and telemetry. Designed for real-time data acquisition and processing.</p>
                          <p>Details:</p>
                          <ul>
                              <li>SRAD flight computer</li>
                              <li>COTS System #1: Featherweight GPS and Blue Raven</li>
                              <li>COTS System #2: Telemetrum</li>
                          </ul>
                      </div>
                  </div>
              `

  const estimates2025Content = `
                  <h2>Project Cost Estimates - 2025 Season</h2>
                  <div class="modal-content">
                      <p>Our 2025 budget reflects significant investments in advanced materials and manufacturing techniques. These costs represent our commitment to pushing the boundaries of collegiate rocketry.</p>
                      
                      <div class="estimate-item">
                          <h3>Materials and Components</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Item</th>
                                      <th>Quantity</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Carbon fiber tubing and materials</td>
                                      <td>1 set</td>
                                      <td>$1,800</td>
                                  </tr>
                                  <tr>
                                      <td>Advanced avionics package</td>
                                      <td>1 set</td>
                                      <td>$2,200</td>
                                  </tr>
                                  <tr>
                                      <td>High-power motor reloads</td>
                                      <td>4</td>
                                      <td>$1,400</td>
                                  </tr>
                                  <tr>
                                      <td>Enhanced recovery system</td>
                                      <td>1 set</td>
                                      <td>$950</td>
                                  </tr>
                                  <tr>
                                      <td>Telemetry and GPS systems</td>
                                      <td>1 set</td>
                                      <td>$850</td>
                                  </tr>
                                  <tr>
                                      <td>Composite materials and epoxy</td>
                                      <td>Various</td>
                                      <td>$650</td>
                                  </tr>
                                  <tr>
                                      <td>Precision hardware and fasteners</td>
                                      <td>Various</td>
                                      <td>$550</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td colspan="2">Subtotal</td>
                                      <td>$8,400</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      
                      <div class="estimate-item">
                          <h3>Travel and Competition Expenses</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Item</th>
                                      <th>Details</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Competition registration</td>
                                      <td>Team entry fee</td>
                                      <td>$900</td>
                                  </tr>
                                  <tr>
                                      <td>Airfare</td>
                                      <td>12 team members</td>
                                      <td>$6,000</td>
                                  </tr>
                                  <tr>
                                      <td>Lodging</td>
                                      <td>6 nights, 4 rooms</td>
                                      <td>$3,000</td>
                                  </tr>
                                  <tr>
                                      <td>Vehicle rental</td>
                                      <td>2 vehicles, 7 days</td>
                                      <td>$1,400</td>
                                  </tr>
                                  <tr>
                                      <td>Meals and incidentals</td>
                                      <td>12 people, 7 days</td>
                                      <td>$4,200</td>
                                  </tr>
                                  <tr>
                                      <td>Shipping and logistics</td>
                                      <td>Equipment transport</td>
                                      <td>$1,000</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td colspan="2">Subtotal</td>
                                      <td>$16,500</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      
                      <div class="estimate-item">
                          <h3>Testing and Development</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Item</th>
                                      <th>Details</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Subscale test rockets</td>
                                      <td>3 prototypes</td>
                                      <td>$1,200</td>
                                  </tr>
                                  <tr>
                                      <td>Test motors and propellant</td>
                                      <td>6 test flights</td>
                                      <td>$800</td>
                                  </tr>
                                  <tr>
                                      <td>Wind tunnel testing</td>
                                      <td>5 hours</td>
                                      <td>$750</td>
                                  </tr>
                                  <tr>
                                      <td>CFD simulation software</td>
                                      <td>Annual licenses</td>
                                      <td>$500</td>
                                  </tr>
                                  <tr>
                                      <td>Manufacturing equipment</td>
                                      <td>Tooling and fixtures</td>
                                      <td>$650</td>
                                  </tr>
                                  <tr>
                                      <td>Test launch fees</td>
                                      <td>3 launches</td>
                                      <td>$600</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td colspan="2">Subtotal</td>
                                      <td>$4,500</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      
                      <div class="estimate-item">
                          <h3>Total Project Budget</h3>
                          <table class="estimate-table">
                              <thead>
                                  <tr>
                                      <th>Category</th>
                                      <th>Cost</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <td>Materials and Components</td>
                                      <td>$8,400</td>
                                  </tr>
                                  <tr>
                                      <td>Travel and Competition Expenses</td>
                                      <td>$16,500</td>
                                  </tr>
                                  <tr>
                                      <td>Testing and Development</td>
                                      <td>$4,500</td>
                                  </tr>
                                  <tr>
                                      <td>Contingency (12%)</td>
                                      <td>$3,550</td>
                                  </tr>
                                  <tr class="total-row">
                                      <td><strong>TOTAL ESTIMATED BUDGET</strong></td>
                                      <td><strong>$32,950</strong></td>
                                  </tr>
                              </tbody>
                          </table>
                          <p class="mt-4">Note: This increased budget reflects our investment in advanced materials and manufacturing techniques. We are actively seeking corporate sponsorships and grants to support this ambitious project.</p>
                      </div>
                  </div>
              `

  function attachModalListeners() {
    // Get all CTA buttons
    const allButtons = document.querySelectorAll(".cta-button")

    allButtons.forEach((button) => {
      // Skip if it's an external link
      if (button.getAttribute("href") && button.getAttribute("href").startsWith("http")) {
        return
      }

      button.addEventListener("click", (e) => {
        e.preventDefault()

        // Determine which modal to show based on the button's section
        const section = button.closest(".project-section")
        const sectionId = section ? section.id : ""
        const season = section ? section.getAttribute("data-season") : ""

        let content = ""

        // Match the correct modal content based on section and season
        if (sectionId.includes("preliminary-designs")) {
          content = season === "2025-2026" ? designs2025Content : designs2024Content
        } else if (sectionId.includes("cost-estimates")) {
          content = season === "2025-2026" ? estimates2025Content : estimates2024Content
        }

        if (content) {
          openModal(content)
        }
      })
    })
  }

  // Initialize modal listeners
  attachModalListeners()

  const seasonSelect = document.getElementById("season-select")
  if (seasonSelect) {
    seasonSelect.addEventListener("change", () => {
      // Small delay to ensure DOM is updated
      setTimeout(attachModalListeners, 100)
    })
  }

  console.log("View Designs and View Estimates functionality initialized for both seasons.")
})
