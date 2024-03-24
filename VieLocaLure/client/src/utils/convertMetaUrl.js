export const convertToMetaUrl = (title) => {
    let metaUrl = title.toLowerCase();
    metaUrl = metaUrl.replace(/\s+/g, '-');
    metaUrl = metaUrl.replace(/[^\w\s-]/g, '');
    metaUrl = metaUrl.trim();

    metaUrl = metaUrl.substring(0, 50);
    metaUrl = metaUrl.replace(/-+/g, '-');

    return metaUrl;
}
