import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
	const { register } = useAuth();

	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email không hợp lệ').required('Chưa nhập email'),
			username: Yup.string().min(2, 'Tên phải có ít nhất 2 ký tự').required('Chưa nhập tên tài khoản'),
			password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Chưa nhập mật khẩu'),
		}),
		onSubmit: async (values) => {
			try {
				await register(values.email, values.username, values.password);
				notification.success({ message: 'Đăng ký thành công!' });
			} catch (error) {
				notification.error({ message: 'Đăng ký thất bại!', description: error.message });
			}
		},
	});

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>Đăng ký</h1>
			<Form layout="vertical" onFinish={formik.handleSubmit}>
				<Form.Item
					label="Email"
					validateStatus={formik.errors.email && 'error'}
					help={formik.errors.email && formik.errors.email}
				>
					<Input name="email" onChange={formik.handleChange} value={formik.values.email} />
				</Form.Item>

				<Form.Item
					label="Tên tài khoản"
					validateStatus={formik.errors.username && 'error'}
					help={formik.errors.username && formik.errors.username}
				>
					<Input name="username" onChange={formik.handleChange} value={formik.values.username} />
				</Form.Item>

				<Form.Item
					label="Mật khẩu"
					validateStatus={formik.errors.password && 'error'}
					help={formik.errors.password && formik.errors.password}
				>
					<Input.Password name="password" onChange={formik.handleChange} value={formik.values.password} />
				</Form.Item>

				<Button type="primary" htmlType="submit">
					Đăng ký
				</Button>
			</Form>
		</div>
	);
};

export default Register;
