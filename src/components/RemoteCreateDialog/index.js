import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const backendURL = 'http://127.0.0.1:5000';

export default function RemoteCreateDialog({ open, onClose }) {
  const [remoteName, setRemoteName] = useState('');
  const [remoteType, setRemoteType] = useState('drive');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/create_config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ remote_name: `"${remoteName}"`, remote_type: remoteType }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create remote.');
      }
      onClose();

      alert(`Remote ${remoteName} created successfully!`);
    } catch (error) {
      console.error('Error creating remote:', error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={onClose}
      data-testid="remote-create-dialog"
    >
      <DialogTitle>Create New Remote</DialogTitle>
      <DialogContent>
        <Stepper orientation="vertical">
          <Step expanded active>
            <StepLabel>Enter Remote Details</StepLabel>
            <StepContent>
              <TextField
                data-testid="remote-name-input"
                required
                label="Remote Name"
                value={remoteName}
                onChange={(e) => setRemoteName(e.target.value)}
              />
              <TextField
                data-testid="remote-type-input"
                select
                label="Remote Type"
                value={remoteType}
                onChange={(e) => setRemoteType(e.target.value)}
              >
                <MenuItem value="drive">Google Drive</MenuItem>
                <MenuItem value="onedrive">OneDrive</MenuItem>
              </TextField>
            </StepContent>
          </Step>
          <Step expanded active>
            <StepLabel>Create Remote</StepLabel>
            <StepContent>
              <Typography>
                Click the button below to create the remote using RClone.
              </Typography>
              <Button
                data-testid="create-remote-button"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Remote...' : 'Create Remote'}
              </Button>
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="close-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
