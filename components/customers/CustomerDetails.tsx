"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CustomerInfo } from "./CustomerInfo";
import { MedicalHistory } from "./MedicalHistory";
import { PrescriptionHistory } from "./PrescriptionHistory";
import { PharmacyInfo } from "./PharmacyInfo";

interface CustomerDetailsProps {
  customerId: string;
}

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  return (
    <Card className="h-[600px]">
      <Tabs defaultValue="info" className="h-full">
        <TabsList className="w-full justify-start border-b rounded-none px-4 pb-px">
          <TabsTrigger value="info">Personal Info</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="pharmacy">Pharmacy Info</TabsTrigger>
        </TabsList>
        <div className="p-4">
          <TabsContent value="info" className="m-0">
            <CustomerInfo customerId={customerId} />
          </TabsContent>
          <TabsContent value="medical" className="m-0">
            <MedicalHistory customerId={customerId} />
          </TabsContent>
          <TabsContent value="prescriptions" className="m-0">
            <PrescriptionHistory customerId={customerId} />
          </TabsContent>
          <TabsContent value="pharmacy" className="m-0">
            <PharmacyInfo customerId={customerId} />
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}