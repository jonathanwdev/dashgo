import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiContactsBookLine, RiDashboardLine} from "react-icons/ri";

type SidebarNavSectionProps = {
  title: string;
  children: ReactNode;
}

export default function SidebarNavSection({ title, children}: SidebarNavSectionProps) {
  return (
    <Box>
    <Text fontWeight="bold" color="gray.400" fontSize="small">{title}</Text>
    <Stack spacing="4" mt="8" align="stretch">
      {children}
    </Stack>
  </Box>
  );
}