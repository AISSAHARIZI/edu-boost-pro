import { TeacherProfile } from "@/components/TeacherProfile";
import { StudentManagement } from "@/components/StudentManagement";
import { ActivityVerification } from "@/components/ActivityVerification";
import { MessagingInterface } from "@/components/MessagingInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Brain, Users, MessageSquare } from "lucide-react";
import heroImage from "@/assets/teacher-hero.jpg";

const mockTeacher = {
  name: "Dr. Sarah Wilson",
  subject: "Mathematics",
  experience: 8,
  eligibility: ["PhD Mathematics", "Certified Educator", "AI Teaching Specialist"],
  totalStudents: 156,
  completedCourses: 12,
  rating: 4.8
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Teacher Dashboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="h-12 w-12" />
              <h1 className="text-5xl font-bold">EduManage Pro</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl">
              Comprehensive Teacher Profile Management with AI-Powered Student Tracking and Activity Verification
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Button variant="hero" size="lg" className="gap-2">
                <Brain className="h-5 w-5" />
                AI Assistant
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Users className="h-5 w-5" />
                Manage Students
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">156</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Brain className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24</div>
                <div className="text-sm text-muted-foreground">AI Verifications Today</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <MessageSquare className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">8</div>
                <div className="text-sm text-muted-foreground">Unread Messages</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <GraduationCap className="h-5 w-5 text-warning" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">4.8</div>
                <div className="text-sm text-muted-foreground">Teacher Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Teacher Profile */}
        <TeacherProfile teacher={mockTeacher} />

        {/* Student Management */}
        <StudentManagement />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Activity Verification */}
          <ActivityVerification />

          {/* Quick Actions */}
          <Card className="shadow-elegant">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Teaching Assistant
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Automated Grading</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI has processed 156 student activities this week with 94% accuracy rate.
                  </p>
                  <Button variant="default" size="sm">View Details</Button>
                </div>
                
                <div className="p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
                  <h4 className="font-semibold text-foreground mb-2">Student Progress Insights</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    12 students showing improvement, 3 need additional support.
                  </p>
                  <Button variant="accent" size="sm">Generate Report</Button>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Teaching Recommendations</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI suggests focusing on algebra concepts for optimal learning outcomes.
                  </p>
                  <Button variant="outline" size="sm">View Suggestions</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messaging Interface */}
        <MessagingInterface />
      </div>
    </div>
  );
};

export default Index;
