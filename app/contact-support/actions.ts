"use server";

import { supportConfig, supportIssueCategories } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";

export type SupportField = "name" | "email" | "category" | "message";

export type SupportFieldErrors = Partial<Record<SupportField, string>>;

export type SupportFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: SupportFieldErrors;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const issueCategorySet = new Set<string>(supportIssueCategories);

const unavailableMessage = `Support requests are temporarily unavailable. Please email us at ${supportConfig.email}.`;

export async function submitSupportRequest(
  _previousState: SupportFormState,
  formData: FormData,
): Promise<SupportFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: SupportFieldErrors = {};

  if (!name) {
    fieldErrors.name = "Enter your name so we know who we are replying to.";
  } else if (name.length > 120) {
    fieldErrors.name = "Keep your name under 120 characters.";
  }

  if (!email) {
    fieldErrors.email = "Enter an email address so we can reply.";
  } else if (email.length > 254 || !emailPattern.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!issueCategorySet.has(category)) {
    fieldErrors.category = "Choose the area you need help with.";
  }

  if (message.length < 10) {
    fieldErrors.message =
      "Tell us a little more about the problem (at least 10 characters).";
  } else if (message.length > 5000) {
    fieldErrors.message = "Keep your message under 5,000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const supabase = await createClient().catch(() => null);

  if (!supabase) {
    return { status: "error", message: unavailableMessage };
  }

  try {
    const { error } = await supabase.from("support_requests").insert({
      name,
      email,
      category,
      message,
    });

    if (error) {
      console.error("Failed to save support request:", error.message);

      return {
        status: "error",
        message: `We could not send your message. Please email us at ${supportConfig.email} instead.`,
      };
    }
  } catch {
    return { status: "error", message: unavailableMessage };
  }

  return {
    status: "success",
    message: `Your message is in. ${supportConfig.responseNote}`,
  };
}
