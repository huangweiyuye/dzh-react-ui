import { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import { UploadList } from './uploadList'

import Button from '../Button/button'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  /**上传的地址 */
  action: string
  /**默认上传列表 */
  defaultFileList?: UploadFile[]
  /**上传前回调 */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**上传进度回调 */
  onProgress?: (percentage: number, file: File) => void
  /**上传成功回调 */
  onSuccess?: (data: any, file: File) => void
  /**上传失败回调 */
  onError?: (err: any, file: File) => void
  /**当上传组件发生了改变 */
  onChange?: (file: File) => void
  /**移除文件的回调 */
  onRemove?: (file: UploadFile) => void
  /**请求头数据 */
  headers?: { [key: string]: any }
  /**上传时文件的属性名 */
  name?: string
  /**额外参数 */
  data?: { [key: string]: any }
  /**是否允许携带cookies */
  withCredentials?: boolean
  /**接收的文件类型 */
  accept?: string
  /**是否支持多选 */
  multiple?: boolean
  /**组件内容 */
  children?: any
  /**是否支持拖拽 */
  drag?: boolean
}

/**
 * Upload 上传组件，支持上传前校验、拖拽上传等
 *
 * ~~~js
 * // 这样引用
 * import { Upload } from 'dzh-react-ui'
 * ~~~
 */
export const Upload: FC<UploadProps> = props => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  } = props

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (
    updateFile: UploadFile,
    updateObject: Partial<UploadFile>
  ) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObject }
        } else {
          return file
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })

    onRemove && onRemove(file)
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      // 没有beforeUpload方法
      if (!beforeUpload) {
        postFile(file)
      } else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            postFile(processedFile)
          })
        } else if (result !== false) {
          postFile(file)
        }
      }
    })
  }

  // 上传文件
  const postFile = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbm5hbWUiOiJhZG1pbiIsImFkbWluaWQiOiJhZG1pbl9lYzBhZGFlYS01ZDZkLTQxZDEtOGM3Ny0xY2E1NDUwMDUyNDkiLCJpYXQiOjE2OTE2Mzk5NjQsImV4cCI6MTY5MTY2ODc2NH0.nniRZn5QpJdP7dm9HfP5_nnCy3_7OeeE6XazDXnB-HQ',
          ...headers
        },
        onUploadProgress: e => {
          let percentage = Math.round((e.loaded * 100) / e.total!) || 0
          updateFileList(_file, { percent: percentage, status: 'uploading' })
          if (onProgress) {
            onProgress(percentage, file)
          }
        },
        withCredentials
      })
      .then(resp => {
        if (onSuccess) {
          onSuccess(resp.data, file)
        }
        if (onChange) {
          onChange(file)
        }
        updateFileList(_file, { status: 'success', response: resp.data })
      })
      .catch(err => {
        // console.log(err)
        updateFileList(_file, { status: 'error', error: err })
        if (onError) {
          onError(err, file)
        }
        if (onChange) {
          onChange(file)
        }
      })
  }

  console.log(fileList)

  return (
    <div
      className='dzh-upload-component'
      style={{ display: 'inline-block' }}
      onClick={handleClick}
    >
      {/* <Button btnType='primary' onClick={handleClick}>
        Upload File
      </Button> */}
      {drag ? (
        <Dragger onFile={files => uploadFiles(files)}>{children}</Dragger>
      ) : (
        children
      )}
      <input
        type='file'
        className='dzh-file-input'
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload
