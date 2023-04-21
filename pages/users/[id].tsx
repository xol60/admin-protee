import Image from 'next/image'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../../components/Pages/Sidebar'
import { GlobalStyle } from '../../styles/global';
import User from '../../components/Pages/User'
import { Row, Col } from 'antd';
const inter = Inter({ subsets: ['latin'] })
const Detail: React.FC = (user) => {

    return (
        <div>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <User />
                </Col>
            </Row>
        </div>
    );
}
export default Detail