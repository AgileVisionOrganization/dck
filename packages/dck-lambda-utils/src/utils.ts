export function reverseMap(input: any) {
    const result: any = {};

    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            result[input[key]] = key;
        }
    }

    return result;
}

export function toCognitoAttributes(user: any) {
    const attributes = [];

    for (const key in user) {
        if (user.hasOwnProperty(key)) {
            attributes.push({
                Name: key,
                Value: user[key],
            });
        }
    }

    return attributes;
}

export function fromCognitoAttributes(attributes: any) {
    const transformed: any = {};

    for (const entry of attributes) {
        transformed[entry.Name] = entry.Value;
    }

    return transformed;
}

export function fromCognitoUser(user: any) {
    return Object.assign(
        {},
        {
            id: user.Username,
            status: user.UserStatus,
        },
        fromCognitoAttributes(user.Attributes),
    );
}

export function fromCognitoGetUser(user: any) {
    return Object.assign(
        {},
        {
            id: user.Username,
            status: user.UserStatus,
        },
        fromCognitoAttributes(user.UserAttributes),
    );
}
