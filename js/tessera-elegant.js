/**
 * TESSERA ELEGANT TRANSITION
 * Professional, elegant, and sophisticated animation
 * No cheap effects - pure class
 */

(function() {
    'use strict';
    
    class TesseraElegant {
        constructor() {
            this.overlay = null;
            this.isAnimating = false;
            
            this.messages = {
                1: {
                    main: "Your Path Is Being Drawn",
                    sub: "Every piece of your story leads to extraordinary love..."
                },
                2: {
                    main: "Your True Self Is Precious",
                    sub: "The right soul will treasure every facet of who you are..."
                },
                3: {
                    main: "Your Values Point True North",
                    sub: "These sacred principles guide you to your destined match..."
                },
                4: {
                    main: "Your Forever Awaits Discovery",
                    sub: "Someone extraordinary is ready to complete this circle with you..."
                },
                5: {
                    main: "Your Legacy Takes Its Form",
                    sub: "In moments, your journey to timeless love begins..."
                }
            };
            
            this.init();
        }
        
        init() {
            this.createOverlay();
            this.setupListeners();
            console.log('Tessera Elegant initialized');
        }
        
        createOverlay() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'tessera-elegant-overlay';
            this.overlay.innerHTML = `
                <div class="tessera-elegant-content">
                    <div class="tessera-elegant-logo">TESSERA AMORIS</div>
                    <div class="tessera-elegant-message"></div>
                    <div class="tessera-elegant-submessage"></div>
                </div>
            `;
            
            // Add styles
            const style = document.createElement('style');
            style.textContent = `
                .tessera-elegant-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(201, 169, 97, 0.97), rgba(212, 175, 55, 0.97));
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.5s ease;
                }
                
                .tessera-elegant-overlay.active {
                    opacity: 1;
                    pointer-events: all;
                }
                
                .tessera-elegant-content {
                    text-align: center;
                    max-width: 800px;
                    padding: 40px;
                }
                
                .tessera-elegant-logo {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 3px;
                    color: rgba(26, 26, 26, 0.6);
                    margin-bottom: 60px;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: all 0.8s ease;
                }
                
                .tessera-elegant-overlay.active .tessera-elegant-logo {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .tessera-elegant-message {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: 48px;
                    font-weight: 700;
                    line-height: 1.3;
                    color: #1a1a1a;
                    margin-bottom: 30px;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s ease 0.3s;
                }
                
                .tessera-elegant-overlay.active .tessera-elegant-message {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .tessera-elegant-submessage {
                    font-family: Georgia, serif;
                    font-size: 20px;
                    font-style: italic;
                    line-height: 1.6;
                    color: rgba(26, 26, 26, 0.8);
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s ease 0.6s;
                }
                
                .tessera-elegant-overlay.active .tessera-elegant-submessage {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                @media (max-width: 768px) {
                    .tessera-elegant-message {
                        font-size: 32px;
                    }
                    .tessera-elegant-submessage {
                        font-size: 16px;
                    }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(this.overlay);
        }
        
        setupListeners() {
            document.addEventListener('tessera:sectionComplete', (e) => {
                console.log('Tessera elegant event received:', e.detail);
                this.startAnimation(e.detail.fromSection);
            });
            console.log('Tessera elegant listeners setup complete');
        }
        
        startAnimation(sectionNumber) {
            if (this.isAnimating) return;
            
            console.log('Starting elegant animation for section:', sectionNumber);
            this.isAnimating = true;
            
            const content = this.messages[sectionNumber];
            if (!content) return;
            
            // Update content
            const messageEl = this.overlay.querySelector('.tessera-elegant-message');
            const submessageEl = this.overlay.querySelector('.tessera-elegant-submessage');
            
            messageEl.textContent = content.main;
            submessageEl.textContent = content.sub;
            
            // Show overlay
            this.overlay.classList.add('active');
            
            // Hide after 5 seconds
            setTimeout(() => {
                this.stopAnimation();
            }, 5000);
        }
        
        stopAnimation() {
            console.log('Stopping elegant animation');
            this.overlay.classList.remove('active');
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
    }
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.tesseraElegant = new TesseraElegant();
        });
    } else {
        window.tesseraElegant = new TesseraElegant();
    }
    
})();
