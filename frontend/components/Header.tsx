import { Button, Container, Flex, Spacer, Text } from "@chakra-ui/react";
import Router from "next/router";
import { signOut } from "../hooks/auth";

type HeaderProps = {
  isSignInButton?: boolean;
  isSignoutButton?: boolean;
};

export function Header({ isSignInButton, isSignoutButton }: HeaderProps) {
  return (
    <Flex width="100%" as="header" py="5" px="5" background="#BA2B00">
      <Container maxW="container.lg">
        <Flex>
          <Text
            color="#f0f0f0"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="tight"
          >
            Appointment Schedules
          </Text>
          <Spacer />
          {isSignInButton && (
            <Button
              onClick={() => Router.push("/login")}
              colorScheme="blackAlpha"
              variant="solid"
            >
              Entrar!
            </Button>
          )}

          {isSignoutButton && (
            <Button
              onClick={() => signOut()}
              colorScheme="blackAlpha"
              variant="outline"
            >
              Sair
            </Button>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}
