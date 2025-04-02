
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  UserPlus, 
  MapPin, 
  Users,
  CheckCircle,
  XCircle
} from "lucide-react";

// Sample data for hubs and managers
const initialHubs = [
  { 
    id: '1', 
    name: 'Lagos Hub', 
    location: 'Lekki, Lagos', 
    capacity: 45, 
    established: '2022-05-15',
    status: 'active',
    managers: ['John Doe', 'Sarah Johnson']
  },
  { 
    id: '2', 
    name: 'Abuja Center', 
    location: 'Wuse, Abuja', 
    capacity: 32, 
    established: '2022-08-23',
    status: 'active',
    managers: ['Michael Brown']
  },
  { 
    id: '3', 
    name: 'Port Harcourt Space', 
    location: 'GRA, Port Harcourt', 
    capacity: 28, 
    established: '2023-01-10',
    status: 'maintenance',
    managers: []
  }
];

const initialManagers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@example.com',
    hub: 'Lagos Hub',
    role: 'Senior Manager',
    status: 'active',
    joinDate: '2022-05-20'
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com',
    hub: 'Lagos Hub',
    role: 'Assistant Manager',
    status: 'active',
    joinDate: '2022-06-15'
  },
  { 
    id: '3', 
    name: 'Michael Brown', 
    email: 'michael.b@example.com',
    hub: 'Abuja Center',
    role: 'Hub Manager',
    status: 'active',
    joinDate: '2022-09-05'
  }
];

const initialLearners = [
  { 
    id: '1', 
    name: 'Emma Wilson', 
    email: 'emma.w@example.com',
    preferredHub: 'Lagos Hub',
    joinDate: '2022-07-12',
    status: 'active',
    bookings: 8
  },
  { 
    id: '2', 
    name: 'Daniel Jackson', 
    email: 'daniel.j@example.com',
    preferredHub: 'Abuja Center',
    joinDate: '2022-10-03',
    status: 'active',
    bookings: 5
  },
  { 
    id: '3', 
    name: 'Olivia Carter', 
    email: 'olivia.c@example.com',
    preferredHub: 'Lagos Hub',
    joinDate: '2023-01-20',
    status: 'inactive',
    bookings: 0
  },
  { 
    id: '4', 
    name: 'James Miller', 
    email: 'james.m@example.com',
    preferredHub: 'Port Harcourt Space',
    joinDate: '2023-02-14',
    status: 'pending',
    bookings: 0
  }
];

const HubManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hubs");
  const [hubs, setHubs] = useState(initialHubs);
  const [managers, setManagers] = useState(initialManagers);
  const [learners, setLearners] = useState(initialLearners);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Handle hub creation
  const handleCreateHub = () => {
    toast({
      title: "Hub creation mode activated",
      description: "Please fill out the hub details in the form.",
    });
    // In a real app, this would open a modal or form for hub creation
  };
  
  // Handle manager account creation
  const handleCreateManager = () => {
    toast({
      title: "Create hub manager account",
      description: "Fill out the new manager's details and assign to a hub.",
    });
    // In a real app, this would open a modal or form for manager creation
  };
  
  // Handle approving a learner
  const handleApproveLearner = (id: string) => {
    setLearners(learners.map(learner => 
      learner.id === id ? { ...learner, status: 'active' } : learner
    ));
    
    toast({
      title: "Learner approved",
      description: "The learner account has been approved and activated.",
    });
  };
  
  // Handle disabling an account
  const handleToggleStatus = (id: string, type: 'hub' | 'manager' | 'learner') => {
    if (type === 'hub') {
      setHubs(hubs.map(hub => 
        hub.id === id ? { ...hub, status: hub.status === 'active' ? 'inactive' : 'active' } : hub
      ));
    } else if (type === 'manager') {
      setManagers(managers.map(manager => 
        manager.id === id ? { ...manager, status: manager.status === 'active' ? 'inactive' : 'active' } : manager
      ));
    } else if (type === 'learner') {
      setLearners(learners.map(learner => 
        learner.id === id ? { ...learner, status: learner.status === 'active' ? 'inactive' : 'active' } : learner
      ));
    }
    
    toast({
      title: "Status updated",
      description: `The ${type} status has been updated successfully.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto pb-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Hub Management</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Create and manage hubs, hub managers, and learner accounts
          </p>
        </div>

        <Tabs defaultValue="hubs" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 p-4">
            <TabsList className="grid grid-cols-3 max-w-md mb-4">
              <TabsTrigger value="hubs">Hubs</TabsTrigger>
              <TabsTrigger value="managers">Hub Managers</TabsTrigger>
              <TabsTrigger value="learners">Learners</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/30 backdrop-blur-sm border-white/30 focus-visible:ring-deskhive-navy"
                />
              </div>
              {activeTab === "hubs" && (
                <Button onClick={handleCreateHub} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Hub
                </Button>
              )}
              {activeTab === "managers" && (
                <Button onClick={handleCreateManager} className="bg-deskhive-navy hover:bg-deskhive-navy/90">
                  <UserPlus className="h-4 w-4 mr-2" />
                  New Manager
                </Button>
              )}
            </div>
          </Card>
          
          <TabsContent value="hubs" className="space-y-6">
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Workspace Hubs
                </CardTitle>
                <CardDescription>
                  Manage your DeskHive workspace hubs across different locations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white/10 hover:bg-white/20">
                        <TableHead>Hub Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Hub Managers</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hubs.map((hub) => (
                        <TableRow key={hub.id} className="hover:bg-white/10">
                          <TableCell className="font-medium">{hub.name}</TableCell>
                          <TableCell>{hub.location}</TableCell>
                          <TableCell>{hub.capacity} seats</TableCell>
                          <TableCell>{hub.managers.length > 0 ? hub.managers.join(', ') : 'No managers'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              hub.status === 'active' ? 'bg-green-100 text-green-800' : 
                              hub.status === 'maintenance' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {hub.status.charAt(0).toUpperCase() + hub.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleToggleStatus(hub.id, 'hub')}
                              >
                                {hub.status === 'active' ? 
                                  <XCircle className="h-4 w-4 text-red-500" /> : 
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                }
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
              <CardHeader>
                <CardTitle className="text-xl">Hub Analytics</CardTitle>
                <CardDescription>
                  Overview of hub performance and utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-deskhive-navy">{hubs.length}</div>
                    <div className="text-sm text-deskhive-darkgray/70">Total Hubs</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-deskhive-navy">
                      {hubs.reduce((acc, hub) => acc + hub.capacity, 0)}
                    </div>
                    <div className="text-sm text-deskhive-darkgray/70">Total Capacity</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-deskhive-navy">
                      {managers.length}
                    </div>
                    <div className="text-sm text-deskhive-darkgray/70">Hub Managers</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-deskhive-navy">
                      {hubs.filter(hub => hub.status === 'active').length}
                    </div>
                    <div className="text-sm text-deskhive-darkgray/70">Active Hubs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="managers" className="space-y-6">
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Hub Managers
                </CardTitle>
                <CardDescription>
                  Manage accounts for hub managers who oversee specific workspace locations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white/10 hover:bg-white/20">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Hub</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {managers.map((manager) => (
                        <TableRow key={manager.id} className="hover:bg-white/10">
                          <TableCell className="font-medium">{manager.name}</TableCell>
                          <TableCell>{manager.email}</TableCell>
                          <TableCell>{manager.hub}</TableCell>
                          <TableCell>{manager.role}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              manager.status === 'active' ? 'bg-green-100 text-green-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {manager.status.charAt(0).toUpperCase() + manager.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleToggleStatus(manager.id, 'manager')}
                              >
                                {manager.status === 'active' ? 
                                  <XCircle className="h-4 w-4 text-red-500" /> : 
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                }
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="learners" className="space-y-6">
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  DeskHive Learners
                </CardTitle>
                <CardDescription>
                  Manage and approve learner accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-white/10 hover:bg-white/20">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Preferred Hub</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {learners.map((learner) => (
                        <TableRow key={learner.id} className="hover:bg-white/10">
                          <TableCell className="font-medium">{learner.name}</TableCell>
                          <TableCell>{learner.email}</TableCell>
                          <TableCell>{learner.preferredHub}</TableCell>
                          <TableCell>{new Date(learner.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>{learner.bookings}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              learner.status === 'active' ? 'bg-green-100 text-green-800' : 
                              learner.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {learner.status === 'pending' ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleApproveLearner(learner.id)}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => handleToggleStatus(learner.id, 'learner')}
                                >
                                  {learner.status === 'active' ? 
                                    <XCircle className="h-4 w-4 text-red-500" /> : 
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  }
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
              <CardHeader>
                <CardTitle className="text-xl">Learner Registrations</CardTitle>
                <CardDescription>
                  Overview of learner account status and activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-deskhive-navy">
                      {learners.length}
                    </div>
                    <div className="text-sm text-deskhive-darkgray/70">Total Learners</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-deskhive-orange">
                      {learners.filter(l => l.status === 'pending').length}
                    </div>
                    <div className="text-sm text-deskhive-darkgray/70">Pending Approval</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {learners.reduce((acc, l) => acc + l.bookings, 0)}
                    </div>
                    <div className="text-sm text-deskhive-darkgray/70">Total Bookings</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HubManagement;
