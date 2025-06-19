
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
interface TopScorer {
  player_id: number;
  name: string;
  goal_count: number;
}
interface TopScorersTableProps {
  topScorers: TopScorer[];
  isLoading: boolean;
}
export const TopScorersTable = ({
  topScorers,
  isLoading
}: TopScorersTableProps) => {
  return <Card>
      <CardHeader>
        <CardTitle>Top Goal Scorers</CardTitle>
        <CardDescription className="text-[#181c14]">Players with the highest goal counts across all tournaments</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div> : <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-soccer-green text-white">Rank</TableHead>
                <TableHead className="bg-soccer-green text-white">Player ID</TableHead>
                <TableHead className="bg-soccer-green text-white">Name</TableHead>
                <TableHead className="text-right bg-soccer-green text-white">Goals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topScorers.length === 0 ? <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">No data available</TableCell>
                </TableRow> : topScorers.map((player, index) => <TableRow key={player.player_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.player_id}</TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-right">
                      <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full">
                        {player.goal_count}
                      </span>
                    </TableCell>
                  </TableRow>)}
            </TableBody>
          </Table>}
      </CardContent>
    </Card>;
};
