import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Edit, Award, Calendar, BookOpen } from "lucide-react";

interface TeacherProfileProps {
  teacher: {
    name: string;
    subject: string;
    experience: number;
    eligibility: string[];
    avatar?: string;
    totalStudents: number;
    completedCourses: number;
    rating: number;
  };
}

export const TeacherProfile = ({ teacher }: TeacherProfileProps) => {
  const experienceProgress = Math.min((teacher.experience / 15) * 100, 100); // 15 years as max

  return (
    <Card className="overflow-hidden shadow-elegant">
      <div className="h-32 bg-gradient-hero relative">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <CardContent className="relative -mt-16 pb-6">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-24 w-24 ring-4 ring-background shadow-glow">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
              {teacher.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 pt-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-foreground">{teacher.name}</h2>
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            <p className="text-lg text-muted-foreground mb-2">{teacher.subject} Teacher</p>
            <div className="flex gap-2 mb-4 flex-wrap">
              {teacher.eligibility.map((cert, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  <Award className="h-3 w-3" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              Experience: {teacher.experience} years
            </div>
            <Progress value={experienceProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {15 - teacher.experience} years to senior level
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <BookOpen className="h-4 w-4 text-accent" />
              Active Students: {teacher.totalStudents}
            </div>
            <div className="text-2xl font-bold text-accent">{teacher.rating}/5.0</div>
            <p className="text-xs text-muted-foreground">Student Rating</p>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Completed Courses</div>
            <div className="text-2xl font-bold text-success">{teacher.completedCourses}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};