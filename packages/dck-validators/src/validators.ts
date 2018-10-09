import * as emailValidator from "email-validator";
import { parse } from "libphonenumber-js";
import * as moment from "moment";

/**
 * Describes a validation result. Validation result
 * determines whether the validate data valid or empty.
 */
export interface IValidationResult {
  valid?: boolean;
  empty?: boolean;
}

/**
 * Any value will be valid result.
 * @param {string} value input string
 */
export function anything(value: string) {
  return new Promise((resolve, reject) => {
    const empty = false;
    const valid = true;
    resolve({ valid, empty });
  });
}

/**
 * Checks that input string contains email.
 * @param {string} value input string
 */
export function email(value: string, optional?: boolean) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if ((!value || value.length === 0 || value.trim().length === 0)) {
      empty = true;
      if (optional) { valid = true; }
    } else {
      valid = emailValidator.validate(value);
    }
    resolve({ valid, empty });
  });
}

/**
 * Password validation, the correct password should contain more than 6 letters.
 * @param {string} value input string
 */
export function password(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if (!value || value.length < 6) {
      empty = true;
    } else {
      valid = true;
    }
    resolve({ valid, empty });
  });
}

/**
 * Password confirmation validation, the confirm password should be the same as password.
 * @param {() => string} passwordExtractor password extractor
 */
export function passwordConfirmation(passwordExtractor: () => string) {
  return (value: string) => {
    return new Promise((resolve, reject) => {
      let empty = false;
      let valid = false;

      if (!value) {
        empty = true;
      } else {
        const passwordValue = passwordExtractor();
        valid = value === passwordValue;
      }
      resolve({ valid, empty });
    });
  };
}

/**
 * Validator for the required value, the result will be valid if the input string contains any value.
 * @param {string} value input string
 */
export function requiredValue(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if (!value) {
      empty = true;
    } else {
      valid = true;
    }
    resolve({ valid, empty });
  });
}

/**
 * Date value validator, the result will be valid if the input string contains date.
 * @param {string} value input string
 */
export function date(value: string, optional?: boolean) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if ((!value || value.length === 0 || value.trim().length === 0)) {
      empty = true;
      if (optional) { valid = true; }
    } else {
      const dateValue = moment(value, "M/D/YYYY", true);
      valid = dateValue.isValid();
    }
    resolve({ valid, empty });
  });
}

/**
 * Phone number validator, the result will be valid if the input string contains phone number.
 * @param {string} value input string
 */
export function phoneNumber(value: string, optional?: boolean) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if ((!value || value.length === 0 || value.trim().length === 0)) {
      empty = true;
      if (optional) { valid = true; }
    } else {
      const phoneNumberValue = parse(value);
      if (Object.keys(phoneNumberValue).length !== 0) {
        valid = true;
      }
    }
    resolve({ valid, empty });
  });
}

/**
 * Gender validator, the result will be valid if the input string contains gender(MALE or FEMALE).
 * @param {string} value input string
 */
export function gender(value: string, optional?: boolean) {
  return new Promise((resolve, reject) => {
    let empty = false;

    let valid = false;

    if ((!value || value.trim().length === 0)) {
      empty = true;
      if (optional) { valid = true; }
    } else if (value === "MALE" || value === "FEMALE") {
      valid = true;
    }
    resolve({ valid, empty });
  });
}

/**
 * Float validator, the result will be valid if the input string contains float value.
 * @param {string} value input string
 */
export function float(value: string, optional?: boolean) {
  return new Promise((resolve, reject) => {
    let empty = false;

    let valid = false;

    if ((!value || value.trim().length === 0)) {
      empty = true;
      if (optional) { valid = true; }
    } else {
      if (isFloat(value)) {
        valid = true;
      }
    }
    resolve({ valid, empty });
  });
}

function isFloat(n: any) {
  return parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0;
}

/**
 * Non empty validator, the result will be valid if the input string contains non empty.
 * @param {string} value input string
 */
export function nonEmpty(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;

    let valid = false;

    if (!value || !String(value).trim()) {
      empty = true;
    } else {
      valid = true;
    }
    resolve({ valid, empty });
  });
}

/**
 * Regex validator, the result will be valid if the input string match with regex.
 * @param {RegExp} regExp input regexp
 */
export function regexpValidator(regExp: RegExp) {
    return (value: string) => {
        return new Promise((resolve, reject) => {
            let empty = false;
            let valid = false;
            if (value === "" || !String(value).trim()) {
                empty = true;
            }
            if (regExp.test(String(value))) {
                valid = true;
            }
            resolve({valid, empty});
        });
    };
}

/**
 * Server-side validation, input string will be checking on the server.
 * @param {() => Promise<any>} requestGenerator server request
 */
export function serverSideValidator(requestGenerator: () => Promise<any>) {
  return new Promise((resolve, reject) => {
    requestGenerator()
      .then(() => {
        const empty = false;
        const valid = true;
        resolve({ valid, empty });
      })
      .catch(() => {
        const empty = false;
        const valid = false;
        resolve({ valid, empty });
      });
  });
}
