import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Modal, Input } from 'antd';
import emailjs from 'emailjs-com';

const ManageFeedback = () => {
	const [feedbacks, setFeedbacks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentEmail, setCurrentEmail] = useState('');
	const [content, setContent] = useState('');
	const [api, contextHolder] = notification.useNotification();

	// Fetch feedbacks from the correct endpoint
	const fetchFeedbacks = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:8080/feedbacks'); // Correct the URL here
			if (!response.ok) {
				throw new Error('Failed to fetch feedbacks');
			}
			const data = await response.json();
			setFeedbacks(data);
		} catch (error) {
			api.error({ message: 'Failed to fetch feedbacks' });
		} finally {
			setIsLoading(false);
		}
	};

	// Confirm before deleting feedback
	const confirmDeleteFeedback = (idFeedback) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this feedback?',
			content: 'This action cannot be undone.',
			okText: 'Yes, delete',
			okType: 'danger',
			cancelText: 'No, cancel',
			onOk: () => deleteFeedback(idFeedback), // Proceed with deletion
		});
	};

	// Delete feedback by id
	const deleteFeedback = async (idFeedback) => {
		try {
			await fetch(`http://localhost:8080/feedbacks/${idFeedback}`, { method: 'DELETE' });
			api.success({ message: 'Feedback deleted successfully' });
			fetchFeedbacks(); // Refresh feedbacks after deletion
		} catch (error) {
			api.error({ message: 'Failed to delete feedback' });
		}
	};

	// Show modal to reply to feedback
	const showModal = (email) => {
		setCurrentEmail(email);
		setIsModalOpen(true);
	};

	// Handle sending feedback reply
	const handleOk = async () => {
		setIsModalOpen(false);
		try {
			// Sending the feedback email using emailjs
			await emailjs.send(
				'your_service_id',
				'your_template_id',
				{ email: currentEmail, message: content },
				'your_user_id'
			);

			// Store the feedback reply in the database
			await fetch('http://localhost:8080/feedbacks', {
				method: 'POST',
				body: JSON.stringify({ email: currentEmail, content }),
				headers: { 'Content-Type': 'application/json' },
			});

			api.success({ message: 'Feedback reply sent and saved successfully' });
			fetchFeedbacks(); // Reload feedbacks to reflect changes
		} catch (error) {
			api.error({ message: 'Failed to send or store feedback' });
		} finally {
			setContent(''); // Clear the content field
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setContent(''); // Clear the content field on modal close
	};

	useEffect(() => {
		fetchFeedbacks();
	}, []);

	return (
		<div>
			{contextHolder}
			<h2>Manage Feedback</h2>
			<Table
				dataSource={feedbacks}
				columns={[
					{ title: 'Feedback', dataIndex: 'content', key: 'content' },
					{ title: 'Email', dataIndex: 'email', key: 'email' },
					{
						title: 'Actions', key: 'actions',
						render: (text, record) => (
							<>
								<Button type="link" onClick={() => showModal(record.email)}>Reply</Button>
								<Button danger onClick={() => confirmDeleteFeedback(record.id)}>Delete</Button>
							</>
						)
					},
				]}
				rowKey="id"
				loading={isLoading}
			/>

			<Modal
				title="Reply to Feedback"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Send Reply"
				cancelText="Cancel"
			>
				<Input.TextArea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Write your reply..."
				/>
			</Modal>
		</div>
	);
};

export default ManageFeedback;
