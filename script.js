/**
 * Yogeshwaran.S - Mechanical Engineer Portfolio JavaScript
 * Interactive Navigation, Resume PDF Downloader & Modal Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on clicking nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. Scroll Active Navigation Link Highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Navbar background dynamic shadow
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
    });
});

// 3. Open Resume Modal
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// 4. Close Resume Modal
function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeResumeModal();
    }
});

// 5. Download Resume PDF Functionality
function downloadResumePDF() {
    const element = document.getElementById('resumePrintableArea');

    if (!element) {
        alert('Resume document is preparing. Please try again.');
        return;
    }

    // If html2pdf library is available
    if (typeof html2pdf !== 'undefined') {
        // Temporary feedback
        const btn = event ? (event.currentTarget || event.target) : null;
        let originalText = '';
        if (btn) {
            originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating PDF...';
            btn.disabled = true;
        }

        const opt = {
            margin:       [10, 10, 10, 10], // top, left, bottom, right in mm
            filename:     'Yogeshwaran_S_Mechanical_Engineer_Resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Render PDF download directly
        html2pdf().set(opt).from(element).save().then(() => {
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }).catch(err => {
            console.error('PDF Generation Error:', err);
            fallbackPrint();
            if (btn) {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    } else {
        // Fallback to browser print function
        fallbackPrint();
    }
}

// Fallback Browser Print Engine
function fallbackPrint() {
    openResumeModal();
    setTimeout(() => {
        window.print();
    }, 500);
}

// 6. Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 7. Direct Email & Contact Form Handling
function sendDirectEmail() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() || 'Portfolio Visitor' : 'Portfolio Visitor';
    const email = emailInput ? emailInput.value.trim() || 'Not specified' : 'Not specified';
    const subject = subjectInput ? subjectInput.value.trim() || 'Portfolio Inquiry for Yogeshwaran' : 'Portfolio Inquiry for Yogeshwaran';
    const message = messageInput ? messageInput.value.trim() || 'Hi Yogeshwaran, I would like to connect with you regarding engineering opportunities.' : 'Hi Yogeshwaran, I would like to connect with you regarding engineering opportunities.';

    const formattedBody = `Hi Yogeshwaran,\n\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`;

    // Launch Gmail composer directly in a new window/tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mech218784@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
    window.open(gmailUrl, '_blank');
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const submitBtn = document.getElementById('submitBtn');
    const statusBox = document.getElementById('formStatus');

    if (!statusBox) return;

    const formattedBody = `Hi Yogeshwaran,\n\n${message}\n\n---\nSender Details:\nName: ${name}\nEmail: ${email}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mech218784@gmail.com&su=${encodeURIComponent('[Portfolio Inquiry] ' + subject)}&body=${encodeURIComponent(formattedBody)}`;
    const mailtoUrl = `mailto:mech218784@gmail.com?subject=${encodeURIComponent('[Portfolio Inquiry] ' + subject)}&body=${encodeURIComponent(formattedBody)}`;

    // Loading UI State
    submitBtn.disabled = true;
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...';

    statusBox.style.display = 'block';
    statusBox.className = 'form-status-box loading';
    statusBox.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing message to Yogeshwaran...';

    // Direct AJAX submission to FormSubmit API
    fetch('https://formsubmit.co/ajax/mech218784@gmail.com', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            _subject: `[Portfolio Inquiry] ${subject}`,
            message: message,
            _template: 'table'
        })
    })
    .then(response => response.json())
    .then(data => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        
        if (data.success === "true" || data.success === true) {
            statusBox.className = 'form-status-box success';
            statusBox.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                <strong>Message Delivered!</strong><br>
                Thank you, ${name}. Your message has been sent directly to <strong>mech218784@gmail.com</strong>. Yogeshwaran will reply to you soon.
            `;
            document.getElementById('portfolioContactForm').reset();
        } else if (data.message && data.message.includes('Activation')) {
            statusBox.className = 'form-status-box warning';
            statusBox.innerHTML = `
                <i class="fa-solid fa-envelope-open-text"></i>
                <strong>Form Activation Notice:</strong> FormSubmit sent a 1-time activation link to <strong>mech218784@gmail.com</strong>.<br>
                Send your message directly to Yogeshwaran right now using:
                <div class="form-status-actions">
                    <a href="${gmailUrl}" target="_blank" class="btn-status-action">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Gmail Web
                    </a>
                    <a href="${mailtoUrl}" class="btn-status-action">
                        <i class="fa-solid fa-envelope"></i> Open Default Mail App
                    </a>
                </div>
            `;
        } else {
            statusBox.className = 'form-status-box warning';
            statusBox.innerHTML = `
                <i class="fa-solid fa-circle-info"></i>
                ${data.message || 'Form submitted.'}<br>
                Send your message directly to Yogeshwaran right now using:
                <div class="form-status-actions">
                    <a href="${gmailUrl}" target="_blank" class="btn-status-action">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Gmail Web
                    </a>
                    <a href="${mailtoUrl}" class="btn-status-action">
                        <i class="fa-solid fa-envelope"></i> Open Default Mail App
                    </a>
                </div>
            `;
        }
    })
    .catch(error => {
        console.warn('FormSubmit AJAX failed:', error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;

        statusBox.className = 'form-status-box warning';
        statusBox.innerHTML = `
            <i class="fa-solid fa-paper-plane"></i>
            <strong>Direct Dispatch Ready!</strong> Send your message directly to Yogeshwaran (<strong>mech218784@gmail.com</strong>):
            <div class="form-status-actions">
                <a href="${gmailUrl}" target="_blank" class="btn-status-action">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Gmail Web
                </a>
                <a href="${mailtoUrl}" class="btn-status-action">
                    <i class="fa-solid fa-envelope"></i> Open Default Mail App
                </a>
            </div>
        `;
    });
}

// 8. Copy Email Address to Clipboard Helper
function copyEmailToClipboard(event) {
    if (event) event.preventDefault();
    const emailText = 'mech218784@gmail.com';
    
    navigator.clipboard.writeText(emailText).then(() => {
        const copyTextSpan = document.getElementById('copyText');
        if (copyTextSpan) {
            const original = copyTextSpan.innerText;
            copyTextSpan.innerText = 'Copied!';
            setTimeout(() => {
                copyTextSpan.innerText = original;
            }, 2000);
        } else {
            alert('Email address copied to clipboard: mech218784@gmail.com');
        }
    }).catch(err => {
        prompt('Copy email manually:', emailText);
    });
}
