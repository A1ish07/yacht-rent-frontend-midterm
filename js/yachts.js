const yachtList = document.getElementById('yacht-list');

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
    list.forEach(yacht => yachtList.appendChild(createYachtCard(yacht)));
}

if (yachtList) {
    renderYachts(yachts);
}