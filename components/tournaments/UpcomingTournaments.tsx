
import { Calendar } from 'lucide-react';
import { Tournament } from '@/types';
import TournamentCard from './TournamentCard';

interface UpcomingTournamentsProps {
  tournaments: Tournament[];
}

const UpcomingTournaments = ({ tournaments }: UpcomingTournamentsProps) => {
  if (tournaments.length === 0) return null;
  
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-soccer-accent border-b pb-2">
        <Calendar className="mr-2 h-5 w-5" />
        Upcoming Tournaments
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map(tournament => (
          <TournamentCard 
            key={tournament.tr_id} 
            tournament={tournament} 
            borderColorClass="border-l-soccer-accent"
            buttonVariant="outline"  
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTournaments;
