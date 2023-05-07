import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import Page from './HomePage'

const HomePage: React.FC = () => {
    return (
        <div>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <Page />
                </Col>
            </Row>
        </div>
    );
}
export default HomePage