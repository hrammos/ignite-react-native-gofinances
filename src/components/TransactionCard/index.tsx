import React from 'react';

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

type TCategory = {
  name: string;
  icon: string;
};

type TData = {
  title: string;
  amount: string;
  category: TCategory;
  date: string;
  type: 'positive' | 'negative';
}

type TProps = {
  data: TData
};

export const TransactionCard = (props: TProps) => {
  const { data } = props;

  return (
    <Container>
      <Title>
        {data.title}
      </Title>

      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>
            {data.category.name}
          </CategoryName>
        </Category>
        <Date>
          {data.date}
        </Date>
      </Footer>
    </Container>
  )
};