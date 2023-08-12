import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 dzh-react-ui 组件库</h1>
        <p>
          dzh-react-ui 是基于 <strong>react</strong> 的UI组件库
        </p>
        <h4>安装试试</h4>
        <code>npm install @dzh-ui/react-ui --save</code>
        <br />
        <h4>使用参考</h4>
        <a
          href='https://www.npmjs.com/package/@dzh-ui/react-ui'
          target='__blank'
        >
          @dzh-ui/react-ui
        </a>
      </>
    )
  },
  { info: { disable: true } }
)

export {}
