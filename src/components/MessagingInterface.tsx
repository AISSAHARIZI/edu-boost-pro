import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Send, Users, Clock } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  studentName: string;
  studentEmail: string;
  subject: string;
  content: string;
  timestamp: string;
  unread: boolean;
  priority: 'low' | 'medium' | 'high';
}

const mockMessages: Message[] = [
  {
    id: "1",
    studentName: "Emma Johnson",
    studentEmail: "emma.j@school.com",
    subject: "Question about Assignment 3",
    content: "Hi Professor, I'm having trouble understanding the third problem in the assignment. Could you please provide some guidance?",
    timestamp: "2024-01-20 15:30",
    unread: true,
    priority: 'medium'
  },
  {
    id: "2",
    studentName: "Michael Chen",
    studentEmail: "m.chen@school.com",
    subject: "Extra Credit Opportunity",
    content: "I would like to know if there are any extra credit opportunities available for this semester.",
    timestamp: "2024-01-20 14:15",
    unread: false,
    priority: 'low'
  },
  {
    id: "3",
    studentName: "Sophie Martinez",
    studentEmail: "sophie.m@school.com",
    subject: "Urgent: Exam Schedule Conflict",
    content: "I have a schedule conflict with the upcoming exam. Is it possible to arrange an alternative time?",
    timestamp: "2024-01-20 13:45",
    unread: true,
    priority: 'high'
  }
];

const getPriorityColor = (priority: Message['priority']) => {
  switch (priority) {
    case 'high': return 'destructive';
    case 'medium': return 'warning';
    case 'low': return 'secondary';
  }
};

export const MessagingInterface = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({ to: "", subject: "", content: "" });

  const unreadCount = mockMessages.filter(m => m.unread).length;

  const sendMessage = () => {
    if (newMessage.to && newMessage.subject && newMessage.content) {
      console.log("Sending message:", newMessage);
      setNewMessage({ to: "", subject: "", content: "" });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Message List */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Messages
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                message.unread ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
              } ${
                selectedMessage?.id === message.id ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {message.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold truncate ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {message.studentName}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs`}>
                        {message.priority}
                      </Badge>
                      {message.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-sm truncate mb-1 ${message.unread ? 'font-medium' : 'text-muted-foreground'}`}>
                    {message.subject}
                  </p>
                  
                  <p className="text-xs text-muted-foreground truncate">
                    {message.content}
                  </p>
                  
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {message.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Message Detail / Compose */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Send className="h-5 w-5 text-accent" />
            {selectedMessage ? 'Message Details' : 'Compose Message'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedMessage.studentName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{selectedMessage.studentName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMessage.studentEmail}</p>
                </div>
                <Badge variant="outline">
                  {selectedMessage.priority} priority
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">{selectedMessage.subject}</h4>
                <p className="text-muted-foreground text-sm mb-4">{selectedMessage.timestamp}</p>
                <p className="text-foreground leading-relaxed">{selectedMessage.content}</p>
              </div>
              
              <div className="border-t border-border pt-4">
                <Textarea 
                  placeholder="Type your reply..." 
                  className="mb-3"
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button variant="default" className="gap-2">
                    <Send className="h-4 w-4" />
                    Send Reply
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedMessage(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">To:</label>
                <Input
                  placeholder="Student email or select from list..."
                  value={newMessage.to}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject:</label>
                <Input
                  placeholder="Message subject..."
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message:</label>
                <Textarea
                  placeholder="Type your message..."
                  rows={8}
                  value={newMessage.content}
                  onChange={(e) => setNewMessage(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>
              
              <Button 
                variant="accent" 
                onClick={sendMessage}
                className="w-full gap-2"
                disabled={!newMessage.to || !newMessage.subject || !newMessage.content}
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};