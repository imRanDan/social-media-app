import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Textarea, useDisclosure, Tooltip, Flex, Box } from "@chakra-ui/react"
import { useState } from "react"
import useGroups from "../../hooks/useGroups"
import useShowToast from "../../hooks/useShowToast"
import { CreatePostLogo } from "../../assets/constants"

const CreateGroup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupName, setGroupName] = useState("")
    const [description, setDescription] = useState("")
    const { isLoading, createGroup } = useGroups()
    const showToast = useShowToast()

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            showToast("Error", "Group name is required", "error")
            return
        }

        const groupId = await createGroup(groupName.trim(), description.trim())
        if (groupId) {
            setGroupName("")
            setDescription("")
            onClose()
        }
    }

    return (
        <>
            <Tooltip
                hasArrow
                label={"Create Group"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <CreatePostLogo />
                    <Box display={{ base: "none", md: "block" }}>Create Group</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader>Create Group</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mb={4}>
                            <FormLabel>Group Name</FormLabel>
                            <Input
                                placeholder="My Close Friends"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description (Optional)</FormLabel>
                            <Textarea
                                placeholder="Describe your group..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button bg={"blue.500"} color={"white"} _hover={{ bg: "blue.600" }} onClick={handleCreateGroup} isLoading={isLoading}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateGroup

