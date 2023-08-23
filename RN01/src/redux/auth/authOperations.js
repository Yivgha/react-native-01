import firebase from "../../firebase/firebaseConfig"
import "firebase/compat/auth"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
 
const authSignUpUser = ({ email, password, nickname }) => async (dispatch, getState) => {
    try {
        const authFirebase = getAuth()
        const user = await createUserWithEmailAndPassword(authFirebase, email, password).then(userCred => {
            const thisCred = userCred.user;
        });
        // console.log("user", user);
    } catch (error) {
        console.log("error", error.code, error.message);
    }
};

const authLogInUser = ({ email, password }) => async (dispatch, getState) => { 
     try {
        const authFirebase = getAuth()
         const user = await signInWithEmailAndPassword(authFirebase, email, password).then(userCred => {
             const thisCred = userCred.user;
         });
        
     } catch (error) {
        console.log("error", error.code, error.message);
     }
} 
const authLogOutUser = () => async (dispatch, getState) => { } 

export {authSignUpUser, authLogInUser, authLogOutUser}