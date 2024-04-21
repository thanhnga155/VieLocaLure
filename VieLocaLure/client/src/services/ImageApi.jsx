import axios from "axios";

const serverApi = process.env.REACT_APP_SERVER_API;
const productName = process.env.REACT_APP_PRODUCT_CLOUD_NAME;
const preset = process.env.REACT_APP_CLOUDINARY_PRESET;

export const GetImage = async (url) => {
    const image = await fetch(serverApi + url);
    return image;
}

export const UploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);
  
    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${productName}/image/upload`,
            formData
        );
    
        const url = response.data.url;
        // console.log(url);
        return url;
    } catch (error) {
        console.error('Error uploading file to Cloudinary:', error);
        throw error;
    }
};