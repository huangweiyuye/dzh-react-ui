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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Transtion from './components/Transition/transtion';
import { useState } from 'react';
library.add(fas);
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (_jsxs("div", __assign({ className: 'App' }, { children: [_jsx(Icon, { icon: 'arrow-down', theme: 'primary', size: '10x' }), _jsxs(Menu, __assign({ defaultIndex: '0', onSelect: function (index) { return alert(index); }, mode: 'horizontal', defaultOpenSubMenus: ['2'] }, { children: [_jsx(MenuItem, { children: "cool link" }), _jsx(MenuItem, __assign({ disabled: true }, { children: "cool link2" })), _jsxs(SubMenu, __assign({ title: 'dropdown' }, { children: [_jsx(MenuItem, { children: "dropdown 1" }), _jsx(MenuItem, { children: "dropdown 2" })] })), _jsx(MenuItem, { children: "cool link3" })] })), _jsx(Button, __assign({ size: 'lg', onClick: function () { return setShow(!show); } }, { children: "toggle" })), _jsx(Transtion, __assign({ in: show, timeout: 300, animation: 'zoom-in-left' }, { children: _jsxs("div", { children: [_jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload"] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload"] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload"] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload"] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload"] }), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload"] })] }) })), _jsx(Transtion, __assign({ in: show, timeout: 300, animation: 'zoom-in-top', wrapper: true }, { children: _jsx(Button, __assign({ btnType: 'primary', size: 'lg' }, { children: "A large Button" })) })), _jsx("p", { children: "learn react" }), _jsx("br", {}), _jsx("br", {}), _jsx("br", {}), _jsxs("header", __assign({ className: 'App-header' }, { children: [_jsx(Button, __assign({ className: 'custom', onClick: function () { return alert(123); } }, { children: "Hello" })), "\u00A0\u00A0", _jsx(Button, __assign({ disabled: true }, { children: "Disabled Button" })), "\u00A0\u00A0", _jsx(Button, __assign({ btnType: 'primary', size: 'lg' }, { children: "Large Primary" })), "\u00A0\u00A0", _jsx(Button, __assign({ btnType: 'danger', size: 'sm' }, { children: "Small Danger" })), _jsx("br", {}), _jsx("br", {}), _jsx(Button, __assign({ btnType: 'link', href: 'http://www.baidu.com', target: '_blank' }, { children: "Baidu Link" })), "\u00A0\u00A0", _jsx(Button, __assign({ btnType: 'link', href: 'http://www.baidu.com', disabled: true }, { children: "Disabled Link" }))] }))] })));
}
export default App;
