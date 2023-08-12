import {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  useEffect,
  KeyboardEvent,
  useRef
} from 'react'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transtion from '../Transition/transtion'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import classNames from 'classnames'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**搜索处理函数 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  /**选中搜索结果项函数 */
  onSelect?: (item: DataSourceType) => void
  /**自定义渲染搜索结果项函数 */
  renderOptions?: (item: DataSourceType) => ReactElement
}

/**
 * AutoComplete 自动补全输入框 输入关键字，展现查询结果
 *
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'dzh-react-ui'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const AutoComplete: FC<AutoCompleteProps> = props => {
  const { fetchSuggestions, onSelect, value, renderOptions, ...restProps } =
    props
  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const debouncedValue = useDebounce(inputValue, 500)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef, () => setSuggestions([]))

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)

      // 异步获取
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(results)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  // Input内容变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  // 选中
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value
  }

  const generateDropdown = (suggestions: DataSourceType[]) => {
    return (
      <Transtion
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => setSuggestions([])}
      >
        <ul className='dzh-suggestion-list'>
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transtion>
    )
  }

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }

    setHighlightIndex(index)
  }

  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break

      case 38:
        highlight(highlightIndex - 1)
        break

      case 40:
        highlight(highlightIndex + 1)
        break

      case 27:
        setShowDropdown(false)
        break

      default:
        break
    }
  }

  return (
    <div className='dzh-auto-complete' ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && (
        <div className='suggestions-loading-icon'>
          <Icon icon='spinner' spin />
        </div>
      )}
      {suggestions.length > 0 && generateDropdown(suggestions)}
    </div>
  )
}

export default AutoComplete
