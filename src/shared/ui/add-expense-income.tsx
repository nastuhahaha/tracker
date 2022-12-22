import { useState } from 'react';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import { useMoneyTracker } from '../../app';
import { TFormData } from '../types';

export const AddExpenseIncome = () => {
  const { addData } = useMoneyTracker();
  const toast = useToast();
  const [formData, setFormData] = useState<TFormData>({
    title: '',
    price: '',
    category: 'clothes',
    date: '',
  });

  const addDataHandler = (type: string) => {
    if (
      formData.title.length === 0 ||
      String(formData.price).length === 0 ||
      formData.date.length === 0
    )
      toast({
        title: 'Будь ласка, заповніть форму дійсною інформацією',
        description:
          'Опис має складатися щонайменше з 1 символу\nЦіна повина бути більша за нуль\nДата повина бути вибрана',
        status: 'error',
        duration: 2000,
        position: 'bottom-right',
        isClosable: true,
      });
    else {
      addData(type, {
        ...formData,
        id: Math.floor(Math.random() * Date.now()),
      });
      setFormData({
        title: '',
        price: '',
        category: 'clothes',
        date: '',
      });
    }
  };

  return (
    <Flex
      minH="80vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} m="0 auto" w={400}>
        <Stack align="center">
          <Text fontSize="lg" color="gray.600">
            Додати прибуток/витрату ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <Flex direction="column">
              <Flex>
                <FormControl>
                  <FormLabel>Заголовок</FormLabel>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    type="text"
                    placeholder="title"
                  />
                </FormControl>
              </Flex>
              <Flex mt={3}>
                <FormControl>
                  <FormLabel>Ціна</FormLabel>
                  <Input
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    type="number"
                    placeholder="price"
                  />
                </FormControl>
              </Flex>
              <Flex mt={3}>
                <FormControl>
                  <FormLabel>Дата</FormLabel>
                  <Input
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    type="date"
                  />
                </FormControl>
              </Flex>
              <Flex mt={3}>
                <FormControl>
                  <FormLabel>Категорія</FormLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="clothes">Одяг</option>
                    <option value="transport">Транспорт</option>
                    <option value="food">Їжа</option>
                    <option value="services">Послуги</option>
                    <option value="other">Інше</option>
                  </Select>
                </FormControl>
              </Flex>
            </Flex>
            <Stack spacing={6} direction={['column', 'row']}>
              <Button
                bg="cyan.400"
                color="white"
                onClick={() => addDataHandler('income')}
                w="full"
                _hover={{
                  bg: 'cyan.500',
                }}
              >
                Додати прибуток
              </Button>
              <Button
                onClick={() => addDataHandler('expense')}
                bg="blue.400"
                color="white"
                w="full"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Додати витрату
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
