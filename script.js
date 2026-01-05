/* script.js - JJBLOX BRAIN */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MODAL TOGGLE LOGIC ---
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    window.toggleModal = (mode) => {
        if (!mode) {
            authModal.classList.add('hidden');
            authModal.classList.remove('flex');
            return;
        }

        authModal.classList.remove('hidden');
        authModal.classList.add('flex');

        if (mode === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        }
    };

    // --- 2. DATA STORAGE (SIGNUP LOGIC) ---
    window.handleSignup = () => {
        const user = document.getElementById('regUser').value;
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPass').value;

        if (!user || !pass) {
            alert("Please fill in all fields.");
            return;
        }

        // Create a user object (JSON format)
        const userData = {
            username: user,
            email: email,
            password: pass, // In a real site, passwords are never stored as plain text!
            joinedDate: new Date().toLocaleDateString(),
            isVIP: false
        };

        // Save to LocalStorage (Simulating a database)
        localStorage.setItem('jjblox_user', JSON.stringify(userData));

        alert(`Account created for ${user}! You can now login.`);
        toggleModal('login');
    };

    // --- 3. NAVBAR SCROLL EFFECT ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 4. AMBIENT PARTICLE BACKGROUND ---
    const initParticles = () => {
        const container = document.getElementById('particles-js');
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let w, h, particles = [];

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > w || this.x < 0 || this.y > h || this.y < 0) this.reset();
            }
            draw() {
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) particles.push(new Particle());

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach((p, i) => {
                p.update();
                p.draw();
                // Connect particles with faint lines
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 - dist/1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };
        animate();
    };

    initParticles();
});
