/* eslint-disable max-lines */

import keyMirror from 'key-mirror';

import Permissions from 'plugin-server-webapp-utils/constants/permissions';

import * as PostListUtils from 'plugin-server-webapp-utils/utils/post_list';


import {t} from 'utils/i18n';

import githubCSS from '!!file-loader?name=files/code_themes/[hash].[ext]!highlight.js/styles/github.css';

// eslint-disable-line import/order
import monokaiCSS from '!!file-loader?name=files/code_themes/[hash].[ext]!highlight.js/styles/monokai.css';

// eslint-disable-line import/order
import solarizedDarkCSS from '!!file-loader?name=files/code_themes/[hash].[ext]!highlight.js/styles/base16/solarized-dark.css';

// eslint-disable-line import/order
import solarizedLightCSS from '!!file-loader?name=files/code_themes/[hash].[ext]!highlight.js/styles/base16/solarized-light.css'; // eslint-disable-line import/order

export const SettingsTypes = {
    TYPE_TEXT: 'text',
    TYPE_LONG_TEXT: 'longtext',
    TYPE_NUMBER: 'number',
    TYPE_COLOR: 'color',
    TYPE_BOOL: 'bool',
    TYPE_PERMISSION: 'permission',
    TYPE_RADIO: 'radio',
    TYPE_BANNER: 'banner',
    TYPE_DROPDOWN: 'dropdown',
    TYPE_GENERATED: 'generated',
    TYPE_USERNAME: 'username',
    TYPE_BUTTON: 'button',
    TYPE_LANGUAGE: 'language',
    TYPE_JOBSTABLE: 'jobstable',
    TYPE_FILE_UPLOAD: 'fileupload',
    TYPE_CUSTOM: 'custom',
};

export const Preferences = {
};

