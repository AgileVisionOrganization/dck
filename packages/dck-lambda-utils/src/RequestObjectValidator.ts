import {FieldsMap, IDckCallback} from "./BaseTypes";

/**
 * Request object validator.
 */
export class RequestObjectValidator {
    private allowedFields: string[];
    private requiredFields: string[];

    /**
     * RequestObjectValidator constructor.
     * @param allowedFields fields which allows in request
     * @param requiredFields required fields in request
     */
    public constructor(allowedFields?: string[], requiredFields?: string[]) {
        this.allowedFields = allowedFields || [];
        this.requiredFields = requiredFields || [];
    }

    /**
     * Validate request.
     * @param requestBody request body
     * @param callback function callback
     */
    public validateRequest(requestBody: any, callback: IDckCallback) {

        if (requestBody === null) {
            return callback(new Error("Request body can't be null or undefined"), null);
        }

        const absentRequiredFields = this.requiredFields.slice();

        for (const key in requestBody) {
            if (requestBody.hasOwnProperty(key)) {

                if (this.allowedFields.length > 0 && this.allowedFields.indexOf(key) < 0) {
                    return callback(new Error(`Unrecognized field ${key}`), null);
                }

                const requiredKeyPos = absentRequiredFields.indexOf(key);
                if (requiredKeyPos >= 0) {
                    absentRequiredFields.splice(requiredKeyPos, 1);
                }
            }
        }

        if (absentRequiredFields.length) {
            callback(new Error(`There are missing required fields: ${absentRequiredFields}`), null);
        } else {
            callback(null, requestBody);
        }
    }
}
