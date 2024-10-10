import React from 'react';
import { Button, notification } from 'antd';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { loginWithGoogle, loginWithFacebook } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
      notification.success({ message: 'Đăng nhập thành công!' });
    } catch (error) {
      notification.error({ message: 'Đăng nhập thất bại!', description: error.message });
    }
  };

  const handleLoginFacebook = async () => {
    try {
      await loginWithFacebook();
      notification.success({ message: 'Đăng nhập thành công!' });
    } catch (error) {
      notification.error({ message: 'Đăng nhập thất bại!', description: error.message });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Đăng nhập</h1>
      <div style={{ marginBottom: '20px' }}>
        <Button
          type="primary"
          onClick={handleLoginGoogle}
          style={{ marginRight: '10px' }}
        >
          Đăng nhập bằng Google
        </Button>
        <Button
          type="primary"
          onClick={handleLoginFacebook}
        >
          Đăng nhập bằng Facebook
        </Button>
      </div>
    </div>
  );
};

export default Login;
