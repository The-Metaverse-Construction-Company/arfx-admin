import { Color } from "@material-ui/lab/Alert";
import { GenerateGuid } from "../utilities/StringHelpers";

export interface NotificationData {
  id: string;
  severity: Color;
  message: string;
}

const createNotification = (
  message: string,
  severity: Color
): NotificationData => {
  return {
    id: GenerateGuid(),
    message,
    severity,
  };
};

export const CreateSuccessNotification = (message: string) =>
  createNotification(message, "success");

export const CreateInfoNotification = (message: string) =>
  createNotification(message, "info");

export const CreateWarningNotification = (message: string) =>
  createNotification(message, "warning");

export const CreateErrorNotification = (message: string) =>
  createNotification(message, "error");
