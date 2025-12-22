import { PlanRecord } from "../types/plan-record.types";
import { PlanRegisterItem } from "../types/plan-register.types";

export function mapPlanRecordToTableItem(planRecord: PlanRecord): PlanRegisterItem {
  return {
    id: planRecord.id,
    registrationDate: planRecord.registrationDate,
    planNumber: planRecord.planNumber,
    orderNumber: planRecord.orderNumber,
    customer: planRecord.customer,
    metalGrade: planRecord.metalBrand.name,
    metalThickness: planRecord.metalThickness,
    files: String(planRecord._count?.files || 0),
  };
}

