 
 // Scroll to top button visibility
 const scrollTopBtn = document.querySelector('.scroll-top');
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 300) {
         scrollTopBtn.classList.add('visible');
     } else {
         scrollTopBtn.classList.remove('visible');
     }
 });

 // Smooth scroll for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

 // Header background change on scroll
 const header = document.querySelector('header');
 window.addEventListener('scroll', () => {
     if (window.pageYOffset > 50) {
         header.classList.add('scrolled');
     } else {
         header.classList.remove('scrolled');
     }
 });
 // this is for tab switching in the sponsorship.html page for the tabs
 document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});
//for mobile switching
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');

    mobileMenuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Create animated stars
    createStars();

    // Initialize sliders
    initializeSliders();

    // Scroll to top button functionality
    initializeScrollToTop();

    // Header scroll effect
    initializeHeaderScroll();
});
