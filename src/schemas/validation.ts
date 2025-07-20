import { VALIDATION } from '@/constants'
import { isValidEmail, isValidPassword } from '@/utils'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateLoginForm = (data: {
  email: string
  password: string
}): ValidationResult => {
  const errors: string[] = []

  if (!data.email) {
    errors.push('Email is required')
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  if (!data.password) {
    errors.push('Password is required')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateRegisterForm = (data: {
  name: string
  email: string
  password: string
  confirmPassword: string
}): ValidationResult => {
  const errors: string[] = []

  if (!data.name) {
    errors.push('Name is required')
  } else if (data.name.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.push(
      `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`
    )
  } else if (data.name.length > VALIDATION.NAME_MAX_LENGTH) {
    errors.push(
      `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`
    )
  }

  if (!data.email) {
    errors.push('Email is required')
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  if (!data.password) {
    errors.push('Password is required')
  } else if (!isValidPassword(data.password)) {
    errors.push(
      `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
    )
  }

  if (!data.confirmPassword) {
    errors.push('Please confirm your password')
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
