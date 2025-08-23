import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, Dumbbell, HelpCircle, CheckCircle, Clock, X } from "lucide-react";

interface Activity {
  id: string;
  studentName: string;
  type: 'reading' | 'quiz' | 'exercise' | 'physical';
  title: string;
  status: 'pending' | 'verified' | 'rejected';
  aiConfidence: number;
  submittedAt: string;
  description: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    studentName: "Emma Johnson",
    type: "reading",
    title: "The Great Gatsby - Chapter 5",
    status: "pending",
    aiConfidence: 95,
    submittedAt: "2024-01-20 14:30",
    description: "Completed reading with comprehension questions"
  },
  {
    id: "2",
    studentName: "Michael Chen",
    type: "quiz",
    title: "Math Quiz: Algebra Basics",
    status: "verified",
    aiConfidence: 88,
    submittedAt: "2024-01-20 13:15",
    description: "Score: 85% - All questions answered correctly"
  },
  {
    id: "3",
    studentName: "Sophie Martinez",
    type: "physical",
    title: "30-minute Running Session",
    status: "pending",
    aiConfidence: 92,
    submittedAt: "2024-01-20 12:00",
    description: "Heart rate monitoring and GPS tracking data"
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'reading': return <BookOpen className="h-4 w-4" />;
    case 'quiz': return <Brain className="h-4 w-4" />;
    case 'exercise': return <HelpCircle className="h-4 w-4" />;
    case 'physical': return <Dumbbell className="h-4 w-4" />;
  }
};

const getStatusColor = (status: Activity['status']) => {
  switch (status) {
    case 'pending': return 'warning';
    case 'verified': return 'success';
    case 'rejected': return 'destructive';
  }
};

export const ActivityVerification = () => {
  const verifyActivity = (activityId: string, approve: boolean) => {
    console.log(`${approve ? 'Approving' : 'Rejecting'} activity ${activityId}`);
  };

  const pendingActivities = mockActivities.filter(a => a.status === 'pending');
  const verifiedActivities = mockActivities.filter(a => a.status === 'verified');

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Activity Verification
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingActivities.length})
            </TabsTrigger>
            <TabsTrigger value="verified" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Verified ({verifiedActivities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingActivities.map((activity) => (
              <div
                key={activity.id}
                className="border border-border rounded-lg p-4 space-y-4 hover:bg-muted/50 transition-colors animate-fade-in"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{activity.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`capitalize`}
                        >
                          {activity.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Student: {activity.studentName}
                      </p>
                      
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">AI Confidence</span>
                          <span className="font-medium">{activity.aiConfidence}%</span>
                        </div>
                        <Progress value={activity.aiConfidence} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => verifyActivity(activity.id, false)}
                      className="gap-2 hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => verifyActivity(activity.id, true)}
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Verify
                    </Button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground border-t border-border pt-2">
                  Submitted: {activity.submittedAt}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            {verifiedActivities.map((activity) => (
              <div
                key={activity.id}
                className="border border-border rounded-lg p-4 space-y-2 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.studentName}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};