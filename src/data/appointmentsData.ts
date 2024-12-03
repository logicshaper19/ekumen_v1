export interface Appointment {
  id: string;
  title: string;
  partnerId: string;
  partnerName: string;
  organization: string;
  date: string;
  time: string;
  type: 'meeting' | 'visit' | 'inspection' | 'consultation';
  location: string;
  status: 'scheduled' | 'confirmed' | 'pending';
}

export const appointments: Appointment[] = [
  {
    id: "a1",
    title: "Soil Health Assessment",
    partnerId: "p1",
    partnerName: "Marie Laurent",
    organization: "Chambre d'Agriculture",
    date: "2024-03-25",
    time: "14:00",
    type: "inspection",
    location: "North Field",
    status: "confirmed"
  },
  {
    id: "a2",
    title: "Loan Application Meeting",
    partnerId: "p2",
    partnerName: "Jean Dupont",
    organization: "Crédit Agricole",
    date: "2024-03-26",
    time: "10:00",
    type: "meeting",
    location: "Bank Office",
    status: "scheduled"
  },
  {
    id: "a3",
    title: "Insurance Assessment",
    partnerId: "p3",
    partnerName: "Pierre Martin",
    organization: "Groupama",
    date: "2024-03-27",
    time: "09:30",
    type: "visit",
    location: "Farm Office",
    status: "confirmed"
  },
  {
    id: "a4",
    title: "Technical Consultation",
    partnerId: "p2",
    partnerName: "Marie Laurent",
    organization: "Chambre d'Agriculture",
    date: "2024-03-28",
    time: "15:00",
    type: "consultation",
    location: "South Field",
    status: "scheduled"
  },
  {
    id: "a5",
    title: "Equipment Financing Review",
    partnerId: "p1",
    partnerName: "Jean Dupont",
    organization: "Crédit Agricole",
    date: "2024-03-29",
    time: "11:00",
    type: "meeting",
    location: "Bank Office",
    status: "pending"
  }
];