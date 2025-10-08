import React, { createContext, useState } from 'react'

export const AuthContext=createContext();
function AuthContextProvider({children}) {
    const [isLogin, setIsLogin] = useState(false);

    const authValue = {isLogin, setIsLogin};
  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
