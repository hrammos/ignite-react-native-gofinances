import React, { useState } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';

import { CategorySelect } from '../../screens';

import { 
  InputForm, 
  Button, 
  TransactionTypeButton,
  CategorySelectButton
} from '../../components';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

type TFormData = {
  name: string;
  amount: string;
};

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('O nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { user } = useAuth();
  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const { 
    control, 
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  };

  const handleOpenCategorySelectModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategorySelectModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = async (form: TFormData) => {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    };

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const transactions = await AsyncStorage.getItem(dataKey);
      const currentTransactions = transactions ? JSON.parse(transactions) : [];

      const dataFormatted = [
        ...currentTransactions,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria',
      });

      navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            placeholder="Nome" 
            name="name"
            control={control}
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          
          <InputForm 
            placeholder="Preço"
            name="amount"
            control={control}
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />

          <TransactionsTypes>
            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelect('positive')}
              title="Entrada" 
              type="up"
              isActive={transactionType === 'positive'}
            />

            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelect('negative')}
              title="Saída" 
              type="down" 
              isActive={transactionType === 'negative'}
            />
          </TransactionsTypes>

          <CategorySelectButton 
            title={category.name} 
            onPress={handleOpenCategorySelectModal}
          />
        </Fields>

        <Button 
          title="Enviar" 
          onPress={handleSubmit(handleRegister)} 
        />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategorySelectModal}
        />
      </Modal>
    </Container>

    </TouchableWithoutFeedback>
  )
}