
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tournament } from '@/types';

interface TournamentTableProps {
  tournaments: Tournament[];
}

const TournamentTable = ({ tournaments }: TournamentTableProps) => {
  const currentDate = new Date();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center border-b pb-2">
        <Trophy className="mr-2 h-5 w-5" />
        All Tournaments
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-soccer-green text-white">ID</TableHead>
            <TableHead className="bg-soccer-green text-white">Tournament Name</TableHead>
            <TableHead className="bg-soccer-green text-white">Start Date</TableHead>
            <TableHead className="bg-soccer-green text-white">End Date</TableHead>
            <TableHead className="bg-soccer-green text-white">Status</TableHead>
            <TableHead className="text-right bg-soccer-green text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tournaments.map(tournament => {
            const startDate = new Date(tournament.start_date);
            const endDate = new Date(tournament.end_date);
            let status = "Upcoming";
            if (startDate <= currentDate && endDate >= currentDate) {
              status = "Active";
            } else if (endDate < currentDate) {
              status = "Completed";
            }
            
            return (
              <TableRow key={tournament.tr_id}>
                <TableCell>{tournament.tr_id}</TableCell>
                <TableCell className="font-medium">{tournament.tr_name}</TableCell>
                <TableCell>{new Date(tournament.start_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(tournament.end_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    status === "Active" ? "bg-green-100 text-green-800" :
                    status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/tournaments/${tournament.tr_id}`}>
                    <Button variant="ghost" size="sm">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TournamentTable;
