import firebase from "../../firebase/firebaseConfig"
import "firebase/compat/auth"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
 
const authSignUpUser = ({email, password, nickname}) => async (dispatch, getState) => {
    try {
       const authFirebase = getAuth()
        const user = await createUserWithEmailAndPassword(authFirebase, email, password).then(userCred => {
            const thisCred = userCred.user
            // console.log("cred", thisCred);
        })
    } catch (error) {
        console.log("error", error.message);
    }
 } 
const authLogInUser = () => async (dispatch, getState) => { } 
const authLogOutUser = () => async (dispatch, getState) => { } 

export {authSignUpUser, authLogInUser, authLogOutUser}