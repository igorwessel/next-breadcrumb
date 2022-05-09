import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Breadcrumb from '../breadcrumb.client'

export default {
  title: 'BreadCrumb',
  component: Breadcrumb,
  argTypes: {
    labelTextGenerator: {
      defaultValue: {},
      description:
        'Receives a object which key is a route, the value can be a async function ``fn(query) => string``, a string or boolean value indicates show a route.',
    },
  },
} as ComponentMeta<typeof Breadcrumb>

const Template: ComponentStory<typeof Breadcrumb> = args => (
  <Breadcrumb {...args} />
)

export const DynamicRoutes = Template.bind({})

DynamicRoutes.story = {
  parameters: {
    nextRouter: {
      pathname: '/profile/[id]',
      asPath: '/profile/lifeiscontent',
      query: {
        id: 'lifeiscontent',
      },
    },
  },
}

DynamicRoutes.args = { labelTextGenerator: {} }

export const UseLabelGenerator = Template.bind({})

UseLabelGenerator.story = {
  parameters: {
    nextRouter: {
      pathname: '/profile/[id]',
      asPath: '/profile/lifeiscontent',
      query: {
        id: 'lifeiscontent',
      },
    },
  },
}

UseLabelGenerator.args = {
  labelTextGenerator: { id: 'New label using label generator' },
}

export const FunctionToLabel = Template.bind({})

FunctionToLabel.story = {
  parameters: {
    nextRouter: {
      pathname: '/profile/[id]',
      asPath: '/profile/lifeiscontent',
      query: {
        id: 'lifeiscontent',
      },
    },
  },
}

FunctionToLabel.args = {
  labelTextGenerator: {
    id: function (query) {
      return query
    },
  },
}

export const RemovingRoute = Template.bind({})

RemovingRoute.story = {
  parameters: {
    nextRouter: {
      pathname: '/profile/[id]',
      asPath: '/profile/lifeiscontent',
      query: {
        id: 'lifeiscontent',
      },
    },
  },
}

RemovingRoute.args = {
  labelTextGenerator: { profile: false },
}
