document.addEventListener("DOMContentLoaded", () => {
    // 1. Instantly trigger the visual fade-in sequence when the document mounts
    document.body.classList.add("fade-in-active");

    // 2. Intercept internal header links for seamless exit animations
    document.querySelectorAll("a").forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const destination = anchor.getAttribute("href");

            // Skip setting panels triggers, empty paths, or external anchor tags
            if (!destination || destination.startsWith("#") || destination.startsWith("javascript:") || 
                anchor.classList.contains("nav-settings-trigger") || anchor.getAttribute("target") === "_blank") {
                return;
            }

            // Halt immediate loading mechanics to perform the transition fade-out
            e.preventDefault();
            document.body.classList.remove("fade-in-active");
            document.body.classList.add("fade-out-active");

            // Shift the window location exactly as the 0.5-second timeline finishes
            setTimeout(() => {
                window.location.href = destination;
            }, 500);
        });
    });
});
