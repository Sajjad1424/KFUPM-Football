
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Tournament, Team } from '@/types';
import { createMatch } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Form schema
const formSchema = z.object({
  tournament_id: z.string({ required_error: "Tournament is required." }),
  team_id1: z.string({ required_error: "Home team is required." }),
  team_id2: z.string({ required_error: "Away team is required." }),
  play_date: z.date({ required_error: "Match date is required." }),
  venue_id: z.string({ required_error: "Venue is required." }),
  play_stage: z.string({ required_error: "Play stage is required." }),
}).refine(data => data.team_id1 !== data.team_id2, {
  message: "Home team and Away team must be different.",
  path: ["team_id2"],
});

// Stage options
const stageOptions = [
  { value: "G", label: "Group Stage" },
  { value: "R", label: "Round of 16" },
  { value: "Q", label: "Quarter Finals" },
  { value: "S", label: "Semi Finals" },
  { value: "F", label: "Final" },
];

// Mock venues
const venues = [
  { venue_id: 1, venue_name: "Main Stadium" },
  { venue_id: 2, venue_name: "Field 2" },
  { venue_id: 3, venue_name: "Field 3" },
];

interface MatchFormProps {
  tournaments: Tournament[];
  teams: Team[];
  isLoading: boolean;
}

const MatchForm = ({ tournaments, teams, isLoading }: MatchFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Format the date
      const formattedDate = format(values.play_date, 'yyyy-MM-dd');
      
      const matchData = {
        team_id1: parseInt(values.team_id1),
        team_id2: parseInt(values.team_id2),
        play_date: formattedDate,
        venue_id: parseInt(values.venue_id),
        play_stage: values.play_stage,
        results: '',
        decided_by: 'N',
        goal_score: '0-0',
        audience: 0,
        player_of_match: 0,
        stop1_sec: 0,
        stop2_sec: 0,
      };
      
      // Now actually save to database
      const result = await createMatch(matchData);
      
      if (result.success) {
        toast({
          title: "Match Created",
          description: `Successfully created new match`,
        });
        
        // Redirect back to matches list
        navigate('/admin/matches');
      } else {
        throw new Error("Failed to create match");
      }
    } catch (error) {
      console.error("Error creating match:", error);
      toast({
        title: "Error",
        description: "Failed to create match. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="tournament_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tournament" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tournaments.map(tournament => (
                    <SelectItem key={tournament.tr_id} value={tournament.tr_id.toString()}>
                      {tournament.tr_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="team_id1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Team</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select home team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.team_id} value={team.team_id.toString()}>
                        {team.team_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="team_id2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Away Team</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select away team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.team_id} value={team.team_id.toString()}>
                        {team.team_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="play_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Match Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="venue_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venue</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {venues.map(venue => (
                      <SelectItem key={venue.venue_id} value={venue.venue_id.toString()}>
                        {venue.venue_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="play_stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match Stage</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stageOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/matches')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-soccer-green hover:bg-soccer-dark-green"
          >
            {isSubmitting ? "Creating..." : "Create Match"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MatchForm;