export const ActionTypes = keyMirror({
    RECEIVED_FOCUSED_POST: null,
    SELECT_POST: null,
    HIGHLIGHT_REPLY: null,
    CLEAR_HIGHLIGHT_REPLY: null,
    SELECT_POST_CARD: null,
    INCREASE_POST_VISIBILITY: null,
    LOADING_POSTS: null,

    UPDATE_RHS_STATE: null,
    UPDATE_RHS_SEARCH_TERMS: null,
    UPDATE_RHS_SEARCH_TYPE: null,
    UPDATE_RHS_SEARCH_RESULTS_TERMS: null,

    SET_RHS_EXPANDED: null,
    TOGGLE_RHS_EXPANDED: null,

    UPDATE_MOBILE_VIEW: null,

    SET_NAVIGATION_BLOCKED: null,
    DEFER_NAVIGATION: null,
    CANCEL_NAVIGATION: null,
    CONFIRM_NAVIGATION: null,

    TOGGLE_IMPORT_THEME_MODAL: null,
    SHOW_EDIT_POST_MODAL: null,
    HIDE_EDIT_POST_MODAL: null,

    EMITTED_SHORTCUT_REACT_TO_LAST_POST: null,

    BROWSER_CHANGE_FOCUS: null,
    BROWSER_WINDOW_RESIZED: null,

    RECEIVED_PLUGIN_COMPONENT: null,
    REMOVED_PLUGIN_COMPONENT: null,
    RECEIVED_PLUGIN_POST_COMPONENT: null,
    RECEIVED_PLUGIN_POST_CARD_COMPONENT: null,
    REMOVED_PLUGIN_POST_COMPONENT: null,
    REMOVED_PLUGIN_POST_CARD_COMPONENT: null,
    RECEIVED_WEBAPP_PLUGINS: null,
    RECEIVED_WEBAPP_PLUGIN: null,
    REMOVED_WEBAPP_PLUGIN: null,
    RECEIVED_ADMIN_CONSOLE_REDUCER: null,
    REMOVED_ADMIN_CONSOLE_REDUCER: null,
    RECEIVED_ADMIN_CONSOLE_CUSTOM_COMPONENT: null,

    MODAL_OPEN: null,
    MODAL_CLOSE: null,

    SELECT_CHANNEL_WITH_MEMBER: null,
    SET_LAST_UNREAD_CHANNEL: null,
    UPDATE_CHANNEL_LAST_VIEWED_AT: null,

    INCREMENT_EMOJI_PICKER_PAGE: null,
    SET_RECENT_SKIN: null,

    STATUS_DROPDOWN_TOGGLE: null,
    TOGGLE_LHS: null,
    OPEN_LHS: null,
    CLOSE_LHS: null,

    SET_SHOW_PREVIEW_ON_CREATE_COMMENT: null,
    SET_SHOW_PREVIEW_ON_CREATE_POST: null,
    SET_SHOW_PREVIEW_ON_EDIT_CHANNEL_HEADER_MODAL: null,
    SET_SHOW_PREVIEW_ON_EDIT_POST_MODAL: null,

    TOGGLE_RHS_MENU: null,
    OPEN_RHS_MENU: null,
    CLOSE_RHS_MENU: null,

    STORE_REHYDRATION_FAILED: null,

    DISMISS_NOTICE: null,
    SHOW_NOTICE: null,

    SELECT_ATTACHMENT_MENU_ACTION: null,

    RECEIVED_TRANSLATIONS: null,

    INCREMENT_WS_ERROR_COUNT: null,
    RESET_WS_ERROR_COUNT: null,
    RECEIVED_POSTS_FOR_CHANNEL_AT_TIME: null,
    RECEIVED_READ_STATUS_FOR_CHANNEL: null,
    CHANNEL_POSTS_STATUS: null,
    CHANNEL_SYNC_STATUS: null,
    ALL_CHANNEL_SYNC_STATUS: null,

    UPDATE_ACTIVE_SECTION: null,

    RECEIVED_MARKETPLACE_PLUGINS: null,
    RECEIVED_MARKETPLACE_APPS: null,
    FILTER_MARKETPLACE_LISTING: null,
    INSTALLING_MARKETPLACE_ITEM: null,
    INSTALLING_MARKETPLACE_ITEM_SUCCEEDED: null,
    INSTALLING_MARKETPLACE_ITEM_FAILED: null,

    POST_UNREAD_SUCCESS: null,

    SET_UNREAD_FILTER_ENABLED: null,
    UPDATE_TOAST_STATUS: null,
    UPDATE_THREAD_TOAST_STATUS: null,

    SIDEBAR_DRAGGING_SET_STATE: null,
    SIDEBAR_DRAGGING_STOP: null,
    ADD_NEW_CATEGORY_ID: null,
    MULTISELECT_CHANNEL: null,
    MULTISELECT_CHANNEL_ADD: null,
    MULTISELECT_CHANNEL_TO: null,
    MULTISELECT_CHANNEL_CLEAR: null,

    TRACK_ANNOUNCEMENT_BAR: null,
    DISMISS_ANNOUNCEMENT_BAR: null,

    PREFETCH_POSTS_FOR_CHANNEL: null,

    SET_SHOW_NEXT_STEPS_VIEW: null,
    SET_FILES_FILTER_BY_EXT: null,

    SUPPRESS_RHS: null,
    UNSUPPRESS_RHS: null,

    FIRST_CHANNEL_NAME: null,
});

export const WarnMetricTypes = {
    SYSTEM_WARN_METRIC_NUMBER_OF_ACTIVE_USERS_100: 'warn_metric_number_of_active_users_100',
    SYSTEM_WARN_METRIC_NUMBER_OF_ACTIVE_USERS_200: 'warn_metric_number_of_active_users_200',
    SYSTEM_WARN_METRIC_NUMBER_OF_ACTIVE_USERS_300: 'warn_metric_number_of_active_users_300',
    SYSTEM_WARN_METRIC_NUMBER_OF_ACTIVE_USERS_500: 'warn_metric_number_of_active_users_500',
    SYSTEM_WARN_METRIC_NUMBER_OF_TEAMS_5: 'warn_metric_number_of_teams_5',
    SYSTEM_WARN_METRIC_NUMBER_OF_CHANNELS_5: 'warn_metric_number_of_channels_50',
    SYSTEM_WARN_METRIC_MFA: 'warn_metric_mfa',
    SYSTEM_WARN_METRIC_EMAIL_DOMAIN: 'warn_metric_email_domain',
    SYSTEM_WARN_METRIC_NUMBER_OF_POSTS_2M: 'warn_metric_number_of_posts_2M',
};

