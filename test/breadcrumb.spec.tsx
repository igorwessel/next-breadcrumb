import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type NextRouter, useRouter } from 'next/router'

import Breadcrumb from '~/breadcrumb.client'

import '@testing-library/jest-dom'
import { IBreadCrumbProps } from '~/types'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockRouter: NextRouter = {
  asPath: '/user/profile/details',
  pathname: '/user/profile/details',
  route: '/details',
  query: {},
  basePath: '/user',
  isLocaleDomain: false,
  isFallback: false,
  isPreview: false,
  isReady: true,
  prefetch: jest.fn(),
  push: jest.fn(),
  reload: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    emit: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
}

const mockedUseRouter = jest.mocked(useRouter)

const setup =
  (options?: Partial<NextRouter>) => (props?: Partial<IBreadCrumbProps>) => {
    mockedUseRouter.mockReturnValue({ ...mockRouter, ...options })

    const utils = render(<Breadcrumb {...props} />)
    const user = userEvent.setup()
    return { utils, user }
  }

const setupDefault = setup()
const setupWithDynamicRoute = setup({
  asPath: '/user/49e42d48-d49d-4413-901a-b8fa336684c5/details',
  pathname: '/user/[id]/details',
})

it('should render a breadcrumb', () => {
  setupDefault()

  expect(
    screen.getByRole('navigation', { name: 'breadcrumbs' })
  ).toBeInTheDocument()
})

it('should render a breadcrumb with dynamic route', () => {
  setupWithDynamicRoute()

  expect(
    screen.getByRole('link', { name: /49e42d48 d49d 4413 901a b8fa336684c5/i })
  ).toBeInTheDocument()
})

it('should last link need to have "aria-current" attr', () => {
  setupDefault()

  expect(
    screen.getByRole('link', { name: /details/i, current: 'page' })
  ).toBeInTheDocument()
})

it('should have a divider when link not is the last', () => {
  setupDefault()

  const allBreadcrumbs = screen.getAllByTestId('breadcrumb__crumb')

  allBreadcrumbs.forEach(breadcrumb => {
    expect(within(breadcrumb).getByText('>')).toBeInTheDocument()
  })

  expect(
    // eslint-disable-next-line testing-library/prefer-presence-queries
    within(screen.getByTestId('breadcrumb__crumb--last')).queryByText('>')
  ).not.toBeInTheDocument()
})

it('should not redirect to a page when is last link', async () => {
  const { user } = setupDefault()

  await user.click(
    screen.getByRole('link', { name: /details/i, current: 'page' })
  )

  expect(mockRouter.push).not.toHaveBeenCalled()
})

it('should use label defined in labelGenerator', () => {
  setupDefault({
    labelTextGenerator: {
      details: 'User Details',
    },
  })

  expect(
    screen.getByRole('link', { name: /user details/i })
  ).toBeInTheDocument()
})

it('should use function defined to get a label in labelGenerator', async () => {
  setupWithDynamicRoute({
    labelTextGenerator: {
      id: query => {
        return `User ID: ${query}`
      },
    },
  })

  await screen.findByRole('link', { name: /user id/i })

  expect(screen.getByRole('link', { name: /user id/i })).toBeInTheDocument()
})

it('should remove a route when pass in labelGenerator to remove', async () => {
  setupDefault({
    labelTextGenerator: {
      user: false,
    },
  })

  expect(screen.queryByRole('link', { name: /user/i })).not.toBeInTheDocument()
})
