import Head from "next/head";
import type { NextPage } from "next";

import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";
import { setupApiClient } from "../services/api";

import { Header } from "../components/Header";

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
  Tooltip,
} from "@chakra-ui/react";
import { SmallCloseIcon, CheckIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { Result } from "../models/result";

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

const Dashboard: NextPage = () => {
  const [schedules, setSchedules] = useState<Scheduler[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const { data: result } = await api.get<Result>("schedules/all");
      if (result.success) {
        setSchedules(
          result.data.map((schedule: any) => ({
            ...schedule,
            date: new Date(schedule.date).toLocaleDateString(),
          }))
        );

        setLoading(false);
      }
    })();
  }, [schedules]);

  const handeClick = async (scheduleId: string, status: string) => {
    await api.put("/schedules", {
      id: scheduleId,
      status: status,
    });
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
            LISTAGEM DE <span style={{ color: "#BA2B00" }}>AGENDAMENTOS</span>
          </Heading>
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
                    <Th>Ações</Th>
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
                      <Td>
                        {schedule.status === "CANCELED" ? (
                          <Tooltip
                            hasArrow
                            label="Confirmar Agendamento"
                            placement="right-end"
                            bg="#BA2B00"
                          >
                            <IconButton
                              onClick={() => handeClick(schedule.id, "OK")}
                              colorScheme="blue"
                              aria-label="Reativar agenda"
                              variant="outline"
                              icon={<CheckIcon />}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip
                            hasArrow
                            label="Cancelar Agendamento"
                            placement="right-end"
                            bg="#BA2B00"
                          >
                            <IconButton
                              variant="outline"
                              onClick={() =>
                                handeClick(schedule.id, "CANCELED")
                              }
                              colorScheme="red"
                              aria-label="Cancelar agenda"
                              icon={<SmallCloseIcon />}
                            />
                          </Tooltip>
                        )}
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

export const getServerSideProps = withSSRAuth(async (context) => {
  const apiClinet = setupApiClient(context);
  await apiClinet.get("/account/me");

  return {
    props: {},
  };
});

export default Dashboard;
