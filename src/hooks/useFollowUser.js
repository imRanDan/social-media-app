import { auth, firestore } from "../firebase/firebase"
import useAuthStore from "../store/authStore"
import { useEffect, useState } from "react"


const useFollowUser = (userId) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const {authUser, setAuthUser} = useAuthStore()
    const {userProfile, setUserProfile} = useUserProfileStore()
    const showToast = useShowToast()
    

    const handleFollowUser = async () => {
        setIsLoading(true)
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid)

        } catch (error) {
         showToast("Error", error.message, "error")   
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(authUser) {
            const isFollowing = authUser.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    },[authUser, userId])

    return {isLoading, isFollowing, handleFollowUser}
}

export default useFollowUser