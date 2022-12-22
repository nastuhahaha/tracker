import { useEffect, useState } from 'react';
import { BsFillTrashFill } from 'react-icons/all';

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

import { useMoneyTracker } from '../../app';
import { TMoneyTrackerData } from '../types';

import { Chart } from './chart';

export const Home = () => {
  const { data, getMonthlyData, removeData } = useMoneyTracker();
  const [yearAndMonth, setYearAndMonth] = useState('');
  const [category, setCategory] = useState('all');
  const [sortedData, setSortedData] = useState<TMoneyTrackerData[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const removeSort = () => {
    setYearAndMonth('');
    setCategory('all');
    setSortedData(data);
  };

  useEffect(() => {
    if (yearAndMonth.length > 0) {
      setSortedData(() =>
        getMonthlyData(
          category === 'all'
            ? data
            : data.filter((o) => o.category === category),
          yearAndMonth
        )
      );
    } else {
      setSortedData(
        category === 'all' ? data : data.filter((o) => o.category === category)
      );
    }
  }, [yearAndMonth, category, data, getMonthlyData]);

  useEffect(() => {
    setTotalPrice(
      sortedData.reduce((total, current) => total + Number(current.price), 0)
    );
  }, [sortedData]);

  return (
    <Card p={4}>
      <CardHeader pl={0}>
        <Text fontSize="xl" fontWeight="bold">
          Загальна сума витрат/прибутку
          <Badge ml="1" fontSize="0.8em" colorScheme="green">
            {totalPrice}₴
          </Badge>
        </Text>
      </CardHeader>
      <Flex>
        <Input
          maxW={260}
          value={yearAndMonth}
          onChange={(e) => setYearAndMonth(e.target.value)}
          type="month"
        />
        <Select
          maxW={260}
          mx={4}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Усі</option>
          <option value="clothes">Одяг</option>
          <option value="transport">Транспорт</option>
          <option value="food">Їжа</option>
          <option value="services">Послуги</option>
          <option value="other">Інше</option>
        </Select>
        <Button colorScheme="teal" variant="outline" onClick={removeSort}>
          Cкинути фільтри
        </Button>
      </Flex>
      <Box m="20px 0">
        {sortedData.length > 0 && <Chart sortedData={sortedData} />}
      </Box>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4" maxW={500}>
          {sortedData.map((o) => (
            <HStack alignItems="center">
              <Heading size="sm" w="70%" textTransform="uppercase">
                {o.title}
              </Heading>
              <Flex
                p={3}
                w="100%"
                justifyContent="space-between"
                align="center"
              >
                <Badge ml="1" colorScheme="purple">
                  {o.category}
                </Badge>
                <Text pt="2" fontSize="sm">
                  <Badge colorScheme="purple">{o.price}₴</Badge>
                  <Text>{o.date}</Text>
                </Text>
              </Flex>
              <Flex w="10%">
                <IconButton
                  colorScheme="red"
                  variant="outline"
                  onClick={() => removeData(o.id)}
                  icon={<BsFillTrashFill />}
                  aria-label=""
                />
              </Flex>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
