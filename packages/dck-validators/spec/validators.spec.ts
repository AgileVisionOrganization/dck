import {
  date,
  email,
  float,
  gender,
  IValidationResult,
  nonEmpty,
  password,
  phoneNumber,
  serverSideValidator,
  regexpValidator,
} from "../src/validators";

describe("Validators", () => {
  describe("email", () => {
    it("should correctly validate email", (done: () => void) => {
      const correctEmail = "demo@example.com";
      email(correctEmail).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should correctly validate email with dots and plus signs", (
      done: () => void,
    ) => {
      const correctEmail = "demo.one+test@example.com";
      email(correctEmail).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of the incorrect email", (done: () => void) => {
      const incorrectEmail = "demo.one+test@example";
      email(incorrectEmail).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty email", (done: () => void) => {
      const incorrectEmail = "";
      email(incorrectEmail).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should validate empty email as nonempty if it's optional", (done) => {
      const incorrectEmail: any = "";
      email(incorrectEmail, true).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty email if it is null", (done) => {
      const incorrectEmail: any = null;
      email(incorrectEmail).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty email, if it contains only spaces", (done) => {
      const incorrectEmail = "   ";
      email(incorrectEmail).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });

  describe("password", () => {
    it("should correctly validate password", (done) => {
      const correctPassword = "secret";
      password(correctPassword).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty password", (done) => {
      const incorrectPassword = "";
      email(incorrectPassword).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty password if it is null", (done) => {
      const incorrectPassword: any = null;
      email(incorrectPassword).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });

  describe("date", () => {
    it("should correctly validate date", (done) => {
      const correctDate = "09/23/2017";
      date(correctDate).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should correctly validate date without leading zero", (done) => {
      const correctDate = "9/3/2017";
      date(correctDate).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty date", (done) => {
      const incorrectDate = "";
      date(incorrectDate).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should validate empty date as nonempty if it's optional", (done) => {
      const incorrectDate = "";
      date(incorrectDate, true).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("shoud fail validation of an empty date if it is null", (done) => {
      const incorrectDate: any = null;
      date(incorrectDate).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of a string in incorrect format", (done) => {
      const incorrectDateFormat = "September 23, 2017";
      date(incorrectDateFormat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of a string with white spaces", (done) => {
      const incorrectDateFormat = "9/ 23/ 2017";
      date(incorrectDateFormat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });

  describe("phoneNumber", () => {
    it("should correctly validate a phone number", (done) => {
      const correctPhoneNumber = "+380634305010";
      phoneNumber(correctPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should correctly validate a phone number with parentheses", (done) => {
      const correctPhoneNumber = "+38 (063) 9905020";
      phoneNumber(correctPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should correctly validate a phone number with dashes", (done) => {
      const correctPhoneNumber = "+38063990-50-10";
      phoneNumber(correctPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation a phone number in a different format", (done) => {
      const incorrectPhoneNumber = "09887654321";
      phoneNumber(incorrectPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation a phone number with characters", (done) => {
      const incorrectPhoneNumber = "+38063f23q1w1";
      phoneNumber(incorrectPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of a phone number without plus sign", (done) => {
      const incorrectPhoneNumber = "380639905020";
      phoneNumber(incorrectPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty phone number", (done) => {
      const incorrectPhoneNumber = "";
      phoneNumber(incorrectPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should validate empty phone number as nonempty if it's optional", (done) => {
      const incorrectPhoneNumber = "";
      phoneNumber(incorrectPhoneNumber, true).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty phone number if it is null", (done) => {
      const incorrectPhoneNumber: any = null;
      phoneNumber(incorrectPhoneNumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });
  describe("gender", () => {
    it("should correctly validate gender", (done: () => void) => {
      const correctGender = "MALE";
      gender(correctGender).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of the incorrect gender", (done: () => void) => {
      const incorrectGender = "MALE+FEMALE";
      gender(incorrectGender).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty gender", (done: () => void) => {
      const incorrectGender = "";
      gender(incorrectGender).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should validate empty gender as nonempty if it's optional", (done) => {
      const incorrectGender = "";
      gender(incorrectGender, true).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty gender if it is null", (done) => {
      const incorrectGender: any = null;
      gender(incorrectGender).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty gender, if it contains only spaces", (done) => {
      const incorrectGender = "   ";
      gender(incorrectGender).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });
  describe("float", () => {
    it("should correctly validate float", (done: () => void) => {
      const correctFloat = "10.05";
      float(correctFloat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of the incorrect float", (done: () => void) => {
      const incorrectFloat = "10,05";
      float(incorrectFloat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty float", (done: () => void) => {
      const incorrectFloat = "";
      float(incorrectFloat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should validate empty float as nonempty if it's optional", (done) => {
      const incorrectFloat = "";
      float(incorrectFloat, true).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty float if it is null", (done) => {
      const incorrectFloat: any = null;
      float(incorrectFloat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty float, if it contains only spaces", (done) => {
      const incorrectFloat = "   ";
      float(incorrectFloat).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });
  describe("nonEmpty", () => {
    it("should correctly validate nonEmpty", (done: () => void) => {
      const correctNonEmpty = " is nonEmpty ";
      nonEmpty(correctNonEmpty).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation of an empty nonEmpty if it is null", (done) => {
      const incorrectNonEmpty: any = null;
      nonEmpty(incorrectNonEmpty).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });

    it("should fail validation of an empty nonEmpty, if it contains only spaces", (done) => {
      const incorrectNonEmpty = "   ";
      nonEmpty(incorrectNonEmpty).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });
  describe("regExpValidator", () => {
    it("should correctly validate positive integer value using /^\d+$/ regexp", (done) => {
      const positiveIntRegexpValidator = regexpValidator(/^\d+$/);
      const correctPositiveIntegerValue: string = "987654321";
      positiveIntRegexpValidator(correctPositiveIntegerValue).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
      });
      const wrongPositiveIntegerValueWithDot: string = "987654321.";
      positiveIntRegexpValidator(wrongPositiveIntegerValueWithDot).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
      });
      const negativeInteger: string = "-44";
      positiveIntRegexpValidator(negativeInteger).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
      });
      const notANumber: string = "fifty five";
      positiveIntRegexpValidator(notANumber).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
      });
      done();
    });
    it(`should validate empty value as empty and in the same time \
      if reqExp describes empty string it should be valid`, (done) => {
      const emptyStringRegExp = regexpValidator(/^$/);
      emptyStringRegExp("").then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(true);
      });
      const notEmptyStringRegExp = regexpValidator(/^ABCXYZ$/);
      notEmptyStringRegExp("").then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(true);
        expect(result.valid).toEqual(false);
      });
      done();
    });
    it("should correctly validate IP address", (done) => {
      const ipRegExpString = `^${"(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).".repeat(4)}?$`;
      const ipAddressValidator = regexpValidator(new RegExp(ipRegExpString));
      const ipAddressValue = "192.168.1.1";
      ipAddressValidator(ipAddressValue).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });
  });
  describe("serverDataValidator", () => {
    it("should correctly validate serverData", (done: () => void) => {
      const testPromise = new Promise((resolve, reject) => {
        resolve("Success!");
      });
      serverSideValidator(() => {
        return testPromise;
      }).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(true);
        done();
      });
    });

    it("should fail validation serverData if error", (done) => {
      const testPromise = new Promise((resolve, reject) => {
        reject("Error!");
      });
      serverSideValidator(() => {
        return testPromise;
      }).then((result: IValidationResult) => {
        expect(result).toHaveProperty("empty");
        expect(result).toHaveProperty("valid");
        expect(result.empty).toEqual(false);
        expect(result.valid).toEqual(false);
        done();
      });
    });
  });
});
