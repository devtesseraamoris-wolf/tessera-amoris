/**
 * WAITLIST CONFIRMATION - Tessera Amoris
 * Creates urgency and exclusivity through position number display
 */

/**
 * Initialize waitlist confirmation page
 */
function initializeWaitlistConfirmation() {
    // Get position and email from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const position = urlParams.get('position');
    const email = urlParams.get('email');
    
    // Or from localStorage (fallback)
    const storedPosition = localStorage.getItem('tesseraWaitlistPosition');
    const storedEmail = localStorage.getItem('tesseraUserEmail');
    
    const finalPosition = position || storedPosition;
    const finalEmail = email || storedEmail;
    
    // Display position with animation
    if (finalPosition) {
        animatePositionNumber(parseInt(finalPosition));
    } else {
        // Fallback if no position found
        document.getElementById('position-number').textContent = '#---';
    }
    
    // Display email
    if (finalEmail) {
        const emailElement = document.querySelector('.user-email');
        if (emailElement) {
            emailElement.textContent = finalEmail;
        }
    }
    
    // Clear localStorage after displaying
    localStorage.removeItem('tesseraWaitlistPosition');
    localStorage.removeItem('tesseraUserEmail');
    
    // Add analytics event
    trackWaitlistView(finalPosition);
}

/**
 * Animate position number with smooth counting effect
 */
function animatePositionNumber(targetNumber) {
    const element = document.getElementById('position-number');
    
    if (!element) return;
    
    const duration = 2000; // 2 seconds
    const startNumber = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // Calculate current number
        const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOut);
        
        // Update display
        element.textContent = '#' + currentNumber;
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Ensure final number is exact
            element.textContent = '#' + targetNumber;
            
            // Add pulse animation when complete
            element.style.animation = 'numberPulse 0.5s ease';
        }
    }
    
    // Start animation
    requestAnimationFrame(updateNumber);
}

/**
 * Track waitlist view for analytics
 */
function trackWaitlistView(position) {
    // Google Analytics (if configured)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'waitlist_view', {
            'event_category': 'Application',
            'event_label': 'Position ' + position,
            'value': position
        });
    }
    
    // Custom analytics endpoint (optional)
    fetch('/api/track-waitlist-view', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            position: position,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        })
    }).catch(err => {
        // Silent fail - analytics shouldn't break user experience
        console.log('Analytics tracking failed:', err);
    });
}

/**
 * Add print functionality
 */
function setupPrintButton() {
    const printBtn = document.getElementById('print-confirmation');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

/**
 * Add social sharing functionality (optional)
 */
function setupSocialSharing() {
    const shareBtn = document.getElementById('share-confirmation');
    if (shareBtn && navigator.share) {
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'Tessera Amoris Application',
                    text: 'I just applied to Tessera Amoris - an exclusive matchmaking community for faith-centered individuals.',
                    url: window.location.origin
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        });
    } else if (shareBtn) {
        // Hide share button if Web Share API not supported
        shareBtn.style.display = 'none';
    }
}

/**
 * Add email reminder functionality
 */
function setupEmailReminder() {
    const reminderBtn = document.getElementById('set-reminder');
    if (reminderBtn) {
        reminderBtn.addEventListener('click', () => {
            // Create calendar event
            const event = {
                title: 'Tessera Amoris Application Follow-up',
                description: 'Check email for application decision',
                start: getBusinessDaysFromNow(5),
                duration: 60 // minutes
            };
            
            // Generate calendar link
            const calendarUrl = generateCalendarUrl(event);
            window.open(calendarUrl, '_blank');
        });
    }
}

/**
 * Calculate business days from now
 */
function getBusinessDaysFromNow(days) {
    const date = new Date();
    let addedDays = 0;
    
    while (addedDays < days) {
        date.setDate(date.getDate() + 1);
        // Skip weekends
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            addedDays++;
        }
    }
    
    return date;
}

/**
 * Generate Google Calendar URL
 */
function generateCalendarUrl(event) {
    const startDate = event.start.toISOString().replace(/-|:|\.\d+/g, '');
    const endDate = new Date(event.start.getTime() + event.duration * 60000)
        .toISOString().replace(/-|:|\.\d+/g, '');
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.description)}&dates=${startDate}/${endDate}`;
}

/**
 * Add confetti animation (optional celebratory effect)
 */
function triggerConfetti() {
    // Simple confetti effect using CSS
    const colors = ['#D4AF37', '#0c1b33', '#FFFFF0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate
        const duration = 3000 + Math.random() * 2000;
        const animation = confetti.animate([
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

/**
 * Add CSS for number pulse animation
 */
function addPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes numberPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeWaitlistConfirmation();
    addPulseAnimation();
    setupPrintButton();
    setupSocialSharing();
    setupEmailReminder();
    
    // Optional: Trigger confetti for high-quality experience
    setTimeout(triggerConfetti, 500);
});

// Export for use in other scripts
window.TesseraWaitlist = {
    animatePositionNumber,
    trackWaitlistView
};

