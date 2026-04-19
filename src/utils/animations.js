export const initAOS = () => {
    AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-in-out', // Easing function
        once: true, // Whether animation should happen only once
        mirror: false, // Whether elements should animate out while scrolling past them
    });
};

export const animateOnScroll = (element) => {
    if (element) {
        element.classList.add('aos-animate');
    }
};