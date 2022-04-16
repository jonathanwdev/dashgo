import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../context/SidebarDrawerContext';
import HeaderLogo from './Logo';
import HeaderNotificationsNav from './NotificationNav';
import HeaderProfile from './Profile';
import HeaderSearchBox from './SearchBox';

const Header = () => {
  const { onOpen }  = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex 
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="open-navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
          alignItems="center"
          display="flex"
        >
        </IconButton>
      )}
      <HeaderLogo />
      {isWideVersion && (<HeaderSearchBox />)}
      <Flex
        align="center"
        ml="auto"
      >
        <HeaderNotificationsNav />
        <HeaderProfile  showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}

export default Header;