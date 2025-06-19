
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Tournaments from "./pages/Tournaments";
import TournamentDetails from "./pages/TournamentDetails";
import Matches from "./pages/Matches";
import MatchDetails from "./pages/MatchDetails";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import TeamDetails from "./pages/TeamDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import NewTournament from "./pages/admin/NewTournament";
import ManageTournaments from "./pages/admin/ManageTournaments";
import TournamentTeams from "./pages/admin/TournamentTeams";
import AdminMatches from "./pages/admin/AdminMatches";
import NewMatch from "./pages/admin/NewMatch";
import TeamCaptains from "./pages/admin/TeamCaptains";
import NewTeam from "./pages/admin/NewTeam";
import ManageTeam from "./pages/admin/ManageTeam";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id" element={<TournamentDetails />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/:id" element={<MatchDetails />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetails />} />
            <Route path="/players" element={<Players />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/tournaments/new" element={<NewTournament />} />
            <Route path="/admin/tournaments" element={<ManageTournaments />} />
            <Route path="/admin/tournament-teams" element={<TournamentTeams />} />
            <Route path="/admin/matches" element={<AdminMatches />} />
            <Route path="/admin/matches/new" element={<NewMatch />} />
            <Route path="/admin/captains" element={<TeamCaptains />} />
            <Route path="/admin/teams/new" element={<NewTeam />} />
            <Route path="/admin/manage-team" element={<ManageTeam />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
