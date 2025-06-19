
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Player } from '@/types';

interface CaptainSelectorProps {
  players: Player[];
  selectedPlayer: number | null;
  onChange: (playerId: string) => void;
  isLoading: boolean;
}

export const CaptainSelector = ({ 
  players, 
  selectedPlayer, 
  onChange, 
  isLoading 
}: CaptainSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Select Captain</label>
      <Select 
        value={selectedPlayer?.toString() || ''} 
        onValueChange={onChange}
        disabled={isLoading || players.length === 0}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={players.length ? "Select a player" : "No players available"} />
        </SelectTrigger>
        <SelectContent>
          {players.length > 0 ? (
            players.map((player) => (
              <SelectItem key={player.kfupm_id} value={player.kfupm_id.toString()}>
                {player.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-players" disabled>No players available for this team</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
