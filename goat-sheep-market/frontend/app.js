/**
 * Goat & Sheep Market - Frontend Core Engine Client
 * Supporting English & Telugu with a dynamic mock database fallback mechanism.
 */

const API_BASE_URL ="https://goat-sheep-market.onrender.com/api";

let state = {
  language: "en",
  theme: "light",
  isOfflineMode: true,
  user: null, // Logged in farmer schema profile object
  token: null, // Active JWT Token value string
  listings: [], // Global array populated from API or mock structures
  userListings: [], // Listings managed by current logged-in seller profile
  activeListingIndex: 0, // Image slider coordinate index pointer
  activeListingImages: [], // Current active images array inside details slider
  formMap: null, // Form Leaflet Map entity reference
  formMarker: null, // Form location pin Leaflet instance 
  detailsMap: null, // Listing details modal Leaflet Map entity instance
  detailsMarker: null // Coordinates marker reference
};

const translations = {
  en: {
    navBrand: "Goat & Sheep Market",
    navHome: "Home",
    navBrowse: "Browse Listings",
    navAuth: "Login / Register",
    navDashboard: "Dashboard",
    navLogout: "Logout",
    heroTag: "Direct Farm Marketplace",
    heroTitle: "Find the Best Livestock Near You",
    heroSubtitle: "Direct trade between local farmers and buyers. Fast, secure, easy, and transparent negotiations.",
    heroBtnBrowse: "Browse Livestock",
    heroBtnSell: "Start Selling",
    statActive: "Active Listings",
    statSold: "Animals Sold",
    statDistricts: "Districts Covered",
    statFarmers: "Registered Farmers",
    latestTitle: "All Listings",
    viewAll: "View All →",
    searchText: "Search Text",
    filterType: "Animal Type",
    filterDistrict: "District",
    filterBreed: "Breed",
    filterSort: "Sort By",
    optAll: "All Types",
    optGoat: "Goat",
    optSheep: "Sheep",
    optLatest: "Latest Uploads",
    optLow: "Lowest Price",
    optHigh: "Highest Price",
    lblAge: "Age",
    lblWeight: "Weight",
    lblDistrict: "District",
    lblVillage: "Village",
    lblPrice: "Sale Price",
    btnDetails: "View Details",
    badgeSold: "SOLD",
    badgeAvailable: "AVAILABLE",
    loginTitle: "Login to Your Account",
    regTitle: "Create Farmer Account",
    lblPhone: "Phone Number",
    lblPass: "Password",
    lblName: "Full Name",
    lblRole: "Role Type",
    btnSignIn: "Sign In",
    btnCreateAcc: "Create Account",
    loginFoot: "Don't have an account?",
    regFoot: "Already have an account?",
    dashTitle: "Seller Dashboard",
    dashDesc: "Manage your active livestock listings and sales profiles.",
    dashUploadBtn: "Upload Animal",
    dashProfileCard: "Farmer Profile Card",
    dashListingsHeader: "My Livestock Listings",
    formTitleCreate: "Upload Animal Details",
    formTitleEdit: "Edit Animal Details",
    formType: "Animal Type *",
    formBreed: "Breed *",
    formAge: "Age *",
    formWeight: "Weight (KG) *",
    formDistrict: "District *",
    formVillage: "Village *",
    formOrigPrice: "Original Price *",
    formDisc: "Discount %",
    formOfferPrice: "Offer Price (Auto calculated)",
    formPhone1: "Phone Number *",
    formPhone2: "Alternate Phone",
    formDesc: "Description",
    formMapLbl: "Geo Map Location (Click map to pin location)",
    formBtnGPS: "Use Current GPS Location",
    formImages: "Upload Media Images (Maximum 4 allowed - JPG/PNG/WEBP)",
    formCancel: "Cancel",
    formSave: "Save Listing",
    formStatus: "Status *",
    notFoundTitle: "Page Not Found",
    notFoundDesc: "We are unable to locate the page you requested.",
    notFoundBtn: "Back to Home",
    modalCall: "Call Seller",
    modalSeller: "Listed by Seller",
    modalGmaps: "Google Maps Redirect ↗",
    modalNotes: "Seller Notes",
    modalCoords: "Seller Coordinates"
  },
  te: {
    navBrand: "మేకలు & గొర్రెల మార్కెట్",
    navHome: "హోమ్",
    navBrowse: "మార్కెట్ బ్రౌజ్",
    navAuth: "లాగిన్ / రిజిస్టర్",
    navDashboard: "డాష్‌బోర్డ్",
    navLogout: "లాగ్అవుట్",
    heroTag: "రైతుల ప్రత్యక్ష మార్కెట్",
    heroTitle: "మీ సమీపంలోని ఉత్తమ పశువులను కనుగొనండి",
    heroSubtitle: "స్థానిక రైతులు మరియు కొనుగోలుదారుల మధ్య ప్రత్యక్ష మార్పిడి. సులభమైనది మరియు వేగవంతమైనది.",
    heroBtnBrowse: "పశువులను చూడండి",
    heroBtnSell: "అమ్మడం ప్రారంభించండి",
    statActive: "అందుబాటులో ఉన్నవి",
    statSold: "అమ్ముడైనవి",
    statDistricts: "కవర్ చేయబడిన జిల్లాలు",
    statFarmers: "నమోదైన రైతులు",
    latestTitle: "అన్ని ప్రకటనలు",
    viewAll: "అన్నీ చూడండి →",
    searchText: "శోధన పదం",
    filterType: "పశువు రకం",
    filterDistrict: "జిల్లా",
    filterBreed: "జాతి",
    filterSort: "సార్టింగ్ పద్ధతి",
    optAll: "అన్ని రకాలు",
    optGoat: "మేక",
    optSheep: "గొర్రె",
    optLatest: "ఇటీవలి అప్‌లోడ్‌లు",
    optLow: "తక్కువ ధర",
    optHigh: "ఎక్కువ ధర",
    lblAge: "వయస్సు",
    lblWeight: "బరువు",
    lblDistrict: "జిల్లా",
    lblVillage: "గ్రామం",
    lblPrice: "అమ్మకపు ధర",
    btnDetails: "వివరాలు చూడండి",
    badgeSold: "అమ్ముడైంది",
    badgeAvailable: "అందుబాటులో ఉంది",
    loginTitle: "మీ ఖాతాలోకి లాగిన్ అవ్వండి",
    regTitle: "రైతు ఖాతా సృష్టించండి",
    lblPhone: "ఫోన్ నంబర్",
    lblPass: "పాస్‌వర్డ్",
    lblName: "పూర్తి పేరు",
    lblRole: "ఖాతా రకం",
    btnSignIn: "లాగిన్ చేయండి",
    btnCreateAcc: "ఖాతా సృష్టించు",
    loginFoot: "ఖాతా లేదా?",
    regFoot: "ఇప్పటికే ఖాతా ఉందా?",
    dashTitle: "రైతు డాష్‌బోర్డ్",
    dashDesc: "మీ పశువుల ప్రకటనలు మరియు అమ్మకాల వివరాలను ఇక్కడ నిర్వహించండి.",
    dashUploadBtn: "పశువును అప్‌లోడ్ చేయండి",
    dashProfileCard: "రైతు ప్రొఫైల్ కార్డు",
    dashListingsHeader: "నా పశువుల ప్రకటనలు",
    formTitleCreate: "పశువుల వివరాల నమోదు",
    formTitleEdit: "వివరాలను సవరించండి",
    formType: "పశువు రకం *",
    formBreed: "జాతి *",
    formAge: "వయస్సు *",
    formWeight: "బరువు (KG) *",
    formDistrict: "జిల్లా *",
    formVillage: "గ్రామం *",
    formOrigPrice: "అసలు ధర *",
    formDisc: "తగ్గింపు %",
    formOfferPrice: "ఆఫర్ ధర (ఆటోమేటిక్ లెక్కింపు)",
    formPhone1: "ఫోన్ నంబర్ *",
    formPhone2: "ప్రత్యామ్నాయ ఫోన్ నంబర్",
    formDesc: "వివరణ",
    formMapLbl: "మ్యాప్ స్థానం (మ్యాప్ పై క్లిక్ చేయండి)",
    formBtnGPS: "ప్రస్తుత GPS స్థానాన్ని ఉపయోగించండి",
    formImages: "చిత్రాలను అప్‌లోడ్ చేయండి (గరిష్టంగా 4 - JPG/PNG/WEBP)",
    formCancel: "రద్దు చేయి",
    formSave: "ప్రకటనను సేవ్ చేయి",
    formStatus: "స్థితి *",
    notFoundTitle: "పేజీ కనుగొనబడలేదు",
    notFoundDesc: "మీరు అడిగిన పేజీ ఇక్కడ లేదు.",
    notFoundBtn: "హోమ్‌కు తిరిగి వెళ్ళండి",
    modalCall: "కాల్ చేయండి",
    modalSeller: "రైతు వివరాలు",
    modalGmaps: "గూగుల్ మ్యాప్స్ ↗",
    modalNotes: "అదనపు సమాచారం",
    modalCoords: "స్థాన కోఆర్డినేట్స్"
  }
};

