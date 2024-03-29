import {ErrorPageTypes} from 'utils/constants';

import {UserProfile} from 'plugin-server-webapp-utils/types/users';

import {ClientLicense} from 'plugin-server-webapp-utils/types/config';

import {isGuest} from 'plugin-server-webapp-utils/utils/user_utils';

export const notFoundParams = {
    type: ErrorPageTypes.PAGE_NOT_FOUND,
};

const mfaPaths = ['/mfa/setup', '/mfa/confirm'];

const mfaAuthServices = ['', 'email', 'ldap'];

export type ConfigOption = {
    EnableMultifactorAuthentication?: string;
    EnforceMultifactorAuthentication?: string;
    GuestAccountsEnforceMultifactorAuthentication?: string;
};

export function checkIfMFARequired(
    user: UserProfile,
    license: ClientLicense,
    config: ConfigOption,
    path: string,
): boolean {
    if (
        license.MFA === 'true' &&
        config.EnableMultifactorAuthentication === 'true' &&
        config.EnforceMultifactorAuthentication === 'true' &&
        mfaPaths.indexOf(path) === -1
    ) {
        if (
            isGuest(user.roles) &&
            config.GuestAccountsEnforceMultifactorAuthentication !== 'true'
        ) {
            return false;
        }
        if (
            user &&
            !user.mfa_active &&
            mfaAuthServices.indexOf(user.auth_service) !== -1
        ) {
            return true;
        }
    }
    return false;
}
