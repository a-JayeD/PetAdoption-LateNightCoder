// ============================================
// PROFILE PAGE FUNCTIONS
// ============================================

/**
 * Initialize profile page
 */
function initializeProfile() {
    // Check if user is logged in
    if (!requireLogin('login.html')) {
        return;
    }
    
    const user = getCurrentUser();
    if (!user) {
        goToPage('login.html');
        return;
    }
    
    displayUserProfile(user);
    updateHeaderDropdown(user);
}

/**
 * Display user profile information
 */
function displayUserProfile(user) {
    // Personal Information Tab
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileStatus').textContent = user.adoptionStatus === 'active' ? '✓ Active Member' : 'Pending Verification';
    document.getElementById('profileJoinDate').textContent = `Joined: ${formatDate(user.joinDate)}`;
    
    document.getElementById('infoName').textContent = user.name;
    document.getElementById('infoEmail').textContent = user.email;
    document.getElementById('infoPhone').textContent = user.phone;
    document.getElementById('infoAddress').textContent = user.address;
    
    // Adoption History
    displayAdoptionHistory(user);
    
    // Applications
    displayApplications(user);
}

/**
 * Display adoption history
 */
function displayAdoptionHistory(user) {
    const container = document.getElementById('adoptionHistoryContent');
    
    if (user.adoptedPets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>📦 You haven't adopted any pets yet.</p>
                <a href="index.html" class="btn-browse">Browse Available Pets</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="adoption-list">';
    user.adoptedPets.forEach(petId => {
        const pet = findPetById(petId);
        if (pet) {
            html += `
                <div class="adoption-item">
                    <div class="adoption-image">${pet.image}</div>
                    <div class="adoption-info">
                        <h3>${pet.name}</h3>
                        <p>${pet.breed}</p>
                        <p class="adoption-date">✓ Successfully Adopted</p>
                    </div>
                    <button class="btn-view-pet" onclick="viewPetDetailsFromMatch(${pet.id})">View Pet</button>
                </div>
            `;
        }
    });
    html += '</div>';
    
    container.innerHTML = html;
}

/**
 * Display applications
 */
function displayApplications(user) {
    const container = document.getElementById('applicationsContent');
    
    if (user.applications.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>📋 No active applications.</p>
                <a href="index.html" class="btn-browse">Start an Application</a>
            </div>
        `;
        return;
    }
    
    let html = '<div class="applications-list">';
    user.applications.forEach((petId, index) => {
        const pet = findPetById(petId);
        if (pet) {
            html += `
                <div class="application-item">
                    <div class="app-status pending">Pending Review</div>
                    <div class="app-content">
                        <h3>${pet.name}</h3>
                        <p>${pet.breed}</p>
                        <p class="app-date">Application submitted</p>
                    </div>
                    <button class="btn-view-app" onclick="viewApplicationDetails(${petId})">View Details</button>
                </div>
            `;
        }
    });
    html += '</div>';
    
    container.innerHTML = html;
}

/**
 * Switch between tabs
 */
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    const tabId = tabName === 'personal' ? 'personal-info-tab' :
                  tabName === 'adoption' ? 'adoption-history-tab' :
                  tabName === 'applications' ? 'applications-tab' :
                  'preferences-tab';
    
    document.getElementById(tabId).classList.add('active');
    
    // Update menu item
    event.target.classList.add('active');
}

/**
 * Edit profile
 */
function editProfile() {
    alert('Edit profile feature coming soon!');
}

/**
 * Toggle profile dropdown
 */
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

/**
 * Update header dropdown
 */
function updateHeaderDropdown(user) {
    document.getElementById('dropdownName').textContent = user.name;
    document.getElementById('dropdownEmail').textContent = user.email;
}

/**
 * Handle logout
 */
function handleLogout(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        logoutUser();
    }
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

/**
 * View application details
 */
function viewApplicationDetails(petId) {
    alert(`Viewing application details for pet ID: ${petId}`);
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    const avatar = document.getElementById('profileAvatarHeader');
    
    if (!event.target.closest('.profile-dropdown-container')) {
        dropdown.style.display = 'none';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'profile.html') {
        initializeProfile();
    }
});