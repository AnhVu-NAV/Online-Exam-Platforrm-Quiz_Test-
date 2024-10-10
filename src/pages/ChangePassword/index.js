import React, { useState } from 'react';
import { Input, Button, Form, notification } from 'antd';
import { useAuth } from '../../contexts/AuthContext'; // Use your AuthContext for authentication

const ChangePassword = () => {
	const [form] = Form.useForm();
	const { userCurrent, setUserCurrent } = useAuth();  // Use current user context if needed
	const [isLoading, setIsLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();

	// Handle form submission
	const handleChangePassword = async (values) => {
		const { currentPassword, newPassword, confirmPassword } = values;

		// Check if new passwords match
		if (newPassword !== confirmPassword) {
			api.error({
				message: 'Passwords do not match',
				description: 'Please make sure the new passwords match.',
			});
			return;
		}

		// Check if current password is correct
		if (currentPassword !== userCurrent.password) {
			api.error({
				message: 'Incorrect current password',
				description: 'The current password you entered is incorrect.',
			});
			return;
		}

		setIsLoading(true);
		try {
			// Update user with new password
			const updatedUser = { ...userCurrent, password: newPassword };

			const response = await fetch(`http://localhost:8080/users/${userCurrent.id}`, {
				method: 'PUT',
				body: JSON.stringify(updatedUser),
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				api.success({
					message: 'Password Changed Successfully',
				});
				setUserCurrent(updatedUser); // Update the user in the context
				form.resetFields();
			} else {
				api.error({
					message: 'Error Changing Password',
					description: 'There was an issue changing to the new password.',
				});
			}
		} catch (error) {
			api.error({
				message: 'Network Error',
				description: 'Please check your connection and try again.',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			{contextHolder}
			<h1>Change Password</h1>
			<Form
				form={form}
				layout="vertical"
				onFinish={handleChangePassword}
			>
				<Form.Item
					label="Current Password"
					name="currentPassword"
					rules={[{ required: true, message: 'Please enter your current password!' }]}
				>
					<Input.Password placeholder="Enter current password" />
				</Form.Item>

				<Form.Item
					label="New Password"
					name="newPassword"
					rules={[{ required: true, message: 'Please enter your new password!' }]}
				>
					<Input.Password placeholder="Enter new password" />
				</Form.Item>

				<Form.Item
					label="Confirm New Password"
					name="confirmPassword"
					rules={[{ required: true, message: 'Please confirm your new password!' }]}
				>
					<Input.Password placeholder="Confirm new password" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={isLoading}>
						Change Password
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default ChangePassword;
