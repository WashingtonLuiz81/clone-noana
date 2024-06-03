import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  // Adicione outros campos conforme necessário
})

export type FormSchema = z.infer<typeof formSchema>
