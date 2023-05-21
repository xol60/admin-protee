import * as React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function SearchUserModal() {
    const { isSearchModalVisible, setIsSearchModalVisible } = React.useContext(UserContext);
    const navigate = useNavigate()

    const handleCancel = () => {

        setIsSearchModalVisible(false);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const value = data.get('value') + ''
        setIsSearchModalVisible(false);
        navigate('/users?page=1&take=10&filter=' + value + '&sortField=')
    };
    return (
        <Modal
            open={isSearchModalVisible}
            onClose={handleCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Search name
                </Typography>
                <TextField
                    margin="normal"
                    fullWidth
                    required
                    label="Input name you want to search"
                    name="value"
                    id="value"
                />
                <Stack direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }} >
                    <Button variant="contained" type="submit">Submit</Button>
                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                </Stack>
            </Box>
        </Modal>
    )
}