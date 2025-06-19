
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TeamNotFound = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Team Not Found</h2>
        <p className="mb-4">The team you're looking for doesn't exist or has been removed.</p>
        <Link to="/teams">
          <Button>Back to Teams</Button>
        </Link>
      </div>
    </div>
  );
};

export default TeamNotFound;
