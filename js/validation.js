function setStatus(input, valid, msg) {
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        if (feedback) feedback.textContent = '';
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (feedback) feedback.textContent = msg;
    }
}

function checkDate(dateVal) {
    if (!dateVal) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateVal >= today;
}

function calcTotal(pricePerDay, days) {
    return pricePerDay * days;
}

function updateTotal() {
    const yachtSelect = document.getElementById('yacht');
    const daysInput = document.getElementById('days');
    const totalPriceEl = document.getElementById('total-price');

    if (!yachtSelect || !daysInput || !totalPriceEl) return;

    const list = typeof yachts !== 'undefined' ? yachts : [];
    const selected = list.find(y => y.name === yachtSelect.value);
    const price = selected ? selected.price : 0;
    const days = Number(daysInput.value) || 0;

    const total = calcTotal(price, days);
    totalPriceEl.textContent = '$' + total.toLocaleString('en-US');
}

function validateField(input) {
    const val = input.value.trim();

    if (input.id === 'name') {
        const valid = val.length >= 2;
        setStatus(input, valid, 'Name must be at least 2 characters');
        return valid;
    }

    if (input.id === 'email') {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = regex.test(val);
        setStatus(input, valid, 'Enter a valid email');
        return valid;
    }

    if (input.id === 'phone') {
        const regex = /^\+?[0-9\s-]{7,15}$/;
        const valid = regex.test(val);
        setStatus(input, valid, 'Enter a valid phone number');
        return valid;
    }

    if (input.id === 'yacht') {
        const valid = val !== '';
        setStatus(input, valid, 'Please select a yacht');
        return valid;
    }

    if (input.id === 'date') {
        const valid = checkDate(val);
        setStatus(input, valid, 'Date must be today or later');
        return valid;
    }

    if (input.id === 'guests') {
        const num = Number(val);
        const valid = num >= 1 && num <= 12;
        setStatus(input, valid, 'Guests must be between 1 and 12');
        return valid;
    }

    if (input.id === 'days') {
        const num = Number(val);
        const valid = num >= 1;
        setStatus(input, valid, 'Days must be at least 1');
        return valid;
    }

    if (input.id === 'terms') {
        const valid = input.checked;
        setStatus(input, valid, 'You must accept the terms');
        return valid;
    }

    return true;
}

function resetForm(form, alertBox) {
    alertBox.classList.remove('d-none');
    form.reset();
    form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });
    updateTotal();
}

const form = document.getElementById('booking-form');
const successBox = document.getElementById('booking-success');

if (form) {
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(input);
        });

        input.addEventListener('input', function () {
            if (input.classList.contains('is-invalid')) {
                validateField(input);
            }
            updateTotal();
        });

        input.addEventListener('change', function () {
            validateField(input);
            updateTotal();
        });
    });

    form.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            if (!validateField(e.target)) {
                e.preventDefault();
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && successBox) {
            successBox.classList.add('d-none');
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let allValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (allValid) {
            resetForm(form, successBox);
        } else if (successBox) {
            successBox.classList.add('d-none');
        }
    });
}
