import React from 'react'
import usePostStore from '../store/postStore'
import useUserProfileStore from '../store/userProfileStore'

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {posts, setPosts } = usePostStore()
    const showToast = useShowToast()
    const useProfile = useUserProfileStore((state) => state.userProfile)

    useEffect(() => {
        const getPosts = async () => {
            if(!userProfile) return
            setIsLoading(true)
            setPosts([])
            try {
                
            } catch (error) {
                
            }
        }
    }, [])
}

export default useGetUserPosts