const mockImages = {
  goat: [
    "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533048347046-e41c9791bc0a?auto=format&fit=crop&w=800&q=80"
  ],
  sheep: [
    "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80"
  ]
};

const defaultMockListings = [
  {
    id: "mock-1",
    animalType: "Goat",
    breed: "Nellore Kanchi",
    age: 14,
    ageUnit: "Months",
    weight: 35,
    district: "Mahbubnagar",
    village: "Jadcherla",
    description: "Extremely active breeding goat. Fully immunized and grass-fed.",
    originalPrice: 12000,
    discount: 10,
    offerPrice: 10800,
    phone: "9876543210",
    alternatePhone: "9000123456",
    images: [mockImages.goat[0], mockImages.goat[1]],
    location: { coordinates: [78.1501, 16.7431] },
    status: "Available",
    seller: { name: "Ramu Kuruma", phone: "9876543210" }
  },
  {
    id: "mock-2",
    animalType: "Sheep",
    breed: "Nellore Brown",
    age: 18,
    ageUnit: "Months",
    weight: 42,
    district: "Nellore",
    village: "Gudur",
    description: "Premium purebred Nellore Brown sheep, perfect for breeding setup.",
    originalPrice: 18000,
    discount: 15,
    offerPrice: 15300,
    phone: "8765432109",
    alternatePhone: "",
    images: [mockImages.sheep[0], mockImages.sheep[1]],
    location: { coordinates: [79.8501, 14.1501] },
    status: "Available",
    seller: { name: "Mallesham Yadav", phone: "8765432109" }
  },
  {
    id: "mock-3",
    animalType: "Goat",
    breed: "Beetal Mix",
    age: 2,
    ageUnit: "Years",
    weight: 55,
    district: "Khammam",
    village: "Kallur",
    description: "Stately breeding goat with high yield genes. Healthy and tall build.",
    originalPrice: 22000,
    discount: 5,
    offerPrice: 20900,
    phone: "9876543210",
    alternatePhone: "",
    images: [mockImages.goat[1]],
    location: { coordinates: [80.3341, 17.2024] },
    status: "Available",
    seller: { name: "Ramu Kuruma", phone: "9876543210" }
  }
];

const defaultMockUsers = [
  { id: "u-1", name: "Ramu Kuruma", phone: "9876543210", role: "seller" },
  { id: "u-2", name: "Mallesham Yadav", phone: "8765432109", role: "seller" }
];

window.addEventListener("DOMContentLoaded", async () => {
  initLocalStorage();
  await checkBackendStatus();
  applyLanguage();
  applyTheme();
  showSection("home");
  loadStats();
});

function initLocalStorage() {
  if (!localStorage.getItem("gms_listings")) {
    localStorage.setItem("gms_listings", JSON.stringify(defaultMockListings));
  }
  if (!localStorage.getItem("gms_users")) {
    localStorage.setItem("gms_users", JSON.stringify(defaultMockUsers));
  }
}

