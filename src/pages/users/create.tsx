import { SubmitHandler, useForm } from "react-hook-form";
import { signUpFormSchema } from '../../validators/YupValidators';
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Input from "../../components/common/Input";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useMutation } from "react-query";
import axiosInstance from "../../services/axios";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";


type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function CreateUsers() {
  const router = useRouter(); 

  const createUser = useMutation('createUser', async(user: SignUpFormData) => {
    const response = await axiosInstance.post('/users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    })
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    }
  });

  const { handleSubmit, register ,formState } = useForm({
    resolver: yupResolver(signUpFormSchema)
  })

  const handleCreateUser: SubmitHandler<SignUpFormData> = async (e) => {
     await createUser.mutateAsync(e);
     router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6","8"]}>
          <Heading size="lg" fontWeight="normal"  >Criar Usuário</Heading>
          <Divider my="6" borderRightColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%" >
              <Input 
                error={formState.errors.name} 
                name="name" 
                label="Nome Completo" 
                {...register('name')} 
              />
              <Input 
                error={formState.errors.email} 
                name="email" 
                type="email" 
                label="E-mail" 
                {...register('email')} 
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%" >
              <Input 
                error={formState.errors.password} 
                name="password" 
                type="password" 
                label="Senha" 
                {...register('password')} 
              />
              <Input 
                error={formState.errors.password_confirmation} 
                name="password_confirmation" 
                type="password" 
                label="Confirme a senha" 
                {...register('password_confirmation')} 
              />
            </SimpleGrid>
          </VStack>
          <Flex mt={["6","8"]} justify="flex-end" >
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>  
    </Box>
  )
}