export interface ControlledSubstance {
  id: string;
  name: string;
  schedule: 'II' | 'III' | 'IV' | 'V';
  genericName: string;
  brandNames: string[];
  maxDailyDose: string;
  requiresPrescription: boolean;
  prescriptionValidityDays: number;
  refillsAllowed: boolean;
  maxRefills: number;
}

export const CONTROLLED_SUBSTANCES = {
  scheduleII: [
    {
      id: 'oxy-500',
      name: 'Oxycodone 5mg',
      schedule: 'II',
      genericName: 'Oxycodone',
      brandNames: ['OxyContin', 'Roxicodone'],
      maxDailyDose: '40mg',
      requiresPrescription: true,
      prescriptionValidityDays: 30,
      refillsAllowed: false,
      maxRefills: 0
    },
    {
      id: 'adderall-30',
      name: 'Adderall 30mg',
      schedule: 'II',
      genericName: 'Amphetamine/Dextroamphetamine',
      brandNames: ['Adderall XR'],
      maxDailyDose: '60mg',
      requiresPrescription: true,
      prescriptionValidityDays: 30,
      refillsAllowed: false,
      maxRefills: 0
    }
  ],
  scheduleIII: [
    {
      id: 'codeine-30',
      name: 'Codeine/APAP 30/300mg',
      schedule: 'III',
      genericName: 'Codeine/Acetaminophen',
      brandNames: ['Tylenol with Codeine'],
      maxDailyDose: '360mg codeine/4000mg APAP',
      requiresPrescription: true,
      prescriptionValidityDays: 180,
      refillsAllowed: true,
      maxRefills: 5
    }
  ],
  scheduleIV: [
    {
      id: 'xanax-1',
      name: 'Xanax 1mg',
      schedule: 'IV',
      genericName: 'Alprazolam',
      brandNames: ['Xanax'],
      maxDailyDose: '4mg',
      requiresPrescription: true,
      prescriptionValidityDays: 180,
      refillsAllowed: true,
      maxRefills: 5
    },
    {
      id: 'valium-5',
      name: 'Valium 5mg',
      schedule: 'IV',
      genericName: 'Diazepam',
      brandNames: ['Valium'],
      maxDailyDose: '40mg',
      requiresPrescription: true,
      prescriptionValidityDays: 180,
      refillsAllowed: true,
      maxRefills: 5
    }
  ]
} as const;