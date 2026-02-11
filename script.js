// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts();
    
    // Create sparkles
    createSparkles();
    
    // Add click event for main content
    document.querySelector('.main-content').addEventListener('click', function(e) {
        if (e.target.className !== 'love-button') {
            createHeartBurst(e.clientX, e.clientY);
        }
    });
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartSymbols = ['❤️', '💖', '💕', '💗', '💘'];
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 2000);
    
    // Create initial hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 1000);
    }
}

function createSparkles() {
    const sparklesContainer = document.querySelector('.sparkles');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }
    
    setInterval(createSparkle, 200);
}

function showSurprise() {
    const surpriseMessage = document.getElementById('surpriseMessage');
    surpriseMessage.classList.add('show');
    
    // Create heart explosion
    createHeartExplosion();
    
    // Play celebration sound (if you want to add audio)
    // playSound('celebration.mp3');
}

function createHeartBurst(x, y) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.fontSize = '20px';
        heart.style.animation = `heartBurst 1s ease-out forwards`;
        heart.style.transform = `rotate(${i * 60}deg)`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
}

function createHeartExplosion() {
    const colors = ['❤️', '💖', '💕', '💗', '💘', '💝'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = colors[Math.floor(Math.random() * colors.length)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        
        const angle = (i / 20) * 360;
        const velocity = Math.random() * 300 + 200;
        
        heart.style.animation = `explode 2s ease-out forwards`;
        heart.style.setProperty('--angle', angle + 'deg');
        heart.style.setProperty('--velocity', velocity + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Add CSS for heart burst and explosion animations
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: scale(1) translateX(0) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateX(100px) translateY(-100px);
        }
    }
    
    @keyframes explode {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) 
                       translateX(calc(cos(var(--angle)) * var(--velocity)))
                       translateY(calc(sin(var(--angle)) * var(--velocity)))
                       scale(0.3) rotate(720deg);
        }
    }
`;
document.head.appendChild(style);
