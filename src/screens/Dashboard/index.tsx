import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HighlightCard, Loading, TransactionCard } from '../../components';

import { 
  Container, 
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from './styles';

import { TTransactionCard } from '../../components/TransactionCard';

import { useAuth } from '../../hooks/auth';

export type TTransactions = TTransactionCard & {
  id: string;
};

type THighlightProps = {
  amount: string;
  lastTransaction: string;
};

type THighlightData = {
  entries: THighlightProps;
  expensives: THighlightProps;
  total: THighlightProps;
};

export const Dashboard = () => {
  const [transactions, setTransactions] = useState<TTransactions[]>([]);
  const [highlightData, setHighlightData] = useState<THighlightData>({} as THighlightData);
  const [isLoading, setIsLoading] = useState(true);

  const { user, signOut } = useAuth();

  const getLastTransactionDate = (collection: TTransactions[], type: 'positive' | 'negative') => {
    const collectionFiltered = collection.filter(transaction => transaction.type === type)

    if (collectionFiltered.length === 0) return 0;
    
    const lastTransaction = new Date(Math.max.apply(Math, collectionFiltered
      .map(transaction => new Date(transaction.date).getTime()) 
    ));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  };
  
  const loadTransactions = async () => {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const _transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: TTransactions[] = _transactions.map((item: TTransactions) => {
      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      };
    });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(_transactions, 'positive');
    const lastTransactionExpensives = getLastTransactionDate(_transactions, 'negative');
    
    const totalInterval = lastTransactionExpensives === 0
      ? 'N??o h?? transa????es' 
      : `01 a ${lastTransactionExpensives}`;

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries === 0 
          ? 'N??o h?? transa????es' 
          : `??ltima entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpensives === 0 
          ? 'N??o h?? transa????es'
          : `??ltima sa??da dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  if (isLoading) return <Loading />

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{ uri: user.photo }}
            />
            <User>
              <UserGreeting>Ol??,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>
          
          <LogoutButton onPress={signOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard 
          title="Entradas"
          amount={highlightData.entries.amount}
          lastTransaction={highlightData.entries.lastTransaction}
          type="up"
        />

        <HighlightCard 
          title="Sa??das"
          amount={highlightData.expensives.amount}
          lastTransaction={highlightData.expensives.lastTransaction}
          type="down"
        />

        <HighlightCard 
          title="Total"
          amount={highlightData.total.amount}
          lastTransaction={highlightData.total.lastTransaction}
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title> 

        <TransactionList 
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};