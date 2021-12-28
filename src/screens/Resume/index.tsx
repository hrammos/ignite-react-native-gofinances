import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

import { HistoryCard } from '../../components';

import { 
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
} from './styles';
import { TTransactions } from '../Dashboard';
import { categories } from '../../utils/categories';


type TCategoryData = {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
};

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<TCategoryData[]>([]);

  const { colors } = useTheme();

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const transactions = await AsyncStorage.getItem(dataKey);
    const currentTransactions = transactions ? JSON.parse(transactions) : [];

    const expensives = currentTransactions.filter((transaction: TTransactions)=> transaction.type === 'negative');

    const expensivesTotal = expensives.reduce((accumulator: number, expensive: TTransactions) => {
      return accumulator + Number(expensive.amount);
    }, 0);

    const totalByCategory: TCategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TTransactions)=> {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          <VictoryPie 
            data={totalByCategories}
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: { 
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: colors.shape,
              }
            }}
            labelRadius={50}
            x="percent"
            y="total"
          />
        </ChartContainer>

        {totalByCategories.map(categorie => (
          <HistoryCard 
            key={categorie.key}
            title={categorie.name}
            amount={categorie.totalFormatted}
            color={categorie.color}
          />
        ))}
      </Content>
    </Container>
  )
};