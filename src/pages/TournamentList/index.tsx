import React, { useState, useEffect } from 'react';
import { Nav, ListGroup, Badge, Spinner, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Title } from '../../components/Title';
import { db } from '../../services/firebaseConnection';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { BsSearch } from 'react-icons/bs'; // Importe o ícone de busca do react-icons
import './style.css';

interface Tournament {
  id: string;
  name: string;
  game: string;
  status: 'pending' | 'sort' | 'in-progress' | 'completed'; // Adicionei o status 'sort'
}

export function TournamentList() {
  const [activeTab, setActiveTab] = useState('all');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const tournamentsCollection = collection(db, 'tournaments');
    const queryRef = query(tournamentsCollection, orderBy('createdAt', 'desc'));

    const unsubs = onSnapshot(queryRef, (snapshot) => {
      const tournamentsList: Tournament[] = [];
      snapshot.forEach((doc) => {
        tournamentsList.push({
          id: doc.id,
          name: doc.data().name,
          game: doc.data().game,
          status: doc.data().status as 'pending' | 'sort' | 'in-progress' | 'completed', // Converte para tipo correto
        });
      });
      setTournaments(tournamentsList);
      setLoading(false);
    });

    return () => unsubs();
  }, []);

  const statusLabels: Record<string, string> = {
    all: 'Todos',
    pending: 'Pendente',
    sort: 'Sorteio', // Label para o novo status 'sort'
    'in-progress': 'Em Progresso',
    completed: 'Completo',
  };

  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setActiveTab(eventKey);
    }
  };

  const countTournaments = (status: string) => {
    if (status === 'all') {
      return tournaments.length;
    }
    return tournaments.filter(tournament => tournament.status === status).length;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const searchFilter = (tournament: Tournament) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return tournament.name.toLowerCase().includes(lowerCaseSearch) || tournament.game.toLowerCase().includes(lowerCaseSearch);
  };

  const filteredTournaments = activeTab === 'all'
    ? tournaments
    : tournaments.filter(tournament => tournament.status === activeTab);

  const filteredSearchTournaments = filteredTournaments.filter(searchFilter);

  return (
    <div className="tournament">
      <Title subPageName="Torneios" />

      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect} className="nav-dark">
        <Nav.Item>
          <Nav.Link eventKey="all" className="nav-link-custom">
            {statusLabels['all']} <Badge bg="success" className="text-light">{countTournaments('all')}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="pending" className="nav-link-custom">
            {statusLabels['pending']} <Badge bg="success" className="text-light">{countTournaments('pending')}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sort" className="nav-link-custom"> {/* Link para o novo status 'sort' */}
            {statusLabels['sort']} <Badge bg="success" className="text-light">{countTournaments('sort')}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="in-progress" className="nav-link-custom">
            {statusLabels['in-progress']} <Badge bg="success" className="text-light">{countTournaments('in-progress')}</Badge>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="completed" className="nav-link-custom">
            {statusLabels['completed']} <Badge bg="success" className="text-light">{countTournaments('completed')}</Badge>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-3 text-light">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="position-relative d-flex align-items-center">
            <Form.Control type="text" placeholder="Nome do evento ou jogo" value={searchTerm} onChange={handleSearchChange} className="me-2" />
            <BsSearch className="search-icon" style={{ cursor: 'pointer' }} /> {/* Ícone de busca do react-icons */}
          </div>
          <Link to="/torneios/novo" className="btn btn-success">
            Criar Novo Torneio
          </Link>
        </div>

        <hr />

        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : filteredSearchTournaments.length > 0 ? (
          <ListGroup className='list-tournaments'>
            {filteredSearchTournaments.map((tournament) => (
              <Link to={`/torneios/${tournament.id}`} key={tournament.id} className="list-group-item list-group-item-action flex-column align-items-start bg-dark text-light">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{tournament.name}</h5>
                  <small>{statusLabels[tournament.status]}</small>
                </div>
                <p className="mb-1">{tournament.game}</p>
              </Link>
            ))}
          </ListGroup>
        ) : activeTab === 'all' ? (
          <div className="text-center mt-3">
            Nenhum torneio cadastrado
          </div>
        ) : (
          <div className="text-center mt-3">
            Nenhum torneio com status "{statusLabels[activeTab]}" encontrado
          </div>
        )}
      </div>
    </div>
  );
}
