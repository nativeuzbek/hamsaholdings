/* ==========================================================================
   HAMSA HOLDINGS INTERACTIVE JAVASCRIPT
   Handles: Scroll effects, Mobile Menu, Live Catalog Filtering, 
            Vehicle Details Modal, and WhatsApp Form Generation
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // --- State: unified filter object ---
    let activeFilters = {
        brand: 'all',
        bodyType: 'all',
        budgetMin: 0,
        budgetMax: 999999,
        condition: 'all',
        search: ''
    };

    // --- Parse URL Parameters for cross-page filtering ---
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('brand') && urlParams.get('brand') !== 'all') activeFilters.brand = urlParams.get('brand');
    if (urlParams.has('model') && urlParams.get('model') !== 'all') activeFilters.search = urlParams.get('model');
    if (urlParams.has('budgetMax')) activeFilters.budgetMax = Number(urlParams.get('budgetMax'));

    // --- Hero Search Widget Initialization ---
    const heroBrandSelect = document.getElementById("heroBrandSelect");
    const heroModelSelect = document.getElementById("heroModelSelect");
    
    if (heroBrandSelect && heroModelSelect && typeof CARS_DATA !== 'undefined') {
        const uniqueBrands = [...new Set(CARS_DATA.map(car => car.brand))].sort();
        uniqueBrands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand;
            option.textContent = brand;
            heroBrandSelect.appendChild(option);
        });
        
        heroBrandSelect.addEventListener("change", (e) => {
            const selectedBrand = e.target.value;
            heroModelSelect.innerHTML = '<option value="all">All Models</option>';
            if (selectedBrand === 'all') {
                heroModelSelect.disabled = true;
            } else {
                heroModelSelect.disabled = false;
                const brandModels = [...new Set(CARS_DATA.filter(car => car.brand === selectedBrand).map(car => car.model))].sort();
                brandModels.forEach(model => {
                    const option = document.createElement("option");
                    option.value = model;
                    option.textContent = model;
                    heroModelSelect.appendChild(option);
                });
            }
        });
    }

    // --- DOM Elements ---
    const header = document.querySelector(".header");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");
    const carGrid = document.getElementById("carGrid");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const brandLogoGrid = document.getElementById("brandLogoGrid");
    const bodyTypeFilter = document.getElementById("bodyTypeFilter");
    const budgetFilter = document.getElementById("budgetFilter");
    const conditionFilter = document.getElementById("conditionFilter");
    const resultsCount = document.getElementById("resultsCount");
    const clearFiltersBtn = document.getElementById("clearFiltersBtn");
    
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
                window.location.href = '/car/' + carId;
            });
        });
    }

    // Master Filter Logic (unified)
    function applyFilters() {
        let filtered = CARS_DATA.filter(car => {
            // Brand filter
            if (activeFilters.brand !== 'all' && car.brand !== activeFilters.brand) return false;
            // Body type filter
            if (activeFilters.bodyType !== 'all' && car.bodyType !== activeFilters.bodyType) return false;
            // Budget filter
            if (car.price < activeFilters.budgetMin || car.price > activeFilters.budgetMax) return false;
            // Condition filter
            if (activeFilters.condition !== 'all' && car.condition !== activeFilters.condition) return false;
            // Search filter
            if (activeFilters.search) {
                const q = activeFilters.search.toLowerCase();
                const searchable = `${car.brand} ${car.model} ${car.year} ${car.fuel} ${car.bodyType || ''} ${car.color}`.toLowerCase();
                if (!searchable.includes(q)) return false;
            }
            return true;
        });

        // Sort
        const sortVal = sortSelect ? sortSelect.value : 'default';
        if (sortVal === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortVal === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        else if (sortVal === 'year-desc') filtered.sort((a, b) => b.year - a.year);

        renderInventory(filtered);

        // Update results count
        if (resultsCount) resultsCount.textContent = filtered.length;
    }

    // --- 4. Event Listeners for Filters ---

    // Helper: activate a button within a group and deactivate siblings
    function setActiveButton(container, selector, clickedBtn) {
        if (!container) return;
        container.querySelectorAll(selector).forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
    }

    // 4a. Brand logo buttons
    if (brandLogoGrid) {
        brandLogoGrid.addEventListener('click', (e) => {
            const btn = e.target.closest('.brand-logo-btn');
            if (!btn) return;
            setActiveButton(brandLogoGrid, '.brand-logo-btn', btn);
            activeFilters.brand = btn.getAttribute('data-brand') || 'all';
            applyFilters();
        });
    }

    // 4b. Body type buttons
    if (bodyTypeFilter) {
        bodyTypeFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.body-type-btn');
            if (!btn) return;
            setActiveButton(bodyTypeFilter, '.body-type-btn', btn);
            activeFilters.bodyType = btn.getAttribute('data-bodytype') || 'all';
            applyFilters();
        });
    }

    // 4c. Budget chips
    if (budgetFilter) {
        budgetFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.budget-chip');
            if (!btn) return;
            setActiveButton(budgetFilter, '.budget-chip', btn);
            activeFilters.budgetMin = Number(btn.getAttribute('data-min')) || 0;
            activeFilters.budgetMax = Number(btn.getAttribute('data-max')) || 999999;
            applyFilters();
        });
    }

    // 4d. Condition toggle buttons
    if (conditionFilter) {
        conditionFilter.addEventListener('click', (e) => {
            const btn = e.target.closest('.toggle-btn');
            if (!btn) return;
            setActiveButton(conditionFilter, '.toggle-btn', btn);
            activeFilters.condition = btn.getAttribute('data-condition') || 'all';
            applyFilters();
        });
    }

    // 4e. Search input (debounced)
    let searchDebounceTimer = null;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(() => {
                activeFilters.search = e.target.value;
                applyFilters();
            }, 300);
        });
    }

    // 4f. Sort select
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applyFilters();
        });
    }

    // 4g. Clear all filters button
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset state
            activeFilters = {
                brand: 'all',
                bodyType: 'all',
                budgetMin: 0,
                budgetMax: 999999,
                condition: 'all',
                search: ''
            };

            // Reset UI – remove .active from all filter buttons
            document.querySelectorAll('.brand-logo-btn.active, .body-type-btn.active, .budget-chip.active, .toggle-btn.active').forEach(btn => btn.classList.remove('active'));

            // Set 'all' buttons as active
            const allBrandBtn = document.querySelector('.brand-logo-btn[data-brand="all"]');
            if (allBrandBtn) allBrandBtn.classList.add('active');
            const allBodyBtn = document.querySelector('.body-type-btn[data-bodytype="all"]');
            if (allBodyBtn) allBodyBtn.classList.add('active');
            const allBudgetBtn = document.querySelector('.budget-chip[data-min="0"]');
            if (allBudgetBtn) allBudgetBtn.classList.add('active');
            const allCondBtn = document.querySelector('.toggle-btn[data-condition="all"]');
            if (allCondBtn) allCondBtn.classList.add('active');

            // Clear search input
            if (searchInput) searchInput.value = '';

            // Reset sort
            if (sortSelect) sortSelect.value = 'default';

            applyFilters();
        });
    }

    // Global Brand Filter utility (for footer links/navigation overrides)
    window.filterByBrand = function(brandName) {
        const btn = document.querySelector(`.brand-logo-btn[data-brand="${brandName}"]`);
        if (btn) {
            btn.click();
        } else if (brandName === 'all') {
            const allBtn = document.querySelector('.brand-logo-btn[data-brand="all"]');
            if (allBtn) allBtn.click();
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
    // If URL params set filters, visually update the UI to match
    if (activeFilters.brand !== 'all') {
        const brandBtn = document.querySelector(`.brand-logo-btn[data-brand="${activeFilters.brand}"]`);
        if (brandBtn) {
            document.querySelectorAll('.brand-logo-btn').forEach(btn => btn.classList.remove('active'));
            brandBtn.classList.add('active');
        }
    }
    if (activeFilters.budgetMax !== 999999) {
        const budgetBtn = document.querySelector(`.budget-chip[data-max="${activeFilters.budgetMax}"]`);
        if (budgetBtn) {
            document.querySelectorAll('.budget-chip').forEach(btn => btn.classList.remove('active'));
            budgetBtn.classList.add('active');
        }
    }
    if (activeFilters.search !== '') {
        if (searchInput) searchInput.value = activeFilters.search;
    }

    applyFilters();

    // --- CEO Message Accordion ---
    const ceoToggleBtn = document.getElementById('ceoToggleBtn');
    const ceoContent = document.getElementById('ceoContent');
    const ceoChevron = document.getElementById('ceoChevron');

    if (ceoToggleBtn && ceoContent && ceoChevron) {
        ceoToggleBtn.addEventListener('click', () => {
            const isOpen = ceoContent.classList.contains('open');

            if (isOpen) {
                // Close
                ceoContent.style.maxHeight = '0px';
                ceoContent.classList.remove('open');
                ceoToggleBtn.classList.remove('active');
                ceoChevron.classList.remove('rotated');
                ceoToggleBtn.setAttribute('aria-expanded', 'false');
                ceoContent.setAttribute('aria-hidden', 'true');
            } else {
                // Open
                ceoContent.classList.add('open');
                ceoToggleBtn.classList.add('active');
                ceoChevron.classList.add('rotated');
                ceoToggleBtn.setAttribute('aria-expanded', 'true');
                ceoContent.setAttribute('aria-hidden', 'false');
                
                // Measure and set max-height for smooth animation
                ceoContent.style.maxHeight = ceoContent.scrollHeight + 'px';

                // Smooth scroll into view after animation
                setTimeout(() => {
                    ceoToggleBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 350);
            }
        });
    }
});
