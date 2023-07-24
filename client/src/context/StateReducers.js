import { reducerCases } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
  contactsPage: false,
  chatUser: undefined,
  messages: [],
  socket: undefined,
  messageSearch: false,
  theme: "dark",
  themePage: false,
  userContacts: [],
  onlineUsers: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_USER_INFO: {
      console.log({ userInfo: action.userInfo });
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };

    case reducerCases.SET_CONTACTS_PAGE:
      console.log({ contactsPage: state.contactsPage });
      return {
        ...state,
        contactsPage: !state.contactsPage,
      };
    case reducerCases.CHANGE_CHAT_USER:
      console.log({ chatUser: action.user });

      return {
        ...state,
        chatUser: action.user,
      };
    case reducerCases.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case reducerCases.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    case reducerCases.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case reducerCases.SET_MESSAGE_SEARCH:
      return {
        ...state,
        messageSearch: !state.messageSearch,
      };
    case reducerCases.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      };
    case reducerCases.SET_THEME_PAGE:
      return {
        ...state,
        themePage: !state.themePage,
      };
    case reducerCases.SET_USER_CONTACTS:
      return {
        ...state,
        userContacts: action.userContacts,
      };
    case reducerCases.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    default:
      return state;
  }
};

export default reducer;
