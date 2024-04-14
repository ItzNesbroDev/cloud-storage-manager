import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MainApp from 'apps/MainApp';
import { ColorModeProvider } from 'contexts/ColorMode';
import { JobQueueProvider } from 'contexts/JobQueue';
import { JobsListDialogProvider } from 'contexts/JobsListDialog';
import { RCloneInfoProvider } from 'contexts/RCloneInfo';
import { RecentPicturesProvider } from 'contexts/RecentPicturesList';
import AppErrorBoundary from 'pages/ErrorBoundaries/AppErrorBoundary';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppErrorBoundary>
        <RCloneInfoProvider>
          <RecentPicturesProvider>
            <ColorModeProvider>
              <JobQueueProvider>
                <JobsListDialogProvider>
                  <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    autoHideDuration={3000}
                  >
                    <MainApp />
                  </SnackbarProvider>
                </JobsListDialogProvider>
              </JobQueueProvider>
            </ColorModeProvider>
          </RecentPicturesProvider>
        </RCloneInfoProvider>
      </AppErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
