import React from 'react';
import axios from 'axios';

export function addArray(array, ...arrays) {
    let newArr = [...array];
    arrays.forEach(array => {
        array.forEach((item, i) => {
            newArr[i] += item;
        });
    });
    return newArr;
}

export function isDev() {
    return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function isMobile() {
    return window.ontouchstart !== undefined;
}

export function isReactComponent(component) {
    (typeof component === 'function' &&
                (!!component.prototype.isReactComponent
                    || String(component).includes('return React.createElement')))
}

export function windowWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

export function windowHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export function spannifyText(text, afterTheseString) {
    if (afterTheseString === 'CAPITALS') {
        return text.split('').map((char, i) => {
            if (i > 0 && char === char.toUpperCase()) {
                return (
                    <React.Fragment key={i}>
                        <wbr />
                        {char}
                    </React.Fragment>
                );
            }
            return char;
        });
    } else if (afterTheseString) {
        return text.split(new RegExp(`([${afterTheseString}])`,'g')).map((str, i) => {
            if (i > 0) {
                return (
                    <React.Fragment key={i}>
                        <wbr />
                        {str}
                    </React.Fragment>
                );
            }
            return str;
        });
    } else {
        return text.split('').map((char, i) => {
            if (i > 0) {
                return (
                    <React.Fragment key={i}>
                        <wbr />
                        {char}
                    </React.Fragment>
                );
            }
            return char;
        });
    }
}

export function upperFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setAuthToken(token) {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};
