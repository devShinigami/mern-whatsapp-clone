export const HOST = "http://localhost:3001";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/messages`;
export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_USERS_ROUTE = `${AUTH_ROUTE}/get-contacts`;
export const SENT_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/sent-message`;
export const GET_MESSAGES = `${MESSAGE_ROUTE}/get-messages`;
export const SENT_IMAGES = `${MESSAGE_ROUTE}/sent-image`;
export const GET_CONTACTS = `${MESSAGE_ROUTE}/get-initial-contacts`;
