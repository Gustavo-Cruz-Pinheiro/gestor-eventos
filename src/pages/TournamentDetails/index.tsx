import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConnection';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Spinner, Button, Modal, Form } from 'react-bootstrap';
import './style.css';
import { Title } from '../../components/Title';
import { AddTeamsForm } from '../../components/AddTeamsForm';
import ToastSuccess from '../../components/ToastSuccess';
import ToastError from '../../components/ToastError';

interface Tournament {
    name: string;
    game: string;
    status: 'pending' | 'sort' | 'in-progress' | 'completed';
    description: string;
    teams?: string[];
    champion?: string;
    bracket?: string[];
}

export const TournamentDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [loading, setLoading] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [championName, setChampionName] = useState('');

    useEffect(() => {
        const fetchTournament = async () => {
            if (id) {
                const docRef = doc(db, 'tournaments', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as Tournament;
                    setTournament({
                        ...data,
                        teams: data.teams || [],
                        bracket: data.bracket || [],
                    });
                }
            }
            setLoading(false);
        };

        fetchTournament();
    }, [id]);

    const handleSaveTeams = async (teams: string[]) => {
        if (!id || !tournament) return;

        try {
            const docRef = doc(db, 'tournaments', id);
            await updateDoc(docRef, { teams: teams, status: 'sort' });
            setTournament(prevState => ({
                ...prevState!,
                teams: teams,
                status: 'sort',
            }));
            setShowToast(true);
            setToastMessage('Times cadastrados com sucesso!');
            setToastVariant('success');
        } catch (error) {
            console.error('Erro ao salvar os times: ', error);
            setShowToast(true);
            setToastMessage('Erro ao salvar os times. Tente novamente.');
            setToastVariant('danger');
        }
    };

    const handleGenerateBracket = async () => {
        if (!id || !tournament || !tournament.teams) return;

        let shuffledTeams = [...tournament.teams].sort(() => 0.5 - Math.random());
        if (shuffledTeams.length % 2 !== 0) {
            shuffledTeams.push('W.O.');
        }

        const bracket: string[] = [];
        for (let i = 0; i < shuffledTeams.length; i += 2) {
            bracket.push(`${shuffledTeams[i]} vs ${shuffledTeams[i + 1]}`);
        }

        try {
            const docRef = doc(db, 'tournaments', id);
            await updateDoc(docRef, { bracket: bracket, status: 'in-progress' });
            setTournament(prevState => ({
                ...prevState!,
                bracket: bracket,
                status: 'in-progress',
            }));
            setShowToast(true);
            setToastMessage('Chaveamento gerado com sucesso!');
            setToastVariant('success');
        } catch (error) {
            console.error('Erro ao gerar o chaveamento: ', error);
            setShowToast(true);
            setToastMessage('Erro ao gerar o chaveamento. Tente novamente.');
            setToastVariant('danger');
        }
    };

    const handleSetChampion = async () => {
        if (!championName || !id || !tournament) return;

        try {
            const docRef = doc(db, 'tournaments', id);
            await updateDoc(docRef, { champion: championName, status: 'completed' });
            setTournament(prevState => ({
                ...prevState!,
                champion: championName,
                status: 'completed',
            }));
            setShowToast(true);
            setToastMessage('Campeão indicado com sucesso!');
            setToastVariant('success');
        } catch (error) {
            console.error('Erro ao indicar o campeão: ', error);
            setShowToast(true);
            setToastMessage('Erro ao indicar o campeão. Tente novamente.');
            setToastVariant('danger');
        }
    };

    const handleDeleteTournament = async () => {
        if (!id) return;

        try {
            const docRef = doc(db, 'tournaments', id);
            await deleteDoc(docRef);
            setShowToast(true);
            setToastMessage('Torneio excluído com sucesso.');
            setToastVariant('success');
            setShowDeleteModal(false);
            navigate('/torneios');
        } catch (error) {
            console.error('Erro ao excluir o torneio: ', error);
            setShowToast(true);
            setToastMessage('Erro ao excluir o torneio. Tente novamente.');
            setToastVariant('danger');
        }
    };

    const handleToastClose = () => setShowToast(false);

    const getStatusTranslation = (status: 'pending' | 'sort' | 'in-progress' | 'completed'): string => {
        switch (status) {
            case 'pending':
                return 'Pendente';
            case 'sort':
                return 'Sorteio';
            case 'in-progress':
                return 'Em Progresso';
            case 'completed':
                return 'Completo';
            default:
                return '';
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </div>
        );
    }

    if (!tournament) {
        return <div>Torneio não encontrado</div>;
    }

    return (
        <div className="tournament-details">
            <Title subPageName="Detalhes do Torneio" />
            <h2>{tournament.name}</h2>
            <p><strong>Jogo:</strong> {tournament.game}</p>
            <p><strong>Status:</strong> {getStatusTranslation(tournament.status)}</p>
            <p><strong>Descrição:</strong> {tournament.description}</p>
            <hr />
            {tournament.status === 'pending' && (
                <>
                    {tournament.teams && tournament.teams.length === 0 && (
                        <>
                            <h3>Adicionar Times</h3>
                            <AddTeamsForm onSaveTeams={handleSaveTeams} />
                        </>
                    )}
                </>
            )}
            {tournament.status === 'sort' && tournament.teams && tournament.teams.length > 0 && (
                <>
                    <h3>Times Inscritos</h3>
                    <ul>
                        {tournament.teams.map((team, index) => (
                            <li key={index}>{team}</li>
                        ))}
                    </ul>
                    <div className="text-center mt-4">
                        <Button variant="success" onClick={handleGenerateBracket}>Gerar Chaveamento</Button>
                    </div>
                </>
            )}
            {tournament.status === 'in-progress' && (
                <>
                    <h3>Chaveamento</h3>
                    <ul>
                        {tournament.bracket && tournament.bracket.map((match, index) => (
                            <li key={index}>{match}</li>
                        ))}
                    </ul>
                    <h3>Campeão do Torneio</h3>
                    {tournament.champion ? (
                        <p>O campeão do torneio é: {tournament.champion}</p>
                    ) : (
                        <>
                            <p>Nenhum campeão indicado ainda.</p>
                            <Form>
                                <Form.Group controlId="championName">
                                    <Form.Label>Indicar Campeão</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={championName}
                                        onChange={(e) => setChampionName(e.target.value)}
                                    >
                                        <option value="">Selecione o Campeão</option>
                                        {tournament.teams?.map((team, index) => (
                                            <option key={index} value={team}>{team}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={handleSetChampion}>Indicar Campeão</Button>
                            </Form>
                        </>
                    )}
                </>
            )}
            {tournament.status === 'completed' && (
                <>
                    <h3>Chaveamento Final</h3>
                    <ul>
                        {tournament.bracket && tournament.bracket.map((match, index) => (
                            <li key={index}>{match}</li>
                        ))}
                    </ul>
                    <h3>Campeão do Torneio</h3>
                    {tournament.champion ? (
                        <p>O campeão do torneio é: {tournament.champion}</p>
                    ) : (
                        <p>Nenhum campeão indicado.</p>
                    )}
                </>
            )}
            <div className="text-center mt-4">
                <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Excluir Torneio</Button>
            </div>
            <Modal show={showDeleteModal} className='dark' onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir o torneio <strong>{tournament.name}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDeleteTournament}>Excluir</Button>
                </Modal.Footer>
            </Modal>
            <ToastSuccess
                show={showToast && toastVariant === 'success'}
                message={toastMessage}
                onClose={handleToastClose}
            />
            <ToastError
                show={showToast && toastVariant === 'danger'}
                message={toastMessage}
                onClose={handleToastClose}
            />
        </div>
    );
};
