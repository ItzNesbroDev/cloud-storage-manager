import PlusIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import RemoteCreateDialog from '../RemoteCreateDialog';
import './index.scss';

const NavigationOptions = Object.freeze([
  {
    key: 'files',
    text: 'Files',
    icon: <FolderIcon />,
    redirectUrl: '/files',
  },
]);

export default function GlobalNavBar({ isExpanded }) {
  const location = useLocation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddRemoteClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          root: cx('global-navbar', {
            'global-navbar--expanded': isExpanded,
          }),
          paper: cx('global-navbar__paper', {
            'global-navbar__paper--expanded': isExpanded,
          }),
        }}
      >
        <List>
          {NavigationOptions.map(({ key, text, icon, redirectUrl }) => (
            <Link key={key} className="global-navbar__link" to={redirectUrl}>
              <ListItem
                button
                key={key}
                selected={location.pathname.includes(redirectUrl)}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText className="global-navbar__listitem-text" primary={text} />
              </ListItem>
            </Link>
          ))}
          <ListItem
            button
            key="add-remote"
            className="global-navbar__add-remote-button global-navbar__link"
            onClick={handleAddRemoteClick}
          >
            <ListItemIcon>
              <PlusIcon />
            </ListItemIcon>
            <ListItemText
              className="global-navbar__listitem-text"
              style={{ textDecoration: 'underline' }}
              primary="Add Remote"
            />
          </ListItem>
        </List>
      </Drawer>

      <RemoteCreateDialog open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

GlobalNavBar.propTypes = {
  isExpanded: PropTypes.bool,
};
