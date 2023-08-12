import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete'

interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

const SimpleComplete = () => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(data => data.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({
          value: item.login,
          ...item
        }))
      })
  }

  // 自定义渲染
  const renderOptions = (item: any) => {
    return (
      <div>
        <h4>{item.value}</h4>
        <p>{item.url}</p>
      </div>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOptions={renderOptions}
    />
  )
}

storiesOf('AutoComplete Component', module).add('AutoComplete', SimpleComplete)
