import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';

import { useMoneyTracker } from '../../app';
import { getAllMonths } from '../utils';

export const Compare = () => {
  const { data, getMonthlyData } = useMoneyTracker();
  const months = getAllMonths({ locale: 'uk' });
  const [firstMonth, setFirstMonth] = useState<string>('');
  const [secondMonth, setSecondMonth] = useState<string>('');
  const [percent, setPercent] = useState<number | null>(null);

  const removeInputsValue = () => {
    setFirstMonth('');
    setSecondMonth('');
  };

  useEffect(() => {
    if (firstMonth && secondMonth) {
      const firstMonthTotalPrice = getMonthlyData(data, firstMonth).reduce(
        (total, current) => total + +current.price,
        0
      );
      const secondMonthTotalPrice = getMonthlyData(data, secondMonth).reduce(
        (total, current) => total + +current.price,
        0
      );
      if (firstMonthTotalPrice && secondMonthTotalPrice) {
        const percentValue = (
          (secondMonthTotalPrice * 100) / firstMonthTotalPrice -
          100
        ).toFixed(1);
        setPercent(+percentValue);
      } else {
        setPercent(null);
      }
    }
  }, [data, firstMonth, getMonthlyData, secondMonth]);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Зрівняти прибутки/витрати за місяцями</Heading>
      </CardHeader>

      <CardBody>
        <HStack>
          <Box>
            <FormControl>
              <FormLabel>Перший місяць</FormLabel>
              <Input
                value={firstMonth}
                onChange={(e) => setFirstMonth(e.target.value)}
                type="month"
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormLabel>Інший місяць</FormLabel>
              <Input
                value={secondMonth}
                onChange={(e) => setSecondMonth(e.target.value)}
                type="month"
              />
            </FormControl>
          </Box>
          <Box>
            <Button
              colorScheme="teal"
              variant="ghost"
              onClick={removeInputsValue}
            >
              Видалити сортування
            </Button>
          </Box>
        </HStack>
        <Box>
          {firstMonth && secondMonth && percent && (
            <Box>
              Відносно{' '}
              <Text fontWeight={600}>
                {months[Number(firstMonth.split('-')[1]) - 1]}{' '}
                {firstMonth.split('-')[0]} року
              </Text>{' '}
              ви збільшили {percent < 0 ? 'витрати' : 'добуток'} на{' '}
              {Math.abs(percent)}% ніж у{' '}
              <Text fontWeight={600}>
                {months[Number(secondMonth.split('-')[1]) - 1]}{' '}
                {secondMonth.split('-')[0]} році
              </Text>
            </Box>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};
