import { getMe } from './authGetMe.controller.js'
import { login } from './authLogin.controller.js'
import { logout } from './authLogout.controller.js'
import { register } from './authRegister.controller.js'

export const authRegister = register
export const authLogin = login
export const authLogout = logout
export const authGetMe = getMe
