  // DOM Elements
        const cosmicBg = document.getElementById('cosmicBg');
        const particlesContainer = document.getElementById('particles');
        const bgMusic = document.getElementById('bgMusic');
        const playBtn = document.getElementById('playBtn');
        const songTitle = document.getElementById('songTitle');
        const musicPlayer = document.getElementById('musicPlayer');
        const letterLines = document.querySelectorAll('.letter-text');
        const signature = document.getElementById('signature');
        const scrollDown = document.getElementById('scrollDown');
        const mainTitle = document.getElementById('mainTitle');
        const subtitle = document.querySelector('.subtitle');
        const videoItem = document.querySelector('.gallery-item.video-item');
        const video = videoItem.querySelector('video');
        const playVideoBtn = document.getElementById('playVideoBtn');
        const unmuteVideoBtn = document.getElementById('unmuteVideoBtn');
        
        // Split title into spans for letter-by-letter animation
        function splitTextIntoSpans(element) {
            const text = element.innerText;
            element.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? ' ' : char;
                span.style.setProperty('--char-index', index);
                element.appendChild(span);
            });
        }
        
        // Create stars for cosmic background
        function createStars() {
            const starCount = 100;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                const size = Math.random() * 3 + 1;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const duration = Math.random() * 10 + 5;
                const opacity = Math.random() * 0.8 + 0.2;
                const delay = Math.random() * 15;
                
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${posX}%`;
                star.style.top = `${posY}%`;
                star.style.setProperty('--duration', `${duration}s`);
                star.style.setProperty('--opacity', opacity);
                star.style.animationDelay = `${delay}s`;
                
                cosmicBg.appendChild(star);
            }
        }
        
        // Create background particles
        function createParticles() {
            const particleCount = 80;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 15 + 5;
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                const delay = Math.random() * 5;
                const duration = Math.random() * 10 + 5;
                const opacity = Math.random() * 0.6 + 0.2;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.animationDelay = `${delay}s`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.opacity = opacity;
                
                if (Math.random() > 0.7) {
                    particle.style.borderRadius = '0';
                    particle.style.transform = `rotate(${Math.random() * 360}deg)`;
                }
                
                if (Math.random() > 0.5) {
                    particle.style.background = `rgba(224, 170, 255, ${opacity})`;
                }
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Create hearts
        function createHearts(count = 10, x, y) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.innerHTML = '💜';
                    
                    const startX = x || Math.random() * window.innerWidth;
                    const startY = y || window.innerHeight + 100;
                    const randomX = (Math.random() - 0.5) * 300;
                    const randomY = -100 - Math.random() * 400;
                    
                    heart.style.left = `${startX}px`;
                    heart.style.top = `${startY}px`;
                    heart.style.setProperty('--random-x', `${randomX}px`);
                    heart.style.setProperty('--random-y', `${randomY}px`);
                    
                    const duration = 3 + Math.random() * 4;
                    heart.style.animationDuration = `${duration}s`;
                    
                    const size = 0.8 + Math.random() * 1.5;
                    heart.style.fontSize = `${size}rem`;
                    
                    document.body.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 300);
            }
        }
        
        // Create sparkles
        function createSparkles(count = 20, x, y) {
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.classList.add('sparkle');
                    
                    const posX = x || Math.random() * window.innerWidth;
                    const posY = y || Math.random() * window.innerHeight;
                    
                    sparkle.style.left = `${posX}px`;
                    sparkle.style.top = `${posY}px`;
                    sparkle.style.animationDelay = `${Math.random() * 2}s`;
                    
                    if (Math.random() > 0.5) {
                        sparkle.style.background = '#e0aaff';
                    }
                    
                    document.body.appendChild(sparkle);
                    
                    setTimeout(() => {
                        sparkle.remove();
                    }, 2000);
                }, i * 100);
            }
        }
        
        // Animate letter lines on scroll
        function animateOnScroll() {
            const letterSection = document.querySelector('.letter-section');
            const sectionPosition = letterSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                letterLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.classList.add('show');
                    }, index * 400);
                });
                
                setTimeout(() => {
                    signature.classList.add('show');
                }, letterLines.length * 400);
                
                window.removeEventListener('scroll', animateOnScroll);
            }
        }
        
        // Music control
        function toggleMusic() {
            if (bgMusic.paused) {
                bgMusic.play()
                    .then(() => {
                        playBtn.classList.remove('fa-music');
                        playBtn.classList.add('fa-pause');
                        musicPlayer.style.background = 'rgba(157, 78, 221, 0.8)';
                    })
                    .catch(error => {
                        console.log("Playback failed:", error);
                    });
            } else {
                bgMusic.pause();
                playBtn.classList.remove('fa-pause');
                playBtn.classList.add('fa-music');
                musicPlayer.style.background = 'rgba(157, 78, 221, 0.7)';
            }
        }
        
        // Video controls
        function toggleVideoPlayback() {
            if (video.paused) {
                video.play();
                playVideoBtn.innerHTML = '<i class="fas fa-pause"></i>';
                // Pause background music when video plays
                if (!bgMusic.paused) {
                    bgMusic.pause();
                    playBtn.classList.remove('fa-pause');
                    playBtn.classList.add('fa-music');
                    musicPlayer.style.background = 'rgba(157, 78, 221, 0.7)';
                }
            } else {
                video.pause();
                playVideoBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
        
        function toggleVideoMute() {
            video.muted = !video.muted;
            unmuteVideoBtn.innerHTML = video.muted ? 
                '<i class="fas fa-volume-mute"></i>' : 
                '<i class="fas fa-volume-up"></i>';
        }
        
        // Smooth scroll to section
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Try to autoplay music
        function tryAutoplay() {
            bgMusic.volume = 0.3;
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Autoplay worked
                    playBtn.classList.remove('fa-music');
                    playBtn.classList.add('fa-pause');
                    musicPlayer.style.background = 'rgba(157, 78, 221, 0.8)';
                })
                .catch(error => {
                    // Autoplay was prevented
                    console.log("Autoplay prevented:", error);
                    songTitle.textContent = "Tap to play";
                });
            }
        }
        
        // Event listeners
        playBtn.addEventListener('click', toggleMusic);
        musicPlayer.addEventListener('click', function(e) {
            if (e.target !== playBtn) {
                toggleMusic();
            }
        });
        
        playVideoBtn.addEventListener('click', toggleVideoPlayback);
        unmuteVideoBtn.addEventListener('click', toggleVideoMute);
        
        scrollDown.addEventListener('click', () => scrollToSection('gallery'));
        
        // Initialize
        splitTextIntoSpans(mainTitle);
        createStars();
        createParticles();
        
        // Start animations
        setInterval(() => createHearts(), 5000);
        setInterval(() => createSparkles(), 3000);
        
        // Animate letter on scroll
        window.addEventListener('scroll', animateOnScroll);
        
        // Try to autoplay music immediately
        tryAutoplay();
        
        // Update song title for mobile if needed
        if (window.innerWidth <= 768) {
            songTitle.textContent = "💜 Purpelly";
        }
        
        // Show elements with delays
        setTimeout(() => {
            subtitle.style.animation = 'fadeInUp 1s ease-out forwards';
            scrollDown.style.opacity = '1';
            musicPlayer.style.opacity = '1';
        }, 3500);