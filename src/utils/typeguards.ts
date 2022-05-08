import { LabelTextGeneratorFN } from '~/types'

export const isLabelTextFN = (
  value: unknown
): value is LabelTextGeneratorFN => {
  return typeof value === 'function'
}

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}
