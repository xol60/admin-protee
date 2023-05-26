import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input, DatePicker } from 'antd';
import { User } from '../../module/user.dto'
import dayjs from 'dayjs';
import { Radio } from 'antd';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import background from '../../assests/background3.jpg'
import api from '../../api/axiosClient'
import { toast } from 'react-toastify';
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  color:white;
  font-size:20px;
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;


const WrapperStyled = styled.div`
  height: 100vh;
  background-image:url(${background});
  margin-left:305.83px;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const DetailStyled = styled.div`
  max-height: 100%;
  margin-top:50px;
  background-color:white;
  margin-right:30px;
  margin-left:30px;
  font-size:20px;
  overflow-y: auto;
`;

const dateFormat = 'YYYY/MM/DD'
export default function UserDeatil() {
    const params = useParams();
    const selectedId = params.id + '';
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>({
        id: '',
        name: '',
        phoneNumber: '',
        email: '',
        isActive: false
    })
    const onReset = () => {
        navigate('/users?page=1&take=10&filter=&sortField=');
    };
    const loadUserDetail = async () => {
        try {
            const res = api.users.detail(selectedId)
            Promise.all([res]).then(values => {
                setUser(values[0]);
            });
        }
        catch (err) {
            console.log(err);
        }

    };
    const onFinish = async (values: User) => {

        try {
            const { name, dob, isActive } = values;
            const res = api.users.changedetail({
                "id": selectedId,
                "name": name,
                "dob": dob,
                "isActive": isActive
            })
            Promise.all([res]).then(values => {
                toast.success("Change info user success!", {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored"
                });
            }).catch(error => {
                if (error.response.status === 400) {
                    toast.error("Update fail", {
                        position: toast.POSITION.TOP_CENTER,
                        theme: "colored"
                    })
                }
            })
        }
        catch (err) {
            console.log(err);
        }

    };
    React.useEffect(() => {
        loadUserDetail()
    }, [])
    if (user.id === '') {
        return (<></>)
    }
    return (
        <>
            <WrapperStyled>

                <HeaderStyled>
                    <div className='header__info'>
                        <p className='header__title'>User</p>
                        <span className='header__description'>
                            Here you can change info of user
                        </span>
                    </div>
                </HeaderStyled>
                <ContentStyled>
                    <DetailStyled>
                        <h1 style={{ textAlign: "center", color: "green" }}>
                            User Info Page</h1>
                        <Box component="form" >

                        </Box>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            labelCol={{
                                span: 5
                            }}
                            wrapperCol={{
                                span: 16
                            }}
                            initialValues={{
                                name: user.name,
                                phone: user.phoneNumber,
                                isActive: user.isActive,
                                email: user.email,
                                dob: dayjs(user.dob, dateFormat),
                                createdAt: user.createdAt
                            }}

                        >
                            <Form.Item
                                label="Full name" name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input user name!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Phone number"
                                name="phone"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                label="Date of birth"
                                name="dob"
                            >
                                <DatePicker format={dateFormat} />
                            </Form.Item>
                            <Form.Item
                                label="Status" name="isActive"
                            >
                                <Radio.Group name="radiogroup">
                                    <Radio value={true}>Active</Radio>
                                    <Radio value={false}>Inactive</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Created At" name='createdAt'
                            >
                                <Input disabled />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 6,
                                    span: 16
                                }}
                            >
                                <Button type="primary" ghost htmlType="submit" >
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form>
                    </DetailStyled>
                </ContentStyled>


            </WrapperStyled>
        </>
    )
}