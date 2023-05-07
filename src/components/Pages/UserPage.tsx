
import React from 'react';
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom"
import { User } from '../../module/user.dto'
import { Query } from '../../module/query.dto'
import background from '../../assests/background3.jpg'
import { UserContext } from '../../context/UserContext'
import api from '../../api/axiosClient'
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  color:white;
  font-size:14px;
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
  background-image:url(${background});
  margin-left:305.83px;
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
  font-size:14px;
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

interface SortElement {
  label: string;
  name: string
}

const elements: SortElement[] = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  //{ label: 'Phone Number', name: 'phoneNumber' },
  { label: 'Date of birth', name: 'dob' },
  // { label: 'Status', name: 'isActive' }
]
export default function UserPage() {
  console.log(666);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate()
  const { setIsSearchModalVisible } = React.useContext(UserContext);
  const [queryParameters] = useSearchParams()
  const [query, setQuery] = React.useState<Query>({ page: queryParameters.get("page") + '', take: queryParameters.get("take") + '', filter: queryParameters.get("sortField") + '', sortField: queryParameters.get("sortField") + '' })
  const [total, setTotal] = React.useState(0);
  const [users, setUsers] = React.useState<User[]>([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const usersQuery = React.useMemo(() => {
    return query
  }, [query]);
  const loadUsers = async () => {
    try {
      const res = api.users.list(usersQuery);
      Promise.all([res]).then(values => {
        console.log(333);
        setUsers(values[0].data);
        setTotal(values[0].total)
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    setQuery({ page: queryParameters.get("page") + '', take: queryParameters.get("take") + '', filter: queryParameters.get("filter") + '', sortField: queryParameters.get("sortField") + '' })
    console.log(query);
  }, [queryParameters]);
  React.useEffect(() => {
    loadUsers();
  }, [usersQuery]);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    navigate(`/users?page=${newPage + 1}&take=${rowsPerPage}&filter=${query.filter + ''}&sortField=${query.sortField}`)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    navigate(`/users?page=1&take=${event.target.value}&filter=${query.filter + ''}&sortField=${query.sortField}`)

  };
  const onSearchClick = () => {
    setIsSearchModalVisible(true);
  }
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    navigate(`/user/${id}`)
  }
  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    const { myValue } = event.currentTarget.dataset;
    navigate(`/users?page=1&take=${query.take}&filter=${query.filter + ''}&sortField=${myValue}`)
  };
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
          <Button variant="contained" onClick={onSearchClick}>
            Search
          </Button>
        </ButtonGroupStyled>
      </HeaderStyled>
      <ContentStyled>
        <UserListStyled>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <HeaderStyled>
              <h1 style={{ textAlign: "center", color: "green" }}>
                Users Page</h1>
              <ButtonGroupStyled>
                <Button
                  id="demo-customized-button"
                  aria-controls={open ? 'demo-customized-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClickSort}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  Sort By:
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => { setAnchorEl(null); }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {
                    elements.map((element) => {
                      return (
                        <MenuItem data-my-value={element.name} onClick={handleSortClose}>{element.label}</MenuItem>
                      )
                    })
                  }
                </Menu>
              </ButtonGroupStyled>
            </HeaderStyled>
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
                          <TableCell align="left">{user.dob?.toLocaleString().split('T')[0]}</TableCell>
                          <TableCell align="left">{user.isActive ? 'Active' : 'Inactive'}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          </Paper>
        </UserListStyled>

      </ContentStyled>


    </WrapperStyled>
  );
}