import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ZodTypeAny } from "zod";

// Shared handler factory for the enquiry endpoints. Each function validates the
// request body, then forwards it to the webhook configured server-side via the
// WEBHOOK_URL environment variable. The webhook URL is NEVER exposed to the
// browser — it only lives in Vercel's server-side environment.
export function makeEnquiryHandler(
  formType: string,
  schema: ZodTypeAny,
  successMessage: string,
) {
  return async function handler(
    req: VercelRequest,
    res: VercelResponse,
  ): Promise<void> {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      res
        .status(500)
        .json({ error: "Server is not configured. Please try again later." });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          submittedAt: new Date().toISOString(),
          ...(parsed.data as object),
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook responded with ${response.status}`);
      }
    } catch {
      res
        .status(500)
        .json({ error: "Failed to submit enquiry. Please try again." });
      return;
    }

    res.status(200).json({ success: true, message: successMessage });
  };
}
