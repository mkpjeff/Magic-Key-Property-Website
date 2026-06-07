import { makeEnquiryHandler } from "../../api-lib/forward.js";
import { SubmitMortgageEnquiryBody } from "../../api-lib/schemas.js";

export default makeEnquiryHandler(
  "Mortgage",
  SubmitMortgageEnquiryBody,
  "Your mortgage enquiry has been received. We will be in touch shortly.",
);
