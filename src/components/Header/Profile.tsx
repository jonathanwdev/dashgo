import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

type HeaderProfileProps = {
  showProfileData?: boolean;
}

export default function HeaderProfile({ showProfileData = true }:HeaderProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Diego Fernandes</Text>
          <Text 
            color="green.300" 
            fontSize="small"
          >
            Diego@rocketseat.com
          </Text>
        </Box>
      )}
      <Avatar  size="md" name="Diego Fernandes" />
    </Flex>
  )
}