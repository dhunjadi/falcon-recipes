import {createProxyMiddleware} from 'http-proxy-middleware';

export const getUsersProxy = createProxyMiddleware('/getAppUsers', {
    target: 'https://getappusers-zazjbx7nka-uc.a.run.app/',
    secure: false,
    changeOrigin: true,
});

export const loginProxy = createProxyMiddleware('/userLogin', {
    target: 'https://login-zazjbx7nka-uc.a.run.app/',
    secure: false,
    changeOrigin: true,
});
