import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"

const FeedPost = () => {
  return (
    <>
        <PostHeader />
        <Box my={2}>
            <Image src="/img1.png" alt='users profile picture'/>
        </Box>
        <PostFooter />
    </>
  )
}

export default FeedPost