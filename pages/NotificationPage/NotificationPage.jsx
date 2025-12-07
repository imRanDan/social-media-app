import { Flex, Container, VStack, Heading, Text, Box, Avatar, Button, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import useGetFriendRequests from "../../src/hooks/useGetFriendRequests";
import useFriendRequest from "../../src/hooks/useFriendRequest";
import { Link } from "react-router-dom";

const NotificationPage = () => {
  const { isLoading, friendRequests } = useGetFriendRequests();

  return (
    <Container maxW={"container.lg"} py={10}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Friend Requests</Heading>
        
        {isLoading && (
          <VStack spacing={4} align="stretch">
            {[0, 1, 2].map((idx) => (
              <Flex key={idx} gap={4} p={4} border="1px solid" borderColor="whiteAlpha.300" borderRadius="md">
                <SkeletonCircle size="12" />
                <Box flex={1}>
                  <SkeletonText noOfLines={2} spacing={2} />
                </Box>
              </Flex>
            ))}
          </VStack>
        )}

        {!isLoading && friendRequests.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.400">No friend requests</Text>
          </Box>
        )}

        {!isLoading && friendRequests.length > 0 && (
          <VStack spacing={4} align="stretch">
            {friendRequests.map((user) => (
              <FriendRequestItem key={user.uid} user={user} />
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

const FriendRequestItem = ({ user }) => {
  const { isLoading, acceptFriendRequest, declineFriendRequest } = useFriendRequest(user.uid);

  return (
    <Flex
      gap={4}
      p={4}
      border="1px solid"
      borderColor="whiteAlpha.300"
      borderRadius="md"
      alignItems="center"
      _hover={{ bg: "whiteAlpha.50" }}
    >
      <Link to={`/${user.username}`}>
        <Avatar src={user.profilePicURL} name={user.fullName} size="md" cursor="pointer" />
      </Link>
      <Box flex={1}>
        <Link to={`/${user.username}`}>
          <Text fontWeight="bold" _hover={{ textDecoration: "underline" }}>
            {user.username}
          </Text>
        </Link>
        <Text fontSize="sm" color="gray.400">
          {user.fullName}
        </Text>
      </Box>
      <Flex gap={2}>
        <Button
          size="sm"
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          onClick={acceptFriendRequest}
          isLoading={isLoading}
        >
          Accept
        </Button>
        <Button
          size="sm"
          bg="red.500"
          color="white"
          _hover={{ bg: "red.600" }}
          onClick={declineFriendRequest}
          isLoading={isLoading}
        >
          Decline
        </Button>
      </Flex>
    </Flex>
  );
};

export default NotificationPage;
