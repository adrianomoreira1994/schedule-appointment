import Head from "next/head";
import type { NextPage } from "next";
import {
  Button,
  Center,
  CircularProgress,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";

import { useContext, useState } from "react";
import { AuthContext } from "../hooks/auth";
import { withSSRGuest } from "../utils/withSSRGuest";
import ActionButton from "../components/ActionButton";

interface IFormInput {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    signIn({
      email: data.email,
      password: data.password,
    });

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Appointments | Login</title>
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
        flexDir="column"
        backgroundColor="#f0f0f0"
      >
        <Center>
          <Heading color="#BA2B00">LOGIN</Heading>
        </Center>
        <Flex
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          width="100%"
          maxWidth={360}
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<EmailIcon color="gray.300" />}
            />
            <Input
              {...register("email")}
              name="email"
              type="email"
              bgColor="white"
              placeholder="E-mail:"
              _hover={{
                bgColor: "gray.100",
              }}
            />
          </InputGroup>

          <InputGroup mt={6}>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />

            <Input
              {...register("password")}
              name="password"
              type="password"
              bgColor="white"
              placeholder="Senha:"
              _hover={{
                bgColor: "gray.100",
              }}
            />
          </InputGroup>

          <ActionButton type="submit" backgroundColor="#BA2B00" color="#FFF">
            {loading && (
              <CircularProgress
                marginRight={2}
                size={8}
                isIndeterminate
                color="white"
              />
            )}
            <p>Logar</p>
          </ActionButton>
        </Flex>
      </Flex>
    </>
  );
};

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});

export default Login;
