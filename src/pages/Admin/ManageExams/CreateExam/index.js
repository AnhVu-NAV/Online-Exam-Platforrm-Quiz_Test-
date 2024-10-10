import {
	ClockCircleOutlined,
} from '@ant-design/icons';
import {
	Button,
	Col,
	Divider,
	Form,
	Input,
	notification,
	Radio,
	Row,
	Select,
	Space,
} from 'antd';
import React, { useState, useEffect } from 'react';
import './styles.css';

const CreateExam = () => {
	const [api, contextHolder] = notification.useNotification();
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState('');
	const [time, setTime] = useState('');
	const [subject, setSubject] = useState('html');
	const [level, setLevel] = useState('basic');
	const [subjects, setSubjects] = useState([]); // Fetch subjects from API
	const [questions, setQuestions] = useState([
		{
			question: '',
			answers: ['', '', '', ''],
			answer_correct: null,
		},
	]);

	// Fetch available subjects
	const fetchSubjects = async () => {
		try {
			const response = await fetch('http://localhost:8080/subjects');  // Replace with your actual API
			const data = await response.json();
			setSubjects(data);
		} catch (error) {
			console.error('Failed to fetch subjects', error);
		}
	};

	useEffect(() => {
		fetchSubjects();
	}, []);

	const handleChangeTitle = (event) => setTitle(event.target.value);
	const handleChangeTime = (event) => setTime(event.target.value);
	const handleChangeSubject = (value) => setSubject(value);
	const handleChangeLevel = (value) => setLevel(value);

	const handleAddQuestion = () => {
		setQuestions([...questions, {
			question: '',
			answers: ['', '', '', ''],
			answer_correct: null,
		}]);
	};

	// Handle question text change
	const handleChangeQuestion = (event, index) => {
		const questionsTemp = [...questions];
		questionsTemp[index].question = event.target.value;
		setQuestions(questionsTemp);
	};

	// Handle answer text change
	const handleChangeAnswer = (event, index, answerIndex) => {
		const questionsTemp = [...questions];
		questionsTemp[index].answers[answerIndex] = event.target.value;
		setQuestions(questionsTemp);
	};

	// Handle correct answer selection
	const handleChangeAnswerCorrect = (event, index) => {
		const questionsTemp = [...questions];
		questionsTemp[index].answer_correct = event.target.value;
		setQuestions(questionsTemp);
	};

	// Create exam
	const handleCreateExam = async () => {
		if (questions.some(q => q.answer_correct === null)) {
			api.error({
				message: 'Bạn cần chọn đáp án đúng cho mỗi câu hỏi',
			});
			return;
		}

		setIsLoading(true);
		const newExam = {
			title,
			time,
			subject,
			level,
			questions,
			highest_point: null,
		};

		try {
			const response = await fetch('http://localhost:8080/exams', {
				method: 'POST',
				body: JSON.stringify(newExam),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				api.success({
					message: 'Tạo đề thi thành công',
				});
				// Reset form
				setTitle('');
				setTime('');
				setSubject('html');
				setLevel('basic');
				setQuestions([{
					question: '',
					answers: ['', '', '', ''],
					answer_correct: null,
				}]);
			} else {
				api.error({
					message: 'Tạo đề thi thất bại',
				});
			}
		} catch (e) {
			api.error({
				message: 'Có lỗi xảy ra, vui lòng thử lại!',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='create-exam'>
			{contextHolder}
			<h1>Tạo đề thi</h1>
			<Form name='basic' layout='vertical'>
				<Row justify='space-between'>
					<Col span={11}>
						<Divider orientation='left'>Nội dung đề thi</Divider>
						<Row>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Tên đề thi'>
									<Input size='large' value={title} onChange={handleChangeTitle} />
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Thời gian'>
									<Input prefix={<ClockCircleOutlined />} suffix='phút' type='number' size='large' value={time} onChange={handleChangeTime} />
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Môn thi'>
									<Select
										size='large'
										value={subject}
										onChange={handleChangeSubject}
										options={subjects.map(s => ({ value: s.id, label: s.name }))} // Use dynamic subjects
									/>
								</Form.Item>
							</Col>
							<Col span={12} style={{ padding: '0px 12px' }}>
								<Form.Item label='Mức độ'>
									<Select size='large' value={level} onChange={handleChangeLevel}
										options={[
											{ value: 'basic', label: 'Cơ bản' },
											{ value: 'medium', label: 'Trung bình' },
											{ value: 'advanced', label: 'Nâng cao' },
										]} />
								</Form.Item>
							</Col>
						</Row>
					</Col>
					<Col span={11}>
						<Divider orientation='left'>Câu hỏi</Divider>
						{questions.map((question, index) => (
							<div key={index} style={{ marginBottom: '20px' }}>
								<Form.Item label={`Câu hỏi ${index + 1}`}>
									<Input.TextArea value={question.question} onChange={(event) => handleChangeQuestion(event, index)} />
								</Form.Item>
								<Radio.Group onChange={(event) => handleChangeAnswerCorrect(event, index)}>
									<Space direction='vertical'>
										{['A', 'B', 'C', 'D'].map((label, i) => (
											<Radio key={i} value={label}>
												<div style={{ display: 'flex', alignItems: 'center' }}>
													<div style={{ width: '50px' }}>Đáp án {label}</div>
													<Input value={question.answers[i]} onChange={(event) => handleChangeAnswer(event, index, i)} />
												</div>
											</Radio>
										))}
									</Space>
								</Radio.Group>
							</div>
						))}
						<Button onClick={handleAddQuestion} style={{ width: '100%', marginTop: '10px' }}>Thêm câu hỏi</Button>
					</Col>
				</Row>
				<Button type='primary' onClick={handleCreateExam} loading={isLoading} disabled={!title || !time || questions.length < 1}>
					Tạo đề thi
				</Button>
			</Form>
		</div>
	);
};

export default CreateExam;
