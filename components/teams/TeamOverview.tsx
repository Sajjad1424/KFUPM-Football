
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Team } from '@/types';

interface TeamOverviewProps {
  team: Team;
}

const TeamOverview = ({ team }: TeamOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#181c14]">Team Info</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Team ID</dt>
            <dd className="mt-1 text-lg text-[#181c14]">{team.team_id}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Team Name</dt>
            <dd className="mt-1 text-lg text-[#181c14]">{team.team_name}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default TeamOverview;
