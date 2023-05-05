import React from "react";
//id and token to be used all over
// functions to be set
export const AuthenticationContext = React.createContext({
  token: null,
  userId: null,
  userType: null,
  fullName: null,

  setAuthentication: () => {},
  signIn: () => {},
  signOut: () => {},
});
console.log(`context ${AuthenticationContext}`);
