import { makeEnquiryHandler } from "../../api-lib/forward.js";
import { SubmitBtlEnquiryBody } from "../../api-lib/schemas.js";

export default makeEnquiryHandler(
  "BTL Property Investment",
  SubmitBtlEnquiryBody,
  "Your BTL enquiry has been received. We will be in touch shortly.",
);
