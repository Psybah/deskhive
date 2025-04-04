import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Calendar as CalendarIcon, Edit, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { bookings } from "@/data/bookings";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { workspaces } from "@/data/workspaces"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MyBookings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  
  // Reschedule state
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>();
  const [rescheduleStartTime, setRescheduleStartTime] = useState("");
  const [rescheduleEndTime, setRescheduleEndTime] = useState("");
  
  // Extend state
  const [extendEndTime, setExtendEndTime] = useState("");

  const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= new Date());
  const pastBookings = bookings.filter(booking => new Date(booking.date) < new Date());

  const handleDelete = (booking: any) => {
    setSelectedBooking(booking);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would make an API call here
    toast({
      title: "Booking cancelled",
      description: `Your booking for ${selectedBooking?.workspace?.name || 'the workspace'} has been cancelled.`,
    });
    setDeleteDialogOpen(false);
  };

  const handleReschedule = (booking: any) => {
    setSelectedBooking(booking);
    setRescheduleDate(new Date(booking.date));
    setRescheduleStartTime(booking.startTime);
    setRescheduleEndTime(booking.endTime);
    setRescheduleDialogOpen(true);
  };

  const confirmReschedule = () => {
    if (!rescheduleDate || !rescheduleStartTime || !rescheduleEndTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to reschedule your booking.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would make an API call here
    toast({
      title: "Booking rescheduled",
      description: `Your booking for ${selectedBooking?.workspace?.name || 'the workspace'} has been rescheduled to ${format(rescheduleDate, 'MMMM d, yyyy')}.`,
    });
    setRescheduleDialogOpen(false);
  };

  const handleExtend = (booking: any) => {
    setSelectedBooking(booking);
    setExtendEndTime(booking.endTime);
    setExtendDialogOpen(true);
  };

  const confirmExtend = () => {
    if (!extendEndTime) {
      toast({
        title: "Missing information",
        description: "Please select a new end time.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would make an API call here
    toast({
      title: "Booking extended",
      description: `Your booking for ${selectedBooking?.workspace?.name || 'the workspace'} has been extended until ${extendEndTime}.`,
    });
    setExtendDialogOpen(false);
  };

  const renderBookingCard = (booking: any, isPast = false) => {
    // Get workspace from booking or find by ID with a fallback for when workspace is undefined
    const workspace = booking.workspace || 
                     workspaces.find(w => w.id === booking.workspaceId) || 
                     { name: "Unnamed Workspace", location: "Unknown Location" };
    
    return (
      <div key={booking.id} className="glass-card p-6 mb-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge 
                variant="outline" 
                className={cn(
                  "font-normal px-2 py-0.5",
                  booking.status === "confirmed" ? "bg-green-100 text-green-800 border-green-200" : 
                  booking.status === "pending" ? "bg-yellow-100 text-yellow-800 border-yellow-200" : 
                  "bg-red-100 text-red-800 border-red-200"
                )}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
              <h3 className="text-lg font-medium text-deskhive-navy">{workspace.name}</h3>
            </div>
            
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-deskhive-darkgray/80 mt-2">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(new Date(booking.date), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {booking.startTime} - {booking.endTime}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {workspace.location}
              </div>
              {booking.participants > 0 && (
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {booking.participants} {booking.participants === 1 ? 'person' : 'people'}
                </div>
              )}
            </div>
            
            {booking.notes && (
              <p className="mt-3 text-sm text-deskhive-darkgray/90 border-l-2 border-deskhive-orange pl-3">
                {booking.notes}
              </p>
            )}
          </div>
          
          {!isPast && (
            <div className="flex gap-2 self-start">
              <Button
                variant="outline"
                size="sm"
                className="text-deskhive-royal border-deskhive-royal/30 hover:bg-deskhive-royal/10"
                onClick={() => handleReschedule(booking)}
              >
                <Edit className="h-4 w-4 mr-1" />
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-deskhive-orange border-deskhive-orange/30 hover:bg-deskhive-orange/10"
                onClick={() => handleExtend(booking)}
              >
                <ArrowRight className="h-4 w-4 mr-1" />
                Extend
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600/30 hover:bg-red-600/10"
                onClick={() => handleDelete(booking)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deskhive-navy mb-2">My Bookings</h1>
          <p className="text-deskhive-darkgray/80">
            View, reschedule, extend or cancel your workspace bookings.
          </p>
        </div>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-white glass-card p-6 mb-8">
            <TabsList className="grid grid-cols-2 w-[400px] max-w-full mb-6">
              <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
              <TabsTrigger value="past">Past Bookings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-deskhive-darkgray/40 mb-4" />
                  <h3 className="text-xl font-medium text-deskhive-navy mb-2">No upcoming bookings</h3>
                  <p className="text-deskhive-darkgray/80 mb-6 max-w-md mx-auto">
                    You don't have any upcoming workspace bookings. Book a workspace to see it here.
                  </p>
                  <Button asChild>
                    <a href="/dashboard">Book a Workspace</a>
                  </Button>
                </div>
              ) : (
                <div>
                  {upcomingBookings.map(booking => renderBookingCard(booking))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="space-y-4">
              {pastBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-deskhive-darkgray/40 mb-4" />
                  <h3 className="text-xl font-medium text-deskhive-navy mb-2">No booking history</h3>
                  <p className="text-deskhive-darkgray/80 mb-6 max-w-md mx-auto">
                    You don't have any past workspace bookings.
                  </p>
                </div>
              ) : (
                <div>
                  {pastBookings.map(booking => renderBookingCard(booking, true))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
        
        {/* Quick reminders */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-deskhive-navy mb-4">Reminders</h2>
          
          <Alert className="bg-deskhive-orange/10 border-deskhive-orange/20 mb-4">
            <CalendarIcon className="h-4 w-4 text-deskhive-orange" />
            <AlertTitle className="text-deskhive-orange font-medium">Upcoming booking tomorrow</AlertTitle>
            <AlertDescription className="text-deskhive-darkgray">
              You have a booking for "Executive Meeting Room" tomorrow at 10:00 AM.
            </AlertDescription>
          </Alert>
          
          <Alert className="bg-deskhive-navy/10 border-deskhive-navy/20">
            <Clock className="h-4 w-4 text-deskhive-navy" />
            <AlertTitle className="text-deskhive-navy font-medium">Booking Policy Reminder</AlertTitle>
            <AlertDescription className="text-deskhive-darkgray">
              Please cancel bookings at least 2 hours in advance to free up space for others.
            </AlertDescription>
          </Alert>
        </div>
      </div>
      
      {/* Cancel Booking Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="bg-gray-50 p-4 rounded-md text-sm">
              <p className="font-medium text-deskhive-navy mb-1">
                {selectedBooking.workspace?.name || "Unnamed Workspace"}
              </p>
              <p className="text-deskhive-darkgray/80">
                {format(new Date(selectedBooking.date), 'MMMM d, yyyy')} • {selectedBooking.startTime} - {selectedBooking.endTime}
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reschedule Dialog */}
      <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogDescription>
              Select a new date and time for your booking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="date">New Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {rescheduleDate ? (
                        format(rescheduleDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={rescheduleDate}
                      onSelect={setRescheduleDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Select value={rescheduleStartTime} onValueChange={setRescheduleStartTime}>
                    <SelectTrigger id="startTime">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Select value={rescheduleEndTime} onValueChange={setRescheduleEndTime}>
                    <SelectTrigger id="endTime">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="bg-deskhive-navy/5 p-3 rounded-md text-sm">
                <p className="font-medium text-deskhive-navy mb-1">Original Booking</p>
                <p className="text-deskhive-darkgray/80">
                  {format(new Date(selectedBooking.date), 'MMMM d, yyyy')} • {selectedBooking.startTime} - {selectedBooking.endTime}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmReschedule}>
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Extend Dialog */}
      <Dialog open={extendDialogOpen} onOpenChange={setExtendDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Extend Booking</DialogTitle>
            <DialogDescription>
              Select a new end time to extend your booking.
            </DialogDescription>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-4 py-2">
              <div className="bg-deskhive-navy/5 p-3 rounded-md text-sm mb-4">
                <p className="font-medium text-deskhive-navy mb-1">Current Booking</p>
                <p className="text-deskhive-darkgray/80">
                  {format(new Date(selectedBooking.date), 'MMMM d, yyyy')} • {selectedBooking.startTime} - {selectedBooking.endTime}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newEndTime">New End Time</Label>
                <Select value={extendEndTime} onValueChange={setExtendEndTime}>
                  <SelectTrigger id="newEndTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"].map(time => {
                      // Only show times after the current end time
                      const currentEndHour = parseInt(selectedBooking.endTime.split(":")[0]);
                      const optionHour = parseInt(time.split(":")[0]);
                      if (optionHour <= currentEndHour) return null;
                      
                      return (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      );
                    }).filter(Boolean)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setExtendDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmExtend}>
              Confirm Extension
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default MyBookings;
