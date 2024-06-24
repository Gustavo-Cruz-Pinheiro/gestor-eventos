import { Title } from '../../components/Title';
import { TournamentForm } from '../../components/TournamentForm';

export const NewTournament = () => {
  const handleFormSubmit = (formData: { name: string; description: string; game: string }) => {
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container">
      <Title subPageName="Novo Torneio"/>
      <TournamentForm onSubmit={handleFormSubmit} />
    </div>
  );
};
