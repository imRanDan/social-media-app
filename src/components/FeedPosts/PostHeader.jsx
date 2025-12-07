import { Flex, Avatar, Box, Text, SkeletonCircle, Skeleton, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFriendRequest from "../../hooks/useFriendRequest"
import useAuthStore from "../../store/authStore"
import { timeAgo } from "../../utils/timeAgo"

const PostHeader = ({post, creatorProfile}) => {
  const authUser = useAuthStore((state) => state.user)
  const {requestStatus, isLoading, sendFriendRequest, unfollow} = useFriendRequest(post.createdBy)
  
  const isOwnPost = authUser && authUser.uid === post.createdBy

  // if (!creatorProfile) {
  //   return null
  // }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`${creatorProfile.username}`}>
            <Avatar src={creatorProfile.profilePicURL} alt={"profile pic of user"} size={"sm"}/>
          </Link>
        ) : (
          <SkeletonCircle size="10" />
        )}
       
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
        {creatorProfile ? (
            <Link to={`/${creatorProfile.username}`}>
                {creatorProfile.username}
            </Link>
        ) : (
          <Skeleton w={"100px"} h={"10px"} />
        )}
        <Box color={"gray.500"}>{timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      {!isOwnPost && creatorProfile && (
        <Button cursor={"pointer"} >
          <Text 
            size={"xs"} 
            bg={"transparent"} 
            fontSize={12} 
            color={"blue.500"} 
            fontWeight={"bold"} 
            _hover={{color: "white"}} 
            transition={"0.2s ease-in-out"} 
            onClick={requestStatus === 'friends' ? unfollow : sendFriendRequest} 
            isLoading={isLoading}
          >
            {requestStatus === 'friends' ? "Unfollow" : 
             requestStatus === 'sent' ? "Requested" : 
             "Follow"}
          </Text>
        </Button>
      )}
    </Flex>
  )
}

export default PostHeader