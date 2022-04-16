import * as Yup from 'yup';


export const signInFormSchema = Yup.object().shape({
  email: Yup.string().required('E-mail obrigatório !').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatória !'),
})

export const signUpFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório !'),
  email: Yup.string().required('E-mail obrigatório !').email('E-mail inválido'),
  password: Yup.string().required('Senha obrigatória !').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: Yup.string().oneOf([null, Yup.ref('password')], 'As senhas precisam ser iguais')
})