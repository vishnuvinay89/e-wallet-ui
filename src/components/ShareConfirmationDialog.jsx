import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShareConfirmationDialog = ({ open, onClose, documentType, docId, file }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // State to track error message
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const ssoId = '2fc2411c-a0c9-404d-a13a-408241e81fe2'; // Get SSO ID from local storage or another source
  
  const handleAccept = async () => {
    if (checked) {
      try {
        let response;

        if (file) {
          const formData = new FormData();
          formData.append('sso_id', ssoId);
          formData.append('doc_type', documentType);
          formData.append('file', file);

          // API request for upload
          response = await axios.post(`${apiUrl}/user-docs`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          const data = new URLSearchParams();
          data.append('sso_id', ssoId);
          data.append('doc_type', documentType);
          data.append('doc_id', docId);

          // API request for fetch
          response = await axios.post(`${apiUrl}/user-docs`, data.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          });
        }

        // Handle successful upload/fetch
        setShowSuccess(true);

      } catch (error) {
        // In case of error, display the error message and set the error state
        setErrorMessage(error.response?.data?.errorMessage || 'Failed to process the document. Please try again.');
      }
    }
  };

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleErrorDialogClose = () => {
    if (file) {
      navigate('/upload');
    } else {
      navigate('/fetch');
    }
    onClose();
  };

  const ConfirmationContent = () => (
    <>
      <DialogTitle sx={{ pb: 1, pr: 6 }}>
        <Typography variant="h5" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Share Information
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1, fontFamily: 'Poppins, sans-serif' }}>
          Confirmation
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Poppins, sans-serif' }}>
          Please provide your consent to share the selected document with your E-Wallet
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
            label={documentType}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 1, pt: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
          sx={{ mr: 1, fontFamily: 'Poppins, sans-serif', borderRadius: 7 }}
        >
          Deny
        </Button>

        <Button
          variant="contained"
          fullWidth
          onClick={handleAccept}
          disabled={!checked}
          sx={{ fontFamily: 'Poppins, sans-serif', borderRadius: 7 }}
        >
          Accept & Import
        </Button>
      </DialogActions>
    </>
  );

  const SuccessContent = () => (
    <DialogContent>
      <Box sx={{
        textAlign: 'center',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Poppins, sans-serif' }}>
          Your <Typography component="span" color="primary" variant="h6" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            {documentType}
          </Typography> has been added to your documents set in the E-Wallet!
        </Typography>

        <Box sx={{
          my: 4,
          position: 'relative',
          width: 80,
          height: 80
        }}>
          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: 'primary.light',
            opacity: 0.1,
            borderRadius: '50%'
          }} />
          <CheckCircleOutlineIcon
            color="primary"
            sx={{
              fontSize: 80,
              position: 'relative',
              zIndex: 1
            }}
          />
        </Box>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate('/home')}
          sx={{ mt: 2 }}
        >
          Okay
        </Button>
      </Box>
    </DialogContent>
  );

  const ErrorContent = () => (
    <DialogContent>
      <Box sx={{
        textAlign: 'center',
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Poppins, sans-serif' }}>
          Error: {errorMessage}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleErrorDialogClose}
          sx={{ mt: 2 ,borderRadius:7}}
        >
          Okay
        </Button>
      </Box>
    </DialogContent>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          m: 2
        }
      }}
    >
      {showSuccess ? <SuccessContent /> : errorMessage ? <ErrorContent /> : <ConfirmationContent />}
    </Dialog>
  );
};

export default ShareConfirmationDialog;
