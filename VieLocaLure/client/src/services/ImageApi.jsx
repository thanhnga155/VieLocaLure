const serverApi = process.env.REACT_APP_SERVER_URL;

export const GetImage = async (url) => {
    const image = await fetch(serverApi + '/' + url);
    return URL.createObjectURL(await image.blob());
}