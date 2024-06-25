import { render, screen, fireEvent } from '@testing-library/react';
import { Settings } from './index';

beforeEach(() => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'lightTheme') {
      return 'true';
    }
    return null;
  });

  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Settings', () => {
  test('deve renderizar o switch de tema', () => {
    render(<Settings />);
    const themeSwitch = screen.getByLabelText('Tema Claro');
    expect(themeSwitch).toBeInTheDocument();
  });

  test('deve refletir o valor do localStorage no estado inicial', () => {
    render(<Settings />);
    const themeSwitch = screen.getByLabelText('Tema Claro');
    expect(themeSwitch).toBeChecked();
  });

  test('deve mudar o estado do switch quando clicado', () => {
    render(<Settings />);
    const themeSwitch = screen.getByLabelText('Tema Claro');
    fireEvent.click(themeSwitch);
    expect(themeSwitch).not.toBeChecked();
  });

  test('deve atualizar o localStorage quando o switch é alternado', () => {
    render(<Settings />);
    const themeSwitch = screen.getByLabelText('Tema Claro');
    fireEvent.click(themeSwitch);
    expect(localStorage.setItem).toHaveBeenCalledWith('lightTheme', 'false');
  });
});
