// DOM Elements
const downloadBtn = document.getElementById('downloadBtn');
const downloadModal = document.getElementById('downloadModal');
const closeModal = document.querySelector('.close');
const cancelDownload = document.getElementById('cancelDownload');
const manualDownload = document.getElementById('manualDownload');
const progressBar = document.querySelector('.progress');
const progressText = document.querySelector('.progress-text');

// APK file path - Update this to your actual APK file path
const apkFilePath = 'mParivahan.apk';

// Download function
function downloadAPK() {
    // Show modal
    downloadModal.style.display = 'flex';
    
    // Simulate download progress
    simulateDownloadProgress();
    
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = apkFilePath;
    link.download = 'mParivahan.apk';
    
    // Start actual download after a short delay
    setTimeout(() => {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Update progress to complete
        progressBar.style.width = '100%';
        progressText.textContent = 'Download complete!';
        
        // Close modal after a delay
        setTimeout(() => {
            downloadModal.style.display = 'none';
            resetProgress();
        }, 2000);
    }, 3000);
}

// Simulate download progress
function simulateDownloadProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 90) {
            progress = 90;
            clearInterval(interval);
        }
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Downloading... ${Math.round(progress)}%`;
    }, 300);
}

// Reset progress bar
function resetProgress() {
    progressBar.style.width = '0%';
    progressText.textContent = 'Preparing download...';
}

// Event Listeners
downloadBtn.addEventListener('click', downloadAPK);

closeModal.addEventListener('click', function() {
    downloadModal.style.display = 'none';
    resetProgress();
});

cancelDownload.addEventListener('click', function() {
    downloadModal.style.display = 'none';
    resetProgress();
});

manualDownload.addEventListener('click', function(e) {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = apkFilePath;
    link.download = 'MyApp-v2.1.5.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === downloadModal) {
        downloadModal.style.display = 'none';
        resetProgress();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Add scroll animation to elements
function checkScroll() {
    const elements = document.querySelectorAll('.feature-card, .about-content, .hero-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with fade-in effect
window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.feature-card, .about-content, .hero-content');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check scroll position on load
    checkScroll();
});

// Check scroll position on scroll
window.addEventListener('scroll', checkScroll);