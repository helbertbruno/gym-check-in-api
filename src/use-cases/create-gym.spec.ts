import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gyms'

describe('creat gym use case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to creat gym', async () => {
    const { gym } = await sut.execute({
      title: 'javascript gym',
      description: null,
      phone: null,
      latitude: -21.7559441,
      longitude: -43.347504,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
