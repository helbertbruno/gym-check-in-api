import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

describe('fetch nearby gyms use case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: FetchNearByGymsUseCase

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -21.7559441,
      longitude: -43.347504,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -21.7225067,
      longitude: -43.0967222,
    })

    const { gyms } = await sut.execute({
      userLatitude: -21.7559441,
      userLongitude: -43.347504,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
