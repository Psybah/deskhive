
import React, { useState } from "react";
import { workspaces } from "@/data/workspaces";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import BookingModal from "@/components/dashboard/BookingModal";
import FilterModal from "@/components/dashboard/FilterModal";
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Search, 
  SlidersHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [selectedWorkspace, setSelectedWorkspace] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleBookWorkspace = (workspace: any) => {
    setSelectedWorkspace(workspace);
    setIsBookingModalOpen(true);
  };

  const handleApplyFilters = (filters: any) => {
    console.log("Applied filters:", filters);
    setFilters(filters);
    // In a real app, you would filter the workspaces based on these filters
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-deskhive-navy mb-2">Find Your Workspace</h1>
          <p className="text-sm md:text-base text-deskhive-darkgray/80">
            Browse and book available workspaces for your next meeting or work session.
          </p>
        </div>

        {/* Quick Stats - Modified to be smaller and 2 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardContent className="flex items-center p-4">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <MapPin className="h-5 w-5 text-deskhive-navy" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{workspaces.length}</h2>
                <p className="text-sm text-deskhive-darkgray/70">Available Hubs</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card bg-white/20 backdrop-blur-lg border border-white/30">
            <CardContent className="flex items-center p-4">
              <div className="p-3 rounded-full bg-orange-100 mr-4">
                <CalendarIcon className="h-5 w-5 text-deskhive-orange" />
              </div>
              <div>
                <h2 className="text-lg font-bold">3</h2>
                <p className="text-sm text-deskhive-darkgray/70">Your Upcoming Bookings</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/30 backdrop-blur-sm border-white/30 focus-visible:ring-deskhive-navy"
            />
          </div>
          <Button 
            onClick={openFilterModal} 
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 text-deskhive-navy hover:bg-white/30"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-deskhive-navy">Available Hubs</h2>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.filter(workspace => workspace.enabled).map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onBook={() => handleBookWorkspace(workspace)}
            />
          ))}
        </div>

        {/* Booking Modal */}
        {selectedWorkspace && (
          <BookingModal
            workspace={selectedWorkspace}
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
          />
        )}

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
