/* ==========================================================================
   HAMSA HOLDINGS INTERACTIVE JAVASCRIPT
   Handles: Scroll effects, Mobile Menu, Live Catalog Filtering, 
            Vehicle Details Modal, and WhatsApp Form Generation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- State variables ---
    let currentBrandFilter = "all";
    let currentConditionFilter = "all";
    let searchQuery = "";
    let currentSort = "default";

    // --- DOM Elements ---
    const header = document.querySelector(".header");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const carGrid = document.getElementById("carGrid");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const brandFilters = document.getElementById("brandFilters");
    const conditionFilter = document.getElementById("conditionFilter");
    
    // Modal Elements
    const carModal = document.getElementById("carModal");
    const modalContent = document.getElementById("modalContent");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalBackdrop = document.getElementById("modalBackdrop");

    // Contact Form Element
    const contactForm = document.getElementById("contactForm");

    // --- 1. Sticky Header Scroll Effect ---
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- 2. Mobile Responsive Hamburger Menu ---
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking navigation links
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            hamburgerBtn.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- 3. Inventory Rendering & Filtering ---
    
    // Format Price helper (e.g., 43500 -> $43,500)
    function formatPrice(price) {
        return "$" + price.toLocaleString("en-US");
    }

    // Format Mileage helper (e.g., 18500 -> 18,500 km)
    function formatMileage(mileage) {
        if (mileage === 0) return "New";
        return mileage.toLocaleString("en-US") + " km";
    }

    // Main Render Function
    function renderInventory(cars) {
        carGrid.innerHTML = "";

        if (cars.length === 0) {
            carGrid.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-car-tunnel"></i>
                    <h3>No Vehicles Found</h3>
                    <p>Try adjusting your search filters or contact us to request a custom search.</p>
                </div>
            `;
            return;
        }

        cars.forEach(car => {
            const isNew = car.condition === "New";
            const card = document.createElement("div");
            card.className = "car-card";
            card.innerHTML = `
                <div class="car-image-wrapper">
                    <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-img">
                    <span class="badge-condition ${isNew ? 'new' : ''}">${car.condition}</span>
                    <span class="badge-fuel">${car.fuel}</span>
                </div>
                <div class="car-info">
                    <span class="car-brand">${car.brand}</span>
                    <h3 class="car-name" title="${car.brand} ${car.model}">${car.model}</h3>
                    
                    <div class="car-specs">
                        <div class="spec-item">
                            <i class="fa-solid fa-calendar"></i>
                            <span class="spec-value">${car.year}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-gauge-high"></i>
                            <span class="spec-value">${formatMileage(car.mileage)}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fa-solid fa-gear"></i>
                            <span class="spec-value">${car.transmission}</span>
                        </div>
                    </div>

                    <div class="car-footer">
                        <div class="price-box">
                            <span class="price-label">FOB Price</span>
                            <span class="price-amount">${formatPrice(car.price)}</span>
                        </div>
                        <div class="card-actions">
                            <button class="btn-icon-only details-trigger" data-id="${car.id}" title="View Specifications">
                                <i class="fa-solid fa-circle-info"></i>
                            </button>
                            <a href="https://wa.me/821012345678?text=${encodeURIComponent(`Hello Hamsa Holdings! I am interested in the ${car.brand} ${car.model} (${car.year}, FOB: ${formatPrice(car.price)}). Please provide more details.`)}" 
                               target="_blank" class="btn btn-primary" title="Inquire on WhatsApp">
                                <i class="fa-brands fa-whatsapp"></i> Inquire
                            </a>
                        </div>
                    </div>
                </div>
            `;
            carGrid.appendChild(card);
        });

        // Add event listeners to newly rendered "View Details" buttons
        document.querySelectorAll(".details-trigger").forEach(btn => {
            btn.addEventListener("click", () => {
                const carId = btn.getAttribute("data-id");
                openModal(carId);
            });
        });
    }

    // Main Filter Logic
    function applyFilters() {
        let filtered = [...CARS_DATA];

        // Apply Brand filter
        if (currentBrandFilter !== "all") {
            filtered = filtered.filter(car => car.brand.toLowerCase() === currentBrandFilter.toLowerCase());
        }

        // Apply Condition filter
        if (currentConditionFilter !== "all") {
            filtered = filtered.filter(car => car.condition.toLowerCase() === currentConditionFilter.toLowerCase());
        }

        // Apply Search query filter
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(car => 
                car.brand.toLowerCase().includes(query) ||
                car.model.toLowerCase().includes(query) ||
                car.year.toString().includes(query) ||
                car.fuel.toLowerCase().includes(query) ||
                car.transmission.toLowerCase().includes(query)
            );
        }

        // Apply Sorting
        if (currentSort === "price-asc") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentSort === "price-desc") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (currentSort === "year-desc") {
            filtered.sort((a, b) => b.year - a.year);
        }

        renderInventory(filtered);
    }

    // --- 4. Event Listeners for Filters ---
    
    // Search input
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        applyFilters();
    });

    // Sort select
    sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        applyFilters();
    });

    // Brand tag buttons
    brandFilters.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-tag")) {
            // Toggle active classes
            document.querySelectorAll(".filter-tag").forEach(tag => tag.classList.remove("active"));
            e.target.classList.add("active");

            currentBrandFilter = e.target.getAttribute("data-brand");
            applyFilters();
        }
    });

    // Condition toggle buttons
    conditionFilter.addEventListener("click", (e) => {
        if (e.target.classList.contains("toggle-btn")) {
            // Toggle active classes
            document.querySelectorAll(".toggle-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            currentConditionFilter = e.target.getAttribute("data-condition");
            applyFilters();
        }
    });

    // Global Brand Filter utility (for footer links/navigation overrides)
    window.filterByBrand = function(brandName) {
        const tag = document.querySelector(`.filter-tag[data-brand="${brandName}"]`);
        if (tag) {
            tag.click();
        } else if (brandName === "all") {
            document.querySelector('.filter-tag[data-brand="all"]').click();
        }
    };

    // --- 5. Modal Operations (Car Details View) ---

    function openModal(carId) {
        const car = CARS_DATA.find(item => item.id === carId);
        if (!car) return;

        const isNew = car.condition === "New";
        const whatsappMsg = `Hello Hamsa Holdings! I would like to query export details for the vehicle: ${car.brand} ${car.model} (${car.year}, Ref: ${car.id}). Details: FOB ${formatPrice(car.price)}, Mileage ${formatMileage(car.mileage)}.`;
        
        modalContent.innerHTML = `
            <div class="modal-img-container">
                <img src="${car.image}" alt="${car.brand} ${car.model}">
            </div>
            <div class="modal-details">
                <span class="modal-brand">${car.brand}</span>
                <h2 class="modal-name">${car.model}</h2>
                
                <div class="modal-price-area">
                    <span class="price-label">Export FOB Price</span>
                    <div class="modal-price-val">${formatPrice(car.price)}</div>
                </div>

                <div class="specs-list-grid">
                    <div class="spec-list-item">
                        <i class="fa-solid fa-calendar"></i>
                        <span>Year: <strong>${car.year}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-gauge-high"></i>
                        <span>Mileage: <strong>${formatMileage(car.mileage)}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-gas-pump"></i>
                        <span>Fuel Type: <strong>${car.fuel}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-gear"></i>
                        <span>Transmission: <strong>${car.transmission}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-microchip"></i>
                        <span>Engine: <strong>${car.engine}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-compass"></i>
                        <span>Drive Type: <strong>${car.driveType}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-palette"></i>
                        <span>Exterior Color: <strong>${car.color}</strong></span>
                    </div>
                    <div class="spec-list-item">
                        <i class="fa-solid fa-circle-check"></i>
                        <span>Status: <strong>${car.condition} stock</strong></span>
                    </div>
                </div>

                <div class="features-tags-wrap">
                    <h4 class="features-tags-title">Key Package Options</h4>
                    <div class="features-tags">
                        ${car.features.map(f => `<span class="feature-pill">${f}</span>`).join('')}
                    </div>
                </div>

                <p class="modal-desc">${car.description}</p>

                <a href="https://wa.me/821012345678?text=${encodeURIComponent(whatsappMsg)}" 
                   target="_blank" class="btn btn-primary btn-full-width">
                    <i class="fa-brands fa-whatsapp"></i> Start WhatsApp Export Inquiry
                </a>
            </div>
        `;

        carModal.classList.add("active");
        carModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    function closeModal() {
        carModal.classList.remove("active");
        carModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; // Re-enable background scrolling
    }

    modalCloseBtn.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", closeModal);
    
    // Close modal on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && carModal.classList.contains("active")) {
            closeModal();
        }
    });

    // --- 6. Form Submission Logic to WhatsApp ---
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("clientName").value;
        const phone = document.getElementById("clientPhone").value;
        const email = document.getElementById("clientEmail").value || "Not provided";
        const carRequest = document.getElementById("carRequest").value || "General inquiry";
        const message = document.getElementById("clientMessage").value || "No extra message";

        const textMsg = `Hello Hamsa Holdings!
My name is ${name}. I am looking to import a vehicle from Korea.
Details:
- Phone/WhatsApp: ${phone}
- Email: ${email}
- Requested Car: ${carRequest}
- Extra Info: ${message}`;

        const whatsappURL = `https://wa.me/821012345678?text=${encodeURIComponent(textMsg)}`;
        
        // Open WhatsApp chat in a new tab
        window.open(whatsappURL, "_blank");
        
        // Reset form
        contactForm.reset();
        alert("Thank you! Your request details have been generated. We are opening WhatsApp to submit your message directly to Hamsa Holdings.");
    });

    // --- Initial Call ---
    renderInventory(CARS_DATA);
});
