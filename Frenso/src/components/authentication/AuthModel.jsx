import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SighnInForm from './SighnInForm';
import SighnUpForm from './SighnUpForm';
import { useLocation, useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: 2,
  outline: 'none',
  p: 4,
};

export default function AuthModal({open, handleClose}) {
    const location = useLocation();
    const navigate = useNavigate();
    const handleNavigate = () => {
        const path = location.pathname === '/signup' ? '/signin' : '/signup';
        
        navigate(path);
    };

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h1 className='text-center font-bold text-3xl pb-20'>Create your account</h1>
          {location.pathname === '/signup' ? <SighnUpForm /> : <SighnInForm />}
          <h1 className='text-center py-5 font-semibold text-lg text-gray-500'>
            {location.pathname === '/signup' ? "Already have an account?" : "Don't have an account?"}
          </h1>
            <Button
                
                fullWidth
                variant="outlined"
                onClick={handleNavigate}
                size="large"
                sx={{ borderRadius: "29px", py: "15px", }}
            >
                {location.pathname === '/signup' ? "sign in" : "sighn up"}
            </Button>
        </Box>
      </Modal>
    </div>
  );
}