async function checkBackendStatus() {
  showLoader("Checking service connectivity...");
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    if (response.ok) {
      state.isOfflineMode = false;
      document.getElementById("demo-mode-alert").classList.add("hidden");
      showToast("Connected to livestock server!", "success");
    } else {
      useStaticDemoFallback();
    }
  } catch (err) {
    useStaticDemoFallback();
  } finally {
    hideLoader();
  }
}

function useStaticDemoFallback() {
  state.isOfflineMode = true;
  document.getElementById("demo-mode-alert").classList.remove("hidden");
  showToast("Running in local storage demo mode.", "warning");
}

// ---------------------------------------------------------
// NOTIFICATION TOAST ENGINE
// ---------------------------------------------------------
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast-card px-5 py-3.5 rounded-xl shadow-xl text-white font-semibold text-sm flex items-center justify-between gap-4 border ${
    type === "success" ? "bg-emerald-600 border-emerald-500" :
    type === "error" ? "bg-red-600 border-red-500" :
    type === "warning" ? "bg-amber-500 border-amber-400 text-gray-900" : "bg-blue-600 border-blue-500"
  }`;
  
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : type === "warning" ? "⚠️" : "ℹ️";
  
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span>${icon}</span>
      <span>${message}</span>
    </div>
    <button onclick="this.parentElement.remove()" class="text-xs opacity-70 hover:opacity-100">✕</button>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ---------------------------------------------------------
// LOADING SPINNER ACTIONS
// ---------------------------------------------------------
function showLoader(message = "Processing...") {
  document.getElementById("loader-text").textContent = message;
  document.getElementById("loader-overlay").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader-overlay").classList.add("hidden");
}

// ---------------------------------------------------------
// TOGGLE BETWEEN LOGIN & REGISTER FORM WITHIN UNIFIED VIEW
// ---------------------------------------------------------
function toggleAuthForm(mode) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const tabLogin = document.getElementById("auth-tab-login");
  const tabRegister = document.getElementById("auth-tab-register");

  if (mode === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    
    tabLogin.className = "w-1/2 pb-3 font-bold border-b-2 border-emerald-500 text-emerald-600 text-center";
    tabRegister.className = "w-1/2 pb-3 font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-600 text-center";
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");

    tabLogin.className = "w-1/2 pb-3 font-bold border-b-2 border-transparent text-gray-400 hover:text-gray-600 text-center";
    tabRegister.className = "w-1/2 pb-3 font-bold border-b-2 border-emerald-500 text-emerald-600 text-center";
  }
}

// ---------------------------------------------------------
// VIEW / TAB ROUTING ENGINE (SPA DESIGN)
// ---------------------------------------------------------
function showSection(sectionId) {
  const sections = [
    "home-section", "search-section", "auth-section", 
    "dashboard-section", "listing-form-section", "not-found-section"
  ];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById("not-found-section").classList.remove("hidden");
  }

  if (sectionId === "home-section") {
    loadHomeListings();
  } else if (sectionId === "search-section") {
    loadBrowseListings();
  } else if (sectionId === "dashboard-section") {
    loadSellerDashboard();
  } else if (sectionId === "auth-section") {
    toggleAuthForm("login");
  }

  updateNavbarActiveStates(sectionId);
  toggleMobileMenu(true);
}

function updateNavbarActiveStates(activeId) {
  const btnMap = {
    "home-section": "nav-home",
    "search-section": "nav-browse",
    "auth-section": "nav-auth",
    "dashboard-section": "nav-dashboard"
  };
  
  Object.keys(btnMap).forEach(secId => {
    const btn = document.getElementById(btnMap[secId]);
    if (btn) {
      if (secId === activeId) {
        btn.className = "text-emerald-600 dark:text-emerald-400 px-3 py-2 rounded-md font-extrabold border-b-2 border-emerald-500";
      } else {
        btn.className = "text-gray-600 dark:text-gray-300 hover:text-emerald-600 px-3 py-2 rounded-md font-medium";
      }
    }
  });
}

function toggleMobileMenu(forceClose = false) {
  const menu = document.getElementById("mobile-menu");
  if (forceClose) {
    menu.classList.add("hidden");
  } else {
    menu.classList.toggle("hidden");
  }
}

// ---------------------------------------------------------
// DATA MODEL RENDERING LAYOUT (LISTING CARDS)
// ---------------------------------------------------------
function renderListingCard(listing) {
  const t = translations[state.language];
  const coverImage = (listing.images && listing.images.length > 0) 
    ? (listing.images[0].startsWith("http") ? listing.images[0] : `${API_BASE_URL.replace("/api", "")}${listing.images[0]}`)
    : (listing.animalType === "Goat" ? mockImages.goat[0] : mockImages.sheep[0]);

  const priceVal = listing.offerPrice;
  const oldPriceVal = listing.originalPrice;
  const discountLabel = listing.discount > 0 ? `<span class="bg-amber-100 text-amber-800 text-xs font-bold px-1.5 py-0.5 rounded">${listing.discount}% OFF</span>` : "";

  const isAvailable = listing.status !== "Sold";
  const badgeHTML = isAvailable 
    ? `<span class="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-lg uppercase tracking-wider">${t.badgeAvailable}</span>`
    : `<span class="absolute top-3 left-3 bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-lg uppercase tracking-wider">${t.badgeSold}</span>`;

  const typeText = listing.animalType === "Goat" ? t.optGoat : t.optSheep;

  return `
    <div class="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
      ${badgeHTML}
      <div class="h-48 w-full bg-gray-100 relative overflow-hidden select-none">
        <img src="${coverImage}" alt="${listing.breed}" class="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500">
      </div>
      
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div class="space-y-1.5">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">${typeText} • ${listing.breed}</span>
          </div>
          <h3 class="text-lg font-bold dark:text-white capitalize truncate">${listing.breed} (${listing.age} ${listing.ageUnit === 'Months' ? (state.language === 'en' ? 'Months' : 'నెలలు') : (state.language === 'en' ? 'Years' : 'సంవత్సరాలు')})</h3>
          <p class="text-xs text-gray-400 flex items-center gap-1">📍 <span>${listing.village}, ${listing.district}</span></p>
        </div>

        <div class="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs">
          <div>
            <p class="text-gray-400">${t.lblAge}</p>
            <p class="font-bold dark:text-white text-sm">${listing.age} ${listing.ageUnit}</p>
          </div>
          <div>
            <p class="text-gray-400">${t.lblWeight}</p>
            <p class="font-bold dark:text-white text-sm">${listing.weight} KG</p>
          </div>
        </div>

        <div class="flex justify-between items-baseline pt-2">
          <div class="flex flex-col">
            <span class="text-xs text-gray-400">${t.lblPrice}</span>
            <div class="flex items-baseline gap-1.5">
              <span class="text-xl font-black text-emerald-600 dark:text-emerald-400">₹${priceVal.toLocaleString()}</span>
              ${listing.discount > 0 ? `<span class="text-xs line-through text-gray-400">₹${oldPriceVal.toLocaleString()}</span>` : ""}
            </div>
          </div>
          ${discountLabel}
        </div>

        <button onclick="openDetailsModal('${listing.id || listing._id}')" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2.5 rounded-xl transition text-center shadow-sm">
          ${t.btnDetails}
        </button>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------
