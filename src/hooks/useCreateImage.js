import { useContext, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "~/firebase/firebase-config";
import { AuthContext } from "~/Context/AuthContextProvider";

export default function useCreateImage() {
    const [image, setImage] = useState(null);
    const { currentUser } = useContext(AuthContext);

    const handleCreateImage = async (e, type, loading) => {
        if (e.target.files[0]) {
            loading && loading(true);
            const storageRef = ref(storage, `/${type}/${currentUser.displayName}/${e.target.files[0].name}${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        console.log(url);
                        setImage(url);
                        loading && loading(false);
                    });
                }
            );
        }
    };

    return [image, handleCreateImage, setImage];
}
