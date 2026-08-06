document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Navigation Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120; // Header offset
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 2. Formspree AJAX Form Submission
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Stop default browser refresh

            // Update UI during submit
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
            if (formStatus) formStatus.textContent = "";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch("https://formspree.io/f/mjybvjeb", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    if (formStatus) {
                        formStatus.style.color = "#4caf50";
                        formStatus.textContent = "Thanks! Your message has been sent successfully.";
                    }
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    throw new Error(data.error || "Form submission failed.");
                }
            } catch (error) {
                if (formStatus) {
                    formStatus.style.color = "#f44336";
                    formStatus.textContent = "Oops! There was a problem sending your message.";
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            }
        });
    }
});