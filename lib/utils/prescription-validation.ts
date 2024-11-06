import { Prescription, PrescriptionValidationResult } from "@/types/prescription";
import { CONTROLLED_SUBSTANCES } from "@/lib/constants/controlled-substances";

export function validatePrescription(
  prescriptionData: Partial<Prescription>,
  file?: File
): Promise<PrescriptionValidationResult> {
  return new Promise((resolve) => {
    const errors: string[] = [];

    // Required fields validation
    if (!prescriptionData.prescriptionNumber) {
      errors.push("Prescription number is required");
    }

    if (!prescriptionData.prescriberDEA) {
      errors.push("DEA number is required");
    } else {
      // DEA number format validation (example format: AB1234563)
      const deaRegex = /^[A-Z]{2}\d{7}$/;
      if (!deaRegex.test(prescriptionData.prescriberDEA)) {
        errors.push("Invalid DEA number format");
      }
    }

    // Date validations
    const prescriptionDate = prescriptionData.prescriptionDate 
      ? new Date(prescriptionData.prescriptionDate)
      : null;
    const expiryDate = prescriptionData.expiryDate 
      ? new Date(prescriptionData.expiryDate)
      : null;

    if (prescriptionDate && prescriptionDate > new Date()) {
      errors.push("Prescription date cannot be in the future");
    }

    if (expiryDate && prescriptionDate && expiryDate <= prescriptionDate) {
      errors.push("Expiry date must be after prescription date");
    }

    // File validation
    if (!file) {
      errors.push("Prescription document is required");
    } else {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        errors.push("Invalid file type. Please upload a PDF or image file");
      }
    }

    // Medication validation
    if (prescriptionData.medicationId) {
      const medication = Object.values(CONTROLLED_SUBSTANCES)
        .flat()
        .find(med => med.id === prescriptionData.medicationId);

      if (medication) {
        if (medication.schedule === 'II' && prescriptionData.refills > 0) {
          errors.push("Schedule II medications cannot have refills");
        }

        if (medication.schedule !== 'II' && prescriptionData.refills > medication.maxRefills) {
          errors.push(`Maximum ${medication.maxRefills} refills allowed for this medication`);
        }
      }
    }

    // Simulate server validation delay
    setTimeout(() => {
      if (errors.length === 0) {
        resolve({
          isValid: true,
          errors: [],
          prescription: {
            ...prescriptionData,
            id: Math.random().toString(36).substr(2, 9),
            status: 'valid',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          } as Prescription
        });
      } else {
        resolve({
          isValid: false,
          errors
        });
      }
    }, 1000);
  });
}