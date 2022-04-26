import { Button, Container, Flex, Spacer, Text } from "@chakra-ui/react";
import Router from "next/router";
import { useContext } from "react";
import { AuthContext, signOut } from "../hooks/auth";

type HeaderProps = {
  isSignInButton?: boolean;
  isSignoutButton?: boolean;
};

export function Header({ isSignInButton, isSignoutButton }: HeaderProps) {
  const { isAuthenticated, clearAuth } = useContext(AuthContext);

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

          {isAuthenticated && (
            <Button
              onClick={() => Router.push("/dashboard")}
              colorScheme="blackAlpha"
              variant="solid"
              marginRight={2}
            >
              Dashboard
            </Button>
          )}

          {isSignInButton && !isAuthenticated && (
            <Button
              onClick={() => Router.push("/login")}
              colorScheme="blackAlpha"
              variant="solid"
            >
              Entrar!
            </Button>
          )}

          {isSignoutButton && isAuthenticated && (
            <Button
              onClick={() => {
                clearAuth();
                signOut();
              }}
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
