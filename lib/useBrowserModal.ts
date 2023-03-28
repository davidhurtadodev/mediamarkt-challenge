import { useState, useEffect } from 'react';

//Custon hook for Modal rendering
export default function useBrowserModal() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser;
}
