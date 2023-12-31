import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/getAppUsers': {
                target: 'https://getappusers-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/getAppUser': {
                target: 'https://getappuser-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/registerUser': {
                target: 'https://addappuser-zazjbx7nka-uc.a.run.app',
                changeOrigin: true,
                secure: false,
            },
            '/userLogin': {
                target: 'https://login-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/getRecipes': {
                target: 'https://getrecipes-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/getRecipe': {
                target: 'https://getrecipe-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/addRecipe': {
                target: 'https://addrecipe-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/deleteRecipe': {
                target: 'https://deleterecipe-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
            '/updateRecipe': {
                target: 'https://editrecipe-zazjbx7nka-uc.a.run.app/',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    plugins: [react()],
});
