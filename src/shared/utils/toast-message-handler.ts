import { toast } from "sonner";

export function toastMessageHandler(error: Error) {
  if (error.message) {
    const { message } = error;

    const firstDotIndex = message.indexOf(".");

    if (firstDotIndex !== -1) {
      toast.error(message.slice(0, firstDotIndex), {
        description: message.slice(firstDotIndex + 1),
      });
    } else {
      toast.error(message);
    }
  } else {
    toast.error("Server error");
  }
}
