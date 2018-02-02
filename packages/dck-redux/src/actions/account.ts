import * as types from "./types";

export function checkAuthenticated() {
  return {
    type: types.CHECK_AUTHENTICATED
  };
}

export function signIn(email: string, password: string) {
  return {
    type: types.SIGN_IN,
    email,
    password
  };
}

export function signUpWithPassword(credentials: types.SignUpWithPasswordCredentials) {
  return {
    type: types.SIGN_UP_WITH_PASSWORD,
    credentials
  };
}

export function initializeApp() {
  return {
    type: types.INITIALIZE_APP
  };
}

export function initializeUserSession(
  sessionData: any,
  authenticated: boolean
) {
  return {
    type: types.INITIALIZE_USER_SESSION,
    sessionData,
    authenticated
  };
}

export function signOut() {
  return {
    type: types.SIGN_OUT
  };
}

export function forceChangePassword(password: string) {
  return {
    type: types.FORCE_CHANGE_PASSWORD,
    password
  };
}

export function changePassword(oldPassword: string, password: string) {
  return {
    type: types.CHANGE_PASSWORD,
    oldPassword,
    password
  };
}

export function forgotPassword(email: string) {
  return {
    type: types.FORGOT_PASSWORD,
    email
  };
}

export function confirmForgotPassword(
  email: string,
  verificationCode: string,
  password: string
) {
  return {
    type: types.CONFIRM_FORGOT_PASSWORD,
    email,
    verificationCode,
    password
  };
}

export function ensureChangePasswordUserIsSet() {
  return {
    type: types.ENSURE_CHANGE_USER_PASSWORD_IS_SET
  };
}
