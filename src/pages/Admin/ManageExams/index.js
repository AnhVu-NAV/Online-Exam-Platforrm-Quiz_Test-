import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Tooltip, notification, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ManageExams = () => {
	const [exams, setExams] = useState([]);
	const [loading, setLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();
	const navigate = useNavigate();

	// Fetch exams from API
	const fetchExams = async () => {
		setLoading(true);
		try {
			const response = await fetch('http://localhost:8080/exams'); // Updated the URL to match db.json
			const data = await response.json();
			setExams(data);
		} catch (error) {
			api.error({
				message: 'Failed to load exams',
			});
		} finally {
			setLoading(false);
		}
	};

	// Handle delete action with confirmation
	const confirmDeleteExam = (id) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this exam?',
			content: 'This action is irreversible.',
			okText: 'Yes, delete',
			okType: 'danger',
			cancelText: 'No, cancel',
			onOk: async () => {
				try {
					await fetch(`http://localhost:8080/exams/${id}`, { method: 'DELETE' });
					api.success({
						message: 'Exam deleted successfully',
					});
					fetchExams(); // Refresh the list
				} catch (error) {
					api.error({
						message: 'Failed to delete exam',
					});
				}
			},
		});
	};

	// Handle edit action
	const handleEdit = (exam) => {
		navigate(`/admin/exams/update/${exam.id}`);
	};

	useEffect(() => {
		fetchExams();
	}, []);

	const columns = [
		{
			title: 'Exam Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Duration (minutes)',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: 'Subject',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Level',
			key: 'level',
			dataIndex: 'level',
			render: (level) => (
				<Tag color={level === 'advanced' ? 'volcano' : level === 'medium' ? 'geekblue' : 'green'}>
					{level.toUpperCase()}
				</Tag>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, record) => (
				<Space size="middle">
					<Tooltip title="Edit">
						<Button shape="circle" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
					</Tooltip>
					<Tooltip title="Delete">
						<Button
							shape="circle"
							icon={<DeleteOutlined />}
							onClick={() => confirmDeleteExam(record.id)}
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
				<h1>Manage Exams</h1>
			</div>
			<Table columns={columns} dataSource={exams} loading={loading} rowKey="id" />
		</div>
	);
};

export default ManageExams;
