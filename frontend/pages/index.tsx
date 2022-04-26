import Head from "next/head";
import type { NextPage } from "next";
import ActionButton from "../components/ActionButton";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  FormControl,
  Text,
  useToast,
  Select,
  Divider,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { useForm, SubmitHandler } from "react-hook-form";

import { withSSRGuest } from "../utils/withSSRGuest";
import { Header } from "../components/Header";

import { api } from "../services/apiClient";
import { Result } from "../models/result";
import Router from "next/router";

interface IFormInput {
  name: string;
  surname: string;
  email: string;
  reason: string;
  time: string;
  date: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const toast = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { data: result } = await api.post<Result>("/schedules", data);

    if (result.success) {
      toast({
        title: result.message,
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      reset();
    } else {
      if (result.data) {
        const hours: string[] = result.data;
        toast({
          title: `${result.message}: ${hours.join(" | ")}`,
          position: "top-right",
          status: "warning",
          duration: 10000,
          isClosable: true,
        });
      } else {
        toast({
          title: result.message,
          position: "top-right",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Appointments | Schedules</title>
      </Head>

      <Flex
        w="100vw"
        h="100vh"
        align="center"
        flexDir="column"
        backgroundColor="#f0f0f0"
      >
        <Header isSignInButton={true} />

        <Box maxW={600}>
          <Heading mt={20} mb={4}>
            CADASTRO DE <span style={{ color: "#BA2B00" }}>AGENDAMENTO</span>
          </Heading>
          <Center mb={8}>
            <Text fontSize="xl">
              Informe seus dados abaixo para realizar o agendamento
            </Text>
          </Center>

          <Divider />

          <Center mt={8}>
            <ActionButton
              backgroundColor="#BA2B00"
              color="#FFF"
              onClick={() => Router.push("/my-schedules")}
            >
              <p>Ver meus agendamentos</p>
            </ActionButton>
          </Center>
        </Box>

        <Flex
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          width="100%"
          maxWidth={600}
          p="8"
          borderRadius={8}
          flexDir="column"
        >
          <FormControl isRequired>
            <FormLabel>Nome:</FormLabel>
            <Input
              mb={6}
              {...register("name")}
              name="name"
              type="name"
              bgColor="white"
              placeholder="Nome:"
              _hover={{
                bgColor: "gray.100",
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Sobrenome:</FormLabel>
            <Input
              mb={6}
              {...register("surname")}
              name="surname"
              type="surname"
              bgColor="white"
              placeholder="Sobrenome:"
              _hover={{
                bgColor: "gray.100",
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>E-mail:</FormLabel>

            <Input
              mb={6}
              {...register("email")}
              name="email"
              type="email"
              bgColor="white"
              placeholder="E-mail:"
              _hover={{
                bgColor: "gray.100",
              }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Motivo:</FormLabel>
            <Input
              mb={6}
              {...register("reason")}
              name="reason"
              type="reason"
              bgColor="white"
              placeholder="Motivo:"
              _hover={{
                bgColor: "gray.100",
              }}
            />
          </FormControl>

          <Flex>
            <FormControl marginRight={2} isRequired>
              <FormLabel>Data</FormLabel>
              <Input
                mb={6}
                {...register("date")}
                name="date"
                type="date"
                bgColor="white"
                placeholder="Dia:"
                _hover={{
                  bgColor: "gray.100",
                }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Horário:</FormLabel>
              <Select
                icon={<ArrowDownIcon />}
                mb={6}
                {...register("time")}
                name="time"
                bgColor="white"
                placeholder="Selecione um horário"
                _hover={{
                  bgColor: "gray.100",
                }}
              >
                <option value="08:00:00">08:00:00</option>
                <option value="09:00:00">09:00:00</option>
                <option value="10:00:00">10:00:00</option>
                <option value="11:00:00">11:00:00</option>
                <option value="12:00:00">12:00:00</option>
                <option value="13:00:00">13:00:00</option>
                <option value="14:00:00">14:00:00</option>
                <option value="15:00:00">15:00:00</option>
                <option value="16:00:00">16:00:00</option>
                <option value="17:00:00">17:00:00</option>
                <option value="18:00:00">18:00:00</option>
                <option value="19:00:00">19:00:00</option>
                <option value="20:00:00">20:00:00</option>
              </Select>
            </FormControl>
          </Flex>
          <Button
            backgroundColor="#BA2B00"
            type="submit"
            mt={6}
            colorScheme="teal"
            _hover={{
              background: "#CD4820",
            }}
          >
            Agendar
          </Button>
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

export default Home;
