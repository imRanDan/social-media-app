import { Box, VStack, Flex, Text, Image} from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)



  return (
    <>
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <VStack spacing={4}>
                <Image src='/logo.png' h={24} cursor={"pointer"} alt='Instagram'/>
                {/* Thus is a ternary to check if user is logged in and it uses State */}

                {isLogin ? <Login /> : <Signup />}

                {/*----- Or Render ----- */}
                <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
                    <Box flex={2} h={"1px"} bg={"gray.40 0"} />
                        <Text mx={1}>OR</Text>
                    <Box flex={2} h={"1px"} bg={"gray.400"} />
                </Flex>

                {/* Login with Google */}
                <GoogleAuth />
            </VStack> 
        </Box>

        {/* -----Switch Between Login and Signup ------ */}
        <Box border={"1px solid gray"} borderRadius={4} padding={5}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Box mx={2} fontSize={14}>
                    {isLogin ? "Don't have an account?": "Already have an account?"}
                </Box>
                <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
                    {isLogin ? "Sign Up": "Log in"}
                </Box>
            </Flex>
        </Box>
    </>
  )
}

export default AuthForm