import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components';

import { 
  Container,
  Header,
  Title,
  Content,
} from './styles';
import { TTransactions } from '../Dashboard';
import { categories } from '../../utils/categories';

type TCategoryData = {
  key: string;
  name: string;
  total: string;
  color: string;
};

export const Resume = () => {
  const [totalByCategories, setTotalByCategories] = useState<TCategoryData[]>([]);

  const loadData = async () => {
    const dataKey = '@gofinances:transactions';
    const transactions = await AsyncStorage.getItem(dataKey);
    const currentTransactions = transactions ? JSON.parse(transactions) : [];

    const expensives = currentTransactions.filter((transaction: TTransactions)=> transaction.type === 'negative');

    const totalByCategory: TCategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TTransactions)=> {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map(categorie => (
          <HistoryCard 
            key={categorie.key}
            title={categorie.name}
            amount={categorie.total}
            color={categorie.color}
          />
        ))}
      </Content>
    </Container>
  )
};