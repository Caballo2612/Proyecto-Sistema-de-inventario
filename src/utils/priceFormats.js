export class PriceFormats {
    static COP(value) {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }).format(value);
    };

    static USD(value) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(value);
    };

    static EUR(value) {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }).format(value);
    };
}