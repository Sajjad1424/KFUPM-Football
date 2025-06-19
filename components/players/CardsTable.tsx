
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerWithCards } from "@/services/api/players/cards";

interface CardsTableProps {
  players: PlayerWithCards[];
  isLoading: boolean;
  cardType: 'red' | 'yellow';
}

export const CardsTable = ({
  players,
  isLoading,
  cardType
}: CardsTableProps) => {
  const title = cardType === 'red' ? 'Red Cards' : 'Yellow Cards';
  const description = cardType === 'red' ? 'Players who have received red cards' : 'Players who have received yellow cards';
  const bgColorClass = cardType === 'red' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-[#181c14]">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-soccer-green text-white">Rank</TableHead>
                <TableHead className="bg-soccer-green text-white">Player ID</TableHead>
                <TableHead className="bg-soccer-green text-white">Name</TableHead>
                <TableHead className="text-right bg-soccer-green text-white">Cards</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">No data available</TableCell>
                </TableRow>
              ) : (
                players.map((player, index) => (
                  <TableRow key={player.player_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{player.player_id}</TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-right">
                      <span className={`${bgColorClass} font-bold px-3 py-1 rounded-full`}>
                        {cardType === 'red' ? (player.red_cards || player.red_count || 0) : (player.yellow_cards || player.yellow_count || 0)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
