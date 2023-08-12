import { storiesOf } from '@storybook/react'
import { Upload, UploadFile } from './upload'
import { action } from '@storybook/addon-actions'
//import Button from '../Button/button'
import Icon from '../Icon/icon'
const defaultFileList: UploadFile[] = [
  {
    uid: '123',
    size: 1234,
    name: 'hello.md',
    status: 'uploading',
    percent: 30
  },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert('file too big')
//     return false;
//   }
//   return true;
// }
// const filePromise = (file: File) => {
//   const newFile = new File([file], 'new_name.docx', {type: file.type})
//   return Promise.resolve(newFile)
// }

const handleProcess = (percentage: number, file: File) => {
  console.log('---percentage---', percentage)
}

/**
const SimpleUpload = () => {
  return (
    <Upload
      action='
      https://huangjiangjun.top:3002/admin/file/upload'
      onProgress={action('onProgress')}
      onSuccess={action('onSuccess')}
      onError={action('onError')}
    />
  )
}
 */

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 500) {
    alert('file too big')

    return false
  }

  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.png', { type: file.type })

  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      action='
        https://huangjiangjun.top:3002/admin/file/upload'
      // defaultFileList={defaultFileList}
      onProgress={action('onProgress')}
      onChange={action('onChange')}
      onSuccess={action('onSuccess')}
      onError={action('onError')}
      beforeUpload={checkFileSize}
      name='file'
      data={{ key1: 'value1' }}
      headers={{ 'X-Powered-By': 'duanzihuang' }}
      accept='.jpg'
      multiple
      drag
    >
      <Icon icon='upload' size='5x' theme='secondary' />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('Upload component', module).add('Upload', SimpleUpload)
