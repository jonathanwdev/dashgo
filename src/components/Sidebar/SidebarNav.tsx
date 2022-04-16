import { Stack } from "@chakra-ui/react";
import SidebarNavLink from "./NavLink";
import SidebarNavSection from "./NavSection";
import { RiContactsBookLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";

export default function SidebarNav() {

  return (
    <Stack spacing="12" align="flex-start"   >
      <SidebarNavSection title="GERAL">
        <SidebarNavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </SidebarNavLink>
        <SidebarNavLink href="/users" icon={RiContactsBookLine}>
          Usuarios
        </SidebarNavLink>
      </SidebarNavSection>
      <SidebarNavSection title="AUTOMAÇÃO">
        <SidebarNavLink href="/users/create" icon={RiInputMethodLine}>
          Formulários
        </SidebarNavLink>
        <SidebarNavLink href="/automation" icon={RiGitMergeLine}>
          Automação
        </SidebarNavLink>
      </SidebarNavSection>
    </Stack>
  )
}