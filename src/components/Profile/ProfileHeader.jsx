import { Avatar, AvatarGroup, Flex, VStack, Text, Button, useDisclosure, Badge } from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFriendRequest from "../../hooks/useFriendRequest";


const ProfileHeader = () => {
    const {userProfile} = useUserProfileStore();
    const authUser  = useAuthStore((state) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {requestStatus, isLoading, sendFriendRequest, acceptFriendRequest, declineFriendRequest, cancelFriendRequest, unfollow} = useFriendRequest(userProfile?.uid)

    const visitingYourOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth = authUser && authUser.username !== userProfile.username;

  return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:"column",sm:"row"}}>
        <AvatarGroup size={{base:"xl",md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
            <Avatar src={userProfile.profilePicURL} alt='danimran pfp' />
        </AvatarGroup>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base:"column",sm:"row"}} justifyContent={{base:"center",sm:"flex-start"}} alignItems={"center"} w={"full"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={{base:"sm",md:"lg"}}>
                        {userProfile.username}
                    </Text>
                    {userProfile.isPrivate && (
                        <Badge colorScheme="purple" fontSize="xs">Private</Badge>
                    )}
                </Flex>
                {visitingYourOwnProfileAndAuth && (
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <Button bg={"white"} color={"black"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs",md:"sm"}} onClick={onOpen}>
                        Edit Profile
                    </Button>
                </Flex>
                )}
                {visitingAnotherProfileAndAuth && (
                <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    {requestStatus === 'friends' && (
                        <Button bg={"gray.600"} color={"white"} _hover={{bg:"gray.700"}} size={{base:"xs",md:"sm"}} onClick={unfollow} isLoading={isLoading}>
                            Unfollow
                        </Button>
                    )}
                    {requestStatus === 'sent' && (
                        <Button bg={"gray.500"} color={"white"} _hover={{bg:"gray.600"}} size={{base:"xs",md:"sm"}} onClick={cancelFriendRequest} isLoading={isLoading}>
                            Cancel Request
                        </Button>
                    )}
                    {requestStatus === 'received' && (
                        <Flex gap={2}>
                            <Button bg={"green.500"} color={"white"} _hover={{bg:"green.600"}} size={{base:"xs",md:"sm"}} onClick={acceptFriendRequest} isLoading={isLoading}>
                                Accept
                            </Button>
                            <Button bg={"red.500"} color={"white"} _hover={{bg:"red.600"}} size={{base:"xs",md:"sm"}} onClick={declineFriendRequest} isLoading={isLoading}>
                                Decline
                            </Button>
                        </Flex>
                    )}
                    {requestStatus === 'none' && (
                        <Button bg={"blue.500"} color={"white"} _hover={{bg:"blue.600"}} size={{base:"xs",md:"sm"}} onClick={sendFriendRequest} isLoading={isLoading}>
                            {userProfile.isPrivate ? "Send Request" : "Follow"}
                        </Button>
                    )}
                </Flex>
                )}
            </Flex>

            <Flex alignItems={"center"} gap={{base:2,sm:4}}>
                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.posts.length}</Text>
                    Posts
                </Text>

                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                    Followers
                </Text>

                <Text fontSize={{base:"xs",md:"sm"}}>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                    Following
                </Text>
            </Flex>

            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                {userProfile.fullName}
                </Text>
             </Flex>
             <Flex>
             <Text fontSize={"sm"}>
                    {userProfile.bio}
                </Text>
             </Flex>
        </VStack>
        {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />}
    </Flex>
  )
}

export default ProfileHeader