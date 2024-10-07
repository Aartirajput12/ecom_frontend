import { storage } from "./firebase";
import {ref} from "./firebase/storage";

const upload = async (file) => {
    const date = new Date();
    const storageRef = ref(storage, `images/${date + file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
            console.log("upload is" + progress + "% done");
        },(error)=>{
            reject("Something went wrong!" + error?.code);
        }, ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then
            ((getDownloadURL) => {
                resolve(getDownloadURL);
            });
        }
    );
    });
};

export default upload;