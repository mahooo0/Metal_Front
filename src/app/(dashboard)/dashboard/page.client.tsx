import { Upload } from "lucide-react";

import DashboardContentDnd from "@/features/dashboard/ui/content-dnd";
import ContentHeader from "@/features/dashboard/ui/content-header";

import { DatePicker } from "@/shared/ui/date-picked";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

export function DashboardPageClient() {
  return (
    <div>
      <ContentHeader />
      <DashboardContentDnd />
    </div>
  );
}
