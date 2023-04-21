import Image from 'next/image'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../../components/Pages/Sidebar'
import { GlobalStyle } from '../../styles/global';
import UserPage from '../../components/Pages/UserPage'
import { Row, Col } from 'antd';
import { useRouter } from "next/router";
import React from "react";
import { UserContext } from '../../Context/userContext'
import { Query } from '../../@type/query.dto'

const inter = Inter({ subsets: ['latin'] })

const UsersPage: React.FC = () => {
    const { query, setQuery } = React.useContext(UserContext)
    const router = useRouter();
    const nquery: Query = router.query;
    setQuery(nquery);
    console.log(query);
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