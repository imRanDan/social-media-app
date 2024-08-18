import { VStack, Text, Link, Box, Flex } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader />

        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
            See all
          </Text>
        </Flex>

        <SuggestedUser name='Dan Abrahmov' followers={505} avatar='https://bit.ly/dan-abramov' />

        <SuggestedUser name='Ryan Florence' followers={568} avatar='https://bit.ly/ryan-florence'  />

        <SuggestedUser name='Christian Nwamba' followers={790} avatar='https://bit.ly/code-beast' />

        <Box fontSize={12} color={"gray.500"} mt={5} >
          2024 Built By {" "}
          <Link href='https://github.com/imRanDan' target='_blank' color='blue.500' fontSize={14}>
            imRanDan
          </Link>
        </Box>

    </VStack>
  )
}

export default SuggestedUsers