// RETRIEVE & LOAD DATA FLOW
// ---------------------------------------------------------
async function fetchAllListings() {
  if (state.isOfflineMode) {
    state.listings = JSON.parse(localStorage.getItem("gms_listings")) || [];
    return state.listings;
  }
  
  try {
    const res = await fetch(`${API_BASE_URL}/listings`);
    if (res.ok) {
      const data = await res.json();
      state.listings = data;
      return data;
    }
  } catch (err) {
    showToast("Error retrieving livestock entries from database", "error");
  }
  return [];
}

async function loadStats() {
  const listings = await fetchAllListings();
  const activeCount = listings.filter(l => l.status !== "Sold").length;
  const soldCount = listings.filter(l => l.status === "Sold").length;
  
  document.getElementById("stat-active-count").textContent = `${activeCount}+`;
  document.getElementById("stat-sold-count").textContent = `${480 + soldCount}+`;
}

// Modified to load and display ALL available goats and sheep on the home page
async function loadHomeListings() {
  const grid = document.getElementById("latest-listings-grid");
  grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">Updating listings feed...</div>`;
  
  const listings = await fetchAllListings();
  const availableListings = listings.filter(l => l.status !== "Sold");
  
  if (availableListings.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">No livestock listings are active today.</div>`;
    return;
  }
  
  grid.innerHTML = availableListings.map(l => renderListingCard(l)).join("");
}

async function loadBrowseListings() {
  const grid = document.getElementById("browse-listings-grid");
  grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">Filtering catalog...</div>`;
  
  await fetchAllListings();
  applyFilters();
}

