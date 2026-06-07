import { makeEnquiryHandler } from "../../api-lib/forward.js";
import { SubmitTaxEnquiryBody } from "../../api-lib/schemas.js";

export default makeEnquiryHandler(
  "Tax, Accounting & Limited Company Formation",
  SubmitTaxEnquiryBody,
  "Your enquiry has been received. We will be in touch shortly.",
);
