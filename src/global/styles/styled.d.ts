import 'styled-components';
import { theme } from './theme';

declare module 'styled-components' {
  type TTheme = typeof theme

  export interface DefaultTheme extends TTheme {}
}