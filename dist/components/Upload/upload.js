var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import axios from 'axios';
import { UploadList } from './uploadList';
import Dragger from './dragger';
/**
 * Upload 上传组件，支持上传前校验、拖拽上传等
 *
 * ~~~js
 * // 这样引用
 * import { Upload } from 'dzh-react-ui'
 * ~~~
 */
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInputRef = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObject) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObject);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            // 没有beforeUpload方法
            if (!beforeUpload) {
                postFile(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        postFile(processedFile);
                    });
                }
                else if (result !== false) {
                    postFile(file);
                }
            }
        });
    };
    // 上传文件
    var postFile = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign({ 'Content-Type': 'multipart/form-data', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbm5hbWUiOiJhZG1pbiIsImFkbWluaWQiOiJhZG1pbl9lYzBhZGFlYS01ZDZkLTQxZDEtOGM3Ny0xY2E1NDUwMDUyNDkiLCJpYXQiOjE2OTE2Mzk5NjQsImV4cCI6MTY5MTY2ODc2NH0.nniRZn5QpJdP7dm9HfP5_nnCy3_7OeeE6XazDXnB-HQ' }, headers),
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                updateFileList(_file, { percent: percentage, status: 'uploading' });
                if (onProgress) {
                    onProgress(percentage, file);
                }
            },
            withCredentials: withCredentials
        })
            .then(function (resp) {
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
            updateFileList(_file, { status: 'success', response: resp.data });
        })
            .catch(function (err) {
            // console.log(err)
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    console.log(fileList);
    return (_jsxs("div", __assign({ className: 'dzh-upload-component', style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ? (_jsx(Dragger, __assign({ onFile: function (files) { return uploadFiles(files); } }, { children: children }))) : (children), _jsx("input", { type: 'file', className: 'dzh-file-input', style: { display: 'none' }, ref: fileInputRef, onChange: handleFileChange, accept: accept, multiple: multiple }), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
