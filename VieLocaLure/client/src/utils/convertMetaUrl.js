export const convertToMetaUrl = (title) => {
    let metaUrl = title.toLowerCase();
    metaUrl = metaUrl.replace(/\s+/g, '-');
    metaUrl = metaUrl.replace(/[^\w\s-]/g, '');
    metaUrl = metaUrl.trim();

    metaUrl = metaUrl.substring(0, 50);
    metaUrl = metaUrl.replace(/-+/g, '-');

    return metaUrl;
}


export function encodeNumber(input) {
    const multiplier = 73856093;
    const adder = 123456789;
    const shift = 5;
    let encoded = (input * multiplier + adder) << shift;

    return encoded;
}

export function decodeNumber(encoded) {
    const multiplier = 73856093;
    const adder = 123456789; 
    const shift = 5;

    // Reverse the transformations
    let decoded = (encoded >> shift) - adder;
    decoded /= multiplier;

    return decoded;
}