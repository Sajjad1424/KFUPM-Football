import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut, Trophy, List, Calendar, User as UserIcon, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
type NavbarProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogout: () => void;
};
export function Navbar({
  isLoggedIn,
  isAdmin,
  onLogout
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return <nav className="text-white py-4 px-6 shadow-md bg-[#181C14]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Trophy className="h-6 w-6" />
          <span className="text-xl font-bold">KFUPM FOOTBALL</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/tournaments" className="hover:text-[#ECDFCC] px-3 py-2">
            Tournaments
          </Link>
          <Link to="/teams" className="hover:text-[#ECDFCC] px-3 py-2">
            Teams
          </Link>
          <Link to="/players" className="hover:text-[#ECDFCC] px-3 py-2">
            Players
          </Link>
          <Link to="/matches" className="hover:text-[#ECDFCC] px-3 py-2">
            Matches
          </Link>
          {isAdmin && <Link to="/admin" className="hover:text-[#ECDFCC] px-3 py-2">
              Admin
            </Link>}
          
          {isLoggedIn ? <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-[#3C3D37] border-none hover:bg-[#697565]">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> : <Link to="/login">
              <Button variant="outline" className="bg-[#3C3D37] border-none hover:bg-[#697565]">
                Login
              </Button>
            </Link>}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          <List className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <div className="md:hidden pt-4 pb-3 px-6 bg-[#3C3D37]">
          <div className="flex flex-col space-y-2">
            <Link to="/tournaments" className="hover:text-[#ECDFCC] py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Trophy className="h-4 w-4 inline mr-2" />
              Tournaments
            </Link>
            <Link to="/teams" className="hover:text-[#ECDFCC] py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <UserIcon className="h-4 w-4 inline mr-2" />
              Teams
            </Link>
            <Link to="/players" className="hover:text-[#ECDFCC] py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <User className="h-4 w-4 inline mr-2" />
              Players
            </Link>
            <Link to="/matches" className="hover:text-[#ECDFCC] py-2" onClick={() => setIsMobileMenuOpen(false)}>
              <Calendar className="h-4 w-4 inline mr-2" />
              Matches
            </Link>
            {isAdmin && <Link to="/admin" className="hover:text-[#ECDFCC] py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Settings className="h-4 w-4 inline mr-2" />
                Admin
              </Link>}
            {isLoggedIn ? <button onClick={onLogout} className="hover:text-[#ECDFCC] py-2 text-left">
                <LogOut className="h-4 w-4 inline mr-2" />
                Logout
              </button> : <Link to="/login" className="hover:text-[#ECDFCC] py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="h-4 w-4 inline mr-2" />
                Login
              </Link>}
          </div>
        </div>}
    </nav>;
}