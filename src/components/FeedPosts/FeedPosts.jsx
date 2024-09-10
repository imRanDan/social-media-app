import { Container, Box, VStack, Flex, SkeletonCircle, Skeleton, Text } from "@chakra-ui/react"
import FeedPost from "./FeedPost"
import useGetFeedPosts from "../../hooks/useGetFeedPosts";


const FeedPosts = () => {
 const { isLoading, posts} = useGetFeedPosts()

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {isLoading && [0,1,2,3].map((_,idx) => (
         <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
                <SkeletonCircle size='10' />
                <VStack gap={2} alignItems={"flex-start"}>
                  <Skeleton height='10px' w={"200px"} />
                  <Skeleton height='10px' w={"200px"} />
                </VStack>
            </Flex>
            <Skeleton w={"full"}>
                <Box h={"400px"}>contents wrapped</Box>
            </Skeleton>
         </VStack>   
        ))}

        {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
        {!isLoading && posts.length === 0 && (
          <>
            <Text fontSize={"md"} color={"red.400"}>
              No friends? Womp womp.
            </Text>
            <Text color={"red.400"}>
              Stop what you are doing and go make some! :D
            </Text>
          </>
        )}
        
    </Container>
  )
}

export default FeedPosts