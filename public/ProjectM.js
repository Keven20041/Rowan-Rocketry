document.addEventListener("DOMContentLoaded", () => {
    // View Designs and View Estimates functionality
    const viewDesignsButton = document.querySelector("#preliminary-designs .cta-button")
    const viewEstimatesButton = document.querySelector("#cost-estimates .cta-button")
  
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
  
    // View Designs button click handler
    if (viewDesignsButton) {
      viewDesignsButton.addEventListener("click", (e) => {
        e.preventDefault()
  
        const designsContent = `
                  <h2>Preliminary Designs</h2>
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
                          <img src="/media/RecoverySection.png" alt="Recovery System Design" />
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
                          <img src="/media/PayloadSection.png" alt="Payload Section Design" />
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
                          <img src="/media/MotorSection.png" alt="Motor Section Design" />
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
                          <img src="/media/FinsSection.png" alt="Fin Design" />
                          <p>Details:</p>
                          <ul>
                              <li>Material: G10 (Woven Fiberglass cloth & Epoxy resin) </li>
                              <li>Configuration: 4 fins | 90° apart</li>
                          </ul>
                      </div>
                  </div>
              `
        openModal(designsContent)
      })
    }
  
    // View Estimates button click handler
    if (viewEstimatesButton) {
      viewEstimatesButton.addEventListener("click", (e) => {
        e.preventDefault()
  
        const estimatesContent = `
                  <h2>Project Cost Estimates</h2>
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
  
        openModal(estimatesContent)
      })
    }
  
    console.log("View Designs and View Estimates functionality initialized.")
  })
  
  