function applyFilters() {
  const grid = document.getElementById("browse-listings-grid");
  const searchText = document.getElementById("filter-search").value.toLowerCase();
  const filterType = document.getElementById("filter-type").value;
  const filterDistrict = document.getElementById("filter-district").value.toLowerCase();
  const filterBreed = document.getElementById("filter-breed").value.toLowerCase();
  const sortBy = document.getElementById("filter-sort").value;

  let filtered = [...state.listings];

  if (searchText) {
    filtered = filtered.filter(l => 
      l.breed.toLowerCase().includes(searchText) ||
      l.district.toLowerCase().includes(searchText) ||
      l.village.toLowerCase().includes(searchText) ||
      l.description.toLowerCase().includes(searchText)
    );
  }

  if (filterType) {
    filtered = filtered.filter(l => l.animalType === filterType);
  }

  if (filterDistrict) {
    filtered = filtered.filter(l => l.district.toLowerCase().includes(filterDistrict));
  }

  if (filterBreed) {
    filtered = filtered.filter(l => l.breed.toLowerCase().includes(filterBreed));
  }

  if (sortBy === "low-price") {
    filtered.sort((a, b) => a.offerPrice - b.offerPrice);
  } else if (sortBy === "high-price") {
    filtered.sort((a, b) => b.offerPrice - a.offerPrice);
  } else {
    filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full py-24 text-center text-gray-400">No livestock matches your search requirements. Please broaden filters.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(l => renderListingCard(l)).join("");
}

// ---------------------------------------------------------
// SELLER DASHBOARD MANAGE LOGIC
// ---------------------------------------------------------
async function loadSellerDashboard() {
  if (!state.user) {
    showToast("Please log in to manage listings", "warning");
    showSection("auth-section");
    return;
  }

  document.getElementById("profile-card-name").textContent = state.user.name;
  document.getElementById("profile-card-phone").textContent = `Phone: ${state.user.phone}`;

  const grid = document.getElementById("seller-listings-grid");
  grid.innerHTML = `<div class="col-span-full py-12 text-center text-gray-400">Retrieving listings...</div>`;

  let listings = [];
  if (state.isOfflineMode) {
    const all = JSON.parse(localStorage.getItem("gms_listings")) || [];
    listings = all.filter(l => l.seller && l.seller.phone === state.user.phone);
  } else {
    try {
      const res = await fetch(`${API_BASE_URL}/listings`);
      if (res.ok) {
        const all = await res.json();
        listings = all.filter(l => l.seller && l.seller._id === state.user.id);
      }
    } catch (err) {
      showToast("Error reading user listings", "error");
    }
  }

  state.userListings = listings;

  if (listings.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
        <p class="text-4xl mb-2">🐑</p>
        <p class="text-gray-400">You haven't listed any animals yet. Click upload above to list your first goat or sheep.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = listings.map(l => {
    const coverImage = (l.images && l.images.length > 0) 
      ? (l.images[0].startsWith("http") ? l.images[0] : `${API_BASE_URL.replace("/api", "")}${l.images[0]}`)
      : (l.animalType === "Goat" ? mockImages.goat[0] : mockImages.sheep[0]);
    const id = l.id || l._id;

    return `
      <div class="bg-white dark:bg-gray-900 rounded-2xl border overflow-hidden shadow-sm flex flex-col justify-between">
        <div class="h-40 w-full bg-gray-100 relative">
          <img src="${coverImage}" alt="${l.breed}" class="w-full h-full object-cover">
          <span class="absolute top-2 right-2 bg-emerald-100 text-emerald-800 font-bold text-xs px-2 py-0.5 rounded-full">${l.status}</span>
        </div>
        <div class="p-4 space-y-4">
          <div>
            <h4 class="font-bold text-lg dark:text-white capitalize">${l.breed}</h4>
            <p class="text-xs text-gray-400">Price: ₹${l.offerPrice}</p>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <button onclick="openListingForm('edit', '${id}')" class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-bold">✏️ Edit Details</button>
            <button onclick="handleDeleteListing('${id}')" class="bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg font-bold">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ---------------------------------------------------------
// FORM PROCESSING (CREATE/EDIT)
// ---------------------------------------------------------
function openListingForm(mode, id = "") {
  showSection("listing-form-section");
  const t = translations[state.language];

  document.getElementById("form-action-mode").value = mode;
  document.getElementById("form-edit-id").value = id;
  document.getElementById("listing-upload-form").reset();
  document.getElementById("form-image-previews").innerHTML = "";

  initFormMap();

  if (mode === "create") {
    document.getElementById("form-section-title").textContent = t.formTitleCreate;
    document.getElementById("form-status-wrapper").classList.add("hidden");
    document.getElementById("form-phone").value = state.user ? state.user.phone : "";
    document.getElementById("form-lat").value = "17.3850";
    document.getElementById("form-lng").value = "78.4867";
    updateFormMarker(17.3850, 78.4867);
  } else if (mode === "edit") {
    document.getElementById("form-section-title").textContent = t.formTitleEdit;
    document.getElementById("form-status-wrapper").classList.remove("hidden");
    
    const listing = state.userListings.find(l => (l.id || l._id) === id);
    if (listing) {
      document.getElementById("form-type").value = listing.animalType;
      document.getElementById("form-breed").value = listing.breed;
      document.getElementById("form-age").value = listing.age;
      document.getElementById("form-age-unit").value = listing.ageUnit;
      document.getElementById("form-weight").value = listing.weight;
      document.getElementById("form-status").value = listing.status;
      document.getElementById("form-district").value = listing.district;
      document.getElementById("form-village").value = listing.village;
      document.getElementById("form-original-price").value = listing.originalPrice;
      document.getElementById("form-discount").value = listing.discount;
      document.getElementById("form-offer-price").value = `₹${listing.offerPrice}`;
      document.getElementById("form-phone").value = listing.phone;
      document.getElementById("form-alternate-phone").value = listing.alternatePhone || "";
      document.getElementById("form-description").value = listing.description || "";
      
      const lat = listing.location.coordinates[1];
      const lng = listing.location.coordinates[0];
      document.getElementById("form-lat").value = lat;
      document.getElementById("form-lng").value = lng;
      updateFormMarker(lat, lng);
    }
  }
}

function calculateOfferPrice() {
  const original = Number(document.getElementById("form-original-price").value) || 0;
  const discount = Number(document.getElementById("form-discount").value) || 0;
  const offer = original - (original * (discount / 100));
  document.getElementById("form-offer-price").value = `₹${Math.round(offer)}`;
}

function previewImages() {
  const input = document.getElementById("form-image-input");
  const container = document.getElementById("form-image-previews");
  container.innerHTML = "";

  if (input.files.length > 4) {
    showToast("Max limit of 4 files allowed", "warning");
    input.value = "";
    return;
  }

  Array.from(input.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const wrapper = document.createElement("div");
      wrapper.className = "h-20 bg-gray-100 rounded-lg overflow-hidden border relative";
      wrapper.innerHTML = `
        <img src="${e.target.result}" class="w-full h-full object-cover">
        <button type="button" onclick="this.parentElement.remove()" class="absolute top-0 right-0 bg-red-500 text-white text-xs px-1">✕</button>
      `;
      container.appendChild(wrapper);
    };
    reader.readAsDataURL(file);
  });
}

// ---------------------------------------------------------
// GEO GPS LEAFLET ENGINE MAPPING IMPLEMENTATIONS
// ---------------------------------------------------------
function initFormMap() {
  setTimeout(() => {
    if (state.formMap) {
      state.formMap.invalidateSize();
      return;
    }
    
    state.formMap = L.map('form-map-container').setView([17.3850, 78.4867], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(state.formMap);

    state.formMap.on('click', (e) => {
      const { lat, lng } = e.latlng;
      updateFormMarker(lat, lng);
    });
  }, 300);
}

function updateFormMarker(lat, lng) {
  document.getElementById("form-lat").value = lat.toFixed(6);
  document.getElementById("form-lng").value = lng.toFixed(6);

  if (state.formMarker) {
    state.formMarker.setLatLng([lat, lng]);
  } else {
    state.formMarker = L.marker([lat, lng], { draggable: true }).addTo(state.formMap);
    state.formMarker.on('dragend', () => {
      const pos = state.formMarker.getLatLng();
      document.getElementById("form-lat").value = pos.lat.toFixed(6);
      document.getElementById("form-lng").value = pos.lng.toFixed(6);
    });
  }
  state.formMap.setView([lat, lng], 12);
}

function fetchDeviceLocation() {
  const status = document.getElementById("form-gps-status");
  if (!navigator.geolocation) {
    showToast("Geolocation feature unsupported by your browser API", "error");
    return;
  }

  status.textContent = "Querying device GPS...";
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      updateFormMarker(latitude, longitude);
      status.textContent = "GPS Lock Successful ✅";
      showToast("Current location updated!", "success");
    },
    () => {
      status.textContent = "Manual Pin selection active";
      showToast("Could not fetch GPS lock. Please manually click on map to set marker location.", "warning");
    }
  );
}

// ---------------------------------------------------------
// MODAL DETAILS HUB CONTROL SYSTEM
// ---------------------------------------------------------
async function openDetailsModal(id) {
  const modal = document.getElementById("listing-details-modal");
  const t = translations[state.language];

  let listing = null;
  showLoader("Retrieving details...");

  if (state.isOfflineMode) {
    const list = JSON.parse(localStorage.getItem("gms_listings")) || [];
    listing = list.find(l => (l.id || l._id) === id);
  } else {
    try {
      const res = await fetch(`${API_BASE_URL}/listings/${id}`);
      if (res.ok) {
        listing = await res.json();
      }
    } catch (err) {
      showToast("Error retrieving database metadata details", "error");
    }
  }

  hideLoader();

  if (!listing) {
    showToast("Could not locate metadata of target entry", "error");
    return;
  }

  document.getElementById("modal-badge-type").textContent = listing.animalType === "Goat" ? t.optGoat : t.optSheep;
  document.getElementById("modal-badge-status").textContent = listing.status === "Sold" ? t.badgeSold : t.badgeAvailable;
  
  const statusBadge = document.getElementById("modal-badge-status");
  if (listing.status === "Sold") {
    statusBadge.className = "bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-bold";
  } else {
    statusBadge.className = "bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold";
  }

  document.getElementById("modal-title").textContent = `${listing.breed} (${listing.animalType === "Goat" ? t.optGoat : t.optSheep})`;
  document.getElementById("modal-age").textContent = `${listing.age} ${listing.ageUnit === 'Months' ? (state.language === 'en' ? 'Months' : 'నెలలు') : (state.language === 'en' ? 'Years' : 'సంవత్సరాలు')}`;
  document.getElementById("modal-weight").textContent = `${listing.weight} KG`;
  document.getElementById("modal-district").textContent = listing.district;
  document.getElementById("modal-village").textContent = listing.village;
  
  document.getElementById("modal-offer-price").textContent = `₹${listing.offerPrice.toLocaleString()}`;
  document.getElementById("modal-original-price").textContent = `₹${listing.originalPrice.toLocaleString()}`;
  document.getElementById("modal-discount-pct").textContent = `${listing.discount}% OFF`;
  if (listing.discount === 0) {
    document.getElementById("modal-original-price").classList.add("hidden");
    document.getElementById("modal-discount-pct").classList.add("hidden");
  } else {
    document.getElementById("modal-original-price").classList.remove("hidden");
    document.getElementById("modal-discount-pct").classList.remove("hidden");
  }

  document.getElementById("modal-description").textContent = listing.description || "No description provided by farmer.";
  
  const nameOfSeller = listing.seller ? listing.seller.name : "Local Farmer";
  document.getElementById("modal-seller-name").textContent = nameOfSeller;

  document.getElementById("modal-btn-call").href = `tel:${listing.phone}`;
  document.getElementById("modal-btn-whatsapp").href = `https://wa.me/91${listing.phone}?text=Hello, I am interested in your listing: ${listing.breed} listed at ₹${listing.offerPrice}. Is it still available?`;
  
  const lat = listing.location.coordinates[1];
  const lng = listing.location.coordinates[0];
  document.getElementById("modal-btn-gmaps").href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  state.activeListingIndex = 0;
  state.activeListingImages = (listing.images && listing.images.length > 0) ? listing.images : [
    listing.animalType === "Goat" ? mockImages.goat[0] : mockImages.sheep[0]
  ];
  buildModalSlider();

  modal.classList.remove("hidden");
  
  setTimeout(() => {
    initDetailsMap(lat, lng);
  }, 400);
}

function closeDetailsModal() {
  document.getElementById("listing-details-modal").classList.add("hidden");
}

function buildModalSlider() {
  const container = document.getElementById("modal-slider-container");
  container.innerHTML = state.activeListingImages.map(img => {
    const assetUrl = img.startsWith("http") ? img : `${API_BASE_URL.replace("/api", "")}${img}`;
    return `<img src="${assetUrl}" class="w-full h-full object-cover shrink-0 select-none">`;
  }).join("");
  updateSliderPosition();
}

function slideModalImages(direction) {
  state.activeListingIndex += direction;
  if (state.activeListingIndex < 0) {
    state.activeListingIndex = state.activeListingImages.length - 1;
  } else if (state.activeListingIndex >= state.activeListingImages.length) {
    state.activeListingIndex = 0;
  }
  updateSliderPosition();
}

function updateSliderPosition() {
  const container = document.getElementById("modal-slider-container");
  container.style.transform = `translateX(-${state.activeListingIndex * 100}%)`;
}

function initDetailsMap(lat, lng) {
  if (state.detailsMap) {
    state.detailsMap.remove();
    state.detailsMap = null;
  }

  state.detailsMap = L.map('modal-map-container', { zoomControl: false }).setView([lat, lng], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(state.detailsMap);

  state.detailsMarker = L.marker([lat, lng]).addTo(state.detailsMap);
  
  setTimeout(() => {
    state.detailsMap.invalidateSize();
  }, 200);
}

// ---------------------------------------------------------
// FORM & API DATA UPLOAD ACTIONS
// ---------------------------------------------------------
async function handleListingSubmit(e) {
  e.preventDefault();
  const mode = document.getElementById("form-action-mode").value;
  const id = document.getElementById("form-edit-id").value;

  const animalType = document.getElementById("form-type").value;
  const breed = document.getElementById("form-breed").value;
  const age = document.getElementById("form-age").value;
  const ageUnit = document.getElementById("form-age-unit").value;
  const weight = document.getElementById("form-weight").value;
  const district = document.getElementById("form-district").value;
  const village = document.getElementById("form-village").value;
  const originalPrice = Number(document.getElementById("form-original-price").value);
  const discount = Number(document.getElementById("form-discount").value);
  const phone = document.getElementById("form-phone").value;
  const alternatePhone = document.getElementById("form-alternate-phone").value;
  const description = document.getElementById("form-description").value;
  const status = document.getElementById("form-status").value;
  const latitude = Number(document.getElementById("form-lat").value);
  const longitude = Number(document.getElementById("form-lng").value);

  const offerPrice = originalPrice - (originalPrice * (discount / 100));

  showLoader("Uploading animal listing details...");

  if (state.isOfflineMode) {
    const list = JSON.parse(localStorage.getItem("gms_listings")) || [];
    
    if (mode === "create") {
      const newListing = {
        id: `local-${Date.now()}`,
        animalType,
        breed,
        age: Number(age),
        ageUnit,
        weight: Number(weight),
        district,
        village,
        originalPrice,
        discount,
        offerPrice,
        phone,
        alternatePhone,
        description,
        status: "Available",
        location: { coordinates: [longitude, latitude] },
        createdAt: new Date().toISOString(),
        images: [animalType === "Goat" ? mockImages.goat[0] : mockImages.sheep[0]],
        seller: { name: state.user.name, phone: state.user.phone }
      };
      list.unshift(newListing);
      showToast("Livestock listed successfully!", "success");
    } else {
      const idx = list.findIndex(l => (l.id || l._id) === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          animalType, breed, age: Number(age), ageUnit, weight: Number(weight),
          district, village, originalPrice, discount, offerPrice,
          phone, alternatePhone, description, status,
          location: { coordinates: [longitude, latitude] }
        };
        showToast("Listing details updated successfully!", "success");
      }
    }
    localStorage.setItem("gms_listings", JSON.stringify(list));
    hideLoader();
    showSection("dashboard-section");
  } else {
    try {
      const formData = new FormData();
      formData.append("animalType", animalType);
      formData.append("breed", breed);
      formData.append("age", age);
      formData.append("ageUnit", ageUnit);
      formData.append("weight", weight);
      formData.append("district", district);
      formData.append("village", village);
      formData.append("originalPrice", originalPrice);
      formData.append("discount", discount);
      formData.append("phone", phone);
      formData.append("alternatePhone", alternatePhone);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      const input = document.getElementById("form-image-input");
      Array.from(input.files).forEach(file => {
        formData.append("images", file);
      });

      let response;
      if (mode === "create") {
        response = await fetch(`${API_BASE_URL}/listings`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${state.token}` },
          body: formData
        });
      } else {
        response = await fetch(`${API_BASE_URL}/listings/${id}`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${state.token}` },
          body: formData
        });
      }

      if (response.ok) {
        showToast(mode === "create" ? "Listing posted successfully!" : "Listing updated!", "success");
        showSection("dashboard-section");
      } else {
        const err = await response.json();
        showToast(err.message || "Failed to submit animal details to server", "error");
      }
    } catch (err) {
      showToast("Connection to backend server interrupted", "error");
    } finally {
      hideLoader();
    }
  }
}

