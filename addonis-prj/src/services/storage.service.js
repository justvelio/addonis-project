import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase-config";

// Create a reference with an initial file path and name
// const storage = getStorage();
const pathReference = ref(storage, 'sn.rar');

export const getTestUrl = async() => {
    
    const url = await getDownloadURL(pathReference)
    console.log(url)
    return url
}