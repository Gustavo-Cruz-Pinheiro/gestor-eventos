import { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';

export const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redireciona para a página inicial após o login
        } catch (error) {
            setError('Usuário ou senha incorretos.');
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className='tournament-form'>
            <Title subPageName="Torneios" />
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%' }}
                    />
                </Form.Group>

                {error && <p className="text-danger">{error}</p>}

                <div className="text-center mt-5">
                    <Button type="submit" variant="success">
                        Entrar
                    </Button>
                </div>
            </Form>
        </div>
    );
};
