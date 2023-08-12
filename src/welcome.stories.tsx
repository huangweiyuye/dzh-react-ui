import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 dzh-react-ui 组件库</h1>
        <p>dzh-react-ui 是基于 `react` 的UI组件库</p>
        <h3>安装试试</h3>
        <code>npm install @dzh/react-ui --save</code>
      </>
    )
  },
  { info: { disable: true } }
)

export {}
