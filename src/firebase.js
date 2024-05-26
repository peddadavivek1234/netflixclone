
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAoMikeAIjNEQ3T5uGwc2glj2qdk4XQvVw",
  authDomain: "netflix-colne-18d19.firebaseapp.com",
  projectId: "netflix-colne-18d19",
  storageBucket: "netflix-colne-18d19.appspot.com",
  messagingSenderId: "993696732484",
  appId: "1:993696732484:web:2f4b7e87b473d94e193311"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }

    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=>{
try {
    await signInWithEmailAndPassword(auth,email,password);
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout =  ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};