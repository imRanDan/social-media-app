import { Container, VStack, Heading, Text, Box, Flex, Button, Avatar, Badge, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react"
import useGroups from "../../src/hooks/useGroups"
import CreateGroup from "../../src/components/Groups/CreateGroup"
import { Link } from "react-router-dom"

const GroupsPage = () => {
    const { groups, isLoading } = useGroups()

    return (
        <Container maxW={"container.lg"} py={10}>
            <VStack spacing={6} align="stretch">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading size="lg">My Groups</Heading>
                    <CreateGroup />
                </Flex>

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

                {!isLoading && groups.length === 0 && (
                    <Box textAlign="center" py={10}>
                        <Text fontSize="lg" color="gray.400" mb={4}>No groups yet</Text>
                        <Text fontSize="sm" color="gray.500">Create a group to share posts with close friends</Text>
                    </Box>
                )}

                {!isLoading && groups.length > 0 && (
                    <VStack spacing={4} align="stretch">
                        {groups.map((group) => (
                            <GroupItem key={group.id} group={group} />
                        ))}
                    </VStack>
                )}
            </VStack>
        </Container>
    )
}

const GroupItem = ({ group }) => {
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
            <Avatar name={group.name} size="md" />
            <Box flex={1}>
                <Text fontWeight="bold" fontSize="lg">
                    {group.name}
                </Text>
                {group.description && (
                    <Text fontSize="sm" color="gray.400" mt={1}>
                        {group.description}
                    </Text>
                )}
                <Flex gap={2} mt={2} alignItems="center">
                    <Badge colorScheme="purple" fontSize="xs">
                        {group.members?.length || 0} members
                    </Badge>
                </Flex>
            </Box>
        </Flex>
    )
}

export default GroupsPage