async function handleDeleteListing(id) {
  if (!confirm("Are you sure you want to permanently delete this listing?")) return;
  showLoader("Deleting database target entry...");

  if (state.isOfflineMode) {
    const list = JSON.parse(localStorage.getItem("gms_listings")) || [];
    const filtered = list.filter(l => (l.id || l._id) !== id);
    localStorage.setItem("gms_listings", JSON.stringify(filtered));
    showToast("Listing deleted.", "success");
    hideLoader();
    loadSellerDashboard();
  } else {
    try {
      const response = await fetch(`${API_BASE_URL}/listings/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${state.token}` }
      });
      if (response.ok) {
        showToast("Listing removed successfully.", "success");
        loadSellerDashboard();
      } else {
        showToast("Error processing listing wipe command", "error");
      }
    } catch (err) {
      showToast("Service connectivity fault", "error");
    } finally {
      hideLoader();
    }
  }
}

// ---------------------------------------------------------
// AUTHENTICATION LOGIC (UNIFIED SIGNUP & LOGIN)
// ---------------------------------------------------------
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const phone = document.getElementById("register-phone").value;
  const password = document.getElementById("register-password").value;
  const role = document.getElementById("register-role").value;

  showLoader("Processing farmer registration credentials...");

  if (state.isOfflineMode) {
    const users = JSON.parse(localStorage.getItem("gms_users")) || [];
    if (users.find(u => u.phone === phone)) {
      showToast("Phone number already registered on platform", "error");
      hideLoader();
      return;
    }
    const newUser = { id: `u-${Date.now()}`, name, phone, role };
    users.push(newUser);
    localStorage.setItem("gms_users", JSON.stringify(users));
    
    state.user = newUser;
    showToast("Registration successful! Welcome to the market.", "success");
    setSessionState();
    hideLoader();
    showSection("dashboard-section");
  } else {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, password, role })
      });
      if (res.ok) {
        const data = await res.json();
        state.token = data.token;
        state.user = { id: data._id, name: data.name, phone: data.phone, role: data.role };
        setSessionState();
        showToast("Account created successfully!", "success");
        showSection("dashboard-section");
      } else {
        const err = await res.json();
        showToast(err.message || "Invalid registration format", "error");
      }
    } catch (err) {
      showToast("Backend Server Connectivity Error", "error");
    } finally {
      hideLoader();
    }
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const phone = document.getElementById("login-phone").value;
  const password = document.getElementById("login-password").value;

  showLoader("Authorizing login identity...");

  if (state.isOfflineMode) {
    const users = JSON.parse(localStorage.getItem("gms_users")) || [];
    const match = users.find(u => u.phone === phone);
    
    if (match) {
      state.user = match;
      setSessionState();
      showToast(`Welcome back, ${match.name}!`, "success");
      hideLoader();
      showSection("dashboard-section");
    } else {
      showToast("Phone credentials do not match active local baseline", "error");
      hideLoader();
    }
  } else {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password })
      });
      if (res.ok) {
        const data = await res.json();
        state.token = data.token;
        state.user = { id: data._id, name: data.name, phone: data.phone, role: data.role };
        setSessionState();
        showToast("Login validation cleared!", "success");
        showSection("dashboard-section");
      } else {
        const err = await res.json();
        showToast(err.message || "Phone or password validation error", "error");
      }
    } catch (err) {
      showToast("Service network link failed", "error");
    } finally {
      hideLoader();
    }
  }
}

