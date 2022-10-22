import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBITTX7KhtQO1hs2n4_4j5ve8DJ_EyP4SY",
    authDomain: "factumex-4de29.firebaseapp.com",
    projectId: "factumex-4de29",
    storageBucket: "factumex-4de29.appspot.com",
    messagingSenderId: "419649086476",
    appId: "1:419649086476:web:53c560077e216a85a73a29"
};
 
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);