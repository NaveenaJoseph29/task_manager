import { StyleSheet } from 'react-native';
import { appTheme } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: appTheme.colors.background,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
  },
  errorText: {
    color: appTheme.colors.error,
    marginBottom: 8,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: appTheme.colors.primary,
  },
});