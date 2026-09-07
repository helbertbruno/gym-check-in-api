import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-inss-error'
import { MaxDistanceError } from './errors/max-distance-error'

describe('check in use case', () => {
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository
  let sut: CheckInUseCase

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: -21.7559441,
      longitude: -43.347504,
    })

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useFakeTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.7559441,
      userLongitude: -43.347504,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.7559441,
      userLongitude: -43.347504,
    })
    await expect(() =>
      sut.execute({
        gymID: 'gym-01',
        userId: 'user-01',
        userLatitude: -21.7559441,
        userLongitude: -43.347504,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should  be able to check in twice but in different days ', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.7559441,
      userLongitude: -43.347504,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymID: 'gym-01',
      userId: 'user-01',
      userLatitude: -21.7559441,
      userLongitude: -43.347504,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'javascript gym',
      description: '',
      phone: '',
      latitude: new Decimal(-21.747292),
      longitude: new Decimal(-43.2525325),
    })

    await expect(() =>
      sut.execute({
        gymID: 'gym-02',
        userId: 'user-01',
        userLatitude: -21.7559441,
        userLongitude: -43.347504,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
