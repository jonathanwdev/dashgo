import { Icon, Link as ChackraLink, Text, LinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
import { useRouter } from "next/router";

import Link from 'next/link';


type SidebarNavLinkProps = {
  children: string;
  href: string;
  icon: ElementType;
} & LinkProps;

export default function SidebarNavLink({ children,  href, icon,  ...props}: SidebarNavLinkProps) {
  const { asPath } = useRouter();
  return (
    <Link href={href} passHref>
      <ChackraLink display="flex" alignItems="center" color={asPath === href ? "pink.400" : "white"} {...props} >
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChackraLink>
    </Link>
  );
}