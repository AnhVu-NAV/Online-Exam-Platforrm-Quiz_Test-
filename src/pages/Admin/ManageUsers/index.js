import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Tooltip, notification, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const ManageUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();

	// Fetch users from API
	const fetchUsers = async () => {
		setLoading(true);
		try {
			const response = await fetch('http://localhost:8080/users'); // Updated the URL to match db.json
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			api.error({
				message: 'Failed to load users',
			});
		} finally {
			setLoading(false);
		}
	};

	// Handle delete action with confirmation
	const confirmDeleteUser = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this user?',
			content: 'This action is irreversible.',
			okText: 'Yes, delete',
			okType: 'danger',
			cancelText: 'No, cancel',
			onOk: async () => {
				try {
					await fetch(`http://localhost:8080/users/${id}`, { method: 'DELETE' });
					api.success({
						message: 'User deleted successfully',
					});
					fetchUsers(); // Refresh the list
				} catch (error) {
					api.error({
						message: 'Failed to delete user',
					});
				}
			},
		});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const columns = [
		{
			title: 'User Name',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (role) => (
				<Tag color={role === 'admin' ? 'geekblue' : 'green'}>
					{role.toUpperCase()}
				</Tag>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Tooltip title="View">
						<Button shape="circle" icon={<EyeOutlined />} />
					</Tooltip>
					<Tooltip title="Edit">
						<Button shape="circle" icon={<EditOutlined />} />
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={() => confirmDeleteUser(record.id)}
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	return (
		<div>
			{contextHolder}
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
				<h1>User Management</h1>
			</div>
			<Table columns={columns} dataSource={users} loading={loading} rowKey="id" />
		</div>
	);
};

export default ManageUsers;
