
import React, { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, Filter, X, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { workspaces } from "@/data/workspaces";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BookingModal from "@/components/dashboard/BookingModal";

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [filters, setFilters] = useState<string[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);

  const filterLocations = [...new Set(workspaces.map(w => w.location))];
  const filterTypes = [...new Set(workspaces.map(w => w.type))];

  const addFilter = (type: string, value: string) => {
    const filterString = `${type}:${value}`;
    if (!filters.includes(filterString)) {
      setFilters([...filters, filterString]);
    }
  };

  const removeFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
    const [type, value] = filter.split(':');
    if (type === 'location') setSelectedLocation(undefined);
    if (type === 'type') setSelectedType(undefined);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    addFilter('location', value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    addFilter('type', value);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      const formattedDate = format(newDate, 'yyyy-MM-dd');
      addFilter('date', formattedDate);
    }
  };

  const filteredWorkspaces = workspaces.filter(workspace => {
    // Apply search query filter
    if (searchQuery && !workspace.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply selected filters
    for (const filter of filters) {
      const [type, value] = filter.split(':');
      
      if (type === 'location' && workspace.location !== value) {
        return false;
      }
      
      if (type === 'type' && workspace.type !== value) {
        return false;
      }
      
      // For date filter, we'd need to check availability but we're simplifying for now
    }
    
    return true;
  });

  const handleBookWorkspace = (workspace: any) => {
    setSelectedWorkspace(workspace);
    setShowBookingModal(true);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Welcome to DeskHive</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Book your ideal workspace and manage your reservations with ease.
          </p>
        </div>
        
        {/* Search and filter section */}
        <div className="bg-white glass-card p-4 md:p-6 mb-6 md:mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4 md:mb-6">
            <div className="relative flex-1 w-full">
              <Input
                type="text"
                placeholder="Search workspaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-input w-full"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/50">
                <Filter className="h-5 w-5" />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Select value={selectedLocation} onValueChange={handleLocationChange}>
                <SelectTrigger className="w-full md:w-[140px] lg:w-[180px] glass-input">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {filterLocations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedType} onValueChange={handleTypeChange}>
                <SelectTrigger className="w-full md:w-[140px] lg:w-[180px] glass-input">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {filterTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="glass-input border-deskhive-coolgray w-full md:w-auto flex-shrink-0">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span className="truncate">
                      {date ? format(date, 'PP') : 'Pick date'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Applied filters */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.map(filter => {
                const [type, value] = filter.split(':');
                let displayValue = value;
                
                if (type === 'date') {
                  displayValue = format(new Date(value), 'PP');
                }
                
                return (
                  <Badge key={filter} variant="secondary" className="bg-deskhive-navy/10 text-deskhive-navy gap-1 pl-2 pr-1 py-1">
                    <span className="text-xs truncate">{type}: {displayValue}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 bg-transparent hover:bg-deskhive-navy/20 text-deskhive-navy/70 rounded-full"
                      onClick={() => removeFilter(filter)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
              
              {filters.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-deskhive-navy hover:bg-deskhive-navy/10 h-7 text-xs"
                  onClick={() => setFilters([])}
                >
                  Clear all
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Workspaces grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-deskhive-navy mb-4">
            Available Workspaces
            {date && <span className="font-normal text-deskhive-darkgray ml-2 text-sm md:text-base">
              for {format(date, 'MMMM d, yyyy')}
            </span>}
          </h2>
          
          {filteredWorkspaces.length === 0 ? (
            <div className="glass-card p-6 md:p-8 text-center">
              <div className="mb-4 text-deskhive-darkgray/70">
                <Calendar className="h-10 w-10 md:h-12 md:w-12 mx-auto" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-deskhive-navy mb-2">No workspaces found</h3>
              <p className="text-sm md:text-base text-deskhive-darkgray/80 mb-4">
                Try adjusting your filters or search query to find available workspaces.
              </p>
              <Button 
                variant="outline" 
                className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5"
                onClick={() => setFilters([])}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredWorkspaces.map(workspace => (
                <WorkspaceCard 
                  key={workspace.id}
                  workspace={workspace}
                  onBook={() => handleBookWorkspace(workspace)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Stats */}
        <div className="glass-card p-4 md:p-6 overflow-hidden">
          <h2 className="text-lg md:text-xl font-semibold text-deskhive-navy mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-deskhive-coolgray/30">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-deskhive-orange/10 rounded-lg">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 text-deskhive-orange" />
                </div>
                <div>
                  <p className="text-deskhive-darkgray/70 text-xs md:text-sm">Upcoming Bookings</p>
                  <p className="text-xl md:text-2xl font-semibold text-deskhive-navy">3</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-deskhive-coolgray/30">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-deskhive-royal/10 rounded-lg">
                  <Clock className="h-5 w-5 md:h-6 md:w-6 text-deskhive-royal" />
                </div>
                <div>
                  <p className="text-deskhive-darkgray/70 text-xs md:text-sm">Hours Booked</p>
                  <p className="text-xl md:text-2xl font-semibold text-deskhive-navy">24</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-deskhive-coolgray/30">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-green-100 rounded-lg">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-deskhive-darkgray/70 text-xs md:text-sm">Favorite Location</p>
                  <p className="text-xl md:text-2xl font-semibold text-deskhive-navy">Lagos</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-deskhive-coolgray/30">
              <div className="flex items-center gap-3">
                <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-deskhive-darkgray/70 text-xs md:text-sm">Team Meetings</p>
                  <p className="text-xl md:text-2xl font-semibold text-deskhive-navy">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showBookingModal && selectedWorkspace && (
        <BookingModal
          workspace={selectedWorkspace}
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          selectedDate={date}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
