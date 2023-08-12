import type { Preview } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'
library.add(fas)
const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
}

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    // loaderFn: () => {
    //   const allExports = [require('../src/welcome.stories.tsx')]
    //   const req = require.context('../src/components', true, /\.stories\.tsx$/)
    //   req.keys().forEach(fname => allExports.push(req(fname)))
    //   return allExports
    // },
    info: {
      inline: true,
      header: false
    }
  },
  decorators: [storyWrapper, withInfo as any]
}

export default preview
