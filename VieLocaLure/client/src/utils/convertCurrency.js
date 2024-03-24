export const convertCurrency = (language, amount) => {
    let unit, money;

    let rate = 24000;

    if (language === 'en') {
        unit = '$';
        return unit + amount.toLocaleString()
    } else if (language === 'vi') {
        unit = 'VND';
        money = amount * rate;
        return money.toLocaleString() + ' ' + unit
    } else {
        throw new Error('Unsupported language. Please provide "en" or "vi".');
    }
}