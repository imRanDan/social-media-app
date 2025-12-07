import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useGetFriendRequests = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [friendRequests, setFriendRequests] = useState([])
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()

    useEffect(() => {
        const getFriendRequests = async () => {
            if (!authUser || !authUser.friendRequests || authUser.friendRequests.length === 0) {
                setFriendRequests([])
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            try {
                // Get user details for each friend request
                const requests = []
                for (const userId of authUser.friendRequests) {
                    const userRef = collection(firestore, "users")
                    const q = query(userRef, where("uid", "==", userId))
                    const querySnapshot = await getDocs(q)
                    
                    querySnapshot.forEach((doc) => {
                        requests.push({ ...doc.data(), id: doc.id })
                    })
                }
                setFriendRequests(requests)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setIsLoading(false)
            }
        }

        if (authUser) {
            getFriendRequests()
        }
    }, [authUser, showToast])

    return { isLoading, friendRequests }
}

export default useGetFriendRequests

