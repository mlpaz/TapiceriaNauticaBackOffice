import React from "react";

export const UserContext = React.createContext();

function UserProvider({ children }) {
  const [token, setToken] = React.useState(sessionStorage.getItem("token"));
  const [name, setName] = React.useState(sessionStorage.getItem("username"));

  React.useEffect(() => {
    console.log("token", token);
    sessionStorage.setItem("token", token);
  }, [token]);

  React.useEffect(() => {
    sessionStorage.setItem("username", name);
  }, [name]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        name,
        setName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
