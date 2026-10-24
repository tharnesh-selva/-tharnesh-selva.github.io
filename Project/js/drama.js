document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const dramaId = params.get("id") || "all-1";
    const drama = CENTRAL_DRAMA_DATABASE.find(d => d.id === dramaId);

    if (!drama) return;

    // Direct text substitution framework
    const titleNode = document.querySelector("h1");
    if (titleNode) titleNode.textContent = drama.title;

    const ratingVal = document.querySelector(".rating-val");
    if (ratingVal) ratingVal.textContent = `${drama.rating} out of 10`;

    // Initialize watch action listeners
    const collection = StorageEngine.getCollection();
    const currentStatus = collection[dramaId] || "None";

    // Set initial select drop status indicators if elements are active
    const statusSelect = document.querySelector(".status-selector");
    if (statusSelect) {
        statusSelect.value = currentStatus;
        statusSelect.addEventListener("change", (e) => {
            StorageEngine.updateWatchStatus(dramaId, e.target.value);
        });
    }
});
