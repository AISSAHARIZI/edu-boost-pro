import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Plus, Minus, Trophy, Search } from "lucide-react";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  points: number;
  grade: string;
  activities: string[];
  avatar?: string;
  progress: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.j@school.com",
    points: 850,
    grade: "A",
    activities: ["Reading", "Quiz", "Exercise"],
    progress: 85
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@school.com",
    points: 720,
    grade: "B+",
    activities: ["Reading", "Physical"],
    progress: 72
  },
  {
    id: "3",
    name: "Sophie Martinez",
    email: "sophie.m@school.com",
    points: 940,
    grade: "A+",
    activities: ["Reading", "Quiz", "Exercise", "Physical"],
    progress: 94
  },
];

export const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const adjustPoints = (studentId: string, change: number) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, points: Math.max(0, student.points + change) }
        : student
    ));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-elegant">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-accent" />
            Student Management
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-fade-in"
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{student.name}</h3>
                  <p className="text-sm text-muted-foreground">{student.email}</p>
                </div>
                <Badge 
                  variant={student.grade.includes('A') ? 'default' : 'secondary'}
                  className="bg-gradient-accent text-accent-foreground"
                >
                  {student.grade}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {student.activities.map((activity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{student.points}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
              
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustPoints(student.id, -10)}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adjustPoints(student.id, 10)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <Button variant="default" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};