// Controls visibility state of authentication trigger links in navigation bar
function setSessionState() {
  if (state.user) {
    document.getElementById("nav-auth").classList.add("hidden");
    document.getElementById("nav-dashboard").classList.remove("hidden");
    document.getElementById("nav-logout").classList.remove("hidden");
    
    document.getElementById("m-nav-auth").classList.add("hidden");
    document.getElementById("m-nav-dashboard").classList.remove("hidden");
    document.getElementById("m-nav-logout").classList.remove("hidden");
  } else {
    document.getElementById("nav-auth").classList.remove("hidden");
    document.getElementById("nav-dashboard").classList.add("hidden");
    document.getElementById("nav-logout").classList.add("hidden");

    document.getElementById("m-nav-auth").classList.remove("hidden");
    document.getElementById("m-nav-dashboard").classList.add("hidden");
    document.getElementById("m-nav-logout").classList.add("hidden");
  }
}

function handleLogout() {
  state.user = null;
  state.token = null;
  setSessionState();
  showToast("Account sign out sequence completed.", "info");
  showSection("home");
}

// ---------------------------------------------------------
// DYNAMIC DICTIONARY INTERACTIVE TRANSLATION ENGINE
// ---------------------------------------------------------
function toggleLanguage() {
  state.language = state.language === "en" ? "te" : "en";
  applyLanguage();
  loadHomeListings();
  loadBrowseListings();
}

