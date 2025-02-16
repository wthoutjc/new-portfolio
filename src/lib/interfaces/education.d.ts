import { JsonValue } from "@prisma/client/runtime/library";

export interface Education {
  id: string;
  title: string;
  institution: string;
  educationType: string;
  startDate: Date;
  endDate: Date | null;
  currentlyStudying: boolean;
  description: string | null;
  multimedia: JsonValue;
}
