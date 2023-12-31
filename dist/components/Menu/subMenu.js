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
import React, { useContext, useState } from 'react';
import { MenuContext } from './menu';
import classNames from 'classnames';
import Icon from '../Icon/icon';
// import { CSSTransition } from 'react-transition-group'
import Transtion from '../Transition/transtion';
var SubMenu = function (_a) {
    var index = _a.index, title = _a.title, className = _a.className, children = _a.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpen = index && context.mode === 'vertical'
        ? openedSubMenus.includes(index)
        : false;
    var _b = useState(isOpen), menuOpen = _b[0], setOpen = _b[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical'
        ? {
            onClick: handleClick
        }
        : {};
    var hoverEvents = context.mode !== 'vertical'
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) { return handleMouse(e, false); }
        }
        : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('dzh-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.log('Warning: SubMenu has a child which is not a MenuItem component');
            }
        });
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
        _jsx(Transtion, __assign({ in: menuOpen, timeout: 300, animation: 'zoom-in-top' }, { children: _jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (_jsxs("li", __assign({ className: classes }, hoverEvents, { children: [_jsxs("div", __assign({ className: 'submenu-title' }, clickEvents, { children: [title, _jsx(Icon, { icon: 'angle-down', className: 'arrow-icon' })] })), renderChildren()] }), index));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
