import * as aws from "aws-sdk";
const AWSError = class extends Error {
    public message: string;
    public code: string;
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
};

export class CognitoIdentityServiceProvider{

    private users = [ 
        { 
           Attributes: [ 
              { 
                 Name: "custom:team_id",
                 Value: "1"
              }
           ],
           Enabled: true,
           Username: "EXISTINGITEM1",
           UserStatus: "CONFIRMED",
           Groups: [
               {
                GroupName: "Admins",
                Precedence: 1
               }
           ]
        },
        { 
         Attributes: [ 
            { 
               Name: "custom:team_id",
               Value: "2"
            }
         ],
         Enabled: true,
         Username: "EXISTINGITEM2",
         UserStatus: "CONFIRMED",
         Groups: [
             {
              GroupName: "Users",
              Precedence: 2
             }
         ]
      }
     ]
    public listUsers(params: aws.CognitoIdentityServiceProvider.Types.ListUsersRequest, callback?: (err: Error, data: aws.CognitoIdentityServiceProvider.Types.ListUsersResponse) => void): any
    {
        if(params.UserPoolId!=="COGNITO_USER_POOL"){
            callback(new AWSError("Resource not found", "InvalidParameterValue"), null);
        }
        else
        {
            callback(null, {
                PaginationToken: "1",
                Users: this.users
             });
        }
    }
    public adminListGroupsForUser(params: aws.CognitoIdentityServiceProvider.Types.AdminListGroupsForUserRequest, callback?: (err: Error, data: aws.CognitoIdentityServiceProvider.Types.AdminListGroupsForUserResponse) => void): any
    {
        if(params.UserPoolId!=="COGNITO_USER_POOL"){
            callback(new AWSError("Resource not found", "InvalidParameterValue"), null);
        }
        else{
            const existUsersResult = this.users.filter(user => { return user.Username===params.Username  })
            if(existUsersResult.length>0){
                callback(null, {Groups: existUsersResult[0].Groups});
            }
            else callback(new AWSError(`User with username ${params.Username} is not found!`, "UserNotFoundException"), null);
        }
    }
    public adminGetUser(params: aws.CognitoIdentityServiceProvider.Types.AdminGetUserRequest, callback?: (err: Error, data: aws.CognitoIdentityServiceProvider.Types.AdminGetUserResponse) => void): any
    {
        if(params.UserPoolId!=="COGNITO_USER_POOL"){
            callback(new AWSError("Resource not found", "InvalidParameterValue"), null);
        }
        else if(!params.Username){
            callback(new AWSError("Username must be not empty", "InvalidParameterValue"), null);
        }
        else{
            const foundUsers = this.users.filter((user) => { return user.Username === params.Username });
            if(foundUsers.length>0){
                callback(null, Object.assign(foundUsers[0], {UserAttributes: foundUsers[0].Attributes}));
            }
            else callback(new AWSError(`User with username ${params.Username} is not found!`, "UserNotFoundException"), null);
        }
    }
    public adminCreateUser(params: aws.CognitoIdentityServiceProvider.Types.AdminCreateUserRequest, callback?: (err: Error, data: aws.CognitoIdentityServiceProvider.Types.AdminCreateUserResponse) => void): any
    {
        if(params.UserPoolId!=="COGNITO_USER_POOL"){
            callback(new AWSError("Resource not found", "InvalidParameterValue"), null);
        }
        else if(!params.Username){
            callback(new AWSError("Username must be not empty", "InvalidParameterValue"), null);
        }
        else if (this.users.filter((user) => { return user.Username === params.Username }).length>0)
        {
            callback(new AWSError(`User with username ${params.Username} already extist!`, "InvalidParameterValue"), null);
        }
        else {
            const newUser = {
                Username: params.Username,
                Attributes: params.UserAttributes.map(attribute => { return {Name: attribute.Name, Value: attribute.Value} }),
                Enabled: true,
                UserStatus: "CONFIRMED",
                Groups: []
            };
            this.users.push(newUser);
            callback(null, {User:newUser});
        }
    }
    public adminUpdateUserAttributes(params: aws.CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesRequest, callback?: (err: Error, data: aws.CognitoIdentityServiceProvider.Types.AdminUpdateUserAttributesResponse) => void): any
    {
        if(params.UserPoolId!=="COGNITO_USER_POOL"){
            callback(new AWSError("Resource not found", "InvalidParameterValue"), null);
        }
        else{
            const foundUsers = this.users.filter((user) => { return user.Username === params.Username });
            if (foundUsers.length > 0) {
                for (const attribute of params.UserAttributes) {
                    if (foundUsers[0].Attributes.filter(existAttribute => {
                        if (existAttribute.Name === attribute.Name) {
                            existAttribute.Value = attribute.Value;
                        }
                        return existAttribute.Name === attribute.Name
                    }).length === 0) {
                        foundUsers[0].Attributes.push({
                            Name: attribute.Name,
                            Value: attribute.Value
                        });
                    }
                }
                callback(null, {});
            }
            else callback(new AWSError(`User with username ${params.Username} is not found!`, "UserNotFoundException"), null);
        }
    }
    public adminDeleteUser(params: aws.CognitoIdentityServiceProvider.Types.AdminDeleteUserRequest, callback?: (err: Error, data: {}) => void): any {
        if(params.UserPoolId!=="COGNITO_USER_POOL"){
            callback(new AWSError("Resource not found", "InvalidParameterValue"), null);
        }
        else{
            const newUsers = this.users.filter((user) => { return user.Username !== params.Username; });
            if (newUsers.length  === this.users.length) {
               
                callback(new AWSError(`User with username ${params.Username} is not found!`, "UserNotFoundException"), null);
            }
            else{ this.users = newUsers; callback(null, {}); }
        }
    }

}