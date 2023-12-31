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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import Input from '../Input/input';
import Icon from '../Icon/icon';
import Transtion from '../Transition/transtion';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';
/**
 * AutoComplete 自动补全输入框 输入关键字，展现查询结果
 *
 * ~~~js
 * // 这样引用
 * import { AutoComplete } from 'dzh-react-ui'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOptions"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(0), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var debouncedValue = useDebounce(inputValue, 500);
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { return setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            // 异步获取
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(results);
                if (results.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setSuggestions([]);
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    // Input内容变化
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    // 选中
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropdown = function (suggestions) {
        return (_jsx(Transtion, __assign({ in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () { return setSuggestions([]); } }, { children: _jsx("ul", __assign({ className: 'dzh-suggestion-list' }, { children: suggestions.map(function (item, index) {
                    var cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (_jsx("li", __assign({ className: cnames, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                }) })) })));
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    // 处理键盘事件
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    return (_jsxs("div", __assign({ className: 'dzh-auto-complete', ref: componentRef }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)), loading && (_jsx("div", __assign({ className: 'suggestions-loading-icon' }, { children: _jsx(Icon, { icon: 'spinner', spin: true }) }))), suggestions.length > 0 && generateDropdown(suggestions)] })));
};
export default AutoComplete;
