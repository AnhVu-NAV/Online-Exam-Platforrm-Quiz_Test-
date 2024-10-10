import React, { useEffect, useState } from 'react';
import { List, Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Leaderboard = () => {
   const [leaderboardData, setLeaderboardData] = useState([]);

   const getLeaderboardData = async () => {
      // Fetch history to count exam attempts
      const response = await fetch('http://localhost:8080/histories');
      const histories = await response.json();

      // Count the number of times each exam has been taken
      const examCounts = histories.reduce((acc, history) => {
         acc[history.idExam] = (acc[history.idExam] || 0) + 1;
         return acc;
      }, {});

      // Convert the object into an array and sort by count
      const sortedExams = Object.entries(examCounts).sort((a, b) => b[1] - a[1]);

      // Fetch exam data to map exam IDs to titles
      const examsResponse = await fetch('http://localhost:8080/exams');
      const exams = await examsResponse.json();

      const leaderboard = sortedExams.map(([examId, count]) => {
         const exam = exams.find(e => e.id === examId);
         return {
            title: exam?.title || 'Unknown Exam',
            count,
         };
      });

      setLeaderboardData(leaderboard);
   };

   useEffect(() => {
      getLeaderboardData();
   }, []);

   return (
      <div style={{ padding: '20px' }}>
         <Title level={2} style={{ textAlign: 'center' }}>Top Most Taken Exams</Title>

         <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={leaderboardData}
            renderItem={(exam, index) => (
               <List.Item>
                  <Card
                     hoverable
                     style={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                     }}
                  >
                     <Title level={3}>{index + 1}</Title>
                     <Text strong>{exam.title}</Text>
                     <br />
                     <Text type="secondary">{exam.count} times taken</Text>
                  </Card>
               </List.Item>
            )}
         />
      </div>
   );
};

export default Leaderboard;
