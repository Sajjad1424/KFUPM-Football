
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newPlayerName: string;
  setNewPlayerName: (name: string) => void;
  newPlayerId: string;
  setNewPlayerId: (id: string) => void;
  newPlayerJersey: string;
  setNewPlayerJersey: (jersey: string) => void;
  newPlayerPosition: string;
  setNewPlayerPosition: (position: string) => void;
  onAddPlayer: () => void;
}

export const AddPlayerDialog = ({
  open,
  onOpenChange,
  newPlayerName,
  setNewPlayerName,
  newPlayerId,
  setNewPlayerId,
  newPlayerJersey,
  setNewPlayerJersey,
  newPlayerPosition,
  setNewPlayerPosition,
  onAddPlayer
}: AddPlayerDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Player to Team</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="player-name">Player Name</Label>
              <Input 
                id="player-name" 
                value={newPlayerName} 
                onChange={e => setNewPlayerName(e.target.value)} 
                placeholder="Enter player name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="player-id">KFUPM ID</Label>
              <Input 
                id="player-id" 
                type="number" 
                value={newPlayerId} 
                onChange={e => setNewPlayerId(e.target.value)} 
                placeholder="Enter KFUPM ID"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="player-jersey">Jersey Number</Label>
                <Input 
                  id="player-jersey" 
                  type="number" 
                  value={newPlayerJersey} 
                  onChange={e => setNewPlayerJersey(e.target.value)} 
                  placeholder="Jersey #"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="player-position">Position</Label>
                <Select 
                  value={newPlayerPosition} 
                  onValueChange={setNewPlayerPosition}
                >
                  <SelectTrigger id="player-position">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GK">Goalkeeper (GK)</SelectItem>
                    <SelectItem value="DF">Defender (DF)</SelectItem>
                    <SelectItem value="MF">Midfielder (MF)</SelectItem>
                    <SelectItem value="FW">Forward (FW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
            onClick={onAddPlayer}
            className="bg-green-600 hover:bg-green-700"
          >
            Add Player
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
