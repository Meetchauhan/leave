import * as Yup from "yup";

export const LeaveScheme = Yup.object({
  days: Yup.number().required("This field is required"),
  startDate: Yup.string().required("This field is required"),
  holidays: Yup.array(
    Yup.string().required("This field is required")
  ).required("This field is required"),
});
