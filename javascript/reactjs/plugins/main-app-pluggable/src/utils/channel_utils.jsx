import {haveIChannelPermission} from 'plugin-server-webapp-utils/selectors/entities/roles';
import Permissions from 'plugin-server-webapp-utils/constants/permissions';

import {removeUserFromTeam} from 'plugin-server-webapp-utils/actions/teams';
import {TeamTypes} from 'plugin-server-webapp-utils/action_types';
import {getRedirectChannelNameForTeam} from 'plugin-server-webapp-utils/selectors/entities/channels';
import {getCurrentUserId} from 'plugin-server-webapp-utils/selectors/entities/users';

import {openModal} from 'actions/views/modals';

import JoinPrivateChannelModal from 'components/join_private_channel_modal';
import LocalStorageStore from 'stores/local_storage_store';

import Constants, {ModalIdentifiers} from 'utils/constants';
import * as Utils from 'utils/utils.jsx';

import {browserHistory} from './browser_history';

export function canManageMembers(state, channel) {
    if (channel.type === Constants.PRIVATE_CHANNEL) {
        return haveIChannelPermission(
            state,
            channel.team_id,
            channel.id,
            Permissions.MANAGE_PRIVATE_CHANNEL_MEMBERS,
        );
    }

    if (channel.type === Constants.OPEN_CHANNEL) {
        return haveIChannelPermission(
            state,
            channel.team_id,
            channel.id,
            Permissions.MANAGE_PUBLIC_CHANNEL_MEMBERS,
        );
    }

    return true;
}

export function findNextUnreadChannelId(curChannelId, allChannelIds, unreadChannelIds, direction) {
    const curIndex = allChannelIds.indexOf(curChannelId);

    for (let i = 1; i < allChannelIds.length; i++) {
        const index = Utils.mod(curIndex + (i * direction), allChannelIds.length);

        if (unreadChannelIds.includes(allChannelIds[index])) {
            return index;
        }
    }

    return -1;
}

export function isArchivedChannel(channel) {
    return Boolean(channel && channel.delete_at !== 0);
}

export function joinPrivateChannelPrompt(team, channel, handleOnCancel = true) {
    return async (dispatch, getState) => {
        const result = await new Promise((resolve) => {
            const modalData = {
                modalId: ModalIdentifiers.JOIN_CHANNEL_PROMPT,
                dialogType: JoinPrivateChannelModal,
                dialogProps: {
                    channelName: channel.display_name,
                    onJoin: () => {
                        LocalStorageStore.setTeamIdJoinedOnLoad(null);
                        resolve({
                            data: {join: true},
                        });
                    },
                    onCancel: async () => {
                        if (handleOnCancel) {
                            const state = getState();

                            // If auto joined the team on load, leave the team as well
                            if (LocalStorageStore.getTeamIdJoinedOnLoad() === team.id) {
                                await dispatch(removeUserFromTeam(team.id, getCurrentUserId(state)));
                                dispatch({type: TeamTypes.LEAVE_TEAM, data: team});
                                browserHistory.replace('/');
                            } else {
                                const redirectChannelName = getRedirectChannelNameForTeam(state, team.id);
                                browserHistory.replace(`/${team.name}/channels/${redirectChannelName}`);
                            }
                        }
                        LocalStorageStore.setTeamIdJoinedOnLoad(null);
                        resolve({
                            data: {join: false},
                        });
                    },
                },
            };
            dispatch(openModal(modalData));
        });
        return result;
    };
}
