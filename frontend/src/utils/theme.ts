import { DefaultTheme } from 'react-native-paper';

export const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
    surface: '#ffffff',
    error: '#B00020',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#9e9e9e',
    placeholder: '#9e9e9e',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#f50057',
  },
  roundness: 4,
};

export const taskColors: Record<string, string> = {
  high: '#ff5252',
  medium: '#ffab40',
  low: '#69f0ae',
  completed: '#e0e0e0',
};
