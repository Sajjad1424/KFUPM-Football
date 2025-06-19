import { Trophy } from "lucide-react";
export function Footer() {
  return <footer className="bg-[#181C14] text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Trophy className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">KFUPM FOOTBALL</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-[#697565] mb-2">Explore</h3>
              <ul className="space-y-2">
                <li><a href="/tournaments" className="hover:text-[#ECDFCC]">Tournaments</a></li>
                <li><a href="/teams" className="hover:text-[#ECDFCC]">Teams</a></li>
                <li><a href="/players" className="hover:text-[#ECDFCC]">Players</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#697565] mb-2">Contact</h3>
              <ul className="space-y-2">
               <li>Abbduljalil: s202153090@kfupm.edu.sa</li>
                <li>Sajjad:      s202166110@kfupm.edu.sa</li>
                <li>ALhassan:    s202174850@kfupm.edu.sa</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[#3C3D37] text-center text-sm">
          <p>© {new Date().getFullYear()} KFUPM FOOTBALL. All rights reserved.</p>
        </div>
      </div>
    </footer>;
}