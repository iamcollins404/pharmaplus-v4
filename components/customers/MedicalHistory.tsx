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
import { Plus } from "lucide-react";

interface MedicalHistoryProps {
  customerId: string;
}

// Sample data - replace with actual data from your backend
const medicalHistory = [
  {
    id: "1",
    condition: "Hypertension",
    diagnosedDate: "2023-05-15",
    status: "Active",
    notes: "Under medication",
  },
  {
    id: "2",
    condition: "Type 2 Diabetes",
    diagnosedDate: "2022-08-20",
    status: "Active",
    notes: "Regular monitoring required",
  },
  // Add more medical history entries
];

export function MedicalHistory({ customerId }: MedicalHistoryProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Medical History</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Condition
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Condition</TableHead>
            <TableHead>Diagnosed Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalHistory.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.condition}</TableCell>
              <TableCell>{new Date(entry.diagnosedDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {entry.status}
                </span>
              </TableCell>
              <TableCell>{entry.notes}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}