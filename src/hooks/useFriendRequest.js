import { useState, useEffect } from "react"
import { arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useAuthStore from "../store/authStore"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"

const useFriendRequest = (userId) => {
    const [isLoading, setIsLoading] = useState(false)
    const [requestStatus, setRequestStatus] = useState(null) // 'none', 'sent', 'received', 'friends'
    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const {userProfile, setUserProfile} = useUserProfileStore()
    const showToast = useShowToast()

    // Check current request status
    useEffect(() => {
        const checkRequestStatus = async () => {
            if (!authUser || !userId || authUser.uid === userId) {
                setRequestStatus(null)
                return
            }

            try {
                const userDoc = await getDoc(doc(firestore, "users", userId))
                if (!userDoc.exists()) return

                const targetUser = userDoc.data()
                const isFriend = authUser.following.includes(userId)
                const hasSentRequest = authUser.sentFriendRequests?.includes(userId) || false
                const hasReceivedRequest = targetUser.friendRequests?.includes(authUser.uid) || false

                if (isFriend) {
                    setRequestStatus('friends')
                } else if (hasSentRequest) {
                    setRequestStatus('sent')
                } else if (hasReceivedRequest) {
                    setRequestStatus('received')
                } else {
                setRequestStatus('none')
            }
        } catch (error) {
            // Silently handle error - status will remain null
        }
        }

        checkRequestStatus()
    }, [authUser, userId])

    const sendFriendRequest = async () => {
        if (!authUser || !userId || isLoading) return
        setIsLoading(true)

        try {
            const currentUserRef = doc(firestore, "users", authUser.uid)
            const targetUserRef = doc(firestore, "users", userId)

            // Get target user to check if private
            const targetUserDoc = await getDoc(targetUserRef)
            if (!targetUserDoc.exists()) {
                showToast("Error", "User not found", "error")
                return
            }

            const targetUser = targetUserDoc.data()

            // If target user is public, follow directly (no request needed)
            if (!targetUser.isPrivate) {
                await updateDoc(currentUserRef, {
                    following: arrayUnion(userId)
                })

                await updateDoc(targetUserRef, {
                    followers: arrayUnion(authUser.uid)
                })

                // Update local state
                const updatedUser = {
                    ...authUser,
                    following: [...authUser.following, userId]
                }
                setAuthUser(updatedUser)
                localStorage.setItem("user-info", JSON.stringify(updatedUser))

                if (userProfile && userProfile.uid === userId) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, authUser.uid]
                    })
                }

                setRequestStatus('friends')
                showToast("Success", "Now following this user", "success")
            } else {
                // Private profile - send friend request
                await updateDoc(currentUserRef, {
                    sentFriendRequests: arrayUnion(userId)
                })

                await updateDoc(targetUserRef, {
                    friendRequests: arrayUnion(authUser.uid)
                })

                // Update local state
                const updatedUser = {
                    ...authUser,
                    sentFriendRequests: [...(authUser.sentFriendRequests || []), userId]
                }
                setAuthUser(updatedUser)
                localStorage.setItem("user-info", JSON.stringify(updatedUser))

                setRequestStatus('sent')
                showToast("Success", "Friend request sent", "success")
            }
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const acceptFriendRequest = async () => {
        if (!authUser || !userId || isLoading) return
        setIsLoading(true)

        try {
            const currentUserRef = doc(firestore, "users", authUser.uid)
            const requesterRef = doc(firestore, "users", userId)

            // Add to each other's following/followers
            await updateDoc(currentUserRef, {
                following: arrayUnion(userId),
                friendRequests: arrayRemove(userId)
            })

            await updateDoc(requesterRef, {
                followers: arrayUnion(authUser.uid),
                sentFriendRequests: arrayRemove(authUser.uid)
            })

            // Update local state
            const updatedUser = {
                ...authUser,
                following: [...authUser.following, userId],
                friendRequests: (authUser.friendRequests || []).filter(uid => uid !== userId)
            }
            setAuthUser(updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))

            if (userProfile && userProfile.uid === userId) {
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid]
                })
            }

            setRequestStatus('friends')
            showToast("Success", "Friend request accepted", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const declineFriendRequest = async () => {
        if (!authUser || !userId || isLoading) return
        setIsLoading(true)

        try {
            const currentUserRef = doc(firestore, "users", authUser.uid)
            const requesterRef = doc(firestore, "users", userId)

            await updateDoc(currentUserRef, {
                friendRequests: arrayRemove(userId)
            })

            await updateDoc(requesterRef, {
                sentFriendRequests: arrayRemove(authUser.uid)
            })

            // Update local state
            const updatedUser = {
                ...authUser,
                friendRequests: (authUser.friendRequests || []).filter(uid => uid !== userId)
            }
            setAuthUser(updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))

            setRequestStatus('none')
            showToast("Success", "Friend request declined", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const cancelFriendRequest = async () => {
        if (!authUser || !userId || isLoading) return
        setIsLoading(true)

        try {
            const currentUserRef = doc(firestore, "users", authUser.uid)
            const targetUserRef = doc(firestore, "users", userId)

            await updateDoc(currentUserRef, {
                sentFriendRequests: arrayRemove(userId)
            })

            await updateDoc(targetUserRef, {
                friendRequests: arrayRemove(authUser.uid)
            })

            // Update local state
            const updatedUser = {
                ...authUser,
                sentFriendRequests: (authUser.sentFriendRequests || []).filter(uid => uid !== userId)
            }
            setAuthUser(updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))

            setRequestStatus('none')
            showToast("Success", "Friend request cancelled", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const unfollow = async () => {
        if (!authUser || !userId || isLoading) return
        setIsLoading(true)

        try {
            const currentUserRef = doc(firestore, "users", authUser.uid)
            const targetUserRef = doc(firestore, "users", userId)

            await updateDoc(currentUserRef, {
                following: arrayRemove(userId)
            })

            await updateDoc(targetUserRef, {
                followers: arrayRemove(authUser.uid)
            })

            // Update local state
            const updatedUser = {
                ...authUser,
                following: authUser.following.filter(uid => uid !== userId)
            }
            setAuthUser(updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))

            if (userProfile && userProfile.uid === userId) {
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(uid => uid !== authUser.uid)
                })
            }

            setRequestStatus('none')
            showToast("Success", "Unfollowed user", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        requestStatus,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        cancelFriendRequest,
        unfollow
    }
}

export default useFriendRequest

