// Utility function to make API calls
async function fetchAPI(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Home page functionality
async function loadActiveFundraisers() {
    try {
        const fundraisers = await fetchAPI('/api/fundraisers');
        const fundraiserList = document.getElementById('fundraiser-list');
        fundraiserList.innerHTML = '';

        fundraisers.forEach(fundraiser => {
            const fundraiserElement = document.createElement('div');
            fundraiserElement.className = 'fundraiser-item';
            fundraiserElement.innerHTML = `
                <h3>${fundraiser.CAPTION}</h3>
                <p>Organizer: ${fundraiser.ORGANIZER}</p>
                <p>Category: ${fundraiser.CATEGORY_NAME}</p>
                <p>Target: $${fundraiser.TARGET_FUNDING}</p>
                <p>Current: $${fundraiser.CURRENT_FUNDING}</p>
                <p>City: ${fundraiser.CITY}</p>
                <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
            `;
            fundraiserList.appendChild(fundraiserElement);
        });
    } catch (error) {
        console.error('Error loading active fundraisers:', error);
    }
}

// Search page functionality
async function loadCategories() {
    try {
        const categories = await fetchAPI('/api/categories');
        const categorySelect = document.getElementById('category');

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.NAME;
            option.textContent = category.NAME;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

async function searchFundraisers(event) {
    event.preventDefault();
    const organizer = document.getElementById('organizer').value;
    const city = document.getElementById('city').value;
    const category = document.getElementById('category').value;

    if (!organizer && !city && !category) {
        alert('Please select at least one search criteria.');
        return;
    }

    try {
        const searchParams = new URLSearchParams({ organizer, city, category });
        const fundraisers = await fetchAPI(`/api/search?${searchParams}`);
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        if (fundraisers.length === 0) {