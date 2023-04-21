
import React from 'react';
import styled from 'styled-components';
import { Button, Modal, Form, Input } from 'antd';
import background from '../../public/background3.jpg'
import * as FaIcons from 'react-icons/fa'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
import { User } from '../../@type/user.dto'
import { UserContext } from '../../Context/userContext'
import { SearchUser } from '../Modals/searchUser'
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

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
  color:white;
`;

const WrapperStyled = styled.div`
  height: 100vh;
  background-image:url(${background?.src})
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;
const UserListStyled = styled.div`
  max-height: 100%;
  margin-top:20px;
  margin-right:30px;
  margin-left:30px;
  font-size:20px;
  overflow-y: auto;
`;
interface Column {
  id: 'name' | 'email' | 'phone' | 'dob' | 'status';
  label: string;
  minWidth: number;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'phone', label: 'Phone Number', minWidth: 170,
  },
  {
    id: 'dob',
    label: 'Date Of Birth',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,

  },
];


export default function UserPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState('');
  const [form] = Form.useForm();
  const { users, query, setQuery, setSelectedIdUser, isSearchModalVisible, setIsSearchModalVisible } = React.useContext(UserContext);
  const handleOk = () => {
    form.resetFields();
    setValue('')
    setIsSearchModalVisible(false);
    router.push('/users?page=' + query.page + '&take=' + query.take + '&filter=' + value + '&sortField=' + query.sortField)
  };

  const handleCancel = () => {
    form.resetFields();
    setValue('');

    setIsSearchModalVisible(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const router = useRouter();
  function handleChangePage(event, newpage) {
    setPage(newpage);
    router.push('/users?page=' + (newpage + 1) + '&take=' + rowsPerPage + '&filter=' + query.filter + '&sortField=' + query.sortField)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    router.push('/users?page=' + '1' + '&take=' + event.target.value + '&filter=' + query.filter + '&sortField=' + query.sortField)
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    setSelectedIdUser(id);
    router.push('/users/' + id)
  };
  const onClick = () => {
    setIsSearchModalVisible(true);
  }
  return (
    <WrapperStyled>

      <HeaderStyled>
        <div className='header__info'>
          <p className='header__title'>List of users</p>
          <span className='header__description'>
            Here you can change status of users
          </span>
        </div>
        <ButtonGroupStyled>
          <FaIcons.FaSearch />
          <Button type="primary" onClick={onClick}>
            Search
          </Button>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <UserListStyled>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <h1 style={{ textAlign: "center", color: "green" }}>
              Users Page</h1>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align='left'
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .map((user) => {
                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, user.id)}
                          role="checkbox"
                          tabIndex={-1}
                          key={user.id}>
                          <TableCell align="left">{user.name}</TableCell>
                          <TableCell align="left">{user.email}</TableCell>
                          <TableCell align="left">{user.phoneNumber}</TableCell>
                          <TableCell align="left">{user.dob.split('T')[0]}</TableCell>
                          <TableCell align="left">{user.isActive ? 'Active' : 'Inactive'}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={100}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          </Paper>
        </UserListStyled>
        {isSearchModalVisible ? (<div>
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
        </div>) : null}
      </ContentStyled>


    </WrapperStyled>
  );
}