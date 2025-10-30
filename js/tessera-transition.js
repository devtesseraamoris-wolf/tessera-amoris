/**
 * TESSERA TRANSITION ANIMATION
 * Controla a animação de transição entre seções do formulário
 * Tema: "Weaving Your Legacy"
 * Data: 30 de outubro de 2025
 */

(function() {
    'use strict';
    
    class TesseraTransition {
        constructor() {
            this.overlay = null;
            this.isAnimating = false;
            this.messages = {
                1: {
                    main: "✨ Your Vision Opens the Path Ahead",
                    sub: "Every extraordinary love story begins with a dream like yours...",
                    icon: "✨"
                },
                2: {
                    main: "💫 Your Authentic Self Speaks Volumes",
                    sub: "The right person will cherish exactly who you are...",
                    icon: "💫"
                },
                3: {
                    main: "💖 Your Heart Reveals Your True North",
                    sub: "These sacred values will guide you to your soulmate...",
                    icon: "💖"
                },
                4: {
                    main: "🌟 Your Perfect Match Is Waiting",
                    sub: "Someone extraordinary is ready to build this future with you...",
                    icon: "🌟"
                },
                5: {
                    main: "🎨 Your Legacy Awaits Its Final Touch",
                    sub: "In moments, your journey to extraordinary love begins...",
                    icon: "🎨"
                }
            };
            
            this.init();
        }
        
        init() {
            // Create overlay element
            this.createOverlay();
            
            // Listen for section transitions
            this.setupListeners();
            
            console.log('Tessera Transition initialized');
        }
        
        createOverlay() {
            // Create overlay container
            this.overlay = document.createElement('div');
            this.overlay.className = 'tessera-transition-overlay';
            
            // Create logo container
            const logoContainer = document.createElement('div');
            logoContainer.className = 'tessera-logo-container';
            
            const logoText = document.createElement('h1');
            logoText.className = 'tessera-logo-text';
            logoText.textContent = 'TESSERA AMORIS';
            
            logoContainer.appendChild(logoText);
            
            // Create message container
            const messageContainer = document.createElement('div');
            messageContainer.className = 'tessera-message-container';
            
            const message = document.createElement('p');
            message.className = 'tessera-message';
            
            const submessage = document.createElement('p');
            submessage.className = 'tessera-submessage';
            
            messageContainer.appendChild(message);
            messageContainer.appendChild(submessage);
            
            // Create weaving animation
            const weavingAnimation = document.createElement('div');
            weavingAnimation.className = 'weaving-animation';
            
            // Add horizontal lines
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.className = 'weaving-line';
                weavingAnimation.appendChild(line);
            }
            
            // Add vertical lines
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.className = 'weaving-vertical';
                weavingAnimation.appendChild(line);
            }
            
            // Create golden shimmer
            const shimmer = document.createElement('div');
            shimmer.className = 'golden-shimmer';
            
            // Create golden particles
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'golden-particles';
            
            // Add 20 particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particlesContainer.appendChild(particle);
            }
            
            // Assemble overlay
            this.overlay.appendChild(particlesContainer);
            this.overlay.appendChild(logoContainer);
            this.overlay.appendChild(messageContainer);
            this.overlay.appendChild(weavingAnimation);
            this.overlay.appendChild(shimmer);
            
            // Add to body
            document.body.appendChild(this.overlay);
        }
        
        setupListeners() {
            // Listen for custom event from form control
            document.addEventListener('tessera:sectionComplete', (e) => {
                console.log('Tessera transition event received:', e.detail);
                const fromSection = e.detail.fromSection;
                const toSection = e.detail.toSection;
                this.showTransition(fromSection, toSection);
            });
            console.log('Tessera transition listeners setup complete');
        }
        
        showTransition(fromSection, toSection) {
            console.log('showTransition called:', fromSection, '->', toSection);
            
            if (this.isAnimating) {
                console.log('Already animating, skipping');
                return;
            }
            
            this.isAnimating = true;
            
            // Update messages
            const messageData = this.messages[fromSection];
            console.log('Message data for section', fromSection, ':', messageData);
            
            if (messageData) {
                const messageEl = this.overlay.querySelector('.tessera-message');
                const submessageEl = this.overlay.querySelector('.tessera-submessage');
                
                console.log('Message elements:', messageEl, submessageEl);
                
                messageEl.textContent = messageData.main;
                submessageEl.textContent = messageData.sub;
                
                console.log('Messages updated:', messageData.main, messageData.sub);
            } else {
                console.warn('No message data found for section:', fromSection);
            }
            
            // Set data attribute for section-specific styling
            this.overlay.setAttribute('data-from-section', fromSection);
            
            // Show overlay
            console.log('Adding active class to overlay');
            this.overlay.classList.add('active');
            console.log('Overlay classes:', this.overlay.className);
            
            // Hide after animation duration (3 seconds)
            setTimeout(() => {
                console.log('Hiding transition after 3s');
                this.hideTransition();
            }, 3000);
        }
        
        hideTransition() {
            // Fade out overlay
            this.overlay.classList.remove('active');
            
            // Reset animation state after fade out
            setTimeout(() => {
                this.isAnimating = false;
                this.overlay.removeAttribute('data-from-section');
            }, 400);
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.tesseraTransition = new TesseraTransition();
        });
    } else {
        window.tesseraTransition = new TesseraTransition();
    }
    
})();
