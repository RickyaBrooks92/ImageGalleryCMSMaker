import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoxvtzFDcQ-YlaW4LC5PNM76F_GvE7BYE",
  authDomain: "rickytickycmsgallery.firebaseapp.com",
  projectId: "rickytickycmsgallery",
  storageBucket: "rickytickycmsgallery.appspot.com",
  messagingSenderId: "384917795352",
  appId: "1:384917795352:web:d36710baccf2b4f32e096d",
  measurementId: "G-Z94MNF31TY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
