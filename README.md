# @dzh-ui/react-ui

React UI 组件库具体实现的博客地址 [react-ui-library](https://huangjiangjun.top/blog/web-advanced/react-ui-component-library/start)

[前端进阶博客](https://huangjiangjun.top/blog/web-advanced)，感谢关注

## 使用步骤

### 安装依赖包

```bash
npm i @dzh-ui/react-ui
```

### 使用示例

`App.js`

```js
import {
  Button,
  Icon,
  Menu,
  AutoComplete,
  Upload,
  Progress
} from '@dzh-ui/react-ui'

function App() {
  const handleFetch = query => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(data => data.json())
      .then(({ items }) => {
        return items.slice(0, 10).map(item => ({
          value: item.login,
          ...item
        }))
      })
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Button btnType='primary' size='lg'>
          我是按钮呀
        </Button>
        &nbsp;
        <Icon icon='coffee' size='5x' theme='primary' />
        <hr />
        <Menu>
          <Menu.Item>cool link</Menu.Item>
          <Menu.Item disabled>disabled</Menu.Item>
          <Menu.Item>cool link2</Menu.Item>
          <Menu.SubMenu title='Submenu'>
            <Menu.Item>sub link1</Menu.Item>
            <Menu.Item>sub link2</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <br />
        <AutoComplete fetchSuggestions={handleFetch} />
        <Upload action='https://huangjiangjun.top:3002/admin/file/upload'>
          <Button size='lg'>Upload</Button>
        </Upload>
        <Progress percent={90} />
      </header>
    </div>
  )
}

export default App
```

## 打赏我

如果你觉得不错，可以请我喝杯茶，金额随意，谢谢

![微信支付](https://manageritcast.gitee.io/blog/assets/img/wxpay.png){ width="350px" height="350px"}

![支付宝支付](https://manageritcast.gitee.io/blog/assets/img/alipay.png){ width="350px" height="350px"}
