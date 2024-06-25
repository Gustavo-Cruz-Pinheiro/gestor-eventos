import { render } from '@testing-library/react';
import { AddTeamsForm } from './index';
import userEvent from '@testing-library/user-event';

describe('no formulário AddTeamsForm', () => {
    const mockOnSaveTeams = jest.fn();

    test('ao clicar no botão com entradas válidas, deve chamar a função onSaveTeams', async () => {
        // ARRANGE
        const { getByPlaceholderText, getByText } = render(<AddTeamsForm onSaveTeams={mockOnSaveTeams} />);

        const textarea = getByPlaceholderText('Digite cada time em uma nova linha');
        const botaoSalvar = getByText('Salvar Times e Iniciar Sorteio');

        // ACT
        await userEvent.type(textarea, 'Team1\nTeam2');
        await userEvent.click(botaoSalvar);

        // ASSERT
        expect(mockOnSaveTeams).toHaveBeenCalledWith(['Team1', 'Team2']);
    });

    test('após salvar times corretamente, deve limpar o campo de entrada e não exibir erros', async () => {
        // ARRANGE
        const { getByPlaceholderText, getByText, queryByText } = render(<AddTeamsForm onSaveTeams={mockOnSaveTeams} />);

        const textarea = getByPlaceholderText('Digite cada time em uma nova linha');
        const botaoSalvar = getByText('Salvar Times e Iniciar Sorteio');

        // ACT
        await userEvent.type(textarea, 'Team1\nTeam2');
        await userEvent.click(botaoSalvar);

        // ASSERT
        expect(textarea).toHaveValue('');
        expect(queryByText('Não é permitido cadastrar linhas vazias.')).not.toBeInTheDocument();
        expect(queryByText('É necessário cadastrar no mínimo 2 times.')).not.toBeInTheDocument();
        expect(queryByText('Não é permitido cadastrar mais do que 32 times.')).not.toBeInTheDocument();
        expect(queryByText('Não é permitido cadastrar times duplicados.')).not.toBeInTheDocument();
    });
});
