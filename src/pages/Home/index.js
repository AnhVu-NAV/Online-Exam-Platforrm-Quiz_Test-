import {
	ClockCircleOutlined,
	QuestionCircleOutlined,
	StarOutlined,
	StockOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Divider, List, Skeleton, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { convertTitleToSlug } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	const [listExam, setListExam] = useState([]);
	// const listExam = [
	// 	{
	// 		title: 'Đề thi 1',
	// 		time: '45',
	// 		questions: [
	// 			{
	// 				question: 'Câu hỏi 1',
	// 				answer: {
	// 					A: 'Đáp án A',
	// 					B: 'Đáp án B',
	// 					C: 'Đáp án C',
	// 					D: 'Đáp án D',
	// 				},
	// 				answer_correct: [1],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		title: 'Đề thi 1',
	// 		time: '45',
	// 		questions: [
	// 			{
	// 				question: 'Câu hỏi 1',
	// 				answer: {
	// 					A: 'Đáp án A',
	// 					B: 'Đáp án B',
	// 					C: 'Đáp án C',
	// 					D: 'Đáp án D',
	// 				},
	// 				answer_correct: [1],
	// 			},
	// 		],
	// 	},
	// ];

	const subjects = [
		{
			value: 'html',
			label: 'HTML',
		},
		{
			value: 'css',
			label: 'CSS',
		},
		{
			value: 'javascript',
			label: 'JavaScript',
		},
		{
			value: 'reactjs',
			label: 'ReactJS',
		},
		{
			value: 'nodejs',
			label: 'NodeJS',
		},
	];

	const getListExam = async (subject) => {
		// Có thể sử dụng thử viện axios
		const response = await fetch(`http://localhost:8080/exams`);
		const exams = await response.json();

		setListExam(exams);
	};

	const handleRedirect = (e, exam) => {
		e.preventDefault();  // Prevent the page from reloading

		if (isAuthenticated) {
			let slug = convertTitleToSlug(exam.title);
			slug = `${slug}-${exam.id}.html`;
			navigate(`/detail/${slug}`);
		} else {
			notification.error({
				message: 'Yêu cầu đăng nhập',
				description: 'Vui lòng đăng nhập để sử dụng tính năng này.',
				placement: 'topRight',
			});
			// Optional: You can open login modal or navigate to the login page here
		}
	};

	useEffect(() => {
		getListExam();
	}, []);

	return (
		<>
			<div style={{ marginTop: '32px' }}>
				<h1>Tuyển chọn các đề thi</h1>
			</div>
			{subjects.map((subject, index) => (
				<Card style={{ marginTop: '32px' }} key={`subject-${index}`}>
					<Divider orientation='left' style={{ margin: '0px' }}>
						{subject.label}
					</Divider>
					<List
						className='demo-loadmore-list'
						itemLayout='horizontal'
						dataSource={listExam.filter(
							(exam) => exam.subject === subject.value
						)}
						renderItem={(exam) => (
							<List.Item
								actions={[
									<Button onClick={(e) => handleRedirect(e, exam)}>Thi thử</Button>,
								]}
							>
								<List.Item.Meta
									avatar={
										<Avatar style={{ height: '50px', width: '50px' }}>
											{subject.label}
										</Avatar>
									}
									title={exam.title}
									description={
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<div>
												<QuestionCircleOutlined />
												<span style={{ marginLeft: '4px' }}>50 câu</span>
											</div>
											<div style={{ marginLeft: '12px' }}>
												<ClockCircleOutlined />
												<span style={{ marginLeft: '4px' }}>40 phút</span>
											</div>
											<div style={{ marginLeft: '12px' }}>
												<StarOutlined />
												<span style={{ marginLeft: '4px' }}>
													Điểm cao nhất: 9
												</span>
											</div>
											<div style={{ marginLeft: '12px' }}>
												<StockOutlined />
												<span style={{ marginLeft: '4px' }}>
													Mức độ: cơ bản
												</span>
											</div>
										</div>
									}
								/>
							</List.Item>
						)}
					/>
				</Card>
			))}

			{/* <Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					HTML
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'html')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description={
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div>
											<QuestionCircleOutlined />
											<span style={{ marginLeft: '4px' }}>50 câu</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<ClockCircleOutlined />
											<span style={{ marginLeft: '4px' }}>40 phút</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StarOutlined />
											<span style={{ marginLeft: '4px' }}>
												Điểm cao nhất: 9
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StockOutlined />
											<span style={{ marginLeft: '4px' }}>Mức độ: cơ bản</span>
										</div>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					CSS
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'css')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					Javascript
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'javascript')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					ReactJS
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'reactjs')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card>

			<Card style={{ marginTop: '32px' }}>
				<Divider orientation='left' style={{ margin: '0px' }}>
					NodeJS
				</Divider>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={listExam.filter((exam) => exam.subject === 'nodejs')}
					renderItem={(exam) => (
						<List.Item actions={[<Button>Thi thử</Button>]}>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description='Ant Design, a design language for background applications, is refined by Ant UED Team'
							/>
						</List.Item>
					)}
				/>
			</Card> */}
		</>
	);
};

export default Home;
