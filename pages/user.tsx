import Image from 'next/image'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../components/Pages/Sidebar'
import { GlobalStyle } from '../styles/global';
import UserPage from '../components/Pages/UserPage'
import { Row, Col } from 'antd';
const inter = Inter({ subsets: ['latin'] })
const UsersPage: React.FC = () => {
    return (
        <div>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <UserPage />
                </Col>
            </Row>
        </div>
    );
}
export default UsersPage