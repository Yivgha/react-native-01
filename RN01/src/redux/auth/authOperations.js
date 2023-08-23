import db from "../../firebase/firebaseConfig"
import "firebase/compat/auth"
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authSlice} from "./authReducer";
 
const authSignUpUser = ({ email, password, nickname }) => async (dispatch, getState) => {
    try {
        const authFirebase = getAuth()
        await createUserWithEmailAndPassword(authFirebase, email, password);
        
        const user = authFirebase.currentUser;
         updateProfile(user, {displayName: nickname})

        dispatch(authSlice.actions.updateUserProfile({userId: user.uid, nickname: user.displayName}))
        
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
const authLogOutUser = () => async (dispatch, getState) => { 
    const authFirebase = getAuth();
    await signOut(authFirebase).then(() => { console.log("Signed out"); }).catch((error) => { console.log("error", error.code, error.message); });
    dispatch(authSlice.actions.authLogOut());
} 

const authChangeUser = () => async (dispatch, getState) => { 
    const authFirebase = getAuth();
    authFirebase.onAuthStateChanged((user) => {
        if (user) {
            dispatch(authSlice.actions.authStateChange({ stateChange: true }));
            dispatch(authSlice.actions.updateUserProfile({ userId: user.uid, nickname: user.displayName }));
       }
   })
}

export {authSignUpUser, authLogInUser, authLogOutUser, authChangeUser}