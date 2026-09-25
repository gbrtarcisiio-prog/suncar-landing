import { FORMSPREE_FORM_ID, isFormspreeConfigured } from "@/lib/config";

type FormspreeErrorItem = {
  field?: string;
  message?: string;
};

type FormspreeResponse = {
  errors?: FormspreeErrorItem[];
  error?: string;
};

export class FormspreeSubmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FormspreeSubmissionError";
  }
}

export async function submitContactForm(
  formData: FormData,
  fetcher: typeof fetch = fetch,
  formId = FORMSPREE_FORM_ID
) {
  if (!isFormspreeConfigured(formId)) {
    throw new FormspreeSubmissionError(
      "O formulário ainda não foi configurado. Defina VITE_FORMSPREE_FORM_ID no arquivo .env.local e gere um novo build."
    );
  }

  let response: Response;
  try {
    response = await fetcher(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
  } catch {
    throw new FormspreeSubmissionError(
      "Não foi possível conectar ao serviço de formulários. Confira sua internet e tente novamente."
    );
  }

  const result = (await response
    .json()
    .catch(() => null)) as FormspreeResponse | null;

  if (!response.ok) {
    if (response.status === 429) {
      throw new FormspreeSubmissionError(
        "Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente."
      );
    }

    const fieldMessages = result?.errors
      ?.map(item => item.message)
      .filter((message): message is string => Boolean(message));
    const message = fieldMessages?.join(" ") || result?.error;
    throw new FormspreeSubmissionError(
      message ||
        "O envio não foi aceito. Verifique os campos e o Form ID e tente novamente."
    );
  }

  return result;
}
