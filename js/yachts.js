const yachtList = document.getElementById('yacht-list');
const searchInput = document.getElementById('search');
const typeSelect = document.getElementById('type-filter');
const sortSelect = document.getElementById('sort');
const comparisonBody = document.getElementById('comparison-body');
const favoritesList = document.getElementById('favorites-list');
const favoritesEmpty = document.getElementById('favorites-empty');
const favoritesCount = document.getElementById('favorites-count');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const yachtCount = document.getElementById('yacht-count');

let favorites = [];
try {
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
} catch (e) {
    favorites = [];
}

function createYachtCard(yacht) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
        <div class="card h-100">
            <button type="button" class="btn-heart ${favorites.includes(yacht.id) ? 'active' : ''}"
                    data-id="${yacht.id}" aria-label="Add ${yacht.name} to favorites">&#9829;</button>
            <img src="${yacht.image}" class="card-img-top" alt="${yacht.name}">
            <div class="card-body">
                <h5 class="card-title">${yacht.name}</h5>
                <p class="card-text">${yacht.description}</p>
                <ul class="list-unstyled">
                    <li><strong>Length:</strong> ${yacht.length} m</li>
                    <li><strong>Capacity:</strong> ${yacht.guests} guests</li>
                    <li><strong>Price:</strong> ${yacht.formatPrice()}/day</li>
                </ul>
            </div>
        </div>`;
    return col;
}

function renderYachts(list) {
    yachtList.innerHTML = '';
    if (list.length === 0) {
        yachtList.innerHTML = '<p class="text-center text-muted">No yachts found.</p>';
        return;
    }
    list.forEach(yacht => yachtList.appendChild(createYachtCard(yacht)));
}

function renderComparison(list) {
    list.forEach(yacht => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${yacht.name}</td>
            <td>${yacht.length} m</td>
            <td>${yacht.guests} guests</td>
            <td>${yacht.cabins}</td>
            <td>${yacht.formatPrice()}</td>`;
        comparisonBody.appendChild(row);
    });
}

function createFavoriteItem(yacht) {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.innerHTML = `
        <span>${yacht.name} <small class="text-muted">${yacht.formatPrice()}/day</small></span>
        <button type="button" class="btn btn-sm btn-outline-danger btn-remove" data-id="${yacht.id}">Remove</button>`;
    return item;
}

function renderFavorites() {
    favoritesList.innerHTML = '';
    yachts.filter(yacht => favorites.includes(yacht.id))
          .forEach(yacht => favoritesList.appendChild(createFavoriteItem(yacht)));
    favoritesCount.textContent = favorites.length;
    favoritesEmpty.classList.toggle('d-none', favorites.length > 0);
}

function toggleFavorite(id) {
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {}
    renderFavorites();
    updateYachts();
}

function filterYachts(list, query, type, minPrice, maxPrice) {
    const min = minPrice !== '' ? Number(minPrice) : null;
    const max = maxPrice !== '' ? Number(maxPrice) : null;

    return list.filter(yacht => {
        const matchesName = yacht.name.toLowerCase().includes(query.toLowerCase());
        const matchesType = type === 'all' || yacht.type === type;
        const matchesMin = min === null || isNaN(min) || yacht.price >= min;
        const matchesMax = max === null || isNaN(max) || yacht.price <= max;
        return matchesName && matchesType && matchesMin && matchesMax;
    });
}

function sortYachts(list, order) {
    const sorted = [...list];
    if (order === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (order === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    return sorted;
}

function updateYachts() {
    const minVal = minPriceInput ? minPriceInput.value.trim() : '';
    const maxVal = maxPriceInput ? maxPriceInput.value.trim() : '';

    const filtered = filterYachts(yachts, searchInput.value.trim(), typeSelect.value, minVal, maxVal);
    const sorted = sortYachts(filtered, sortSelect.value);

    renderYachts(sorted);

    if (yachtCount) {
        if (sorted.length === 0) {
            yachtCount.textContent = 'No yachts found';
        } else {
            yachtCount.textContent = `Showing ${sorted.length} of ${yachts.length} yachts`;
        }
    }
}

function resetFilters() {
    searchInput.value = '';
    typeSelect.value = 'all';
    sortSelect.value = 'default';
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    updateYachts();
}

document.getElementById('yacht-controls').addEventListener('submit', e => e.preventDefault());
searchInput.addEventListener('input', updateYachts);
typeSelect.addEventListener('change', updateYachts);
sortSelect.addEventListener('change', updateYachts);
if (minPriceInput) minPriceInput.addEventListener('input', updateYachts);
if (maxPriceInput) maxPriceInput.addEventListener('input', updateYachts);
if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetFilters);

yachtList.addEventListener('click', e => {
    const heart = e.target.closest('.btn-heart');
    if (heart) toggleFavorite(Number(heart.dataset.id));
});
favoritesList.addEventListener('click', e => {
    const remove = e.target.closest('.btn-remove');
    if (remove) toggleFavorite(Number(remove.dataset.id));
});

renderComparison(yachts);
renderFavorites();
updateYachts();