import React from 'react'

export type LabelTextGeneratorFN = (param: string) => Promise<string> | string

export type ILabelTextGenerator = {
  [key: string]: string | boolean | LabelTextGeneratorFN
}

export type IBreadCrumb = {
  title: string
  href: string
  labelGenerator?: () => ReturnType<LabelTextGeneratorFN>
}

export type IBreadCrumbProps = {
  labelTextGenerator?: ILabelTextGenerator
  divider?: React.ReactNode
}

export type ICrumbProps = IBreadCrumb & {
  last: boolean
  divider?: React.ReactNode
}

export type GenerateBreadCrumbFN = ([asPath, pathName]: [
  string[],
  string[]
]) => (labelTextGeneratorObj: ILabelTextGenerator) => IBreadCrumb[]
