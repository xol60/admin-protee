
import { Inter } from 'next/font/google'
import Sidebar from '../components/Pages/Sidebar'
import { GlobalStyle } from '../styles/global';
import LocationPage from '../components/Pages/LocationPage'
import { Row, Col } from 'antd';
const inter = Inter({ subsets: ['latin'] })
const LocationsPage: React.FC = () => {
    return (
        <div>
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <LocationPage />
                </Col>
            </Row>
        </div>
    );
}
export default LocationsPage