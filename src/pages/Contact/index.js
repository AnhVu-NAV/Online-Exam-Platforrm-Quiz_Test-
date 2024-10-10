import React, { useState } from 'react';
import { Form, Input, Button, Card, Divider, notification } from 'antd';

const Contact = () => {
	const [form] = Form.useForm();
	const [api, contextHolder] = notification.useNotification();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (values) => {
		setIsSubmitting(true);

		try {
			const response = await fetch('http://localhost:8080/feedbacks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fullname: values.fullname,
					email: values.email,
					content: values.content,
					createdAt: new Date().toISOString(),
				}),
			});

			if (response.ok) {
				api.success({
					message: 'Feedback sent successfully!',
				});
				form.resetFields();
			} else {
				throw new Error('Failed to send feedback');
			}
		} catch (error) {
			api.error({
				message: 'Failed to send feedback',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{contextHolder}
			<div
				style={{
					marginTop: '32px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Đóng góp ý kiến</h1>
			</div>
			<Card style={{ marginTop: '32px' }}>
				<div style={{ position: 'relative' }}>
					<Divider orientation='left' style={{ margin: '0px' }}>
						Ý kiến của bạn
					</Divider>
				</div>
				<Form
					form={form}
					name='feedback-form'
					layout='vertical'
					onFinish={handleSubmit}
				>
					<Form.Item
						label='Họ và tên'
						name='fullname'
						rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
					>
						<Input size='large' />
					</Form.Item>

					<Form.Item
						label='Địa chỉ email'
						name='email'
						rules={[
							{ required: true, message: 'Vui lòng nhập địa chỉ email!' },
							{ type: 'email', message: 'Email không hợp lệ!' },
						]}
					>
						<Input size='large' />
					</Form.Item>

					<Form.Item
						label='Ý kiến của bạn'
						name='content'
						rules={[{ required: true, message: 'Vui lòng nhập ý kiến của bạn!' }]}
					>
						<Input.TextArea size='large' />
					</Form.Item>

					<Button
						type='primary'
						htmlType='submit'
						loading={isSubmitting}
					>
						Gửi ý kiến
					</Button>
				</Form>
			</Card>
		</>
	);
};

export default Contact;
