import {
	ClockCircleOutlined,
	QuestionCircleOutlined,
	SearchOutlined,
	StarOutlined,
	BarChartOutlined,  // Replace with a valid icon
} from '@ant-design/icons';
import {
	Avatar,
	Button,
	Card,
	Divider,
	Input,
	List,
	Select,
	notification,  // <-- Import notification from Ant Design
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { convertTitleToSlug } from '../../helpers';
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook

const ListExams = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth(); // Check authentication status from AuthContext
	const [searchParms, setSearchParms] = useSearchParams();
	const subjectFilter = searchParms.get('subject');
	const [levelFilter, setLevelFilter] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');  // State to store the search term

	const titleSubject = {
		html: 'HTML',
		css: 'CSS',
		javascript: 'JavaScript',
		reactjs: 'ReactJS',
		nodejs: 'NodeJS',
		all: 'Tất cả các môn', // Add this for the "all" case
	};

	const titleLevel = {
		basic: 'Cơ bản',
		medium: 'Trung bình',
		advanced: 'Nâng cao',
	};

	const [listExam, setListExam] = useState([]);

	const getListExam = async (subject) => {
		let response;
		if (subject === 'all') {
			// If 'all', fetch all exams without filtering by subject
			response = await fetch('http://localhost:8080/exams');
		} else {
			// Otherwise, fetch exams based on the selected subject
			response = await fetch(
				`http://localhost:8080/exams?subject=${subject}`
			);
		}
		const exams = await response.json();
		setListExam(exams);
	};

	const handleChangeLevel = (value) => {
		setLevelFilter(value);
	};

	const handleRedirect = (exam) => {
		if (isAuthenticated) {
			// If authenticated, allow access to the exam
			let slug = convertTitleToSlug(exam.title);
			slug = `${slug}-${exam.id}.html`;
			navigate(`/detail/${slug}`);
		} else {
			// If not authenticated, show error notification and redirect to login
			notification.error({
				message: 'Yêu cầu đăng nhập',
				description: 'Vui lòng đăng nhập để sử dụng tính năng này.',
				placement: 'topRight', // You can customize the position
			});
			// navigate('/login'); // Redirect to login page or trigger login modal
		}
	};

	useEffect(() => {
		getListExam(subjectFilter || 'all'); // Default to 'all' if subjectFilter is not set
	}, [subjectFilter]);

	// Filter exams based on the search term and level
	const filteredExams = listExam.filter((exam) => {
		const matchesLevel = levelFilter === 'all' || exam.level === levelFilter;
		const matchesSearchTerm = exam.title
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		return matchesLevel && matchesSearchTerm;
	});

	return (
		<>
			<div
				style={{
					marginTop: '32px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<h1>Đề thi {titleSubject[subjectFilter || 'all']}</h1>

				{/* Search Input */}
				<Input
					prefix={<SearchOutlined />}
					style={{ height: '35px', width: '230px' }}
					placeholder="Tìm kiếm đề thi..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			<Card style={{ marginTop: '32px' }}>
				<div style={{ position: 'relative' }}>
					<Divider orientation='left' style={{ margin: '0px' }}>
						{titleSubject[subjectFilter || 'all']}
					</Divider>
					<Select
						onChange={handleChangeLevel}
						value={levelFilter}
						style={{
							width: 150,
							position: 'absolute',
							right: '8px',
							top: '-4px',
						}}
						options={[
							{ value: 'all', label: 'Tất cả' },
							{
								value: 'basic',
								label: 'Cơ bản',
							},
							{
								value: 'medium',
								label: 'Trung bình',
							},
							{
								value: 'advanced',
								label: 'Nâng cao',
							},
						]}
					/>
				</div>
				<List
					className='demo-loadmore-list'
					itemLayout='horizontal'
					dataSource={filteredExams}  // Use filtered list
					renderItem={(exam) => (
						<List.Item
							actions={[
								<Button onClick={() => handleRedirect(exam)}>Thi thử</Button>,
							]}
						>
							<List.Item.Meta
								avatar={
									<Avatar style={{ height: '50px', width: '50px' }}>JS</Avatar>
								}
								title={exam.title}
								description={
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div>
											<QuestionCircleOutlined />
											<span style={{ marginLeft: '4px' }}>
												{exam?.questions?.length} câu
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<ClockCircleOutlined />
											<span style={{ marginLeft: '4px' }}>
												{exam?.time} phút
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<StarOutlined />
											<span style={{ marginLeft: '4px' }}>
												Điểm cao nhất: {exam?.highest_point ?? 'Chưa có'}
											</span>
										</div>
										<div style={{ marginLeft: '12px' }}>
											<BarChartOutlined />
											<span style={{ marginLeft: '4px' }}>
												Mức độ: {titleLevel[exam?.level] ?? 'Chưa xác định'}
											</span>
										</div>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
			</Card>
		</>
	);
};

export default ListExams;
