import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-bottom'
  | 'zoom-in-right'

// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName
// }
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName
  wrapper?: boolean
}

const Transtion: FC<TransitionProps> = props => {
  const { children, classNames, animation, wrapper, ...restProps } = props

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children as any}</div> : children}
    </CSSTransition>
  )
}

Transtion.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transtion
