import { Button } from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transtion from './components/Transition/transtion'
import { useState } from 'react'
library.add(fas)
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App () {
  const [show, setShow] = useState(false)

  return (
    <div className='App'>
      {/* <FontAwesomeIcon icon={faCoffee} size='10x' /> */}
      <Icon icon='arrow-down' theme='primary' size='10x' />
      <Menu
        defaultIndex='0'
        onSelect={index => alert(index)}
        mode='horizontal'
        defaultOpenSubMenus={['2']}
      >
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link2</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link3</MenuItem>
      </Menu>
      <Button size='lg' onClick={() => setShow(!show)}>
        toggle
      </Button>
      <Transtion in={show} timeout={300} animation='zoom-in-left'>
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
        </div>
      </Transtion>
      <Transtion in={show} timeout={300} animation='zoom-in-top' wrapper>
        <Button btnType='primary' size='lg'>
          A large Button
        </Button>
      </Transtion>
      <p>learn react</p>
      <br />
      <br />
      <br />
      <header className='App-header'>
        <Button className='custom' onClick={() => alert(123)}>
          Hello
        </Button>
        &nbsp;&nbsp;
        <Button disabled>Disabled Button</Button>&nbsp;&nbsp;
        <Button btnType='primary' size='lg'>
          Large Primary
        </Button>
        &nbsp;&nbsp;
        <Button btnType='danger' size='sm'>
          Small Danger
        </Button>
        <br />
        <br />
        <Button btnType='link' href='http://www.baidu.com' target='_blank'>
          Baidu Link
        </Button>
        &nbsp;&nbsp;
        <Button btnType='link' href='http://www.baidu.com' disabled>
          Disabled Link
        </Button>
      </header>
    </div>
  )
}

export default App
