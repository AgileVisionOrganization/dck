import {IDckCallback} from "./BaseTypes";

/**
 * Security enfincer.
 */
export class SecurityEnforcer {
    private ownerClaim: string;
    private groupsClaim: string;

    /**
     * SecurityEnforcer constructor.
     * @param ownerClaim owner claim
     * @param groupsClaim group claim
     */
    public constructor(ownerClaim: string, groupsClaim: string) {
        this.ownerClaim = ownerClaim;
        this.groupsClaim = groupsClaim;
    }

    /**
     * Checks that user was assigned to allowedGroups and have permissions to make the request.
     * @param event request event
     * @param allowedGroups groups which have permissions to make this request
     * @param callback function callback
     */
    public allowOnly(event: any, allowedGroups: string[], callback: IDckCallback) {
        const actualGroups = event.requestContext.authorizer.claims[this.groupsClaim] || [];

        if (allowedGroups.filter((x) => actualGroups.indexOf(x) >= 0).length) {
            return callback(null);
        } else {
            return callback(new Error("User doesn't have groups required to access the given resources"), null);
        }
    }
}
