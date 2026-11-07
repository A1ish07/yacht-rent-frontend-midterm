const routesContainer = document.getElementById('routes');
const filterButtons = document.querySelectorAll('#region-filters button');

function formatPrice(amount) {
    return '$' + amount.toLocaleString('en-US');
}

function createDestinationCard(dest) {
    const card = document.createElement('article');
    card.className = 'destination-card';
    card.innerHTML = `
        <div class="destination-img">
            <img src="${dest.image}" alt="${dest.name}">
            <span class="price-badge">from ${formatPrice(dest.price)}/day</span>
        </div>
        <div class="destination-body">
            <h2 class="h5">${dest.name}</h2>
            <p>${dest.description}</p>
        </div>`;
    return card;
}

function filterDestinations(list, region) {
    if (region === 'all') {
        return list;
    }
    return list.filter(item => item.region === region);
}

function renderDestinations(list) {
    if (!routesContainer) return;
    routesContainer.innerHTML = '';
    list.forEach(dest => {
        routesContainer.appendChild(createDestinationCard(dest));
    });
}

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const region = e.target.dataset.region;
            const filtered = filterDestinations(destinations, region);
            renderDestinations(filtered);
        });
    });
}

if (typeof destinations !== 'undefined') {
    renderDestinations(destinations);
}
