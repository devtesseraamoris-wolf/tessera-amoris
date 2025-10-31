/**
 * TESSERA WEAVING ANIMATION
 * Revolutionary transition animation using Canvas HTML5
 * Hundreds of tesseras fly in, form symbols and words, then fly out
 * Data: 30 de outubro de 2025
 */

(function() {
    'use strict';
    
    class TesseraWeaving {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.tesseras = [];
            this.isAnimating = false;
            this.animationFrame = null;
            this.currentPhase = 0;
            this.phaseStartTime = 0;
            
            // Animation configuration
            this.config = {
                tesseraCount: 300,
                tesseraSize: 4,
                colors: ['#C9A961', '#D4AF37', '#B8860B', '#FFD700'],
                duration: 5000, // 5 seconds
                phases: {
                    convergence: 800,    // 0.0s - 0.8s
                    symbolForm: 700,     // 0.8s - 1.5s
                    messageForm: 2000,   // 1.5s - 3.5s
                    submessage: 1000,    // 3.5s - 4.5s
                    dispersion: 500      // 4.5s - 5.0s
                }
            };
            
            // Messages and symbols for each section
            this.content = {
                1: {
                    symbol: 'map',
                    main: "Your Path Is Being Drawn",
                    sub: "Every piece of your story leads to extraordinary love..."
                },
                2: {
                    symbol: 'diamond',
                    main: "Your True Self Is Precious",
                    sub: "The right soul will treasure every facet of who you are..."
                },
                3: {
                    symbol: 'compass',
                    main: "Your Values Point True North",
                    sub: "These sacred principles guide you to your destined match..."
                },
                4: {
                    symbol: 'ring',
                    main: "Your Forever Awaits Discovery",
                    sub: "Someone extraordinary is ready to complete this circle with you..."
                },
                5: {
                    symbol: 'monument',
                    main: "Your Legacy Takes Its Form",
                    sub: "In moments, your journey to timeless love begins..."
                }
            };
            
            this.init();
        }
        
        init() {
            this.createCanvas();
            this.setupListeners();
            console.log('Tessera Weaving initialized');
        }
        
        createCanvas() {
            // Create canvas element
            this.canvas = document.createElement('canvas');
            this.canvas.className = 'tessera-canvas';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.4s ease;
            `;
            
            // Set canvas size
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            
            // Get context
            this.ctx = this.canvas.getContext('2d');
            
            // Add to body
            document.body.appendChild(this.canvas);
            
            // Handle resize
            window.addEventListener('resize', () => {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            });
        }
        
        setupListeners() {
            document.addEventListener('tessera:sectionComplete', (e) => {
                console.log('Tessera weaving event received:', e.detail);
                const fromSection = e.detail.fromSection;
                this.startAnimation(fromSection);
            });
            console.log('Tessera weaving listeners setup complete');
        }
        
        startAnimation(sectionNumber) {
            if (this.isAnimating) return;
            
            console.log('Starting tessera weaving animation for section:', sectionNumber);
            this.isAnimating = true;
            this.currentSection = sectionNumber;
            this.currentPhase = 0;
            this.phaseStartTime = Date.now();
            
            // Show canvas
            this.canvas.style.opacity = '1';
            
            // Create tesseras
            this.createTesseras();
            
            // Start animation loop
            this.animate();
        }
        
        createTesseras() {
            this.tesseras = [];
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            for (let i = 0; i < this.config.tesseraCount; i++) {
                // Start from random positions outside the screen
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.max(this.canvas.width, this.canvas.height);
                
                this.tesseras.push({
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance,
                    targetX: centerX,
                    targetY: centerY,
                    size: this.config.tesseraSize + Math.random() * 2,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.1,
                    color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
                    speed: 0.05 + Math.random() * 0.05,
                    alpha: 1
                });
            }
        }
        
        animate() {
            const now = Date.now();
            const elapsed = now - this.phaseStartTime;
            
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw tesseras
            this.updateTesseras(elapsed);
            this.drawTesseras();
            
            // Check phase transitions
            this.updatePhase(elapsed);
            
            // Continue animation
            if (this.isAnimating) {
                this.animationFrame = requestAnimationFrame(() => this.animate());
            }
        }
        
        updateTesseras(elapsed) {
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            this.tesseras.forEach((tessera, index) => {
                // Phase 0: Convergence (fly to center)
                if (this.currentPhase === 0) {
                    const dx = tessera.targetX - tessera.x;
                    const dy = tessera.targetY - tessera.y;
                    tessera.x += dx * tessera.speed;
                    tessera.y += dy * tessera.speed;
                    tessera.rotation += tessera.rotationSpeed;
                }
                
                // Phase 1: Form symbol
                else if (this.currentPhase === 1) {
                    const symbolPoints = this.getSymbolPoints(this.content[this.currentSection].symbol);
                    if (symbolPoints && symbolPoints[index]) {
                        tessera.targetX = centerX + symbolPoints[index].x;
                        tessera.targetY = centerY + symbolPoints[index].y;
                    }
                    const dx = tessera.targetX - tessera.x;
                    const dy = tessera.targetY - tessera.y;
                    tessera.x += dx * 0.1;
                    tessera.y += dy * 0.1;
                    tessera.rotation += tessera.rotationSpeed * 0.5;
                }
                
                // Phase 2: Form message
                else if (this.currentPhase === 2) {
                    const messagePoints = this.getMessagePoints(this.content[this.currentSection].main);
                    if (messagePoints && messagePoints[index]) {
                        tessera.targetX = centerX + messagePoints[index].x;
                        tessera.targetY = centerY + messagePoints[index].y;
                    } else {
                        // Extra tesseras fade out
                        tessera.alpha = Math.max(0, tessera.alpha - 0.02);
                    }
                    const dx = tessera.targetX - tessera.x;
                    const dy = tessera.targetY - tessera.y;
                    tessera.x += dx * 0.08;
                    tessera.y += dy * 0.08;
                }
                
                // Phase 3: Hold for submessage
                else if (this.currentPhase === 3) {
                    // Tesseras stay in position, slight floating
                    tessera.y += Math.sin(Date.now() * 0.001 + index) * 0.1;
                }
                
                // Phase 4: Dispersion (fly out)
                else if (this.currentPhase === 4) {
                    const angle = Math.atan2(tessera.y - centerY, tessera.x - centerX);
                    tessera.x += Math.cos(angle) * 10;
                    tessera.y += Math.sin(angle) * 10;
                    tessera.alpha = Math.max(0, tessera.alpha - 0.03);
                    tessera.rotation += tessera.rotationSpeed * 2;
                }
            });
        }
        
        drawTesseras() {
            this.tesseras.forEach(tessera => {
                if (tessera.alpha <= 0) return;
                
                this.ctx.save();
                this.ctx.translate(tessera.x, tessera.y);
                this.ctx.rotate(tessera.rotation);
                this.ctx.globalAlpha = tessera.alpha;
                
                // Draw tessera as a small square with glow
                this.ctx.fillStyle = tessera.color;
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = tessera.color;
                this.ctx.fillRect(-tessera.size / 2, -tessera.size / 2, tessera.size, tessera.size);
                
                this.ctx.restore();
            });
        }
        
        updatePhase(elapsed) {
            const phases = this.config.phases;
            
            if (this.currentPhase === 0 && elapsed > phases.convergence) {
                this.currentPhase = 1;
                this.phaseStartTime = Date.now();
                console.log('Phase 1: Forming symbol');
            }
            else if (this.currentPhase === 1 && elapsed > phases.symbolForm) {
                this.currentPhase = 2;
                this.phaseStartTime = Date.now();
                console.log('Phase 2: Forming message');
                this.showTextMessage();
            }
            else if (this.currentPhase === 2 && elapsed > phases.messageForm) {
                this.currentPhase = 3;
                this.phaseStartTime = Date.now();
                console.log('Phase 3: Showing submessage');
                this.showSubmessage();
            }
            else if (this.currentPhase === 3 && elapsed > phases.submessage) {
                this.currentPhase = 4;
                this.phaseStartTime = Date.now();
                console.log('Phase 4: Dispersing');
                this.hideMessages();
            }
            else if (this.currentPhase === 4 && elapsed > phases.dispersion) {
                this.stopAnimation();
            }
        }
        
        getSymbolPoints(symbolType) {
            const points = [];
            const scale = 80;
            
            switch(symbolType) {
                case 'map':
                    // Create a path/map shape
                    for (let i = 0; i < this.config.tesseraCount; i++) {
                        const t = i / this.config.tesseraCount;
                        const x = (t - 0.5) * scale * 3;
                        const y = Math.sin(t * Math.PI * 3) * scale * 0.5;
                        points.push({ x, y });
                    }
                    break;
                    
                case 'diamond':
                    // Create a diamond shape
                    for (let i = 0; i < this.config.tesseraCount; i++) {
                        const angle = (i / this.config.tesseraCount) * Math.PI * 2;
                        const radius = scale * (Math.abs(Math.cos(angle * 2)) * 0.5 + 0.5);
                        points.push({
                            x: Math.cos(angle) * radius,
                            y: Math.sin(angle) * radius
                        });
                    }
                    break;
                    
                case 'compass':
                    // Create a compass shape
                    for (let i = 0; i < this.config.tesseraCount; i++) {
                        const angle = (i / this.config.tesseraCount) * Math.PI * 2;
                        const radius = i % 4 === 0 ? scale * 1.2 : scale * 0.8;
                        points.push({
                            x: Math.cos(angle) * radius,
                            y: Math.sin(angle) * radius
                        });
                    }
                    break;
                    
                case 'ring':
                    // Create a ring shape
                    for (let i = 0; i < this.config.tesseraCount; i++) {
                        const angle = (i / this.config.tesseraCount) * Math.PI * 2;
                        const radius = scale;
                        points.push({
                            x: Math.cos(angle) * radius,
                            y: Math.sin(angle) * radius
                        });
                    }
                    break;
                    
                case 'monument':
                    // Create a monument/pillar shape
                    for (let i = 0; i < this.config.tesseraCount; i++) {
                        const t = i / this.config.tesseraCount;
                        const x = (Math.random() - 0.5) * scale * 1.5;
                        const y = (t - 0.5) * scale * 2;
                        points.push({ x, y });
                    }
                    break;
            }
            
            return points;
        }
        
        getMessagePoints(text) {
            // Simplified: distribute tesseras in text-like formation
            // In production, you'd use actual font rendering
            const points = [];
            const scale = 15;
            const letterSpacing = 20;
            const lineHeight = 40;
            
            let x = -text.length * letterSpacing / 2;
            let y = 0;
            
            for (let i = 0; i < Math.min(this.config.tesseraCount, text.length * 20); i++) {
                const letterIndex = Math.floor(i / 20);
                const pointInLetter = i % 20;
                
                const lx = x + letterIndex * letterSpacing + (Math.random() - 0.5) * scale;
                const ly = y + (Math.random() - 0.5) * scale;
                
                points.push({ x: lx, y: ly });
            }
            
            return points;
        }
        
        showTextMessage() {
            const message = this.content[this.currentSection].main;
            const messageEl = document.createElement('div');
            messageEl.className = 'tessera-text-message';
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 10001;
                font-family: Georgia, serif;
                font-size: 36px;
                font-weight: 700;
                color: #1a1a1a;
                text-align: center;
                opacity: 0;
                animation: fadeIn 0.5s ease forwards;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            `;
            document.body.appendChild(messageEl);
            this.messageEl = messageEl;
        }
        
        showSubmessage() {
            const submessage = this.content[this.currentSection].sub;
            const submessageEl = document.createElement('div');
            submessageEl.className = 'tessera-text-submessage';
            submessageEl.textContent = submessage;
            submessageEl.style.cssText = `
                position: fixed;
                top: 55%;
                left: 50%;
                transform: translate(-50%, 0);
                z-index: 10001;
                font-family: Georgia, serif;
                font-size: 18px;
                font-style: italic;
                color: rgba(26, 26, 26, 0.8);
                text-align: center;
                max-width: 600px;
                opacity: 0;
                animation: fadeIn 0.5s ease forwards;
            `;
            document.body.appendChild(submessageEl);
            this.submessageEl = submessageEl;
        }
        
        hideMessages() {
            if (this.messageEl) {
                this.messageEl.style.animation = 'fadeOut 0.3s ease forwards';
            }
            if (this.submessageEl) {
                this.submessageEl.style.animation = 'fadeOut 0.3s ease forwards';
            }
        }
        
        stopAnimation() {
            console.log('Stopping tessera weaving animation');
            this.isAnimating = false;
            
            // Hide canvas
            this.canvas.style.opacity = '0';
            
            // Clean up
            setTimeout(() => {
                if (this.messageEl) {
                    this.messageEl.remove();
                    this.messageEl = null;
                }
                if (this.submessageEl) {
                    this.submessageEl.remove();
                    this.submessageEl = null;
                }
                this.tesseras = [];
            }, 400);
            
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
                this.animationFrame = null;
            }
        }
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.tesseraWeaving = new TesseraWeaving();
        });
    } else {
        window.tesseraWeaving = new TesseraWeaving();
    }
    
})();
