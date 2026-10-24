// ==========================================================================
// PETAL & SCENE — ACTIVE REAL-TIME LANDSCAPE GARDEN ENGINE
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gardenCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Pull previously planted flower coordinate nodes securely out of browser database memory
    let flowers = StorageEngine.getPlantedFlowers();
    const collection = StorageEngine.getCollection() || {};
    const completedCount = Object.values(collection).filter(v => v === "Completed").length;

    const countPlantedNode = document.querySelector(".count-planted");
    const countCompletedNode = document.querySelector(".count-completed");

    if (countCompletedNode) countCompletedNode.textContent = completedCount;
    updatePlantedCounter();

    function updatePlantedCounter() {
        if (countPlantedNode) countPlantedNode.textContent = `${flowers.length} / ${completedCount}`;
    }

    // Pre-cache flower SVG assets into the graphics engine
    const flowerImages = { blossom: new Image(), branch: new Image(), tulip: new Image() };
    
    // ASSET PATH CORRECTION: Maps directly to your exact folder file parameters
    flowerImages.blossom.src = "../assets/flowers/cherry_blossom.svg";
    flowerImages.branch.src = "../assets/flowers/flower_branch.svg";
    flowerImages.tulip.src = "../assets/flowers/pink_tulip.svg";

    // ACTIVE GROWTH SYSTEM: Continuous frame loop to process real-time structural growth
    function processGardenFrames() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Moonlit ambient dark backing layer fill
        ctx.fillStyle = "#0b0d19";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const currentTime = Date.now();
        const growthDuration = 45000; // Flower actively grows from bud to full bloom over 45 seconds (45,000ms)

        flowers.forEach(f => {
            const elapsed = currentTime - f.plantedTime;
            const progress = Math.min(elapsed / growthDuration, 1); // Caps the growth matrix ratio at 100%

            ctx.save();
            ctx.translate(f.x, f.y);

            if (progress < 1) {
                // STAGE 1: ACTIVE LIVE GROWING PHASE (Tiny bud scaling up with an energetic neon pulse)
                // The seed size physically dynamic expands frame-by-frame based on time calculations
                const dynamicScaleSize = 4 + (progress * (f.size * 0.4));
                const pulseFactor = Math.sin(currentTime * 0.006) * 1.5;
                const activeRadius = Math.max(2, dynamicScaleSize + pulseFactor);

                ctx.beginPath();
                ctx.arc(0, 0, activeRadius * 1.3, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(240, 168, 194, 0.25)";
                ctx.shadowBlur = 20;
                ctx.shadowColor = "#ffd8e5";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(0, 0, activeRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#f0a8c2";
                ctx.fill();
            } else {
                // STAGE 2: MATURED FULL BLOOM STATE (Renders the gorgeous vector artwork layer)
                const img = flowerImages[f.type];
                if (img && img.complete) {
                    ctx.drawImage(img, -f.size / 2, -f.size / 2, f.size, f.size);
                }
            }
            
            ctx.restore();
        });

        // Loop requests the next frame layout calculation line smoothly
        requestAnimationFrame(processGardenFrames);
    }

    canvas.addEventListener("click", (e) => {
        if (flowers.length >= completedCount) {
            alert(`Cannot plant! You have only completed ${completedCount} drama(s). Go finish a show first!`);
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const checkedRadio = document.querySelector(".flower-radio:checked");
        
        const newSeedNode = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            type: checkedRadio ? checkedRadio.value : "blossom",
            size: Math.random() * 12 + 36, // Randomizes final maturity size scale cleanly between 36px and 48px
            plantedTime: Date.now() // Timestamps injection frame for live progression calculations
        };

        flowers.push(newSeedNode);
        StorageEngine.savePlantedFlowers(flowers); // Commit state instantly to secure persistence on browser reloads
        updatePlantedCounter();
    });

    // Match parent width settings safely
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = 400;
    
    // Boot the active processing timeline engine loop
    processGardenFrames();
});
