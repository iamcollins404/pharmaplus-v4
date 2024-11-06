export interface Prescription {
  id: string;
  prescriptionNumber: string;
  prescriptionDate: string;
  expiryDate: string;
  patientId: string;
  patientName: string;
  prescriberId: string;
  prescriberName: string;
  prescriberDEA: string;
  medicationId: string;
  medicationName: string;
  schedule: 'II' | 'III' | 'IV' | 'V';
  quantity: number;
  dosage: string;
  refills: number;
  refillsRemaining: number;
  status: 'valid' | 'expired' | 'filled' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionValidationResult {
  isValid: boolean;
  errors: string[];
  prescription?: Prescription;
}