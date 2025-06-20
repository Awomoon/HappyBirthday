
        // DOM Elements
        const surpriseBtn = document.getElementById('surpriseBtn');
        const overlay = document.getElementById('overlay');
        const loveContainer = document.getElementById('loveContainer');
        const closeBtn = document.getElementById('closeBtn');
        const purpleBg = document.querySelector('.purple-bg');
        const particlesContainer = document.getElementById('particles');
        const letterLines = document.querySelectorAll('.letter-text');
        const signature = document.getElementById('signature');
        
        // Create background particles
        function createParticles() {
            const particleCount = 60;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 12 + 3;
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                const delay = Math.random() * 5;
                const duration = Math.random() * 8 + 4;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Create heart explosion
        function createHearts() {
            const heartCount = 40;
            
            for (let i = 0; i < heartCount; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.innerHTML = '💜';
                    
                    // Random position around the button
                    const btnRect = surpriseBtn.getBoundingClientRect();
                    const btnCenterX = btnRect.left + btnRect.width / 2;
                    const btnCenterY = btnRect.top + btnRect.height / 2;
                    
                    // Random direction and speed
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 100;
                    const startX = btnCenterX + Math.cos(angle) * distance;
                    const startY = btnCenterY + Math.sin(angle) * distance;
                    
                    // Random final position
                    const randomX = (Math.random() - 0.5) * 300;
                    const randomY = -100 - Math.random() * 400;
                    
                    heart.style.left = `${startX}px`;
                    heart.style.top = `${startY}px`;
                    heart.style.setProperty('--random-x', `${randomX}px`);
                    heart.style.setProperty('--random-y', `${randomY}px`);
                    
                    const duration = 3 + Math.random() * 4;
                    heart.style.animationDuration = `${duration}s`;
                    
                    // Random size
                    const size = 0.8 + Math.random() * 1.5;
                    heart.style.fontSize = `${size}rem`;
                    
                    document.body.appendChild(heart);
                    
                    // Remove heart after animation
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 100);
            }
        }
        
        // Create purple flowers
        function createFlowers() {
            const flowerCount = 25;
            
            for (let i = 0; i < flowerCount; i++) {
                setTimeout(() => {
                    const flower = document.createElement('div');
                    flower.classList.add('purple-flower');
                    
                    // Random position around the button
                    const btnRect = surpriseBtn.getBoundingClientRect();
                    const btnCenterX = btnRect.left + btnRect.width / 2;
                    const btnCenterY = btnRect.top + btnRect.height / 2;
                    
                    // Random direction and speed
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 100;
                    const startX = btnCenterX + Math.cos(angle) * distance;
                    const startY = btnCenterY + Math.sin(angle) * distance;
                    
                    // Random final position
                    const randomX = (Math.random() - 0.5) * 300;
                    const randomY = -100 - Math.random() * 400;
                    
                    flower.style.left = `${startX}px`;
                    flower.style.top = `${startY}px`;
                    flower.style.setProperty('--random-x', `${randomX}px`);
                    flower.style.setProperty('--random-y', `${randomY}px`);
                    
                    const duration = 4 + Math.random() * 5;
                    flower.style.animationDuration = `${duration}s`;
                    
                    // Random size
                    const size = 25 + Math.random() * 30;
                    flower.style.width = `${size}px`;
                    flower.style.height = `${size}px`;
                    
                    document.body.appendChild(flower);
                    
                    // Remove flower after animation
                    setTimeout(() => {
                        flower.remove();
                    }, duration * 1000);
                }, i * 120);
            }
        }
        
        // Create sparkles
        function createSparkles() {
            const sparkleCount = 60;
            
            for (let i = 0; i < sparkleCount; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.classList.add('sparkle');
                    
                    // Random position around the container
                    const containerRect = loveContainer.getBoundingClientRect();
                    const x = containerRect.left + Math.random() * containerRect.width;
                    const y = containerRect.top + Math.random() * containerRect.height;
                    
                    sparkle.style.left = `${x}px`;
                    sparkle.style.top = `${y}px`;
                    
                    // Random delay
                    sparkle.style.animationDelay = `${Math.random() * 2}s`;
                    
                    // Random color (white or purple)
                    if (Math.random() > 0.5) {
                        sparkle.style.background = '#e0aaff';
                    }
                    
                    document.body.appendChild(sparkle);
                    
                    // Remove sparkle after animation
                    setTimeout(() => {
                        sparkle.remove();
                    }, 2000);
                }, i * 50);
            }
        }
        
        // Animate letter lines sequentially
        function animateLetterLines() {
            letterLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('show');
                }, index * 400);
            });
            
            setTimeout(() => {
                signature.classList.add('show');
            }, letterLines.length * 400);
        }
        
        // Create continuous animations
        function startContinuousAnimations() {
            // Sparkles around the container
            setInterval(() => {
                createSparkles();
            }, 3000);
            
            // Floating hearts occasionally
            setInterval(() => {
                createHearts();
            }, 6000);
            
            // Background color pulse
            setInterval(() => {
                purpleBg.style.background = 'radial-gradient(circle at center, #7209b7 0%, #3a0ca3 70%)';
                setTimeout(() => {
                    purpleBg.style.background = 'radial-gradient(circle at center, #3a0ca3 0%, #0a0a1a 70%)';
                }, 2000);
            }, 12000);
        }
        
        // Show love container
        surpriseBtn.addEventListener('click', () => {
            // Hide button
            surpriseBtn.style.opacity = '0';
            surpriseBtn.style.pointerEvents = 'none';
            
            // Create initial animations
            createHearts();
            createFlowers();
            
            // Change background
            purpleBg.style.background = 'radial-gradient(circle at center, #7209b7 0%, #3a0ca3 70%)';
            
            // Show overlay and container
            setTimeout(() => {
                overlay.classList.add('show');
                loveContainer.classList.add('show');
                
                // Create sparkles around container
                createSparkles();
                
                // Animate letter lines
                animateLetterLines();
                
                // Start continuous animations
                startContinuousAnimations();
            }, 500);
        });
        
        // Close love container
        closeBtn.addEventListener('click', () => {
            // Hide container and overlay
            loveContainer.classList.remove('show');
            overlay.classList.remove('show');
            
            // Reset letter animations
            letterLines.forEach(line => {
                line.classList.remove('show');
            });
            signature.classList.remove('show');
            
            // Change background back
            purpleBg.style.background = 'radial-gradient(circle at center, #3a0ca3 0%, #0a0a1a 70%)';
            
            // Show button again after delay
            setTimeout(() => {
                surpriseBtn.style.opacity = '1';
                surpriseBtn.style.pointerEvents = 'all';
            }, 1000);
        });
        
        // Close when clicking overlay
        overlay.addEventListener('click', () => {
            closeBtn.click();
        });
        
        // Mouse follower sparkles
        document.addEventListener('mousemove', (e) => {
            if (overlay.classList.contains('show')) {
                const sparkle = document.createElement('div');
                sparkle.classList.add('sparkle');
                sparkle.style.left = `${e.clientX}px`;
                sparkle.style.top = `${e.clientY}px`;
                sparkle.style.animation = 'sparklePop 1s forwards';
                
                // Random color (white or purple)
                if (Math.random() > 0.5) {
                    sparkle.style.background = '#e0aaff';
                }
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        });
        
        // Initialize
        createParticles();