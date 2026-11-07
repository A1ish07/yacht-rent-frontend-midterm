const yachtList = document.getElementById('yacht-list');
const searchInput = document.getElementById('search');
const typeSelect = document.getElementById('type-filter');
const sortSelect = document.getElementById('sort');

function formatPrice(amount) {
    return '$' + amount.toLocaleString('en-US');
}

function createYachtCard(yacht) {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-4';
    col.innerHTML = `
        <div class="card h-100">
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

updateYachts();