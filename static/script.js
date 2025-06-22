// ===== GLOBAL VARIABLES =====
let currentFact = 0;
const totalFacts = 6;
const emotions = [
    'Happy & Playful', 
    'Calm & Serene', 
    'Excited & Social', 
    'Anxious & Alert', 
    'Peaceful & Meditative', 
    'Curious & Investigative'
];

// ===== FACT CAROUSEL FUNCTIONS =====
function nextFact() {
    document.getElementById(`fact-${currentFact}`).classList.remove('active');
    currentFact = (currentFact + 1) % totalFacts;
    document.getElementById(`fact-${currentFact}`).classList.add('active');
}

function previousFact() {
    document.getElementById(`fact-${currentFact}`).classList.remove('active');
    currentFact = (currentFact - 1 + totalFacts) % totalFacts;
    document.getElementById(`fact-${currentFact}`).classList.add('active');
}

function randomFact() {
    document.getElementById(`fact-${currentFact}`).classList.remove('active');
    let newFact;
    do {
        newFact = Math.floor(Math.random() * totalFacts);
    } while (newFact === currentFact);
    currentFact = newFact;
    document.getElementById(`fact-${currentFact}`).classList.add('active');
}

// ===== EMOTION ANALYSIS FUNCTION =====
function analyzeEmotion() {
    const fileInput = document.getElementById('fileInput');
    if (!fileInput.files[0]) {
        alert('Please select a spectrogram file first! 📊');
        return;
    }

    const resultSection = document.getElementById('resultSection');
    const emotionResult = document.getElementById('emotionResult');

    emotionResult.innerHTML = 'Analyzing whale emotions... 🌊🔍';
    resultSection.classList.add('show');
    emotionResult.style.opacity = '0.7';

    const processingTime = Math.random() * 2000 + 2000;

    setTimeout(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        emotionResult.innerHTML = `Detected Emotion: ${randomEmotion}`;
        emotionResult.style.opacity = '1';
        emotionResult.classList.add('pulse');

        updateEmotionDescription(randomEmotion);

        setTimeout(() => {
            emotionResult.classList.remove('pulse');
        }, 2000);
    }, processingTime);
}

// ===== EMOTION DESCRIPTION UPDATER =====
function updateEmotionDescription(emotion) {
    const descriptions = {
        'Happy & Playful': 'This whale appears to be in a joyful state, likely engaging in social communication with its pod members. High-frequency vocalizations suggest playful behavior.',
        'Calm & Serene': 'The whale exhibits peaceful, low-frequency calls indicating a relaxed state. This suggests the whale is in a safe environment with no immediate stressors.',
        'Excited & Social': 'Complex vocal patterns indicate active social interaction. The whale is likely communicating important information to nearby pod members.',
        'Anxious & Alert': 'Sharp, repetitive calls suggest the whale is on high alert. This could indicate the presence of predators or unfamiliar sounds in the environment.',
        'Peaceful & Meditative': 'Long, deep calls characteristic of contentment and tranquility. The whale appears to be in a state of peaceful rest or meditation.',
        'Curious & Investigative': 'Varied frequency patterns suggest exploratory behavior. The whale is likely investigating new sounds or objects in its environment.'
    };

    const resultSection = document.getElementById('resultSection');
    const descriptionElement = resultSection.querySelector('p');
    if (descriptionElement) {
        descriptionElement.textContent = descriptions[emotion] || 'Analysis complete. The whale\'s emotional state has been successfully identified.';
    }
}

// ===== FILE UPLOAD VISUAL FEEDBACK =====
function setupFileUploadFeedback() {
    const fileInput = document.getElementById('fileInput');
    const label = document.querySelector('.file-upload-label');

    fileInput.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            const fileName = e.target.files[0].name;
            const fileSize = (e.target.files[0].size / 1024 / 1024).toFixed(2);

            label.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <div><strong>File Ready:</strong> ${fileName}</div>
                <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">Size: ${fileSize} MB</div>
                <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">Ready for emotional analysis!</div>
            `;

            label.style.background = 'linear-gradient(135deg, #52b788, #40916c)';
            label.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        }
    });

    fileInput.addEventListener('click', function() {
        if (!this.files[0]) {
            label.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <div>Drop your whale spectrogram here or click to browse</div>
                <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 1rem;">Supported formats: PNG, JPG, GIF</div>
            `;
            label.style.background = 'linear-gradient(135deg, #3282b8, #0f4c75)';
            label.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });
}

// ===== ANIMATED CARD ENTRANCE =====
function animateCardsOnLoad() {
    const whaleCards = document.querySelectorAll('.whale-card');
    const statCards = document.querySelectorAll('.stat-card');

    whaleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'slideUp 1s ease-out both';
    });

    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'slideUp 1s ease-out both';
    });
}

// ===== AUTOMATIC FACT ROTATION =====
function startAutoFactRotation() {
    setInterval(() => {
        nextFact();
    }, 8000);
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.upload-section, .facts-carousel, .whale-gallery, .stats-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// ===== KEYBOARD NAVIGATION =====
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousFact();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextFact();
                break;
            case ' ':
                e.preventDefault();
                randomFact();
                break;
            case 'Enter':
                e.preventDefault();
                analyzeEmotion();
                break;
        }
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    setupFileUploadFeedback();
    animateCardsOnLoad();
    startAutoFactRotation();
    setupScrollAnimations();
    setupKeyboardNavigation();

    console.log('🐋 Whale Emotion Classifier Loaded!');
    console.log('Keyboard shortcuts:');
    console.log('← → : Navigate facts');
    console.log('Space : Random fact');
    console.log('Enter : Analyze emotion');
});