export const ModalIdentifiers = {
    ABOUT: 'about',
};

export const EventTypes = Object.assign(
    {
        KEY_DOWN: 'keydown',
        KEY_UP: 'keyup',
        CLICK: 'click',
        FOCUS: 'focus',
        BLUR: 'blur',
        MOUSE_DOWN: 'mousedown',
        MOUSE_UP: 'mouseup',
    },
    keyMirror({
        POST_LIST_SCROLL_TO_BOTTOM: null,
    }),
);

export const A11yClassNames = {
    REGION: 'a11y__region',
    SECTION: 'a11y__section',
    ACTIVE: 'a11y--active',
    FOCUSED: 'a11y--focused',
    MODAL: 'a11y__modal',
    POPUP: 'a11y__popup',
};

export const A11yAttributeNames = {
    SORT_ORDER: 'data-a11y-sort-order',
    ORDER_REVERSE: 'data-a11y-order-reversed',
    FOCUS_CHILD: 'data-a11y-focus-child',
    LOOP_NAVIGATION: 'data-a11y-loop-navigation',
    DISABLE_NAVIGATION: 'data-a11y-disable-nav',
};

export const SocketEvents = {
};

export const TutorialSteps = {
};

export const TELEMETRY_CATEGORIES = {
};

export const ErrorPageTypes = {
    LOCAL_STORAGE: 'local_storage',
    OAUTH_ACCESS_DENIED: 'oauth_access_denied',
    OAUTH_MISSING_CODE: 'oauth_missing_code',
    OAUTH_INVALID_PARAM: 'oauth_invalid_param',
    OAUTH_INVALID_REDIRECT_URL: 'oauth_invalid_redirect_url',
    PAGE_NOT_FOUND: 'page_not_found',
    PERMALINK_NOT_FOUND: 'permalink_not_found',
    TEAM_NOT_FOUND: 'team_not_found',
    CHANNEL_NOT_FOUND: 'channel_not_found',
    MAX_FREE_USERS_REACHED: 'max_free_users_reached',
};

export const AnnouncementBarTypes = {
    ANNOUNCEMENT: 'announcement',
    CRITICAL: 'critical',
    DEVELOPER: 'developer',
    SUCCESS: 'success',
    ADVISOR: 'advisor',
    ADVISOR_ACK: 'advisor-ack',
    GENERAL: 'general',
};

export const AnnouncementBarMessages = {
    PREVIEW_MODE: t('announcement_bar.error.preview_mode'),
    WEBSOCKET_PORT_ERROR: t('channel_loader.socketError')
};

export const FileTypes = {
    TEXT: 'text',
    IMAGE: 'image',
    AUDIO: 'audio',
    VIDEO: 'video',
    SPREADSHEET: 'spreadsheet',
    CODE: 'code',
    WORD: 'word',
    PRESENTATION: 'presentation',
    PDF: 'pdf',
    PATCH: 'patch',
    SVG: 'svg',
    OTHER: 'other',
};

export const Locations = {
    CENTER: 'CENTER',
    RHS_ROOT: 'RHS_ROOT',
    RHS_COMMENT: 'RHS_COMMENT',
    SEARCH: 'SEARCH',
    NO_WHERE: 'NO_WHERE',
};

