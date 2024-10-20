document.addEventListener('DOMContentLoaded', function() {
    initializeSliders();
    initializeProjectTabs();
});

function initializeSliders() {
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach((slider) => {
        const container = slider.querySelector('.slider-container');
        const prevButton = slider.querySelector('.slider-button-left');
        const nextButton = slider.querySelector('.slider-button-right');
        const items = slider.querySelectorAll('.slider-item');
        const progressBar = slider.querySelector('.progress-bar');
        let currentIndex = 0;

        function updateSlider() {
            container.style.transform = `translateX(-${currentIndex * 100}%)`;
            progressBar.style.transform = `translateX(${currentIndex * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlider();
        });
    });
}

function initializeProjectTabs() {
    const tabs = document.querySelectorAll('.project-tab-btn');
    const contents = document.querySelectorAll('.project-tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}
