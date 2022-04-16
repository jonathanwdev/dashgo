import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Input as InputText, InputProps as ChakraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

type InputProps = {
  name: string;
  label?:string;
  error?: FieldError;
} & ChakraInputProps;

const Input:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...props } , ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputText
        name={name}
        id={name} 
        autoComplete="off"
        focusBorderColor="pink.500" 
        bgColor="gray.900" 
        variant="filled"
        size="lg"
        ref={ref}
        _hover={{
          bgColor: 'gray.900'
        }}
        {...props}
      />
      {!!error && (
        <FormErrorMessage>
          {error.message}  
        </FormErrorMessage>
      )}
    </FormControl>
  )
}

export default forwardRef(Input);