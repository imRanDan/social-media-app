import { Flex, Container, Image } from "@chakra-ui/react";

const NotificationPage = () => {
  return (
    <Container maxW={"container.lg"}>
      <Flex gap={20}>
        <Image src="/under-construction.jpg" alt="under construction" />
      </Flex>
    </Container>
  );
};

export default NotificationPage;
