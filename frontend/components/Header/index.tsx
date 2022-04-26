import { Container, Flex, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext, signOut } from "../../hooks/auth";
import ActionButton from "../ActionButton";

type HeaderProps = {
  isSignInButton?: boolean;
  isSignoutButton?: boolean;
};

export function Header({ isSignInButton, isSignoutButton }: HeaderProps) {
  const { isAuthenticated, clearAuth } = useContext(AuthContext);
  const router = useRouter();

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

          {router.pathname === "/my-schedules" && (
            <ActionButton
              onClick={() => router.back()}
              backgroundColor="#5c1601"
              color="white"
            >
              Voltar
            </ActionButton>
          )}

          {isAuthenticated && (
            <ActionButton
              onClick={() => router.push("/dashboard")}
              backgroundColor="#5c1601"
              color="white"
            >
              Dashboard
            </ActionButton>
          )}

          {isSignInButton && !isAuthenticated && (
            <ActionButton
              onClick={() => router.push("/login")}
              backgroundColor="#5c1601"
              color="white"
            >
              Login
            </ActionButton>
          )}

          {isSignoutButton && isAuthenticated && (
            <ActionButton
              onClick={() => {
                clearAuth();
                signOut();
              }}
              backgroundColor="#5c1601"
              color="white"
            >
              Sair
            </ActionButton>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}
