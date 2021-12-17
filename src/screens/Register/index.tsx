import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form'

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

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const { control, handleSubmit } = useForm();

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
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.name,
    };

    console.log(data);
  };

  return (
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
          />
          
          <InputForm 
            placeholder="Preço"
            name="amount"
            control={control}
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
  )
}