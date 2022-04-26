import Head from "next/head";
import type { NextPage } from "next";

import { api } from "../services/apiClient";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  Heading,
  Center,
  Text,
  Divider,
  CircularProgress,
  IconButton,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { SmallCloseIcon, CheckIcon, EmailIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { Result } from "../models/result";
import { withSSRGuest } from "../utils/withSSRGuest";
import { SubmitHandler, useForm } from "react-hook-form";
import ActionButton from "../components/ActionButton";
import { Header } from "../components/Header";

type Scheduler = {
  id: string;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    createdAt: string;
  };
  status: string;
  date: string;
  time: string;
};

interface IFormInput {
  email: string;
}

const MySchedules: NextPage = () => {
  const [schedules, setSchedules] = useState<Scheduler[]>([]);
  const { register, handleSubmit } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);

    const { data: result } = await api.get<Result>(
      `/schedules?email=${data.email}`
    );

    if (result.success) {
      setSchedules(
        result.data.map((schedule: any) => ({
          ...schedule,
          date: new Date(schedule.date).toLocaleDateString(),
        }))
      );
    } else {
      toast({
        title: result.message,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <Head>
        <title>Appointments | Dashboard</title>
      </Head>

      <Header isSignoutButton />

      <Center>
        <Box maxW={600}>
          <Heading mt={20} mb={4}>
            MEUS <span style={{ color: "#BA2B00" }}>AGENDAMENTOS</span>
          </Heading>

          <Flex
            onSubmit={handleSubmit(onSubmit)}
            as="form"
            width="100%"
            maxWidth={360}
            p="8"
            borderRadius={8}
            flexDir="column"
          >
            <FormControl>
              <FormLabel>Informe seu e-mail</FormLabel>

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
            </FormControl>

            <ActionButton backgroundColor="#BB2B00" color="#FFF" type="submit">
              <p>Pesquisar</p>
            </ActionButton>
          </Flex>
        </Box>
      </Center>

      <Divider />

      <Flex
        px={20}
        pt={10}
        background="#F0F0F0"
        w="100vw"
        h="100vh"
        flexDir="column"
      >
        {loading ? (
          <Center>
            <CircularProgress isIndeterminate color="#BA2B00" />
          </Center>
        ) : (
          <Flex align="center" justify="center">
            <TableContainer>
              <Table variant="striped" colorScheme="blackAlpha">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Sobrenome</Th>
                    <Th>E-mail</Th>
                    <Th>Data</Th>
                    <Th>Horário</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {schedules.map((schedule) => (
                    <Tr key={schedule.id}>
                      <Td>{schedule.user.name}</Td>
                      <Td>{schedule.user.surname}</Td>
                      <Td>{schedule.user.email}</Td>
                      <Td>{schedule.date}</Td>
                      <Td>{schedule.time}</Td>
                      <Td>
                        {schedule.status === "OK" ? "CONFIRMADO" : "CANCELADO"}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export const getServerSideProps = withSSRGuest(async (context) => {
  return {
    props: {},
  };
});

export default MySchedules;
