
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Team } from '@/types';

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam: number | null;
  onTeamChange: (value: string) => void;
}

export const TeamSelector = ({ teams, selectedTeam, onTeamChange }: TeamSelectorProps) => {
  return (
    <div className="w-72">
      <Select onValueChange={onTeamChange} defaultValue={selectedTeam?.toString()}>
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
