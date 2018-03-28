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

export function anything(value: string) {
  return new Promise((resolve, reject) => {
    const empty = false;
    const valid = true;
    resolve({ valid, empty });
  });
}

export function email(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if (!value || value.length === 0 || value.trim().length === 0) {
      empty = true;
    } else {
      valid = emailValidator.validate(value);
    }
    resolve({ valid, empty });
  });
}

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

export function date(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if (!value || value.length === 0 || value.trim().length === 0) {
      empty = true;
    } else {
      const dateValue = moment(value, "M/D/YYYY", true);
      valid = dateValue.isValid();
    }
    resolve({ valid, empty });
  });
}

export function phoneNumber(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;
    let valid = false;

    if (!value || value.length === 0 || value.trim().length === 0) {
      empty = true;
    } else {
      const phoneNumberValue = parse(value);
      if (Object.keys(phoneNumberValue).length !== 0) {
        valid = true;
      }
    }
    resolve({ valid, empty });
  });
}

export function gender(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;

    let valid = false;

    if (!value || value.trim().length === 0) {
      empty = true;
    } else if (value === "MALE" || value === "FEMALE") {
      valid = true;
    }
    resolve({ valid, empty });
  });
}

export function float(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;

    let valid = false;

    if (!value || value.trim().length === 0) {
      empty = true;
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

export function nonEmpty(value: string) {
  return new Promise((resolve, reject) => {
    let empty = false;

    let valid = false;

    if (!value || value.trim().length === 0) {
      empty = true;
    } else {
      valid = true;
    }
    resolve({ valid, empty });
  });
}

export function regexpValidator(regExp: RegExp) {
    return (value: string) => {
        return new Promise((resolve, reject) => {
            let empty = false;
            let valid = false;
            if (!value || value.trim().length === 0) {
                empty = true;
            }
            if (regExp.test(value)) {
                valid = true;
            }
            resolve({valid, empty});
        });
    };
}

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
