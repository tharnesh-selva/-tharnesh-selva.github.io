document.addEventListener("DOMContentLoaded", () => {
    const entryList = document.querySelector(".past-entries-list");
    const form = document.querySelector(".diary-form");

    function renderEntries() {
        if (!entryList) return;
        const entries = StorageEngine.getDiaryEntries();

        if (entries.length === 0) {
            entryList.innerHTML = `<p>No entries yet. Write your first reflection after tonight's episode.</p>`;
            return;
        }

        entryList.innerHTML = entries.map(e => {
            const drama = CENTRAL_DRAMA_DATABASE.find(d => d.id === e.dramaId);
            return `
                <div class="glass-card past-entry-item" style="padding: 20px; margin-bottom: 16px;">
                    <h3>${e.title} <span style="font-size:0.9rem; color:var(--sakura);">(${e.mood})</span></h3>
                    <p style="font-size:0.85rem;">Logged on ${e.date} about <strong>${drama ? drama.title : 'Unknown'}</strong></p>
                    <p style="margin-top:8px; color:var(--moonlight);">${e.text}</p>
                    <div style="color:var(--sakura); margin-top:4px;">${'★'.repeat(e.score)}</div>
                </div>
            `;
        }).join('');
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const newEntry = {
                id: Date.now(),
                dramaId: document.querySelector(".drama-select").value,
                title: document.querySelector(".entry-title-input").value,
                date: new Date().toISOString().split('T')[0],
                mood: document.querySelector(".mood-select:checked")?.value || "serene",
                text: document.querySelector(".thoughts-textarea").value,
                score: parseInt(document.querySelector(".rating-select:checked")?.value || "5")
            };

            StorageEngine.saveDiaryEntry(newEntry);
            form.reset();
            renderEntries();
        });
    }

    renderEntries();
});
