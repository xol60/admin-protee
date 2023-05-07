import * as React from 'react'
import { Modal, Form, Input } from 'antd';
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
export default function SearchUserModal() {
    const { isSearchModalVisible, setIsSearchModalVisible } = React.useContext(UserContext);
    const [value, setValue] = React.useState('');
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const handleOk = () => {
        form.resetFields();
        setValue('')
        setIsSearchModalVisible(false);
        navigate('/users?page=1&take=10&filter=' + value + '&sortField=')
    };

    const handleCancel = () => {
        form.resetFields();
        setValue('');

        setIsSearchModalVisible(false);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
        console.log(value);
    };
    return (<div>
        <Modal
            title='Search user by name'
            visible={isSearchModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
        >
            <Form form={form} layout='vertical'>
                <Form.Item
                    label='All users'
                    style={{ width: '100%' }}
                >
                    <Input placeholder='Input name of user' value={value} onChange={onChange} />
                </Form.Item>
            </Form>
        </Modal>
    </div>)
}