function applyLanguage() {
  const t = translations[state.language];
  const isEn = state.language === "en";

  const elements = [
    ["lang-switch-btn", isEn ? "తెలుగు" : "English"],
    ["lang-switch-btn-mobile", isEn ? "తెలుగు" : "English"],
    ["nav-brand", t.navBrand],
    ["nav-home", t.navHome],
    ["nav-browse", t.navBrowse],
    ["nav-auth", t.navAuth],
    ["nav-dashboard", t.navDashboard],
    ["nav-logout", t.navLogout],
    ["m-nav-home", t.navHome],
    ["m-nav-browse", t.navBrowse],
    ["m-nav-auth", t.navAuth],
    ["m-nav-dashboard", t.navDashboard],
    ["m-nav-logout", t.navLogout],
    ["hero-tag", t.heroTag],
    ["hero-title", t.heroTitle],
    ["hero-subtitle", t.heroSubtitle],
    ["hero-btn-browse", t.heroBtnBrowse],
    ["hero-btn-sell", t.heroBtnSell],
    ["stat-active-lbl", t.statActive],
    ["stat-sold-lbl", t.statSold],
    ["stat-district-lbl", t.statDistricts],
    ["stat-users-lbl", t.statFarmers],
    ["home-latest-title", t.latestTitle],
    ["home-view-all", t.viewAll],
    ["search-title", t.navBrowse],
    ["lbl-search-text", t.searchText],
    ["lbl-filter-type", t.filterType],
    ["lbl-filter-district", t.filterDistrict],
    ["lbl-filter-breed", t.filterBreed],
    ["lbl-filter-sort", t.filterSort],
    ["opt-all-types", t.optAll],
    ["opt-goat", t.optGoat],
    ["opt-sheep", t.optSheep],
    ["opt-sort-latest", t.optLatest],
    ["opt-sort-low", t.optLow],
    ["opt-sort-high", t.optHigh],
    ["login-title", t.loginTitle],
    ["register-title", t.regTitle],
    ["lbl-login-phone", t.lblPhone],
    ["lbl-login-pass", t.lblPass],
    ["lbl-reg-name", t.lblName],
    ["lbl-reg-phone", t.lblPhone],
    ["lbl-reg-pass", t.lblPass],
    ["lbl-reg-role", t.lblRole],
    ["btn-submit-login", t.btnSignIn],
    ["btn-submit-reg", t.btnCreateAcc],
    ["login-footer-text", t.loginFoot],
    ["reg-footer-text", t.regFoot],
    ["dash-welcome", t.dashTitle],
    ["dash-desc", t.dashDesc],
    ["dash-btn-upload", t.dashUploadBtn],
    ["dash-profile-title", t.dashProfileCard],
    ["dash-listings-header", t.dashListingsHeader],
    ["lbl-form-type", t.formType],
    ["lbl-form-breed", t.formBreed],
    ["lbl-form-age", t.formAge],
    ["lbl-form-weight", t.formWeight],
    ["lbl-form-district", t.formDistrict],
    ["lbl-form-village", t.formVillage],
    ["lbl-form-original", t.formOrigPrice],
    ["lbl-form-discount", t.formDisc],
    ["lbl-form-offer", t.formOfferPrice],
    ["lbl-form-phone1", t.formPhone1],
    ["lbl-form-phone2", t.formPhone2],
    ["lbl-form-desc", t.formDesc],
    ["lbl-form-map", t.formMapLbl],
    ["form-btn-current-loc", t.formBtnGPS],
    ["lbl-form-images", t.formImages],
    ["form-btn-cancel", t.formCancel],
    ["form-btn-save", t.formSave],
    ["lbl-form-status", t.formStatus],
    ["not-found-title", t.notFoundTitle],
    ["not-found-desc", t.notFoundDesc],
    ["not-found-btn", t.notFoundBtn],
    ["lbl-det-age", t.lblAge],
    ["lbl-det-weight", t.lblWeight],
    ["lbl-det-district", t.lblDistrict],
    ["lbl-det-village", t.lblVillage],
    ["lbl-det-price", t.lblPrice],
    ["lbl-det-desc", t.modalNotes],
    ["lbl-det-seller", t.modalSeller],
    ["lbl-btn-call", t.modalCall],
    ["modal-btn-gmaps", t.modalGmaps],
    ["lbl-det-loc", t.modalCoords]
  ];

  elements.forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) {
      if (el.tagName === "INPUT" && el.type === "placeholder") {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    }
  });
}

// ---------------------------------------------------------
// VISUAL SYSTEM DARK THEME TOGGLE
// ---------------------------------------------------------
function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
}

function applyTheme() {
  const body = document.body;
  if (state.theme === "dark") {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }
}
