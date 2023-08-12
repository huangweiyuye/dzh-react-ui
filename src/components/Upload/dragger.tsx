import { FC, DragEvent, useState } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
  children: any
}

export const Dragger: FC<DraggerProps> = props => {
  const { onFile, children } = props
  const [dragOver, setDragOver] = useState(false)
  const classes = classNames('dzh-uploader-dragger', {
    'is-dragover': dragOver
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    console.log('---handleDrop---', e.dataTransfer.files)
    e.preventDefault()
    setDragOver(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={classes}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
