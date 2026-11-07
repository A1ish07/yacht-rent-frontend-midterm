const yachtList = document.getElementById('yacht-list');
const searchInput = document.getElementById('search');
const typeSelect = document.getElementById('type-filter');
const sortSelect = document.getElementById('sort');
const comparisonBody = document.getElementById('comparison-body');
const favoritesList = document.getElementById('favorites-list');
const favoritesEmpty = document.getElementById('favorites-empty');
const favoritesCount = document.getElementById('favorites-count');

let favorites = [];
try {
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
} catch (e) {
    favorites = [];
}

function formatPrice(amount) {
    return '$' + amount.toLocaleString('en-US');
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
                    <li><strong>Price:</strong> ${formatPrice(yacht.price)}/day</li>
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
            <td>${formatPrice(yacht.price)}</td>`;
        comparisonBody.appendChild(row);
    });
}

function createFavoriteItem(yacht) {
    const item = document.createElement('li');
    item.className = 'list-group-item d-flex justify-content-between align-items-center';
    item.innerHTML = `
        <span>${yacht.name} <small class="text-muted">${formatPrice(yacht.price)}/day</small></span>
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

function filterYachts(list, query, type) {
    return list.filter(yacht =>
        yacht.name.toLowerCase().includes(query.toLowerCase()) &&
        (type === 'all' || yacht.type === type)
    );
}

function sortYachts(list, order) {
    const sorted = [...list];
    if (order === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (order === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    return sorted;
}

function updateYachts() {
    const filtered = filterYachts(yachts, searchInput.value.trim(), typeSelect.value);
    renderYachts(sortYachts(filtered, sortSelect.value));
}

document.getElementById('yacht-controls').addEventListener('submit', e => e.preventDefault());
searchInput.addEventListener('input', updateYachts);
typeSelect.addEventListener('change', updateYachts);
sortSelect.addEventListener('change', updateYachts);

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