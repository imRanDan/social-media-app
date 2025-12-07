import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react"
import useGetUserPosts from "../../hooks/useGetUserPosts"
import ProfilePost from "./ProfilePost"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"


const ProfilePosts = () => {
  const {isLoading, posts} = useGetUserPosts()
  const {userProfile} = useUserProfileStore()
  const authUser = useAuthStore((state) => state.user)

  // Check if profile is private and user is not following
  const isPrivateProfile = userProfile?.isPrivate || false
  const isOwnProfile = authUser && authUser.uid === userProfile?.uid
  const isFollowing = authUser && userProfile && authUser.following.includes(userProfile.uid)
  const canViewPosts = isOwnProfile || !isPrivateProfile || isFollowing

  const noPostsFound = !isLoading && posts.length === 0;
  if(noPostsFound && canViewPosts) return <NoPostsFound />
  if(!canViewPosts) return <PrivateProfileMessage />



  return (
    <Grid templateColumns={{sm:"repeat(1, fr)", md:"repeat(3, 1fr)",}} gap={1} columnGap={1}>

      {isLoading && [0,1,2,3].map((_,idx) => (
        <VStack key={idx} alignItems={"flex-start"} gap={4}>
          <Skeleton w={"full"}>
            <Box h="300px">
              contents wrapped
            </Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>

  )
}

export default ProfilePosts

const NoPostsFound = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found</Text>
    </Flex>
  )
}

const PrivateProfileMessage = () => {
  return (
    <Flex flexDir="column" textAlign={"center"} mx={"auto"} mt={10} gap={4}>
      <Text fontSize={"xl"} fontWeight={"bold"}>This Account is Private</Text>
      <Text fontSize={"md"} color={"gray.400"}>Follow this account to see their posts</Text>
    </Flex>
  )
}