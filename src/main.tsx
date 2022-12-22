import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import { Application, MoneyTrackerProvider } from './app';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <Router>
      <MoneyTrackerProvider>
        <ChakraProvider>
          <Application />
        </ChakraProvider>
      </MoneyTrackerProvider>
    </Router>
  </StrictMode>
);
