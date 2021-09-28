import React, { useState } from 'react';
import Button from '@arcblock/ux/lib/Button';
import SessionManager from '@arcblock/did-connect/lib/SessionManager';
import DidConnect from '@arcblock/did-connect/lib/Connect';

import { useSessionContext } from '../contexts/session';

import api from '../libs/api';

const Home = () => {
  const [connect1, setConnect1] = useState(false);
  const [connect2, setConnect2] = useState(false);
  const [connect3, setConnect3] = useState(false);
  const { session } = useSessionContext();

  return (
    <div className="app-header">
      <SessionManager session={session} onLogout={() => window.location.reload()} />
      <h1>Do action with wallet</h1>
      <div style={{ marginTop: 16 }}>
        <Button variant="outlined" color="primary" onClick={() => setConnect1(true)}>
          auto connect
        </Button>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="outlined" color="primary" onClick={() => setConnect2(true)}>
          auto connect (current connect only)
        </Button>
      </div>
      <div style={{ marginTop: 16 }}>
        <Button variant="outlined" color="primary" onClick={() => setConnect3(true)}>
          no auto connect
        </Button>
      </div>
      {connect1 && (
        <DidConnect
          popup
          open={connect1}
          action="connect"
          checkFn={api.get}
          onClose={() => setConnect1(false)}
          onSuccess={() => setConnect1(false)}
          webWalletUrl="https://web.abtwallet.io"
          messages={{
            title: 'Connect (Current Session)',
            scan: 'This connection should be auto connected',
            confirm: 'confirm',
            success: 'success',
          }}
        />
      )}
      {connect2 && (
        <DidConnect
          popup
          open={connect2}
          action="connect-only"
          checkFn={api.get}
          onClose={() => setConnect2(false)}
          onSuccess={() => setConnect2(false)}
          webWalletUrl="https://web.abtwallet.io"
          messages={{
            title: 'Connect (Current Session)',
            scan: 'This connection should be auto connected',
            confirm: 'confirm',
            success: 'success',
          }}
        />
      )}
      {connect3 && (
        <DidConnect
          popup
          open={connect3}
          action="no-connect"
          checkFn={api.get}
          onClose={() => setConnect3(false)}
          onSuccess={() => setConnect3(false)}
          webWalletUrl="https://web.abtwallet.io"
          messages={{
            title: 'Connect (Any Wallet)',
            scan: 'Use any wallet to scan',
            confirm: 'confirm',
            success: 'success',
          }}
        />
      )}
    </div>
  );
};

export default Home;
