/* eslint-disable object-curly-newline */
import { useContext } from 'react';
import { createAuthServiceSessionContext as createSessionContext } from '@arcblock/did-connect/lib/Session';

const { SessionProvider, SessionContext, SessionConsumer, withSession } = createSessionContext();

function useSessionContext() {
  const info = useContext(SessionContext);
  return info;
}

export { SessionProvider, SessionContext, SessionConsumer, useSessionContext, withSession };
