import { Flex, Box } from '@chakra-ui/react'

const PageLayout = ({children}) => {
  return (
    <Flex>
        {/* Sidebar, left-side */}

        {/* Page Content, right-side */}
        <Box>
            {children}
        </Box>
    </Flex>
  )
}

export default PageLayout