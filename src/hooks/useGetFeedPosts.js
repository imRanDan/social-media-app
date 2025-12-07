import { useState, useEffect } from "react"
import usePostStore from "../store/postStore"
import useAuthStore from "../store/authStore"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {posts, setPosts} = usePostStore()
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()
    const {setUserProfile} = useUserProfileStore()

    useEffect(() => {
        const getFeedPosts = async () => {
            setIsLoading(true)
            const feedPosts = []

            try {
                // Get posts from followed users (public posts or posts from users you follow)
                if(authUser.following && authUser.following.length > 0) {
                    // Handle Firestore 'in' query limit of 10
                    const followingChunks = []
                    for (let i = 0; i < authUser.following.length; i += 10) {
                        followingChunks.push(authUser.following.slice(i, i + 10))
                    }

                    for (const chunk of followingChunks) {
                        const q = query(collection(firestore, "posts"), where("createdBy", "in", chunk))
                        const querySnapshot = await getDocs(q)
                        querySnapshot.forEach(doc => {
                            const post = {id:doc.id, ...doc.data()}
                            // Only include public posts (no groupId) or posts from followed users
                            if (!post.groupId) {
                                feedPosts.push(post)
                            }
                        })
                    }
                }

                // Get group posts where user is a member
                if(authUser.groups && authUser.groups.length > 0) {
                    for (const groupId of authUser.groups) {
                        const groupPostsQuery = query(
                            collection(firestore, "posts"),
                            where("groupId", "==", groupId)
                        )
                        const groupPostsSnapshot = await getDocs(groupPostsQuery)
                        groupPostsSnapshot.forEach(doc => {
                            feedPosts.push({id:doc.id, ...doc.data()})
                        })
                    }
                }

                // Remove duplicates and sort
                const uniquePosts = feedPosts.filter((post, index, self) =>
                    index === self.findIndex((p) => p.id === post.id)
                )
                uniquePosts.sort((a,b) => b.createdAt - a.createdAt)
                setPosts(uniquePosts)

            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setIsLoading(false)
            }
        }

        if(authUser) getFeedPosts()
},[authUser, showToast, setPosts, setUserProfile])

return {isLoading, posts}
}

export default useGetFeedPosts