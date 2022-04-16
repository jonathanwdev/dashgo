import { Flex, Button, Stack, Text  } from '@chakra-ui/react';
import InputText from '../components/common/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInFormSchema } from '../validators/YupValidators';

type SignInHandlerData = {
  email: string;
  password:string;
}

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SignInHandlerData> = (e) => {
    console.log('** submit', e)
  };


  return (
    <Flex
      align="center"
      justify="center"
      w="100vw"
      h="100vh"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <InputText 
            label="E-mail"
            name="email" 
            type="email" 
            error={formState.errors.email}
            {...register('email')}
          />
          <InputText 
            label="Senha"
            name="password" 
            type="password" 
            error={formState.errors.password}
            {...register('password')}
          />
        </Stack>
        <Button isLoading={formState.isSubmitting} type="submit" mt="6" colorScheme="pink" size="lg" >Entrar</Button>
      </Flex>
    </Flex>
  )
}
