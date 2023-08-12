import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { withInfo } from '@storybook/addon-info'
import Button from './button'
// import '../../styles/index.scss'

// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const defaultButton = () => (
  <Button onClick={action('chicked')}>default button</Button>
)

const buttonWithSize = () => (
  <>
    <Button size='lg'>large button</Button>&nbsp;&nbsp;&nbsp;
    <Button size='sm'>small button</Button>&nbsp;&nbsp;&nbsp;
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType='primary'>primary button</Button>&nbsp;&nbsp;&nbsp;
    <Button btnType='danger'>danger button</Button>&nbsp;&nbsp;
    <Button btnType='link' href='https://google.com'>
      link button
    </Button>
  </>
)
storiesOf('Button Component', module)
  //   .addDecorator(CenterDecorator)
  // .addDecorator(withInfo as any)
  // .addParameters({
  //   info: {
  //     text: `
  //       this is a very nice component
  //       ## this is a header
  //       ~~~js
  //       const a = 'hello'
  //       ~~~
  //         `,
  //     inline: true
  //   }
  // })
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)
