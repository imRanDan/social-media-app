import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFriendRequest from "../../hooks/useFriendRequest";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";

const SuggestedUser = ({ user }) => {
	const { requestStatus, isLoading, sendFriendRequest, unfollow } = useFriendRequest(user.uid);
	const authUser = useAuthStore((state) => state.user);

	const handleFollowClick = async () => {
		if (requestStatus === 'friends') {
			await unfollow();
		} else {
			await sendFriendRequest();
		}
	};

	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
			<Flex alignItems={"center"} gap={2}>
				<Link to={`/${user.username}`}>
					<Avatar src={user.profilePicURL} size={"md"} />
				</Link>
				<VStack spacing={2} alignItems={"flex-start"}>
					<Link to={`/${user.username}`}>
						<Box fontSize={12} fontWeight={"bold"}>
							{user.fullName}
						</Box>
					</Link>
					<Box fontSize={11} color={"gray.500"}>
						{user.followers.length} followers
					</Box>
				</VStack>
			</Flex>
			{authUser && authUser.uid !== user.uid && (
				<Button
					fontSize={13}
					bg={"transparent"}
					p={0}
					h={"max-content"}
					fontWeight={"medium"}
					color={"blue.400"}
					cursor={"pointer"}
					_hover={{ color: "white" }}
					onClick={handleFollowClick}
					isLoading={isLoading}
				>
					{requestStatus === 'friends' ? "Unfollow" : 
					 requestStatus === 'sent' ? "Requested" : 
					 "Follow"}
				</Button>
			)}
		</Flex>
	);
};

export default SuggestedUser;