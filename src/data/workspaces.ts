
export const workspaces = [
  {
    id: "ws-001",
    name: "RALNO HUB AKOWONJO",
    type: "Meeting Room",
    location: "Lagos",
    capacity: 8,
    description: "Spacious meeting room with premium amenities, perfect for important client meetings and presentations.",
    features: ["Projector", "Whiteboard", "Video conferencing", "Refreshments"],
    pricePerHour: 5000,
    image: "",
    availability: "High",
    enabled: true
  },
  {
    id: "ws-002",
    name: "Workbay Ajah",
    type: "Hot Desk",
    location: "Lagos",
    capacity: 12,
    description: "Comfortable workspace in our open-plan area with high-speed internet and power outlets.",
    features: ["Power outlets", "High-speed internet", "Adjustable chair", "Natural lighting"],
    pricePerHour: 1500,
    image: "",
    availability: "Medium",
    enabled: true
  },
  {
    id: "ws-003",
    name: "Costain Hub 4th Floor (n)",
    type: "Private Office",
    location: "Lagos",
    capacity: 4,
    description: "Fully furnished private office with secure access and dedicated amenities for small teams.",
    features: ["Secure access", "Dedicated printer", "Storage cabinets", "Coffee machine"],
    pricePerHour: 3500,
    image: "",
    availability: "High",
    enabled: true
  },
  {
    id: "ws-004",
    name: "Costain Hub 5th Floor",
    type: "Event Space",
    location: "Lagos",
    capacity: 30,
    description: "Large open space ideal for workshops, training sessions, and team-building activities.",
    features: ["Modular furniture", "AV equipment", "Catering services", "Stage setup"],
    pricePerHour: 10000,
    image: "",
    availability: "Low",
    enabled: true
  }
];

// Sample check-in data
export const checkIns = [
  { 
    id: "check-1", 
    learnerId: "user-001",
    learnerName: "John Doe", 
    email: "john.doe@example.com", 
    hubId: "ws-001",
    hub: "RALNO HUB AKOWONJO", 
    checkInTime: new Date(2023, 9, 15, 9, 30).toISOString(), 
    checkOutTime: new Date(2023, 9, 15, 16, 45).toISOString(),
    status: "completed"
  },
  { 
    id: "check-2", 
    learnerId: "user-002",
    learnerName: "Jane Smith", 
    email: "jane.smith@example.com", 
    hubId: "ws-002",
    hub: "Workbay Ajah", 
    checkInTime: new Date(2023, 9, 15, 10, 15).toISOString(), 
    status: "active"
  },
  { 
    id: "check-3", 
    learnerId: "user-003",
    learnerName: "David Wilson", 
    email: "david.wilson@example.com", 
    hubId: "ws-003",
    hub: "Costain Hub 4th Floor (n)", 
    checkInTime: new Date(2023, 9, 14, 13, 0).toISOString(), 
    checkOutTime: new Date(2023, 9, 14, 17, 30).toISOString(),
    status: "completed"
  }
];
