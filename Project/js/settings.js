document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject the settings panel directly into the HTML page layout
    const settingsHTML = `
        <div id="settingsPanel" class="glass-card settings-panel-slide">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--glass-border); padding-bottom: 12px;">
                <h3 style="margin: 0; font-family: var(--font-heading); color: var(--moonlight);">⚙️ Interface Display Settings</h3>
                <button id="closeSettingsBtn" style="font-size: 1.4rem; cursor: pointer; color: var(--muted);">&times;</button>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <!-- ONLY KEEPING THE BACKGROUND COLOR LAYER TINT CONFIGURATIONS -->
                <div>
                    <label style="display: block; margin-bottom: 12px; font-weight: 500; font-size: 0.95rem; color: var(--moonlight);">Background Color Layer Tint</label>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="genre-tag tint-btn active" data-tint="default" style="text-align: left; padding: 12px 18px; width: 100%;">Original Dark</button>
                        <button class="genre-tag tint-btn" data-tint="blue" style="text-align: left; padding: 12px 18px; width: 100%;">Deep Ocean Blue</button>
                        <button class="genre-tag tint-btn" data-tint="clear" style="text-align: left; padding: 12px 18px; width: 100%;">Crystal Clear</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = settingsHTML;
    document.body.appendChild(wrapper.firstElementChild);

    // DOM Elements Mapping Hook Elements
    const panel = document.getElementById("settingsPanel");
    const closeBtn = document.getElementById("closeSettingsBtn");
    const tintButtons = document.querySelectorAll(".tint-btn");

    // 2. Load Saved Color Tint from Browser Memory Matrix
    const savedTint = localStorage.getItem("setting_tint") || "default";
    applyTint(savedTint);

    // 3. Connect Interactive Event Control Hooks
    window.addEventListener("toggleSettingsMenu", () => {
        panel.classList.toggle("open");
    });

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            panel.classList.remove("open");
        });
    }

    tintButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tintButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const tintVal = btn.getAttribute("data-tint");
            applyTint(tintVal);
            localStorage.setItem("setting_tint", tintVal);
        });
    });

    // 4. Style Injections Framework Functions
    function applyTint(tint) {
        tintButtons.forEach(b => {
            if (b.getAttribute("data-tint") === tint) b.classList.add("active");
            else b.classList.remove("active");
        });

        let tintString = "linear-gradient(to bottom, rgba(11, 13, 25, 0.8), #0b0d19)";
        if (tint === "blue") {
            tintString = "linear-gradient(to bottom, rgba(15, 32, 67, 0.75), rgba(9, 17, 34, 0.95))";
        } else if (tint === "clear") {
            tintString = "linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.15))";
        }
        document.documentElement.style.setProperty('--bg-tint-gradient', tintString);
    }
});
