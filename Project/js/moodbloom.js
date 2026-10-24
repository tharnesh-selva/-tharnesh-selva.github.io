// MoodBloom Color System Processor
(function() {
    window.addEventListener("load", () => {
        const entries = StorageEngine.getDiaryEntries();
        if (entries.length === 0) return;

        // Group past entries to map mood frequencies
        const moodCounts = entries.reduce((acc, curr) => {
            acc[curr.mood] = (acc[curr.mood] || 0) + 1;
            return acc;
        }, {});

        // Find primary dominant emotional state profile
        const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);

        // Palette mapping matrix declarations
        const moodPalettes = {
            cozy: { primary: "#f0a8c2", soft: "#38243f" },
            thrilled: { primary: "#ffd8e5", soft: "#1c2039" },
            melancholy: { primary: "#b8b5c9", soft: "#0b0d19" },
            nostalgic: { primary: "#bd7898", soft: "#59355e" }
        };

        const activePalette = moodPalettes[dominantMood];
        if (activePalette) {
            document.documentElement.style.setProperty('--sakura', activePalette.primary);
            console.log(`MoodBloom Engine: Applied active profile [${dominantMood}]`);
        }
    });
})();
