import React, { useState } from 'react';
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import './style.css';

interface TournamentFormProps {
  onSubmit: (formData: TournamentFormData) => void;
}

interface TournamentFormData {
  name: string;
  description: string;
  game: string;
  status: string;
}

export const TournamentForm: React.FC<TournamentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TournamentFormData>({
    name: '',
    description: '',
    game: '',
    status: 'pending',
  });

  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await saveTournament(formData);
      onSubmit(formData);
    }
    setValidated(true);
  };

  const saveTournament = async (tournamentData: TournamentFormData) => {
    try {
      await addDoc(collection(db, 'tournaments'), {
        ...tournamentData,
        createdAt: new Date(),
      });
      setToastVariant('success');
      setToastMessage('Torneio salvo com sucesso!');
      setShowToast(true);
      setTimeout(() => {
        navigate('/torneios');
      }, 3000);
    } catch (error) {
      console.log('Erro ao salvar torneio!', error);
      setToastVariant('danger');
      setToastMessage('Erro ao salvar torneio!');
      setShowToast(true);
    }
  };

  return (
    <div className='tournament-form'>
      <Button
        variant="dark"
        className="back-button"
        onClick={() => navigate('/torneios')}
      >
        <BsArrowLeft size={20} />
      </Button>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h3>Informações Básicas</h3>
        <Form.Group controlId="formTournamentName" className="mb-3">
          <Form.Label>Nome do torneio</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome do torneio"
          />
          <Form.Control.Feedback type="invalid">
            Por favor, preencha o nome do torneio.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formTournamentDescription" className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            required
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite a descrição do torneio"
          />
          <Form.Control.Feedback type="invalid">
            Por favor, preencha a descrição do torneio.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formTournamentGame" className="mb-3">
          <Form.Label>Jogo</Form.Label>
          <Form.Control
            required
            type="text"
            name="game"
            value={formData.game}
            onChange={handleChange}
            placeholder="Digite o nome do jogo"
          />
          <Form.Control.Feedback type="invalid">
            Por favor, preencha o nome do jogo.
          </Form.Control.Feedback>
        </Form.Group>
        {/* Campo oculto de status */}
        <Form.Control type="hidden" name="status" value="pending" />

        <div className="text-end">
          <Button type="submit" variant="success">Salvar e Continuar</Button>
        </div>
      </Form>

      <ToastContainer position="middle-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">{toastVariant === 'success' ? 'Sucesso' : 'Erro'}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
