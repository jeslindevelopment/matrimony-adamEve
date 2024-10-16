export const ADAM_EVE_API = {
  //auth
  auth: {
    login: "api/auth/login",
    signUp: "/api/auth/signup",
    getUserDetail: "/api/user/one",
    updateUserDeatils: "/api/user/update",
    getUsersList: "/api/user/list",
    getProfileDetail: "/api/user",
    shortList: "api/shortlist",
    sendInterest: "/api/interest",
    getInterestList: "api/interest",
    contactUs: "/api/contact/send",
    getShortList: "/api/shortlist",
  },
  subscription: {
    getPlansList: "/api/auth/subscription",
    buyPlan: "api/user/buy-subscription",
    
  },
  message: {
    getMessageList: "/api/message/list",
    sendMessage: "/api/message/send",
    uploadImage: "api/user/profile-upload-multiple",

  },
};

export const API_RESPONSE = {
  SUCCESS: 1,
  FAILURE: 0,
};
