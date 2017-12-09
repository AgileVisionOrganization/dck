import {IDckCallback} from "./BaseTypes";

export class SecurityEnforcer {
    private ownerClaim: string;
    private groupsClaim: string;

    public constructor(ownerClaim: string, groupsClaim: string) {
        this.ownerClaim = ownerClaim;
        this.groupsClaim = groupsClaim;
    }

    public allowOnly(event: any, allowedGroups: string[], callback: IDckCallback) {
        const actualGroups = event.requestContext.authorizer.claims[this.groupsClaim] || [];

        if (allowedGroups.filter((x) => actualGroups.indexOf(x) >= 0).length) {
            return callback(null);
        } else {
            return callback(new Error("User doesn't have groups required to access the given resources"), null);
        }
    }
}
