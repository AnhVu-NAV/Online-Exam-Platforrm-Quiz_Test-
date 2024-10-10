import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Upload, Avatar, notification, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const { userCurrent, setUserCurrent, logout } = useAuth();
	const [form] = Form.useForm();
	const [isEditing, setIsEditing] = useState(false);
	const [profilePic, setProfilePic] = useState(userCurrent?.profilePic || '');
	const navigate = useNavigate();

	useEffect(() => {
		form.setFieldsValue({
			fullname: userCurrent.fullname,
			dob: userCurrent.dob ? moment(userCurrent.dob) : null,
			email: userCurrent.email,
		});
	}, [userCurrent, form]);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
		form.resetFields();
	};

	const handleSave = async (values) => {
		try {
			// Prepare updated user data
			const updatedUser = {
				...userCurrent,
				fullname: values.fullname,
				dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
				profilePic,  // Use the updated profilePic from state
			};

			console.log("Sending updated user:", updatedUser);  // Debugging

			// Update the user in the database
			const response = await fetch(`http://localhost:8080/users/${userCurrent.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedUser), // Send JSON formatted data
			});

			if (response.ok) {
				const updatedUserFromServer = await response.json(); // Ensure server returns the updated user
				notification.success({ message: 'Profile updated successfully!' });
				setUserCurrent(updatedUserFromServer); // Update state with server response
				setIsEditing(false);
			} else {
				throw new Error('Failed to update profile');
			}
		} catch (error) {
			console.error("Error updating profile:", error);  // Debugging
			notification.error({ message: 'Failed to update profile' });
		}
	};

	const handleImageUpload = (info) => {
		const reader = new FileReader();
		reader.onload = () => {
			setProfilePic(reader.result);  // Save image as base64 (or handle differently if necessary)
		};
		reader.readAsDataURL(info.file);
	};

	const handleDeleteAccount = () => {
		Modal.confirm({
			title: 'Are you sure you want to delete your account?',
			content: 'This action is irreversible and will permanently delete your account.',
			okText: 'Yes, delete',
			okType: 'danger',
			cancelText: 'No, cancel',
			onOk: async () => {
				try {
					const response = await fetch(`http://localhost:8080/users/${userCurrent.id}`, {
						method: 'DELETE',
					});

					if (response.ok) {
						notification.success({ message: 'Account deleted successfully!' });
						logout();  // Log the user out after deletion
						navigate('/');  // Redirect to the homepage
					} else {
						throw new Error('Failed to delete account');
					}
				} catch (error) {
					console.error("Error deleting account:", error);  // Debugging
					notification.error({ message: 'Failed to delete account' });
				}
			},
		});
	};

	return (
		<div>
			<h2>Profile</h2>
			<Form form={form} layout="vertical" onFinish={handleSave}>
				<Form.Item label="Profile Picture">
					<Avatar size={64} src={profilePic} alt="Profile Picture" />
					<Upload beforeUpload={() => false} onChange={handleImageUpload}>
						<Button icon={<UploadOutlined />} disabled={!isEditing}>
							Change Picture
						</Button>
					</Upload>
				</Form.Item>
				<Form.Item
					name="fullname"
					label="Full Name"
					rules={[{ required: true, message: 'Please enter your full name' }]}
				>
					<Input disabled={!isEditing} />
				</Form.Item>
				<Form.Item name="dob" label="Date of Birth">
					<DatePicker disabled={!isEditing} format="YYYY-MM-DD" />
				</Form.Item>
				<Form.Item label="Email">
					<Input value={userCurrent.email} disabled />
				</Form.Item>

				{!isEditing ? (
					<Button type="primary" onClick={handleEdit}>
						Edit Profile
					</Button>
				) : (
					<>
						<Button type="primary" htmlType="submit">
							Save
						</Button>
						<Button style={{ marginLeft: 8 }} onClick={handleCancel}>
							Cancel
						</Button>
					</>
				)}
				<Button type="danger" onClick={handleDeleteAccount} style={{ marginTop: 20 }}>
					Delete Account
				</Button>
			</Form>
		</div>
	);
};

export default Profile;
