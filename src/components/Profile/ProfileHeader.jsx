import { Avatar, AvatarGroup, Flex, VStack, Text, Button } from "@chakra-ui/react"


const ProfileHeader = () => {
  return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:"column",sm:"row"}}>
        <AvatarGroup size={{base:"xl",md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
            <Avatar name='danimran' src='/profilepic.jpg' alt='danimran pfp' />
        </AvatarGroup>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base:"column",sm:"row"}} justifyContent={{base:"center",sm:"flex-start"}} alignItems={"center"} w={"full"}>
                <Text fontSize={{base:"sm",md:"lg"}}>
                    danimran
                </Text>
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"white"} color={"black"} _hover={{bg:"whiteAlpga.800"}} size={{base:"xs",md:"sm"}}>
                        Edit Profile
                    </Button>
                </Flex>
            </Flex>

            <Flex alignItems={"center"} gap={{base:2,sm:4}}>
                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>4</Text>
                    Posts
                </Text>

                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>190</Text>
                    Followers
                </Text>

                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>170</Text>
                    Following
                </Text>
            </Flex>

            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                    D
                </Text>
             </Flex>
             <Flex>
             <Text fontSize={"sm"}>
                    Tech enthusianst, software developer, gymrat, cook, and coffee connoisseuar.
                </Text>
             </Flex>
        </VStack>
    </Flex>
  )
}

export default ProfileHeader