export const calculateDayColor = (day) => {
  switch (day) {
    case "MONDAY AM":
    case "MONDAY PM":
      return "badge badge-warning gap-2";
    case "TUESDAY AM":
    case "TUESDAY PM":
      return "badge badge-secondary gap-2";
    case "WEDNESDAY AM":
    case "WEDNESDAY PM":
      return "badge badge-accent gap-2";
    case "THURSDAY AM":
    case "THURSDAY PM":
      return "badge badge-warning badge-outline gap-2";
    case "FRIDAY AM":
    case "FRIDAY PM":
      return "badge badge-info gap-2";
    default:
      return "";
  }
};
