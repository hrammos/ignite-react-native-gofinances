import React, { FC } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import { Button, ImageContainer, Text } from './styles';

interface IProps extends RectButtonProps {
  title: string;
  svg: FC<SvgProps>
};

export const SignInSocialButton = (props: IProps) => {
  const { title, svg: Svg, ...rest } = props;

  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      
      <Text>{title}</Text>
    </Button>
  )
};