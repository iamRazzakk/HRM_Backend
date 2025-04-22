import { presentStatus } from "../../enum/presentStatus";

export type IAttendance = {
  userId: string;
  date:Date;
  timeIn: string;
  timeOut: string;
  status: presentStatus;
  methodSignIn: "biometic" | "manual";
  methodSignOut?: "biometic" | "manual";
  verifyStatus: boolean;
}