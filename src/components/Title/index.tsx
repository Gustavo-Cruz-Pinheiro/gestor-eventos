import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext'; // Importe o contexto de usuário
import { AiOutlinePoweroff } from 'react-icons/ai'; // Importe o ícone de power
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import './style.css';

interface SubHeaderProps {
    subPageName: string;
}

export const Title: React.FC<SubHeaderProps> = ({ subPageName }) => {
    const { email, deslogar } = useContext(UserContext); // Acesse os estados e funções do contexto de usuário
    const navigate = useNavigate(); // Inicialize o hook useNavigate

    const userEmail = localStorage.getItem('@userData') ? JSON.parse(localStorage.getItem('@userData')!).email : '';

    const handleLogout = () => {
        deslogar(); // Chama o método deslogar do contexto de usuário
        navigate('/home'); // Navega para a rota /home após o logout
    };

    return (
        <header className="bg-dark text-white d-flex align-items-center" style={{ height: '50px', width: '100%', position: 'fixed', top: 0, left: 0, margin: '50px 75px' }}>
            <h3 style={{ margin: '10px' }}>{subPageName}</h3>
            <div className="ms-auto me-3">
                {userEmail ? (
                    <div className="d-flex align-items-center usuario-info">
                        <p className="mb-0 me-2">{userEmail}</p> {/* Exibe o email do usuário */}
                        <Button variant="outline-light" onClick={handleLogout}>
                            <AiOutlinePoweroff size={20} /> {/* Ícone de power */}
                            <span className="ms-2">Logout</span> {/* Texto do botão */}
                        </Button>
                    </div>
                ) : (
                    <p className="usuario-info">Usuário não logado</p>
                )}
            </div>
        </header>
    );
};

export default Title;
