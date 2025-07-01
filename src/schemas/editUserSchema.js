import { z } from "zod";

export const editUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
    ),
  username: z
    .string()
    .min(3, { message: "Usuário deve ter pelo menos 3 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Usuário deve conter apenas letras, números e _",
    }),
  email: z.string().email({ message: "E-mail inválido" }).toLowerCase(),
  avatar: z.string().url({ message: "Avatar deve ser uma URL válida" }),
  background: z.string().url({ message: "Background deve ser uma URL válida" }),
});
