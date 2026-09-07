import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { makeCreateGymsUseCase } from '@/use-cases/factories/make-create-gyms-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, longitude, latitude } =
    createGymBodySchema.parse(request.body)

  const createGymUseSchema = makeCreateGymsUseCase()

  await createGymUseSchema.execute({
    title,
    description,
    phone,
    longitude,
    latitude,
  })

  return reply.status(201).send()
}
