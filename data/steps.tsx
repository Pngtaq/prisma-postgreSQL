import { Area1, Area2, Area3, Area4, Area5, Area6 } from "./indicators";

// Steps for the multistep form
export const steps = [
  {
    id: "step-1",
    name: "Introduction",
    fields: [],
  },
  {
    id: "step-2",
    name: "Area 1: Health & Nutrition",
    fields: ["area1"],
    title: "Area 1: Health Nutrition and Safety",
    description: "Section A: HEALTH AND NUTRITION SERVICES for infants, toddlers and young children",
    areaNumber: 1,
    data: Area1,
  },
  {
    id: "step-3",
    name: "Area 2: Safety",
    fields: ["area2"],
    title: "Area 2: Safety Protocols",
    description: "Safety measures and emergency procedures for children's protection",
    areaNumber: 2,
    data: Area2,
  },
  {
    id: "step-4",
    name: "Area 3: Curriculum",
    fields: ["area3"],
    title: "Area 3: Educational Curriculum",
    description: "Curriculum and learning activities for child development",
    areaNumber: 3,
    data: Area3,
  },
  {
    id: "step-5",
    name: "Area 4: Environment",
    fields: ["area4"],
    title: "Area 4: Learning Environment",
    description: "Physical spaces and materials for learning and play",
    areaNumber: 4,
    data: Area4,
  },
  {
    id: "step-6",
    name: "Area 5: Staffing",
    fields: ["area5"],
    title: "Area 5: Staff Qualifications",
    description: "Staff qualifications, ratios, and professional development",
    areaNumber: 5,
    data: Area5,
  },
  {
    id: "step-7",
    name: "Area 6: Family",
    fields: ["area6"],
    title: "Area 6: Family Engagement",
    description: "Parent communication and involvement in children's development",
    areaNumber: 6,
    data: Area6,
  },
  {
    id: "step-8",
    name: "Review & Submit",
    fields: [],
  },
];
