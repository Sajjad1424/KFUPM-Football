
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

interface StaffTableProps {
  staff: TeamMember[];
  isLoading: boolean;
  onRemoveMember: (id: number, isPlayer: boolean) => void;
  removingMemberId: number | null;
}

export const StaffTable = ({ 
  staff, 
  isLoading, 
  onRemoveMember, 
  removingMemberId 
}: StaffTableProps) => {
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
              <TableHead className="bg-[#181C14] text-white text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  No support staff in this team
                </TableCell>
              </TableRow>
            ) : (
              staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell>{staffMember.id}</TableCell>
                  <TableCell className="font-medium">{staffMember.name}</TableCell>
                  <TableCell>{staffMember.role}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveMember(staffMember.id, false)}
                      disabled={removingMemberId === staffMember.id}
                    >
                      {removingMemberId === staffMember.id ? (
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
