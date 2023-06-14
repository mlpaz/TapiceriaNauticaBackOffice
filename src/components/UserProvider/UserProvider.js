import React from "react";

export const UserContext = React.createContext();


function UserProvider({ children }) {
  return(
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
