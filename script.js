/* ==========================================================================
   Megha's Packers and Movers - JavaScript Interactive Features
   Owner: Mukesh Trivedi | Location: Guna, MP | Phone: 9827110410
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SET CURRENT YEAR IN FOOTER ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. MOBILE NAVBAR TOGGLE ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking any link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // --- 3. NAVBAR SCROLL EFFECT & ACTIVE SECTION HIGHLIGHT ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Sticky shadow effect
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Section Active Navigation Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Back to top button click
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 4. FORM VALIDATION & SUBMISSION ---
    const quoteForm = document.getElementById('quoteForm');
    const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                const formData = getFormData();
                showSuccessModal(formData);
                quoteForm.reset();
                clearValidationErrors();
            }
        });
    }

    if (btnSendWhatsApp) {
        btnSendWhatsApp.addEventListener('click', () => {
            // Validate first before sending WhatsApp
            if (validateForm()) {
                const formData = getFormData();
                sendWhatsAppMessage(formData);
            }
        });
    }
});

// --- HELPER FUNCTION: PRESELECT SERVICE FROM CARDS ---
function preselectService(serviceName) {
    const serviceSelect = document.getElementById('serviceType');
    const quoteSection = document.getElementById('quote');

    if (serviceSelect) {
        serviceSelect.value = serviceName;
    }

    if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Flash the service select to draw user's attention
    if (serviceSelect) {
        setTimeout(() => {
            serviceSelect.focus();
            serviceSelect.parentElement.classList.add('has-highlight');
            setTimeout(() => {
                serviceSelect.parentElement.classList.remove('has-highlight');
            }, 1500);
        }, 600);
    }
}

// --- FORM DATA EXTRACTION ---
function getFormData() {
    return {
        name: document.getElementById('custName')?.value.trim() || '',
        phone: document.getElementById('custPhone')?.value.trim() || '',
        moveFrom: document.getElementById('moveFrom')?.value.trim() || '',
        moveTo: document.getElementById('moveTo')?.value.trim() || '',
        moveDate: document.getElementById('moveDate')?.value || 'Not specified',
        serviceType: document.getElementById('serviceType')?.value || '',
        itemSize: document.getElementById('itemSize')?.value || 'Standard Moving Goods',
        message: document.getElementById('moveMsg')?.value.trim() || 'No additional instructions provided.'
    };
}

// --- FORM VALIDATION ---
function validateForm() {
    let isValid = true;
    clearValidationErrors();

    const name = document.getElementById('custName');
    const phone = document.getElementById('custPhone');
    const moveFrom = document.getElementById('moveFrom');
    const moveTo = document.getElementById('moveTo');
    const serviceType = document.getElementById('serviceType');

    // Name Validation
    if (!name.value.trim()) {
        showError('custName');
        isValid = false;
    }

    // Phone Validation (10 digits minimum)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanedPhone = phone.value.replace(/\D/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
        showError('custPhone');
        isValid = false;
    }

    // Moving From Validation
    if (!moveFrom.value.trim()) {
        showError('moveFrom');
        isValid = false;
    }

    // Moving To Validation
    if (!moveTo.value.trim()) {
        showError('moveTo');
        isValid = false;
    }

    // Service Type Validation
    if (!serviceType.value) {
        showError('serviceType');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.parentElement.classList.add('has-error');
    }
}

function clearValidationErrors() {
    const errorGroups = document.querySelectorAll('.form-group.has-error');
    errorGroups.forEach(group => group.classList.remove('has-error'));
}

// --- DYNAMIC WHATSAPP ENQUIRY GENERATOR ---
function sendWhatsAppMessage(data) {
    const waPhone = "919827110410"; // Business owner Mukesh Trivedi's phone with India country code
    
    let text = `*New Moving Service Enquiry*\n`;
    text += `*Business:* Megha's Packers and Movers (Guna, MP)\n\n`;
    text += `👤 *Customer Name:* ${data.name}\n`;
    text += `📞 *Phone Number:* ${data.phone}\n`;
    text += `📍 *Pickup Location:* ${data.moveFrom}\n`;
    text += `🏁 *Destination Location:* ${data.moveTo}\n`;
    text += `📅 *Moving Date:* ${data.moveDate}\n`;
    text += `📦 *Service Required:* ${data.serviceType}\n`;
    text += `🏠 *House/Item Size:* ${data.itemSize}\n`;
    if (data.message && data.message !== 'No additional instructions provided.') {
        text += `📝 *Notes/Details:* ${data.message}\n`;
    }
    text += `\nPlease provide a free price estimate. Thank you!`;

    const encodedMsg = encodeURIComponent(text);
    const waUrl = `https://wa.me/${waPhone}?text=${encodedMsg}`;
    
    window.open(waUrl, '_blank');
}

// --- SUCCESS MODAL DIALOG ---
function showSuccessModal(data) {
    const modal = document.getElementById('successModal');
    const modalDetails = document.getElementById('modalDetails');
    const modalWaBtn = document.getElementById('modalWaBtn');

    if (modalDetails) {
        modalDetails.innerHTML = `
            <div><strong>Customer:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.phone)})</div>
            <div><strong>Route:</strong> ${escapeHtml(data.moveFrom)} ➔ ${escapeHtml(data.moveTo)}</div>
            <div><strong>Service:</strong> ${escapeHtml(data.serviceType)} (${escapeHtml(data.itemSize)})</div>
            <div><strong>Date:</strong> ${escapeHtml(data.moveDate)}</div>
        `;
    }

    if (modalWaBtn) {
        const waPhone = "919827110410";
        let text = `*Shifting Enquiry Confirmation*\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n📍 From: ${data.moveFrom}\n🏁 To: ${data.moveTo}\n📦 Service: ${data.serviceType}`;
        modalWaBtn.href = `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
    }

    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking close icon or background overlay
document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('successModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'successModal') {
        closeModal();
    }
});

// HTML Escape Helper
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}
