document.addEventListener("DOMContentLoaded", function () {
    // Dropdown for location
    const locationDropdown = document.querySelector(".top-bar span");
    locationDropdown.addEventListener("click", function () {
        alert("Feature to change location coming soon!");
    });

    // Learn More Button
    document.querySelector('.learn-more').addEventListener('click', function () {
        alert('Learn More section is under development!');
    });

    // Contact Us Button
    document.querySelector('.contact-us').addEventListener('click', function () {
        alert('Contact Us form is coming soon!');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetSection = document.querySelector(this.getAttribute("href"));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
