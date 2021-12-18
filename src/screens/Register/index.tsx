import React, { useState } from 'react';
import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Alert
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

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
}

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

  const { 
    control, 
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleTransactionTypeSelect = (type: 'up' | 'down') => {
    setTransactionType(type);
  };

  const handleOpenCategorySelectModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategorySelectModal = () => {
    setCategoryModalOpen(false);
  };

  const handleRegister = (form: TFormData) => {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação');
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name,
    };

    console.log(data);
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
              onPress={() => handleTransactionTypeSelect('up')}
              title="Entrada" 
              type="up"
              isActive={transactionType === 'up'}
            />

            <TransactionTypeButton 
              onPress={() => handleTransactionTypeSelect('down')}
              title="Saída" 
              type="down" 
              isActive={transactionType === 'down'}
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