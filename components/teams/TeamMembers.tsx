
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, User, UserRound } from 'lucide-react';
import { getTeamMembers } from '@/services/api/teamMembers';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface TeamMembersProps {
  teamId: number;
  teamName: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  jersey?: number;
  position?: string;
  dateOfBirth?: string;
  type?: string;
}

const TeamMembers = ({ teamId, teamName }: TeamMembersProps) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [members, setMembers] = useState<{players: TeamMember[], staff: TeamMember[]}>({
    players: [],
    staff: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const data = await getTeamMembers(teamId);
        setMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast({
          title: "Error",
          description: "Failed to load team members. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (teamId) {
      fetchMembers();
    }
  }, [teamId, toast]);

  const formatPosition = (position: string) => {
    switch(position) {
      case 'GK': return 'Goalkeeper';
      case 'DF': return 'Defender';
      case 'MF': return 'Midfielder';
      case 'FD': return 'Forward';
      default: return position;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const allMembers = [...members.players, ...members.staff];
  const filteredMembers = activeTab === 'all' 
    ? allMembers
    : activeTab === 'players' 
      ? members.players
      : members.staff;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-[#181c14]">
          <Users className="mr-2 h-5 w-5" />
          {teamName} Team Members
        </CardTitle>
        <CardDescription>
          Browse all members associated with this team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Members</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="staff">Support Staff</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center space-x-4 animate-pulse">
                    <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No {activeTab === 'players' ? 'players' : activeTab === 'staff' ? 'staff members' : 'members'} found for this team.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-soccer-green text-white">Name</TableHead>
                    <TableHead className="bg-soccer-green text-white">Role</TableHead>
                    {activeTab !== 'staff' && (
                      <>
                        <TableHead className="bg-soccer-green text-white">Jersey</TableHead>
                        <TableHead className="bg-soccer-green text-white">Position</TableHead>
                        <TableHead className="bg-soccer-green text-white">Date of Birth</TableHead>
                      </>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map(member => (
                    <TableRow key={`${member.type || 'player'}-${member.id}`}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {member.role === 'Captain' ? (
                            <UserRound className="mr-2 h-4 w-4 text-green-600" />
                          ) : (
                            <User className="mr-2 h-4 w-4 text-gray-500" />
                          )}
                          {member.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.role === 'Captain' ? 'default' : 'outline'} 
                          className={member.role === 'Captain' ? 'bg-green-600' : ''}
                        >
                          {member.role}
                        </Badge>
                      </TableCell>
                      {activeTab !== 'staff' && member.type !== 'staff' && (
                        <>
                          <TableCell>{member.jersey || 'N/A'}</TableCell>
                          <TableCell>{member.position ? formatPosition(member.position) : 'N/A'}</TableCell>
                          <TableCell>{formatDate(member.dateOfBirth)}</TableCell>
                        </>
                      )}
                      {activeTab !== 'staff' && member.type === 'staff' && (
                        <TableCell colSpan={3}></TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TeamMembers;
