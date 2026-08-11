// ============================================
// ADOPTION APPLICATION FUNCTIONS
// ============================================

// Application phases and questions
const adoptionPhases = [
    {
        id: 1,
        title: "Living Situation",
        description: "Tell us about your home & life",
        questions: [
            {
                id: "homeType",
                type: "buttons",
                label: "What is your home type?",
                options: [
                    { label: "House with Yard", value: "house-yard" },
                    { label: "Apartment / Condo", value: "apartment" },
                    { label: "Townhouse", value: "townhouse" },
                    { label: "Other", value: "other" }
                ]
            },
            {
                id: "fencedYard",
                type: "buttons",
                label: "Do you have a fenced yard?",
                options: [
                    { label: "Yes, fully fenced", value: "yes-fenced" },
                    { label: "No fence", value: "no-fence" },
                    { label: "No yard", value: "no-yard" }
                ]
            },
            {
                id: "petExperience",
                type: "buttons",
                label: "What is your experience level with pets?",
                options: [
                    { label: "First-time Owner", value: "first-time" },
                    { label: "Experienced Parent", value: "experienced" },
                    { label: "Expert / Trainer", value: "expert" }
                ]
            },
            {
                id: "lifestyle",
                type: "quiz",
                label: "Quick Lifestyle Match Quiz",
                subtitle: "Which phrase best describes your household's weekend energy?",
                options: [
                    { 
                        label: "Cozy Couch Potato", 
                        value: "cozy",
                        icon: "🛋️",
                        desc: "We love movies, indoor games, and long naps."
                    },
                    { 
                        label: "Active Hiker", 
                        value: "active",
                        icon: "🥾",
                        desc: "We head out to nature trails, walks, or play fetch."
                    },
                    { 
                        label: "Busy & Chaotic", 
                        value: "chaotic",
                        icon: "⚡",
                        desc: "Full house with kids, visitors, and constant action."
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Household Details",
        description: "Tell us more about your household",
        questions: [
            {
                id: "householdMembers",
                type: "buttons",
                label: "How many people live in your household?",
                options: [
                    { label: "Just me", value: "1" },
                    { label: "2-3 people", value: "2-3" },
                    { label: "4-5 people", value: "4-5" },
                    { label: "6+ people", value: "6+" }
                ]
            },
            {
                id: "childrenAges",
                type: "buttons",
                label: "Do you have children? If yes, what ages?",
                options: [
                    { label: "No children", value: "no" },
                    { label: "Under 5 years", value: "under5" },
                    { label: "5-12 years", value: "5-12" },
                    { label: "13+ years", value: "13plus" }
                ]
            },
            {
                id: "otherPets",
                type: "buttons",
                label: "Do you currently have other pets?",
                options: [
                    { label: "No other pets", value: "no" },
                    { label: "Yes, dogs", value: "dogs" },
                    { label: "Yes, cats", value: "cats" },
                    { label: "Yes, other animals", value: "other" }
                ]
            },
            {
                id: "workSchedule",
                type: "buttons",
                label: "What is your typical work schedule?",
                options: [
                    { label: "Work from home", value: "home" },
                    { label: "Part-time (flexible)", value: "part-time" },
                    { label: "Full-time (8-9 hours daily)", value: "full-time" },
                    { label: "Multiple jobs / variable", value: "variable" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Personal Information",
        description: "Contact & commitment details",
        questions: [
            {
                id: "fullName",
                type: "text",
                label: "Full Name",
                placeholder: "Enter your full name"
            },
            {
                id: "email",
                type: "email",
                label: "Email Address",
                placeholder: "your.email@example.com"
            },
            {
                id: "phone",
                type: "tel",
                label: "Phone Number",
                placeholder: "+1 (555) 123-4567"
            },
            {
                id: "address",
                type: "text",
                label: "Home Address",
                placeholder: "123 Main Street, City, State 12345"
            },
            {
                id: "vetReference",
                type: "text",
                label: "Previous Pet Vet Reference (if applicable)",
                placeholder: "Vet name, phone, and years of care"
            },
            {
                id: "agreement",
                type: "checkbox",
                label: "I understand the commitment required and agree to provide proper care"
            },
            {
                id: "returnPolicy",
                type: "checkbox",
                label: "I agree to return the pet to PawHome if I can no longer provide care"
            }
        ]
    }
];

let currentPhase = 0;
let applicationData = {};

/**
 * Initialize adoption application
 */
function initializeAdoption() {
    currentPhase = 0;
    applicationData = {};
    renderPhase();
}

/**
 * Render current phase
 */
function renderPhase() {
    const phase = adoptionPhases[currentPhase];
    const formContainer = document.getElementById("formContainer");
    
    let html = `
        <h2>${phase.title}</h2>
        <p>${phase.description}</p>
    `;

    phase.questions.forEach(question => {
        html += renderQuestion(question);
    });

    formContainer.innerHTML = html;
    updateProgress();
    attachEventListeners();
}

/**
 * Render individual question
 */
function renderQuestion(question) {
    const value = applicationData[question.id] || "";
    
    if (question.type === "buttons") {
        return `
            <div class="form-question">
                <label>${question.label}</label>
                <div class="button-group">
                    ${question.options.map(opt => `
                        <button type="button" class="option-btn ${value === opt.value ? 'selected' : ''}" 
                            onclick="selectOption('${question.id}', '${opt.value}', this)">
                            ${opt.label}
                        </button>
                    `).join('')}
                </div>
                <input type="hidden" id="${question.id}" value="${value}">
            </div>
        `;
    }
    else if (question.type === "quiz") {
        return `
            <div class="form-question">
                <label>${question.label}</label>
                <p>${question.subtitle}</p>
                <div class="button-group" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
                    ${question.options.map(opt => `
                        <button type="button" class="option-btn ${value === opt.value ? 'selected' : ''}" 
                            onclick="selectOption('${question.id}', '${opt.value}', this)"
                            style="padding: 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 2rem;">${opt.icon}</span>
                            <strong>${opt.label}</strong>
                            <span style="font-size: 0.8rem; color: #666;">${opt.desc}</span>
                        </button>
                    `).join('')}
                </div>
                <input type="hidden" id="${question.id}" value="${value}">
            </div>
        `;
    }
    else if (question.type === "text" || question.type === "email" || question.type === "tel") {
        return `
            <div class="form-question">
                <label>${question.label}</label>
                <input type="${question.type === 'email' ? 'email' : question.type === 'tel' ? 'tel' : 'text'}" 
                    class="form-input" 
                    id="${question.id}" 
                    placeholder="${question.placeholder}"
                    value="${value}">
            </div>
        `;
    }
    else if (question.type === "checkbox") {
        return `
            <div class="form-question">
                <div class="checkbox-item">
                    <input type="checkbox" id="${question.id}" ${value ? 'checked' : ''}>
                    <label for="${question.id}">${question.label}</label>
                </div>
            </div>
        `;
    }
}

/**
 * Select an option button
 */
function selectOption(fieldId, value, btn) {
    const siblings = btn.parentElement.querySelectorAll('.option-btn');
    siblings.forEach(s => s.classList.remove('selected'));
    btn.classList.add('selected');
    document.getElementById(fieldId).value = value;
    applicationData[fieldId] = value;
}

/**
 * Attach event listeners to form inputs
 */
function attachEventListeners() {
    const inputs = document.querySelectorAll('.form-input, input[type="checkbox"]');
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                applicationData[e.target.id] = e.target.checked;
            } else {
                applicationData[e.target.id] = e.target.value;
            }
        });
    });
}

/**
 * Validate current phase
 */
function validatePhase() {
    const phase = adoptionPhases[currentPhase];
    
    for (let question of phase.questions) {
        const value = applicationData[question.id];
        
        if (question.type === "checkbox") {
            if (!value) {
                alert(`Please agree to: ${question.label}`);
                return false;
            }
        } else if (!value) {
            alert(`Please answer: ${question.label}`);
            return false;
        }
        
        // Validate email format
        if (question.type === "email" && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                alert("Please enter a valid email address");
                return false;
            }
        }
        
        // Validate phone format
        if (question.type === "tel" && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) {
                alert("Please enter a valid phone number");
                return false;
            }
        }
    }
    
    return true;
}

/**
 * Move to next step
 */
function nextStep() {
    if (!validatePhase()) {
        return;
    }
    
    if (currentPhase < adoptionPhases.length - 1) {
        currentPhase++;
        renderPhase();
        window.scrollTo(0, 0);
    } else {
        // All phases complete
        submitApplication();
    }
}

/**
 * Move to previous step
 */
function previousStep() {
    if (currentPhase > 0) {
        currentPhase--;
        renderPhase();
        window.scrollTo(0, 0);
    }
}

/**
 * Update progress bar and steps
 */
function updateProgress() {
    const totalPhases = adoptionPhases.length;
    const progressPercent = ((currentPhase + 1) / totalPhases) * 100;
    document.getElementById("progressBar").style.width = progressPercent + "%";
    
    // Update step indicators
    let stepsHtml = '';
    for (let i = 0; i < totalPhases; i++) {
        const phase = adoptionPhases[i];
        let stepClass = 'step';
        let stepContent = i + 1;
        
        if (i < currentPhase) {
            stepClass += ' completed';
            stepContent = '✓';
        } else if (i === currentPhase) {
            stepClass += ' active';
        }
        
        stepsHtml += `
            <div class="${stepClass}">
                <div class="step-dot">${stepContent}</div>
                <p class="step-label">Step ${i + 1}: ${phase.title}</p>
            </div>
        `;
    }
    
    document.getElementById("progressSteps").innerHTML = stepsHtml;
    
    // Update button states
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    if (currentPhase === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
    }
    
    if (currentPhase === totalPhases - 1) {
        nextBtn.textContent = "Submit Application";
    } else {
        nextBtn.textContent = "Next Step";
    }
}

/**
 * Submit application
 */
function submitApplication() {
    setSessionData('adoptionApplication', applicationData);
    goToPage('adoption-complete.html');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'adoption-application.html') {
        initializeAdoption();
    }
});