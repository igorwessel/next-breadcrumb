import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { generateBreadcrumb, generatePaths } from '~/utils'
import { ICrumb, IBreadCrumbProps } from '~/types'

const Crumb = ({ title, href, labelGenerator, last }: ICrumb) => {
  const [text, setText] = React.useState(title)

  React.useEffect(() => {
    if (!labelGenerator) return

    const getDynamicLabel = async () => {
      const label = await labelGenerator()

      setText(label)
    }

    getDynamicLabel()
  }, [labelGenerator])

  if (last) {
    return (
      <li data-testid='breadcrumb__crumb--last'>
        <a href={href} onClick={e => e.preventDefault()} aria-current='page'>
          {text}
        </a>
      </li>
    )
  }

  return (
    <li data-testid='breadcrumb__crumb'>
      <Link href={href}>{text}</Link>
      <span>{'>'}</span>
    </li>
  )
}

const BreadCrumb = ({ labelTextGenerator = {} }: IBreadCrumbProps) => {
  const { asPath, pathname } = useRouter()

  const crumbs = React.useMemo(
    function () {
      const routesAsPath = generatePaths(asPath)
      const routesPathname = generatePaths(pathname)

      return generateBreadcrumb([routesAsPath, routesPathname])(
        labelTextGenerator
      )
    },
    [asPath, pathname, labelTextGenerator]
  )

  return (
    <nav aria-label='breadcrumbs'>
      <ol>
        {crumbs.map((crumb, idx) => (
          <Crumb
            href={crumb.href}
            title={crumb.title}
            labelGenerator={crumb.labelGenerator}
            key={crumb.title}
            last={crumbs.length - 1 === idx}
          />
        ))}
      </ol>
    </nav>
  )
}

export default BreadCrumb
