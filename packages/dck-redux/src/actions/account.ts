import { DckActionTypes, SignUpWithPasswordCredentials } from "./types";

/**
 * Check authenticated action.
 * @hidden
 */
export function checkAuthenticated() {
  return {
    type: DckActionTypes.CHECK_AUTHENTICATED
  };
}

/**
 * Sign in action.
 * @param email user email
 * @param password user password
 * @hidden
 */
export function signIn(email: string, password: string) {
  return {
    type: DckActionTypes.SIGN_IN,
    email,
    password
  };
}

/**
 * Sign up with password action.
 * @param credentials user credentials
 * @hidden
 */
export function signUpWithPassword(credentials: SignUpWithPasswordCredentials) {
  return {
    type: DckActionTypes.SIGN_UP_WITH_PASSWORD,
    credentials
  };
}

/**
 * Initialize app action.
 * @hidden
 */
export function initializeApp() {
  return {
    type: DckActionTypes.INITIALIZE_APP
  };
}

/**
 * Initialize user session action.
 * @param sessionData user data(e.g. the token, roles, permissions etc.)
 * @param authenticated is user authenticated
 * @hidden
 */
export function initializeUserSession(sessionData: any, authenticated: boolean) {
  return {
    type: DckActionTypes.INITIALIZE_USER_SESSION,
    sessionData,
    authenticated
  };
}

/**
 * Sign out action.
 * @hidden
 */
export function signOut() {
  return {
    type: DckActionTypes.SIGN_OUT
  };
}

/**
 * Force change password action.
 * @param password password
 * @hidden
 */
export function forceChangePassword(password: string) {
  return {
    type: DckActionTypes.FORCE_CHANGE_PASSWORD,
    password
  };
}

/**
 * Change password action.
 * @param oldPassword old password
 * @param password new password
 * @hidden
 */
export function changePassword(oldPassword: string, password: string) {
  return {
    type: DckActionTypes.CHANGE_PASSWORD,
    oldPassword,
    password
  };
}

/**
 * Forgot password action.
 * @param email user email
 * @hidden
 */
export function forgotPassword(email: string) {
  return {
    type: DckActionTypes.FORGOT_PASSWORD,
    email
  };
}

/**
 * Confirm forgot password action.
 * @param email user email
 * @param verificationCode verification code
 * @param password new user password
 * @hidden
 */
export function confirmForgotPassword(email: string, verificationCode: string, password: string) {
  return {
    type: DckActionTypes.CONFIRM_FORGOT_PASSWORD,
    email,
    verificationCode,
    password
  };
}

/**
 * Ensure change password for user is set action.
 * @hidden
 */
export function ensureChangePasswordUserIsSet() {
  return {
    type: DckActionTypes.ENSURE_CHANGE_USER_PASSWORD_IS_SET
  };
}
