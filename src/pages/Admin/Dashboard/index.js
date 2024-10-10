import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Table, notification, List, Typography } from 'antd';
import { UserOutlined, FileTextOutlined, BarChartOutlined, CommentOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [recentExams, setRecentExams] = useState([]);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersResponse = await fetch('http://localhost:8080/users');
      const usersData = await usersResponse.json();
      setUserCount(usersData.length);

      const examsResponse = await fetch('http://localhost:8080/exams');
      const examsData = await examsResponse.json();
      setExamCount(examsData.length);
      setRecentExams(examsData.slice(-5)); // Get the 5 most recent exams

      const feedbacksResponse = await fetch('http://localhost:8080/feedbacks');
      const feedbacksData = await feedbacksResponse.json();
      setFeedbackCount(feedbacksData.length);
      setRecentFeedbacks(feedbacksData.slice(-3)); // Get the 3 most recent feedbacks
    } catch (error) {
      api.error({
        message: 'Failed to load data',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const examColumns = [
    {
      title: 'Exam Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Duration (minutes)',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    <div>
      {contextHolder}
      <h1>Admin Dashboard</h1>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={userCount}
              prefix={<UserOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Exams"
              value={examCount}
              prefix={<FileTextOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Feedbacks"
              value={feedbackCount}
              prefix={<CommentOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Sessions"
              value={12} // Example value for active sessions, can be dynamic if necessary
              prefix={<BarChartOutlined />}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Recent Exams" bordered={false}>
            <Table
              dataSource={recentExams}
              columns={examColumns}
              rowKey="id"
              pagination={false}
              loading={loading}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Recent Feedbacks" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentFeedbacks}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Typography.Text>{item.email}</Typography.Text>}
                    description={item.content}
                  />
                </List.Item>
              )}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
