import { Router, type IRouter } from "express";
import {
  SubmitBtlEnquiryBody,
  SubmitMortgageEnquiryBody,
  SubmitTaxEnquiryBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Helper to forward a validated enquiry payload to the webhook URL
async function forwardToWebhook(
  formType: string,
  payload: unknown,
): Promise<void> {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    throw new Error("WEBHOOK_URL environment variable is not set");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formType, submittedAt: new Date().toISOString(), ...payload as object }),
  });

  if (!response.ok) {
    throw new Error(
      `Webhook responded with ${response.status}: ${response.statusText}`,
    );
  }
}

// POST /enquiries/btl — BTL Property Investment Enquiry
router.post("/enquiries/btl", async (req, res): Promise<void> => {
  const parsed = SubmitBtlEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid BTL enquiry body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    await forwardToWebhook("BTL Property Investment", parsed.data);
  } catch (err) {
    req.log.error({ err }, "Failed to forward BTL enquiry to webhook");
    res.status(500).json({ error: "Failed to submit enquiry. Please try again." });
    return;
  }

  req.log.info({ email: parsed.data.email }, "BTL enquiry submitted");
  res.json({ success: true, message: "Your BTL enquiry has been received. We will be in touch shortly." });
});

// POST /enquiries/mortgage — Mortgage Enquiry
router.post("/enquiries/mortgage", async (req, res): Promise<void> => {
  const parsed = SubmitMortgageEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid mortgage enquiry body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    await forwardToWebhook("Mortgage", parsed.data);
  } catch (err) {
    req.log.error({ err }, "Failed to forward mortgage enquiry to webhook");
    res.status(500).json({ error: "Failed to submit enquiry. Please try again." });
    return;
  }

  req.log.info({ email: parsed.data.email }, "Mortgage enquiry submitted");
  res.json({ success: true, message: "Your mortgage enquiry has been received. We will be in touch shortly." });
});

// POST /enquiries/tax — Tax, Accounting & Limited Company Formation Enquiry
router.post("/enquiries/tax", async (req, res): Promise<void> => {
  const parsed = SubmitTaxEnquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid tax enquiry body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    await forwardToWebhook("Tax, Accounting & Limited Company Formation", parsed.data);
  } catch (err) {
    req.log.error({ err }, "Failed to forward tax enquiry to webhook");
    res.status(500).json({ error: "Failed to submit enquiry. Please try again." });
    return;
  }

  req.log.info({ email: parsed.data.email }, "Tax enquiry submitted");
  res.json({ success: true, message: "Your enquiry has been received. We will be in touch shortly." });
});

export default router;
