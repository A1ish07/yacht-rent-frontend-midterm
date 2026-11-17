class Yacht {
    static CAPTAIN_PRICE = 200;
    static CATERING_PRICE = 100;

    constructor({ id, name, type, length, guests, cabins, price, image, description }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.length = length;
        this.guests = guests;
        this.cabins = cabins;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    static formatMoney(amount) {
        return '$' + amount.toLocaleString('en-US');
    }

    formatPrice() {
        return Yacht.formatMoney(this.price);
    }

    getDailyRate({ captain = false, catering = false } = {}) {
        let rate = this.price;
        if (captain) rate += Yacht.CAPTAIN_PRICE;
        if (catering) rate += Yacht.CATERING_PRICE;
        return rate;
    }

    calculateTotal(days, services = {}) {
        const count = Number(days);
        if (!Number.isFinite(count) || count <= 0) return 0;
        return this.getDailyRate(services) * count;
    }
}