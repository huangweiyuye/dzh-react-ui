import React, { FunctionComponentElement, useContext, useState } from 'react'
import { MenuContext } from './menu'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
// import { CSSTransition } from 'react-transition-group'
import Transtion from '../Transition/transtion'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children?: any
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children
}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpen =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false
  const [menuOpen, setOpen] = useState(isOpen)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick
        }
      : {}

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
        }
      : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('dzh-submenu', {
      'menu-opened': menuOpen
    })

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.log(
          'Warning: SubMenu has a child which is not a MenuItem component'
        )
      }
    })

    return (
      // <CSSTransition
      //   in={menuOpen}
      //   timeout={300}
      //   classNames='zoom-in-top'
      //   appear
      //   unmountOnExit
      // >
      //   <ul className={subMenuClasses}>{childrenComponent}</ul>
      // </CSSTransition>
      <Transtion in={menuOpen} timeout={300} animation='zoom-in-top'>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transtion>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
