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
                    main: 'Your Vision Shines Bright',
                    sub: 'Now, let's discover the beautiful soul behind it...'
                },
                2: {
                    main: 'Your Story Takes Shape',
                    sub: 'Every chapter leads to something extraordinary...'
                },
                3: {
                    main: 'Your Heart Speaks Volumes',
                    sub: 'These values will guide you to your perfect match...'
                },
                4: {
                    main: 'Your Future Awaits',
                    sub: 'Every dream deserves a partner to share it with...'
                },
                5: {
                    main: 'Almost There, Beautiful Soul',
                    sub: 'Your legacy is being woven with golden threads...'
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
            
            // Assemble overlay
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
                const fromSection = e.detail.fromSection;
                const toSection = e.detail.toSection;
                this.showTransition(fromSection, toSection);
            });
        }
        
        showTransition(fromSection, toSection) {
            if (this.isAnimating) return;
            
            this.isAnimating = true;
            
            // Update messages
            const messageData = this.messages[fromSection];
            if (messageData) {
                const messageEl = this.overlay.querySelector('.tessera-message');
                const submessageEl = this.overlay.querySelector('.tessera-submessage');
                
                messageEl.textContent = messageData.main;
                submessageEl.textContent = messageData.sub;
            }
            
            // Set data attribute for section-specific styling
            this.overlay.setAttribute('data-from-section', fromSection);
            
            // Show overlay
            this.overlay.classList.add('active');
            
            // Hide after animation duration (3 seconds)
            setTimeout(() => {
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