export const Constants = {
    

    // KeyCodes
    //  key[0]: used for KeyboardEvent.key
    //  key[1]: used for KeyboardEvent.keyCode
    //  key[2]: used for KeyboardEvent.code

    //  KeyboardEvent.code is used as primary check to support multiple keyborad layouts
    //  support of KeyboardEvent.code is just in chrome and firefox so using key and keyCode for better browser support

    PostsViewJumpTypes: {
        BOTTOM: 1,
        POST: 2,
        SIDEBAR_OPEN: 3,
    },
    NotificationPrefs: {
        MENTION: 'mention',
    },
    Integrations: {
        COMMAND: 'commands',
        PAGE_SIZE: '10000',
        START_PAGE_NUM: 0,
        INCOMING_WEBHOOK: 'incoming_webhooks',
        OUTGOING_WEBHOOK: 'outgoing_webhooks',
        OAUTH_APP: 'oauth2-apps',
        BOT: 'bots',
        EXECUTE_CURRENT_COMMAND_ITEM_ID: '_execute_current_command',
        OPEN_COMMAND_IN_MODAL_ITEM_ID: '_open_command_in_modal',
        COMMAND_SUGGESTION_ERROR: 'error',
        COMMAND_SUGGESTION_CHANNEL: 'channel',
        COMMAND_SUGGESTION_USER: 'user',
    },
    FeatureTogglePrefix: 'feature_enabled_',
    PRE_RELEASE_FEATURES: {
        MARKDOWN_PREVIEW: {
            label: 'markdown_preview', // github issue: https://github.com/mattermost/platform/pull/1389
            description: 'Show markdown preview option in message input box',
        },
    },
    OVERLAY_TIME_DELAY_SMALL: 100,
    OVERLAY_TIME_DELAY: 400,
    PERMALINK_FADEOUT: 5000,
    DEFAULT_MAX_USERS_PER_TEAM: 50,
    DEFAULT_MAX_CHANNELS_PER_TEAM: 2000,
    DEFAULT_MAX_NOTIFICATIONS_PER_CHANNEL: 1000,
    MIN_TEAMNAME_LENGTH: 2,
    MAX_TEAMNAME_LENGTH: 15,
    MAX_TEAMDESCRIPTION_LENGTH: 50,
    MIN_CHANNELNAME_LENGTH: 2,
    MAX_CHANNELNAME_LENGTH: 64,
    MAX_FIRSTNAME_LENGTH: 64,
    MAX_LASTNAME_LENGTH: 64,
    MAX_EMAIL_LENGTH: 128,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 22,
    MAX_NICKNAME_LENGTH: 22,
    MIN_PASSWORD_LENGTH: 5,
    MAX_PASSWORD_LENGTH: 64,
    MAX_POSITION_LENGTH: 128,
    MIN_TRIGGER_LENGTH: 1,
    MAX_TRIGGER_LENGTH: 128,
    MAX_SITENAME_LENGTH: 30,
    MAX_CUSTOM_BRAND_TEXT_LENGTH: 500,
    MAX_TERMS_OF_SERVICE_TEXT_LENGTH: 16383,
    DEFAULT_TERMS_OF_SERVICE_RE_ACCEPTANCE_PERIOD: 365,
    EMOJI_PATH: '/static/emoji',
    RECENT_EMOJI_KEY: 'recentEmojis',
    DEFAULT_WEBHOOK_LOGO: logoWebhook,
    MHPNS: 'https://push.mattermost.com',
    MTPNS: 'https://push-test.mattermost.com',
    MAX_PREV_MSGS: 100,
    POST_COLLAPSE_TIMEOUT: 1000 * 60 * 5, // five minutes
    PERMISSIONS_ALL: 'all',
    PERMISSIONS_CHANNEL_ADMIN: 'channel_admin',
    PERMISSIONS_TEAM_ADMIN: 'team_admin',
    PERMISSIONS_SYSTEM_ADMIN: 'system_admin',
    PERMISSIONS_SYSTEM_READ_ONLY_ADMIN: 'system_read_only_admin',
    PERMISSIONS_SYSTEM_USER_MANAGER: 'system_user_manager',
    PERMISSIONS_SYSTEM_MANAGER: 'system_manager',
    PERMISSIONS_DELETE_POST_ALL: 'all',
    PERMISSIONS_DELETE_POST_TEAM_ADMIN: 'team_admin',
    PERMISSIONS_DELETE_POST_SYSTEM_ADMIN: 'system_admin',
    ALLOW_EDIT_POST_ALWAYS: 'always',
    ALLOW_EDIT_POST_NEVER: 'never',
    ALLOW_EDIT_POST_TIME_LIMIT: 'time_limit',
    UNSET_POST_EDIT_TIME_LIMIT: -1,
    MENTION_CHANNELS: 'mention.channels',
    MENTION_MORE_CHANNELS: 'mention.morechannels',
    MENTION_UNREAD_CHANNELS: 'mention.unread.channels',
    MENTION_MEMBERS: 'mention.members',
    MENTION_MORE_MEMBERS: 'mention.moremembers',
    MENTION_NONMEMBERS: 'mention.nonmembers',
    MENTION_PUBLIC_CHANNELS: 'mention.public.channels',
    MENTION_PRIVATE_CHANNELS: 'mention.private.channels',
    MENTION_RECENT_CHANNELS: 'mention.recent.channels',
    MENTION_SPECIAL: 'mention.special',
    MENTION_GROUPS: 'search.group',
    DEFAULT_NOTIFICATION_DURATION: 5000,
    STATUS_INTERVAL: 60000,
    AUTOCOMPLETE_TIMEOUT: 100,
    AUTOCOMPLETE_SPLIT_CHARACTERS: ['.', '-', '_'],
    ANIMATION_TIMEOUT: 1000,
    SEARCH_TIMEOUT_MILLISECONDS: 100,
    TELEMETRY_RUDDER_KEY: 'placeholder_rudder_key',
    TELEMETRY_RUDDER_DATAPLANE_URL: 'placeholder_rudder_dataplane_url',
    TEAMMATE_NAME_DISPLAY: {
        SHOW_USERNAME: 'username',
        SHOW_NICKNAME_FULLNAME: 'nickname_full_name',
        SHOW_FULLNAME: 'full_name',
    },
    SEARCH_POST: 'searchpost',
    CHANNEL_ID_LENGTH: 26,
    TRANSPARENT_PIXEL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    TRIPLE_BACK_TICKS: /```/g,
    MAX_ATTACHMENT_FOOTER_LENGTH: 300,
    ACCEPT_STATIC_IMAGE: '.jpeg,.jpg,.png,.bmp',
    ACCEPT_EMOJI_IMAGE: '.jpeg,.jpg,.png,.gif',
    THREADS_PAGE_SIZE: 25,
    TRIAL_MODAL_AUTO_SHOWN: 'trial_modal_auto_shown',
};

export const ValidationErrors = {
    USERNAME_REQUIRED: 'USERNAME_REQUIRED',
    INVALID_LENGTH: 'INVALID_LENGTH',
    INVALID_CHARACTERS: 'INVALID_CHARACTERS',
    INVALID_FIRST_CHARACTER: 'INVALID_FIRST_CHARACTER',
    RESERVED_NAME: 'RESERVED_NAME',
    INVALID_LAST_CHARACTER: 'INVALID_LAST_CHARACTER',
};

export const WindowSizes = {
    MOBILE_VIEW: 'mobileView',
    TABLET_VIEW: 'tabletView',
    SMALL_DESKTOP_VIEW: 'smallDesktopView',
    DESKTOP_VIEW: 'desktopView',
};

export const AcceptedProfileImageTypes = ['image/jpeg', 'image/png', 'image/bmp'];

export const searchHintOptions = [{searchTerm: 'From:', message: {id: t('search_list_option.from'), defaultMessage: 'Messages from a user'}},
    {searchTerm: 'In:', message: {id: t('search_list_option.in'), defaultMessage: 'Messages in a channel'}},
    {searchTerm: 'On:', message: {id: t('search_list_option.on'), defaultMessage: 'Messages on a date'}},
    {searchTerm: 'Before:', message: {id: t('search_list_option.before'), defaultMessage: 'Messages before a date'}},
    {searchTerm: 'After:', message: {id: t('search_list_option.after'), defaultMessage: 'Messages after a date'}},
    {searchTerm: '-', message: {id: t('search_list_option.exclude'), defaultMessage: 'Exclude search terms'}, additionalDisplay: '—'},
    {searchTerm: '""', message: {id: t('search_list_option.phrases'), defaultMessage: 'Messages with phrases'}},
];

export const searchFilesHintOptions = [{searchTerm: 'From:', message: {id: t('search_files_list_option.from'), defaultMessage: 'Files from a user'}},
    {searchTerm: 'In:', message: {id: t('search_files_list_option.in'), defaultMessage: 'Files in a channel'}},
    {searchTerm: 'On:', message: {id: t('search_files_list_option.on'), defaultMessage: 'Files on a date'}},
    {searchTerm: 'Before:', message: {id: t('search_files_list_option.before'), defaultMessage: 'Files before a date'}},
    {searchTerm: 'After:', message: {id: t('search_files_list_option.after'), defaultMessage: 'Files after a date'}},
    {searchTerm: 'Ext:', message: {id: t('search_files_list_option.ext'), defaultMessage: 'Files with a extension'}},
    {searchTerm: '-', message: {id: t('search_files_list_option.exclude'), defaultMessage: 'Exclude search terms'}, additionalDisplay: '—'},
    {searchTerm: '""', message: {id: t('search_files_list_option.phrases'), defaultMessage: 'Files with phrases'}},
];

// adding these rtranslations here so the weblate CI step will not fail with empty translation strings
t('suggestion.archive');
t('suggestion.mention.channels');
t('suggestion.mention.morechannels');
t('suggestion.mention.unread.channels');
t('suggestion.mention.members');
t('suggestion.mention.moremembers');
t('suggestion.mention.nonmembers');
t('suggestion.mention.private.channels');
t('suggestion.mention.recent.channels');
t('suggestion.mention.special');
t('suggestion.mention.groups');
t('suggestion.search.public');
t('suggestion.search.group');

const {
    DONT_CLEAR,
    THIRTY_MINUTES,
    ONE_HOUR,
    FOUR_HOURS,
    TODAY,
    THIS_WEEK,
    DATE_AND_TIME,
    CUSTOM_DATE_TIME,
} = CustomStatusDuration;

export const durationValues = {
    [DONT_CLEAR]: {
        id: t('custom_status.expiry_dropdown.dont_clear'),
        defaultMessage: "Don't clear",
    },
    [THIRTY_MINUTES]: {
        id: t('custom_status.expiry_dropdown.thirty_minutes'),
        defaultMessage: '30 minutes',
    },
    [ONE_HOUR]: {
        id: t('custom_status.expiry_dropdown.one_hour'),
        defaultMessage: '1 hour',
    },
    [FOUR_HOURS]: {
        id: t('custom_status.expiry_dropdown.four_hours'),
        defaultMessage: '4 hours',
    },
    [TODAY]: {
        id: t('custom_status.expiry_dropdown.today'),
        defaultMessage: 'Today',
    },
    [THIS_WEEK]: {
        id: t('custom_status.expiry_dropdown.this_week'),
        defaultMessage: 'This week',
    },
    [DATE_AND_TIME]: {
        id: t('custom_status.expiry_dropdown.date_and_time'),
        defaultMessage: 'Custom Date and Time',
    },
    [CUSTOM_DATE_TIME]: {
        id: t('custom_status.expiry_dropdown.date_and_time'),
        defaultMessage: 'Custom Date and Time',
    },
};

export default Constants;
