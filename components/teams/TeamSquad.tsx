
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Player } from '@/types';

interface TeamSquadProps {
  players: Player[];
  isLoading: boolean;
}

const TeamSquad = ({ players, isLoading }: TeamSquadProps) => {
  const formatPosition = (position: string) => {
    switch(position) {
      case 'GK': return 'Goalkeeper';
      case 'DF': return 'Defender';
      case 'MF': return 'Midfielder';
      case 'FD': return 'Forward';
      default: return position;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#181c14]">Squad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#181c14]">Squad</CardTitle>
      </CardHeader>
      <CardContent>
        {players.length === 0 ? (
          <p className="text-center py-4">No players found for this team.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-soccer-green text-white">Jersey</TableHead>
                <TableHead className="bg-soccer-green text-white">Name</TableHead>
                <TableHead className="bg-soccer-green text-white">Position</TableHead>
                <TableHead className="bg-soccer-green text-white">Date of Birth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map(player => (
                <TableRow key={player.kfupm_id}>
                  <TableCell>{player.jersey_no}</TableCell>
                  <TableCell className="font-medium text-[#181c14]">{player.name}</TableCell>
                  <TableCell>{formatPosition(player.position_to_play)}</TableCell>
                  <TableCell>{player.date_of_birth ? formatDate(player.date_of_birth) : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamSquad;
