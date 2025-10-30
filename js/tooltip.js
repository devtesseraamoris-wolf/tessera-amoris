/**
 * TOOLTIP FUNCTIONALITY FOR START YOUR LEGACY BUTTON
 * Creates a visible tooltip showing application details
 */

document.addEventListener('DOMContentLoaded', function() {
    const heroBtn = document.querySelector('.hero-btn');
    
    if (heroBtn) {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <div class="tooltip-icon">✨</div>
                <div class="tooltip-title">Begin Your Journey</div>
                <div class="tooltip-desc">Complete our exclusive application</div>
                <div class="tooltip-value">Investment: Upon Approval</div>
                <div class="tooltip-cta">Click to start →</div>
            </div>
        `;
        
        // Add tooltip to body
        document.body.appendChild(tooltip);
        
        // Show tooltip on hover
        heroBtn.addEventListener('mouseenter', function(e) {
            const btnRect = heroBtn.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Position tooltip above button
            tooltip.style.left = (btnRect.left + btnRect.width / 2 - tooltipRect.width / 2) + 'px';
            tooltip.style.top = (btnRect.top - tooltipRect.height - 20) + 'px';
            
            tooltip.classList.add('show');
        });
        
        // Hide tooltip on mouse leave
        heroBtn.addEventListener('mouseleave', function() {
            tooltip.classList.remove('show');
        });
    }
});
