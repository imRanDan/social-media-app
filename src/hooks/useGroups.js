import { useState, useEffect } from "react"
import { collection, doc, getDocs, query, where, addDoc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"

const useGroups = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [groups, setGroups] = useState([])
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()

    useEffect(() => {
        const getGroups = async () => {
            if (!authUser || !authUser.groups || authUser.groups.length === 0) {
                setGroups([])
                return
            }

            setIsLoading(true)
            try {
                const groupsData = []
                for (const groupId of authUser.groups) {
                    const groupDoc = await getDoc(doc(firestore, "groups", groupId))
                    if (groupDoc.exists()) {
                        groupsData.push({ id: groupDoc.id, ...groupDoc.data() })
                    }
                }
                setGroups(groupsData)
            } catch (error) {
                showToast("Error", error.message, "error")
            } finally {
                setIsLoading(false)
            }
        }

        if (authUser) {
            getGroups()
        }
    }, [authUser, showToast])

    const createGroup = async (groupName, description) => {
        if (!authUser || isLoading) return null
        setIsLoading(true)

        try {
            const newGroup = {
                name: groupName,
                description: description || "",
                createdBy: authUser.uid,
                members: [authUser.uid],
                createdAt: Date.now(),
            }

            const groupRef = await addDoc(collection(firestore, "groups"), newGroup)

            // Add group to user's groups array
            const userRef = doc(firestore, "users", authUser.uid)
            await updateDoc(userRef, {
                groups: arrayUnion(groupRef.id)
            })

            // Update local state
            const updatedUser = {
                ...authUser,
                groups: [...(authUser.groups || []), groupRef.id]
            }
            const setAuthUser = useAuthStore.getState().setUser
            setAuthUser(updatedUser)
            localStorage.setItem("user-info", JSON.stringify(updatedUser))

            showToast("Success", "Group created successfully", "success")
            return groupRef.id
        } catch (error) {
            showToast("Error", error.message, "error")
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const addMemberToGroup = async (groupId, userId) => {
        if (!authUser || isLoading) return
        setIsLoading(true)

        try {
            const groupRef = doc(firestore, "groups", groupId)
            const groupDoc = await getDoc(groupRef)

            if (!groupDoc.exists()) {
                showToast("Error", "Group not found", "error")
                return
            }

            const group = groupDoc.data()
            if (!group.members.includes(authUser.uid)) {
                showToast("Error", "You are not a member of this group", "error")
                return
            }

            if (group.members.includes(userId)) {
                showToast("Error", "User is already a member", "error")
                return
            }

            await updateDoc(groupRef, {
                members: arrayUnion(userId)
            })

            // Add group to user's groups if not already there
            const userRef = doc(firestore, "users", userId)
            const userDoc = await getDoc(userRef)
            if (userDoc.exists()) {
                const user = userDoc.data()
                if (!user.groups || !user.groups.includes(groupId)) {
                    await updateDoc(userRef, {
                        groups: arrayUnion(groupId)
                    })
                }
            }

            showToast("Success", "Member added to group", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    const removeMemberFromGroup = async (groupId, userId) => {
        if (!authUser || isLoading) return
        setIsLoading(true)

        try {
            const groupRef = doc(firestore, "groups", groupId)
            const groupDoc = await getDoc(groupRef)

            if (!groupDoc.exists()) {
                showToast("Error", "Group not found", "error")
                return
            }

            const group = groupDoc.data()
            // Only creator or the user themselves can remove
            if (group.createdBy !== authUser.uid && userId !== authUser.uid) {
                showToast("Error", "You don't have permission to remove this member", "error")
                return
            }

            await updateDoc(groupRef, {
                members: arrayRemove(userId)
            })

            // Remove group from user's groups
            const userRef = doc(firestore, "users", userId)
            await updateDoc(userRef, {
                groups: arrayRemove(groupId)
            })

            showToast("Success", "Member removed from group", "success")
        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        groups,
        isLoading,
        createGroup,
        addMemberToGroup,
        removeMemberFromGroup
    }
}

export default useGroups

