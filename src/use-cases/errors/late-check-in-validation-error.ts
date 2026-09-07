export class LateCheckInValidationError extends Error {
  constructor() {
    super('the check-in can only be validate until 20  min of its creation')
  }
}
