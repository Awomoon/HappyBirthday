  document.addEventListener('DOMContentLoaded', function() {
            // Create animated stars
            function createStars() {
                const starsContainer = document.getElementById('stars');
                const numberOfStars = 50;

                for (let i = 0; i < numberOfStars; i++) {
                    const star = document.createElement('div');
                    star.className = 'star';
                    star.style.left = Math.random() * 100 + '%';
                    star.style.top = Math.random() * 100 + '%';
                    star.style.animationDelay = Math.random() * 3 + 's';
                    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                    starsContainer.appendChild(star);
                }
            }

            createStars();

            // Enhanced loading screen
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 2000);

            // Smooth scroll with enhanced easing
            document.getElementById('scrollDown').addEventListener('click', () => {
                const gallery = document.getElementById('gallery');
                const headerHeight = window.innerHeight;

                window.scrollTo({
                    top: headerHeight - 100,
                    behavior: 'smooth'
                });
            });

            // Enhanced music player
            const bgMusic = document.getElementById('bgMusic');
            const playBtn = document.getElementById('playBtn');
            let musicEnabled = false;

            // Enable music after first user interaction
            document.body.addEventListener('click', function enableMusic() {
                if (!musicEnabled) {
                    bgMusic.volume = 0.2;
                    musicEnabled = true;
                    document.body.removeEventListener('click', enableMusic);
                }
            }, { once: true });

            playBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (bgMusic.paused) {
                    bgMusic.play().catch(e => console.log("Audio play failed:", e));
                    playBtn.classList.remove('fa-music');
                    playBtn.classList.add('fa-pause');
                } else {
                    bgMusic.pause();
                    playBtn.classList.remove('fa-pause');
                    playBtn.classList.add('fa-music');
                }
            });

            // Enhanced video controls
            const video = document.getElementById('mainVideo');
            const videoPlayBtn = document.getElementById('videoPlayBtn');
            const videoMuteBtn = document.getElementById('videoMuteBtn');
            const videoProgress = document.getElementById('videoProgress');
            const videoProgressFilled = document.getElementById('videoProgressFilled');
            const videoTime = document.getElementById('videoTime');

            if (video) {
                // Play/Pause with enhanced feedback
                videoPlayBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (video.paused) {
                        video.play().then(() => {
                            videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                            videoPlayBtn.setAttribute('aria-label', 'Pause video');
                        }).catch(e => console.log("Video play failed:", e));
                    } else {
                        video.pause();
                        videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                        videoPlayBtn.setAttribute('aria-label', 'Play video');
                    }
                });

                // Enhanced mute/unmute
                videoMuteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (video.muted) {
                        video.muted = false;
                        videoMuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                        videoMuteBtn.setAttribute('aria-label', 'Mute video');
                    } else {
                        video.muted = true;
                        videoMuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                        videoMuteBtn.setAttribute('aria-label', 'Unmute video');
                    }
                });

                // Enhanced progress tracking
                video.addEventListener('timeupdate', () => {
                    if (video.duration) {
                        const percent = (video.currentTime / video.duration) * 100;
                        videoProgressFilled.style.width = `${percent}%`;

                        // Update time display
                        const currentTime = formatTime(video.currentTime);
                        const duration = formatTime(video.duration);
                        videoTime.textContent = `${currentTime} / ${duration}`;
                    }
                });

                // Click to seek with smooth animation
                videoProgress.addEventListener('click', (e) => {
                    const rect = videoProgress.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    video.currentTime = pos * video.duration;
                });

                // Format time as MM:SS
                function formatTime(seconds) {
                    if (isNaN(seconds)) return '0:00';
                    const minutes = Math.floor(seconds / 60);
                    const secs = Math.floor(seconds % 60);
                    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
                }

                // Show duration when metadata loads
                video.addEventListener('loadedmetadata', () => {
                    videoTime.textContent = `0:00 / ${formatTime(video.duration)}`;
                });

                // Handle video end
                video.addEventListener('ended', () => {
                    videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
                    videoPlayBtn.setAttribute('aria-label', 'Play video');
                });
            }

            // Enhanced lazy loading with intersection observer
            if ('IntersectionObserver' in window) {
                const lazyMediaObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const media = entry.target;

                            if (media.tagName === 'PICTURE') {
                                const source = media.querySelector('source');
                                if (source && source.srcset) {
                                    const img = new Image();
                                    img.src = source.srcset;
                                    img.alt = media.parentNode.querySelector('.gallery-caption')?.textContent || 'Gallery image';
                                    img.style.width = '100%';
                                    img.style.height = '100%';
                                    img.style.objectFit = 'cover';
                                    img.style.display = 'block';
                                    img.style.transition = 'transform 0.6s ease';

                                    img.onload = () => {
                                        media.parentNode.replaceChild(img, media);
                                    };

                                    img.onerror = () => {
                                        // Keep fallback if image fails to load
                                        console.log('Image failed to load:', source.srcset);
                                    };
                                }
                            } else if (media.tagName === 'VIDEO') {
                                media.load();
                            }

                            lazyMediaObserver.unobserve(media);
                        }
                    });
                }, {
                    rootMargin: '100px'
                });

                // Observe all pictures and videos
                document.querySelectorAll('picture, video').forEach(media => {
                    lazyMediaObserver.observe(media);
                });

                // Gallery item animation on scroll
                const galleryItemObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.animationPlayState = 'running';
                        }
                    });
                }, {
                    threshold: 0.1
                });

                document.querySelectorAll('.gallery-item').forEach(item => {
                    galleryItemObserver.observe(item);
                });

            } else {
                // Fallback for browsers without IntersectionObserver
                document.querySelectorAll('picture source').forEach(source => {
                    if (source.srcset) {
                        const img = new Image();
                        img.src = source.srcset;
                        img.alt = 'Gallery image';
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.display = 'block';

                        img.onload = () => {
                            source.parentNode.parentNode.replaceChild(img, source.parentNode);
                        };
                    }
                });

                document.querySelectorAll('video').forEach(video => {
                    video.load();
                });
            }

            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === ' ') {
                    e.preventDefault();
                    const gallery = document.getElementById('gallery');
                    gallery.scrollIntoView({ behavior: 'smooth' });
                }
            });

            // Add smooth reveal animations for letter content
            const letterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const texts = entry.target.querySelectorAll('.letter-text');
                        texts.forEach((text, index) => {
                            setTimeout(() => {
                                text.style.opacity = '1';
                                text.style.transform = 'translateY(0)';
                            }, index * 200);
                        });
                    }
                });
            }, { threshold: 0.3 });

            const letterContent = document.querySelector('.letter-content');
            if (letterContent) {
                // Initially hide letter texts
                letterContent.querySelectorAll('.letter-text').forEach(text => {
                    text.style.opacity = '0';
                    text.style.transform = 'translateY(20px)';
                    text.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                });

                letterObserver.observe(letterContent);
            }

            // Add parallax effect to background
            let ticking = false;

            function updateParallax() {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.cosmic-bg');
                const speed = scrolled * 0.5;

                parallax.style.transform = `translateY(${speed}px)`;
                ticking = false;
            }

            function requestParallax() {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            }

            // Only add parallax if user hasn't requested reduced motion
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                window.addEventListener('scroll', requestParallax);
            }

            // Add touch gestures for mobile
            let touchStartY = 0;
            let touchEndY = 0;

            document.addEventListener('touchstart', e => {
                touchStartY = e.changedTouches[0].screenY;
            });

            document.addEventListener('touchend', e => {
                touchEndY = e.changedTouches[0].screenY;
                handleGesture();
            });

            function handleGesture() {
                const swipeThreshold = 50;
                const diff = touchStartY - touchEndY;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe up - scroll to gallery
                        if (window.pageYOffset < window.innerHeight / 2) {
                            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            }

            // Add error handling for media
            document.querySelectorAll('img, video').forEach(media => {
                media.addEventListener('error', (e) => {
                    console.log(`Media failed to load: ${e.target.src}`);
                    // Fallback is already in place via HTML structure
                });
            });

            // Performance optimization: pause animations when not visible
            const handleVisibilityChange = () => {
                if (document.hidden) {
                    // Pause video if playing
                    if (video && !video.paused) {
                        video.pause();
                    }
                    // Pause background music
                    if (!bgMusic.paused) {
                        bgMusic.pause();
                    }
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);

            // Add resize handler for responsive adjustments
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    // Recalculate any size-dependent elements
                    const musicPlayer = document.querySelector('.music-player');
                    if (window.innerWidth < 480) {
                        musicPlayer.style.transform = 'scale(0.9)';
                    } else {
                        musicPlayer.style.transform = 'scale(1)';
                    }
                }, 150);
            });

            // Initialize any remaining setup
            console.log('💜 Love letter website initialized successfully!');
        });
