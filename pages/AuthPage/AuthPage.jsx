import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../src/components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left Side */}
          <Box display={{ base: "none", md: "block" }}></Box>

          {/* Le Right Side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image
                src="/playstore.png"
                h={"10"}
                alt="google playstore logo"
              />
              <Image src="/microsoft.png" h={"10"} alt="microsoft store logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;
