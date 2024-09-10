import { Flex, Avatar, Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const PostHeader = ({post, creatorProfile}) => {

  if (!creatorProfile) {
    return null
  }

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${creatorProfile.username}`}>
          <Avatar src={creatorProfile.profilePicURL} alt={"profile pic of user"} size={"sm"}/>
        </Link>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <Link to={`/${creatorProfile.username}`}>
            {creatorProfile.username}
          </Link>
          <Box color={"gray.500"}>1w</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"} >
        <Text fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{color: "white"}} transition={"0.2s ease-in-out"}>
          Unfollow
        </Text>
      </Box>
    </Flex>
  )
}

export default PostHeader