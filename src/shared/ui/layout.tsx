import { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Box
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
  >
    {children}
  </Box>
);

export const Layout = ({ children }: PropsWithChildren) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Badge ml="1" fontSize="1.2em" colorScheme="blue">
            Money Tracker
          </Badge>
          <Flex alignItems="center">
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink>
                <Link to="/">Головна</Link>
              </NavLink>
              <NavLink>
                <Link to="/add-expense-income">Додати прибуток/витрату</Link>
              </NavLink>
              <NavLink>
                <Link to="/compare-expense-income-by-month">
                  Зрівняти прибутки/витрати за місяцями
                </Link>
              </NavLink>
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              <NavLink>
                <Link to="/">Головна</Link>
              </NavLink>
              <NavLink>
                <Link to="/add-expense-income">Додати прибуток/витрату</Link>
              </NavLink>
              <NavLink>
                <Link to="/compare-expense-income-by-month">
                  Зрівняти прибутки/витрати за місяцями
                </Link>
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>{children}</Box>
    </>
  );
};
