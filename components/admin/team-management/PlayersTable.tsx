
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash } from 'lucide-react';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  jersey?: number;
  position?: string;
  dateOfBirth?: string | null;
  type?: string;
};

interface PlayersTableProps {
  players: TeamMember[];
  isLoading: boolean;
  onRemoveMember: (id: number, isPlayer: boolean) => void;
  removingMemberId: number | null;
}

export const PlayersTable = ({ 
  players, 
  isLoading, 
  onRemoveMember, 
  removingMemberId 
}: PlayersTableProps) => {
  return (
    <>
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-[#181C14] text-white">ID</TableHead>
              <TableHead className="bg-[#181C14] text-white">Name</TableHead>
              <TableHead className="bg-[#181C14] text-white">Role</TableHead>
              <TableHead className="bg-[#181C14] text-white">Jersey</TableHead>
              <TableHead className="bg-[#181C14] text-white">Position</TableHead>
              <TableHead className="bg-[#181C14] text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No players in this team
                </TableCell>
              </TableRow>
            ) : (
              players.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.role}</TableCell>
                  <TableCell>{player.jersey}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveMember(player.id, true)}
                      disabled={removingMemberId === player.id}
                    >
                      {removingMemberId === player.id ? (
                        <span className="animate-pulse">Removing...</span>
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};
