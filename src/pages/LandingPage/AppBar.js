import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link as ReactRouterLink } from 'react-router-dom';
import AppLogo from 'components/AppLogo';
import './AppBar.scss';

export default function AppBar() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <MuiAppBar
        elevation={trigger ? 1 : 0}
        sx={{ bgcolor: 'background.default', color: 'text.primary' }}
      >
        <Toolbar>
          <AppLogo />
          <div className="landing-page-app-bar__right-items">
            <Button variant="contained" component={ReactRouterLink} to="/login">
              Login
            </Button>
          </div>
        </Toolbar>
      </MuiAppBar>
    </>
  );
}
