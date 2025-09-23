import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from 'axios';

const CLOUDINARY_CLOUD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
    file: {uri?: string} | string,
    folderName: string
): Promise<ResponseType> => {
    try {
        if(!file) return {success: true, data :null}
        if (file && typeof file === 'object' && file.uri) {
            const formData = new FormData();
            formData.append("file", {
                uri: file?.uri,
                type: "image/jpeg",
                name: file?.uri?.split("/").pop() || "file.jpg"
            } as any);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", folderName);
            
            const response = await axios.post(CLOUDINARY_CLOUD_URL, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
           
            return { success: true, data: response?.data?.secure_url };
        }
        return { success: false, msg: "Invalid file provided" };
    } catch (error: any) {
        console.log('got error uploading file: ', error);
        return { success: false, msg: error.message || "could not upload file" };
    }
};

export const getProfileImage = (file: any) => {
    if (file && typeof file === 'string') return file;
    if (file && typeof file === 'object') return file.uri;
    
    return require('../assets/images/defaultAvatar.png');
};

export const getFilePath = (file: any) => {
    if (file && typeof file === 'string') return file;
    if (file && typeof file === 'object') return file.uri;
    
    return null;
};