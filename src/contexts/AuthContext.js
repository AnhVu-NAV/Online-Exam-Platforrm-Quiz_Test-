import React, { createContext, useState, useContext } from 'react';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';  // Cấu hình Firebase mà bạn đã tạo

const AuthContext = createContext();

const checkStatusLogin = (query) => {
  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  if (user) {
    if (query === 'isAuthenticated') {
      return true;
    }
    if (query === 'userCurrent') {
      return user;
    }
  } else {
    if (query === 'isAuthenticated') {
      return false;
    }
    if (query === 'userCurrent') {
      return null;
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    checkStatusLogin('isAuthenticated')
  );
  const [userCurrent, setUserCurrent] = useState(
    checkStatusLogin('userCurrent')
  );

  const login = (user) => {
    setUserCurrent(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setUserCurrent(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Đăng nhập bằng Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      login(user);  // Đăng nhập và lưu user
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  // Đăng nhập bằng Facebook
  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      login(user);  // Đăng nhập và lưu user
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userCurrent,
        setUserCurrent,
        loginWithGoogle,
        loginWithFacebook
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
