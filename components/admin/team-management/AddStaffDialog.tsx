
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newStaffName: string;
  setNewStaffName: (name: string) => void;
  newStaffId: string;
  setNewStaffId: (id: string) => void;
  newStaffRole: string;
  setNewStaffRole: (role: string) => void;
  onAddStaff: () => void;
}

export const AddStaffDialog = ({
  open,
  onOpenChange,
  newStaffName,
  setNewStaffName,
  newStaffId,
  setNewStaffId,
  newStaffRole,
  setNewStaffRole,
  onAddStaff
}: AddStaffDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Support Staff to Team</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="staff-name">Staff Name</Label>
              <Input 
                id="staff-name" 
                value={newStaffName} 
                onChange={e => setNewStaffName(e.target.value)} 
                placeholder="Enter staff name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="staff-id">KFUPM ID</Label>
              <Input 
                id="staff-id" 
                type="number" 
                value={newStaffId} 
                onChange={e => setNewStaffId(e.target.value)} 
                placeholder="Enter KFUPM ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="staff-role">Role</Label>
              <Select 
                value={newStaffRole} 
                onValueChange={setNewStaffRole}
              >
                <SelectTrigger id="staff-role">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Coach">Coach</SelectItem>
                  <SelectItem value="Assistant Coach">Assistant Coach</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Physiotherapist">Physiotherapist</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={onAddStaff}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Staff Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
