import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { useUsers } from "../../services/hooks/useUsers";

import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import axiosInstance from "../../services/axios";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { isLoading, isFetching, data, error, } = useUsers(page);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handlePrefetchUser = async(userId: string) => {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    }, {
      staleTime: 1000 * 60 * 10
    })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm"  colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar novo
              </Button>
            </NextLink>
          </Flex>
          { isLoading ? (
            <Flex align="center" justify="center" height="50%" w="100%">
              <Spinner />
            </Flex>
          ) : !error ?  (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr >
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>
                      Usuários
                    </Th>
                    {isWideVersion && (  
                      <>
                        <Th>
                          Data de cadastro
                        </Th>  
                        <Th width="0" />  
                      </>
                      )}
                    </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text color="purple.400"  fontWeight="bold">
                              {user.name}
                            </Text>
                          </Link>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <>
                          <Td px={["4", "4", "6"]}>
                            {user.created_at}
                          </Td>
                          <Td px={["4", "4", "6"]}>
                            <Button as="a" size="sm" fontSize="sm"  colorScheme="purple" leftIcon={<Icon as={RiPencilLine} fontSize="16" />}>
                              Editar
                            </Button>
                          </Td>
                        </>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination 
                totalCount={data.totalCount}
                onPageChange={setPage}
                currentPage={page}
              />
            </>
          ) : (
            <Flex>
              <Text>Falha ao obter dados dos usuarios</Text>
            </Flex>
          )}
        </Box>
      </Flex>  
    </Box>
  )
}