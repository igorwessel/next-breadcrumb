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
}

export type ICrumb = IBreadCrumb & {
  last: boolean
}

export type GenerateBreadCrumbFN = ([asPath, pathName]: [
  string[],
  string[]
]) => (labelTextGeneratorObj: ILabelTextGenerator) => IBreadCrumb[]
