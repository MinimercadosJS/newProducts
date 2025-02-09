import { z } from "zod";

const tenantMetadataSchema = z.object({
    tenantId: z.string(),
    apiKey: z.string(),
    name: z.string(),
    address: z.object({
        city: z.string(),
        neighborhood: z.string(),
        street: z.string(),
        number: z.string(),
    }),
    contact: z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
    }),
    logo: z.string(),
})

export type TenantMetadata = z.infer<typeof tenantMetadataSchema>