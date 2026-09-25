import { describe, expect, it, vi } from "vitest";
import { FormspreeSubmissionError, submitContactForm } from "./formspree";

function response(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("submitContactForm", () => {
  it("posts FormData to the public form endpoint and requests JSON", async () => {
    const fetcher = vi.fn(async () => response(200, { next: "ok" }));
    const data = new FormData();
    data.set("name", "Teste local");

    await expect(
      submitContactForm(data, fetcher as unknown as typeof fetch, "AbC123")
    ).resolves.toEqual({ next: "ok" });
    expect(fetcher).toHaveBeenCalledOnce();
    expect(fetcher).toHaveBeenCalledWith(
      "https://formspree.io/f/AbC123",
      expect.objectContaining({
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
    );
  });

  it("rejects an empty or unsafe form ID without calling the network", async () => {
    const fetcher = vi.fn();
    const data = new FormData();
    await expect(
      submitContactForm(data, fetcher as unknown as typeof fetch, "")
    ).rejects.toThrow("VITE_FORMSPREE_FORM_ID");
    await expect(
      submitContactForm(data, fetcher as unknown as typeof fetch, "id/../other")
    ).rejects.toThrow("VITE_FORMSPREE_FORM_ID");
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("surfaces Formspree validation errors", async () => {
    const fetcher = vi.fn(async () =>
      response(422, {
        errors: [{ field: "email", message: "Email inválido." }],
      })
    );
    await expect(
      submitContactForm(
        new FormData(),
        fetcher as unknown as typeof fetch,
        "AbC123"
      )
    ).rejects.toThrow("Email inválido.");
  });

  it("handles rate limiting and network failures", async () => {
    const rateLimited = vi.fn(async () => response(429, {}));
    await expect(
      submitContactForm(
        new FormData(),
        rateLimited as unknown as typeof fetch,
        "AbC123"
      )
    ).rejects.toThrow("Muitas tentativas");

    const offline = vi.fn(async () => {
      throw new TypeError("offline");
    });
    await expect(
      submitContactForm(
        new FormData(),
        offline as unknown as typeof fetch,
        "AbC123"
      )
    ).rejects.toThrow("internet");
    expect(new FormspreeSubmissionError("teste")).toBeInstanceOf(Error);
  });
});
