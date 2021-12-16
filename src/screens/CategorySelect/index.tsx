import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';

import { Button } from '../../components';
import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles';


type TCategory = {
  key: string;
  name: string;
};

type TProps = {
  category: string;
  setCategory: (category: TCategory) => void;
  closeSelectCategory: () => void;
};

export const CategorySelect = (props: TProps) => {
  const { category, setCategory, closeSelectCategory } = props;

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList 
        data={categories} 
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />

      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  )
};