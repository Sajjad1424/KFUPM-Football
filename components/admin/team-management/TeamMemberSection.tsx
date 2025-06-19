
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';

interface TeamMemberSectionProps {
  title: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonColor: string;
  onButtonClick: () => void;
  children: React.ReactNode;
}

export const TeamMemberSection = ({
  title,
  icon,
  buttonText,
  buttonColor,
  onButtonClick,
  children
}: TeamMemberSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          {icon}
          {title}
        </CardTitle>
        <Button 
          className={buttonColor} 
          onClick={onButtonClick}
        >
          <UserPlus className="mr-1 h-4 w-4" />
          {buttonText}
        </Button>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
