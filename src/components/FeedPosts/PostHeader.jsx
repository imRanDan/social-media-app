import { Flex, Avatar, Box, Text, SkeletonCircle, Skeleton, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFollowUser from "../../hooks/useFollowUser"

const PostHeader = ({post, creatorProfile}) => {

  const {handleFollowUser, isFollowing, isUpdating} =  useFollowUser(post.createdBy)

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
        <Box color={"gray.500"}>1w</Box>
        </Flex>
      </Flex>
      <Button cursor={"pointer"} >
        <Text size={"xs"} bg={"transparent"} fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{color: "white"}} transition={"0.2s ease-in-out"} onClick={handleFollowUser} isLoading={isUpdating}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </Button>
    </Flex>
  )
}

export default PostHeader