
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Player } from "@/types";
interface AllPlayersTableProps {
  players: Player[];
  isLoading: boolean;
}
export const AllPlayersTable = ({
  players,
  isLoading
}: AllPlayersTableProps) => {
  return <Card>
      <CardHeader>
        <CardTitle>All Players</CardTitle>
        <CardDescription className="font-bold text-emerald-900">Complete list of players across all teams</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div> : <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-[#181C14] text-white">ID</TableHead>
                <TableHead className="bg-[#181C14] text-white">Name</TableHead>
                <TableHead className="bg-[#181C14] text-white">Position</TableHead>
                <TableHead className="bg-[#181C14] text-white">Date of Birth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.length === 0 ? <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">No data available</TableCell>
                </TableRow> : players.map(player => <TableRow key={player.kfupm_id}>
                    <TableCell>{player.kfupm_id}</TableCell>
                    <TableCell className="font-medium">{player.name || "Unknown"}</TableCell>
                    <TableCell>{player.position_to_play}</TableCell>
                    <TableCell>{player.date_of_birth || "Not available"}</TableCell>
                  </TableRow>)}
            </TableBody>
          </Table>}
      </CardContent>
    </Card>;
};
