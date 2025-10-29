/**
 * Character Counters for Genius v3.0 Textareas
 * Provides real-time character counting for legacy-vision and why-now fields
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharacterCounters);
  } else {
    initCharacterCounters();
  }

  function initCharacterCounters() {
    // Legacy Vision counter
    const legacyVision = document.getElementById('legacy-vision');
    const legacyCount = document.getElementById('legacy-vision-count');
    
    if (legacyVision && legacyCount) {
      legacyVision.addEventListener('input', function() {
        const length = this.value.length;
        legacyCount.textContent = length;
        
        // Visual feedback
        const parent = legacyCount.closest('.character-count');
        if (length < 100) {
          parent.style.color = '#e74c3c';  // Red - below minimum
        } else if (length < 300) {
          parent.style.color = '#f39c12';  // Orange - good start
        } else {
          parent.style.color = '#27ae60';  // Green - excellent
        }
      });
    }
    
    // Why Now counter
    const whyNow = document.getElementById('why-now');
    const whyNowCount = document.getElementById('why-now-count');
    
    if (whyNow && whyNowCount) {
      whyNow.addEventListener('input', function() {
        const length = this.value.length;
        whyNowCount.textContent = length;
        
        // Visual feedback
        const parent = whyNowCount.closest('.character-count');
        if (length < 50) {
          parent.style.color = '#e74c3c';  // Red - below minimum
        } else if (length < 150) {
          parent.style.color = '#f39c12';  // Orange - good
        } else {
          parent.style.color = '#27ae60';  // Green - excellent
        }
      });
    }
    
    // Personal Growth counter
    const personalGrowth = document.getElementById('personal-growth');
    const personalGrowthCount = document.getElementById('personal-growth-count');
    
    if (personalGrowth && personalGrowthCount) {
      personalGrowth.addEventListener('input', function() {
        const length = this.value.length;
        personalGrowthCount.textContent = length;
        
        // Visual feedback
        const parent = personalGrowthCount.closest('.character-count');
        if (length < 100) {
          parent.style.color = '#e74c3c';  // Red - below minimum
        } else if (length < 250) {
          parent.style.color = '#f39c12';  // Orange - good
        } else {
          parent.style.color = '#27ae60';  // Green - excellent
        }
      });
    }
  }
})();
