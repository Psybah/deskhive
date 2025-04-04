
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkspaceCardProps {
  workspace: {
    id: string;
    name: string;
    type: string;
    location: string;
    capacity: number;
    description: string;
    features: string[];
    pricePerHour: number;
    image: string;
    availability: string;
    enabled?: boolean;
  };
  onBook: () => void;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace, onBook }) => {
  // If workspace is disabled or workspace is null, don't render it
  if (!workspace || workspace.enabled === false) {
    return null;
  }
  
  return (
    <div className="glass-card overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/20 backdrop-blur-lg border border-white/30">
      <div 
        className="h-48 relative bg-cover bg-center" 
        style={{ 
          backgroundImage: workspace.image 
            ? `url(${workspace.image})` 
            : `linear-gradient(135deg, #022B60 0%, #0056B3 100%)` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <Badge 
            className={cn(
              "mb-2",
              workspace.availability === "High" 
                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                : workspace.availability === "Medium" 
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                : "bg-red-100 text-red-800 hover:bg-red-100"
            )}
          >
            {workspace.availability} Availability
          </Badge>
          <h3 className="text-white text-xl font-bold">{workspace.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-deskhive-darkgray/80">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {workspace.location}
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                {workspace.capacity} {workspace.capacity === 1 ? "person" : "people"}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="bg-deskhive-skyblue/50 text-deskhive-navy font-normal">
            {workspace.type}
          </Badge>
        </div>
        
        <p className="text-deskhive-darkgray/80 text-sm mb-4">
          {workspace.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {workspace.features.map((feature, index) => (
            <Badge key={index} variant="outline" className="bg-deskhive-skyblue/30 border-none text-deskhive-darkgray/90">
              {feature}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-deskhive-navy font-semibold">
            {/* Removed price display */}
            <span className="text-sm font-normal text-deskhive-darkgray/70">View details</span>
          </div>
          <Button onClick={onBook} className="btn-primary">
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;
