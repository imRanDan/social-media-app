import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { deleteUser } from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import useShowToast from './useShowToast';
import useAuthStore from '../store/authStore';

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const showToast = useShowToast()
    const loginUser = useAuthStore(state => state.login)


    const signup = async (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){ 
            showToast("Error", "Please fill in all of the fields", "error");
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            
            if(!newUser) {
                // Check if there's an error from the hook
                if(error) {
                    const errorMessage = error.message || "Failed to create account. Please try again."
                    showToast("Error", errorMessage, "error")
                    return
                }
                showToast("Error", "Failed to create account. Please try again.", "error")
                return
            }

            // Check username availability after authentication
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("username", "==", inputs.username))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot.empty){
                showToast("Error", "Username already exists!", "error")
                // Delete the auth user since username is taken
                if (auth.currentUser) {
                    await deleteUser(auth.currentUser)
                }
                return
            }

            const userDoc = {
                uid:newUser.user.uid,
                email:inputs.email,
                username:inputs.username,
                fullName:inputs.fullName,
                bio:"",
                profilePicURL:"",
                followers:[],
                following:[],
                posts:[],
                isPrivate: false, // Privacy setting - default to public
                friendRequests: [], // Incoming friend requests
                sentFriendRequests: [], // Outgoing friend requests
                groups: [], // Groups/circles the user belongs to
                createdAt: Date.now(),
            }
            await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
            localStorage.setItem("user-info", JSON.stringify(userDoc))
            loginUser(userDoc)
        } catch (error) {
            // Handle Firebase Auth errors
            let errorMessage = "An error occurred. Please try again."
            
            if(error?.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please use a different email or log in."
            } else if(error?.code === 'auth/weak-password') {
                errorMessage = "Password is too weak. Please use a stronger password."
            } else if(error?.code === 'auth/invalid-email') {
                errorMessage = "Invalid email address. Please check your email."
            } else if(error?.message) {
                errorMessage = error.message
            } else if(typeof error === 'string') {
                errorMessage = error
            }
            
            showToast("Error", errorMessage, "error")
            console.error("Signup error:", error) // For debugging
        }
    };

  return {loading, error, signup};
};

export default useSignUpWithEmailAndPassword