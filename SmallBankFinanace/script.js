document.addEventListener("DOMContentLoaded", function () {
    // Dropdown for location
    const locationDropdown = document.querySelector(".top-bar span");
    if (locationDropdown) {
        locationDropdown.addEventListener("click", function () {
            alert("Feature to change location coming soon!");
        });
    }

    // Learn More Button
    const learnMoreBtn = document.querySelector('.learn-more');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function () {
            alert('Learn More section is under development!');
        });
    }

    // Contact Us Button
    const contactUsBtn = document.querySelector('.contact-us');
    if (contactUsBtn) {
        contactUsBtn.addEventListener('click', function () {
            alert('Contact Us form is coming soon!');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    if (navLinks.length > 0) {
        navLinks.forEach(anchor => {
            anchor.addEventListener("click", function (event) {
                const href = this.getAttribute("href");
                if (href.startsWith("#")) {
                    event.preventDefault();
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: "smooth" });
                    }
                }
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Location Dropdown Alert
    document.querySelector(".top-bar span").addEventListener("click", function () {
        alert("Feature to change location coming soon!");
    });

    // Learn More Button
    document.querySelector(".learn-more").addEventListener("click", function () {
        alert("Learn More section is under development!");
    });

    // Contact Us Button
    document.querySelector(".contact-us").addEventListener("click", function () {
        alert("Contact Us form is coming soon!");
    });
});
