"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

interface PrescriptionHistoryProps {
  customerId: string;
}

// Sample data - replace with actual data from your backend
const prescriptions = [
  {
    id: "1",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescribedDate: "2024-03-01",
    expiryDate: "2024-09-01",
    refillsRemaining: 2,
    doctor: "Dr. Sarah Johnson",
    status: "Active",
  },
  {
    id: "2",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescribedDate: "2024-02-15",
    expiryDate: "2024-08-15",
    refillsRemaining: 3,
    doctor: "Dr. Michael Chen",
    status: "Active",
  },
  // Add more prescriptions
];

export function PrescriptionHistory({ customerId }: PrescriptionHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Prescription History</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Prescription
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medication</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Prescribed</TableHead>
            <TableHead>Refills</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prescriptions.map((prescription) => (
            <TableRow key={prescription.id}>
              <TableCell className="font-medium">
                {prescription.medication}
                <div className="text-sm text-muted-foreground">
                  {prescription.frequency}
                </div>
              </TableCell>
              <TableCell>{prescription.dosage}</TableCell>
              <TableCell>
                {new Date(prescription.prescribedDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{prescription.refillsRemaining}</TableCell>
              <TableCell>{prescription.doctor}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {prescription.status}
                </span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}