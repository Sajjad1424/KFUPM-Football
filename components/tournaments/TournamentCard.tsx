
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { Tournament } from '@/types';

interface TournamentCardProps {
  tournament: Tournament;
  borderColorClass: string;
  buttonVariant?: "default" | "outline";
}

const TournamentCard = ({ tournament, borderColorClass, buttonVariant = "default" }: TournamentCardProps) => {
  return (
    <Link to={`/tournaments/${tournament.tr_id}`} key={tournament.tr_id}>
      <Card className={`hover:shadow-lg transition-shadow cursor-pointer h-full border-l-4 ${borderColorClass}`}>
        <CardHeader>
          <CardTitle>{tournament.tr_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <Calendar className={`h-4 w-4 mr-2 ${borderColorClass === 'border-l-soccer-green' ? 'text-soccer-green' : 'text-soccer-accent'}`} />
            <span className="text-sm">
              {new Date(tournament.start_date).toLocaleDateString()} - 
              {new Date(tournament.end_date).toLocaleDateString()}
            </span>
          </div>
          <Button variant={buttonVariant} className="w-full mt-2">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TournamentCard;
