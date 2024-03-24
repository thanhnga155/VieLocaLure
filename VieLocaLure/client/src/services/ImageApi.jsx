const serverApi = process.env.REACT_APP_SERVER_API;

export const GetImage = async (url) => {
    const image = await fetch(serverApi + url);
    return image;
}