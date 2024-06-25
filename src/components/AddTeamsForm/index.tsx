import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface AddTeamsFormProps {
    onSaveTeams: (teams: string[]) => void;
}

const AddTeamsForm: React.FC<AddTeamsFormProps> = ({ onSaveTeams }) => {
    const [teams, setTeams] = useState('');
    const [error, setError] = useState('');

    const handleSaveTeams = () => {
        const teamList = teams.split('\n').map(team => team.trim()).filter(team => team !== '');

        if (teamList.some(team => team === '')) {
            setError('Não é permitido cadastrar linhas vazias.');
            return;
        }

        if (teamList.length < 2) {
            setError('É necessário cadastrar no mínimo 2 times.');
            return;
        }

        if (teamList.length > 32) {
            setError('Não é permitido cadastrar mais do que 32 times.');
            return;
        }

        const uniqueTeams = Array.from(new Set(teamList));
        if (uniqueTeams.length !== teamList.length) {
            setError('Não é permitido cadastrar times duplicados.');
            return;
        }

        onSaveTeams(uniqueTeams);

        setTeams('');
        setError('');
    };

    return (
        <>
            <Form>
                <Form.Group controlId="teams">
                    <Form.Label>Times</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={teams}
                        onChange={(e) => setTeams(e.target.value)}
                        placeholder="Digite cada time em uma nova linha"
                    />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <Button variant="success" onClick={handleSaveTeams} className="mt-3">
                    Salvar Times e Iniciar Sorteio
                </Button>
            </Form>
        </>
    );
};

export { AddTeamsForm };
