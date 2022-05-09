import {
  GenerateBreadCrumbFN,
  IBreadCrumb,
  ILabelTextGenerator,
  LabelTextGeneratorFN,
} from '~/types'
import { isLabelTextFN, isString } from './typeguards'

export const removeQueryParameters = (path: string): string =>
  path.split('?')[0]

export const removeTrailingSlash = (path: string): string[] =>
  path.split('/').filter(Boolean)

export const generatePaths = (path: string) =>
  removeTrailingSlash(removeQueryParameters(path))

export const sanitizeDynamicParam = (path: string) =>
  path.replace('[', '').replace(']', '')

const toCapitalize = (value: string) =>
  value.charAt(0).toUpperCase().concat(value.slice(1))

const sanitizeSlug = (path: string) =>
  path.split('-').map(toCapitalize).join(' ')

const getLabelTextFromGenerator =
  (path: string) =>
  (obj: ILabelTextGenerator): string => {
    const label = obj[path]

    if (isString(label)) {
      return label
    }

    return path
  }

const getLabelFNFromGenerator =
  (path: string, query: string) =>
  (
    obj: ILabelTextGenerator
  ): (() => ReturnType<LabelTextGeneratorFN>) | undefined => {
    const labelFn = obj[path]

    if (isLabelTextFN(labelFn)) {
      return () => labelFn(query)
    }

    return
  }

export const generateBreadcrumb: GenerateBreadCrumbFN =
  ([asPath, pathName]) =>
  labelTextGeneratorObj => {
    const removePathWhenPassFalse = (_: IBreadCrumb, idx: number) => {
      if (
        labelTextGeneratorObj[sanitizeDynamicParam(pathName[idx])] === undefined
      ) {
        return true
      }

      return labelTextGeneratorObj[sanitizeDynamicParam(pathName[idx])]
    }

    return [
      {
        title: 'Home',
        href: '/',
      },
    ].concat(
      asPath
        .map((path, idx) => {
          const param = sanitizeDynamicParam(pathName[idx])
          const title = path.includes('-')
            ? sanitizeSlug(path)
            : toCapitalize(
                getLabelTextFromGenerator(param)(labelTextGeneratorObj)
              )

          const labelGenerator = getLabelFNFromGenerator(
            param,
            path
          )(labelTextGeneratorObj)

          return {
            title,
            href: `/${asPath.slice(0, idx + 1).join('/')}`,
            labelGenerator,
          }
        })
        .filter(removePathWhenPassFalse)
    )
  }
