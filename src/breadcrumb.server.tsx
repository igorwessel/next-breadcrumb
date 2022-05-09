import path from 'path'
import { useRouter } from 'next/router'

const removeTrailingSlash = (path: string): string[] =>
  path.split('/').filter(Boolean)

const readPages = (directory: string) => {
  return (page: string) => {
    const pathResolved = path.resolve(process.cwd(), directory, page)

    return pathResolved
  }
}

const getPageInRoot = readPages('./pages')
const getPageInSrc = readPages('./src/pages')

const BreadCrumb = () => {
  const { asPath } = useRouter()

  console.log(getPageInRoot(asPath))

  console.log(getPageInSrc(asPath))

  console.log(removeTrailingSlash(asPath))

  return <div>oi</div>
}

export default BreadCrumb
