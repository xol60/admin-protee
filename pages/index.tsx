import Image from 'next/image'
import type { NextPage } from 'next'
import { Inter } from 'next/font/google'
import HomePage from '../components/Pages/HomePage'
import Sidebar from '../components/Pages/Sidebar'
import { Row, Col } from 'antd';
import { GlobalStyle } from '../styles/global';

const inter = Inter({ subsets: ['latin'] })

const Home: NextPage = () => {
  return (
    <div>
      <GlobalStyle />
      <div>
        <Row>
          <Col span={5}>
            <Sidebar />
          </Col>
          <Col span={19}>
            <HomePage />
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Home