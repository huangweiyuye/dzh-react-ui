import { FC } from 'react';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /**上传的地址 */
    action: string;
    /**默认上传列表 */
    defaultFileList?: UploadFile[];
    /**上传前回调 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**上传进度回调 */
    onProgress?: (percentage: number, file: File) => void;
    /**上传成功回调 */
    onSuccess?: (data: any, file: File) => void;
    /**上传失败回调 */
    onError?: (err: any, file: File) => void;
    /**当上传组件发生了改变 */
    onChange?: (file: File) => void;
    /**移除文件的回调 */
    onRemove?: (file: UploadFile) => void;
    /**请求头数据 */
    headers?: {
        [key: string]: any;
    };
    /**上传时文件的属性名 */
    name?: string;
    /**额外参数 */
    data?: {
        [key: string]: any;
    };
    /**是否允许携带cookies */
    withCredentials?: boolean;
    /**接收的文件类型 */
    accept?: string;
    /**是否支持多选 */
    multiple?: boolean;
    /**组件内容 */
    children?: any;
    /**是否支持拖拽 */
    drag?: boolean;
}
/**
 * Upload 上传组件，支持上传前校验、拖拽上传等
 *
 * ~~~js
 * // 这样引用
 * import { Upload } from 'dzh-react-ui'
 * ~~~
 */
export declare const Upload: FC<UploadProps>;
export default Upload;
