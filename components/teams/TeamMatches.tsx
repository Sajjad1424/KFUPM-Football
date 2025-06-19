
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Match } from '@/types';

interface TeamMatchesProps {
  matches: Match[];
  teamId: number;
  isLoading: boolean;
}

const TeamMatches = ({ matches, teamId, isLoading }: TeamMatchesProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatMatchResult = (match: Match, teamId: number) => {
    const isHomeTeam = match.team_id1 === teamId;
    const [homeGoals, awayGoals] = match.goal_score.split('-').map(Number);
    
    if (match.results === 'DRAW') return 'D';
    
    if (isHomeTeam) {
      return homeGoals > awayGoals ? 'W' : 'L';
    } else {
      return awayGoals > homeGoals ? 'W' : 'L';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-[#181c14]">Recent Matches</CardTitle>
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
        <CardTitle className="text-[#181c14]">Recent Matches</CardTitle>
      </CardHeader>
      <CardContent>
        {matches.length === 0 ? (
          <p className="text-center py-4">No matches found for this team.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-soccer-green text-white">Date</TableHead>
                <TableHead className="bg-soccer-green text-white">Opponent</TableHead>
                <TableHead className="bg-soccer-green text-white">Score</TableHead>
                <TableHead className="bg-soccer-green text-white">Result</TableHead>
                <TableHead className="text-right bg-soccer-green text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map(match => (
                <TableRow key={match.match_no}>
                  <TableCell>{formatDate(match.play_date)}</TableCell>
                  <TableCell className="text-[#181c14]">
                    {match.team_id1 === teamId 
                      ? match.team2?.team_name || `Team ${match.team_id2}`
                      : match.team1?.team_name || `Team ${match.team_id1}`}
                  </TableCell>
                  <TableCell className="font-medium">{match.goal_score}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      formatMatchResult(match, teamId) === 'W' ? 'bg-green-200 text-green-800' :
                      formatMatchResult(match, teamId) === 'L' ? 'bg-red-200 text-red-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {formatMatchResult(match, teamId)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/matches/${match.match_no}`}>
                      <Button variant="ghost" size="sm">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMatches;
