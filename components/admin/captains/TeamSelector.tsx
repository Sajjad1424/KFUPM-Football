
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Team } from '@/types';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: number | null;
  onChange: (teamId: string) => void;
  isLoading: boolean;
}

export const TeamSelector = ({ 
  teams, 
  selectedTeam, 
  onChange, 
  isLoading
}: TeamSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Select Team</label>
      <Select 
        value={selectedTeam?.toString() || ''} 
        onValueChange={onChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team.team_id} value={team.team_id.toString()}>
              {team.team_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
