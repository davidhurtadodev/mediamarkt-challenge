import { useState, useEffect } from 'react';

export default function useBrowserModal() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return isBrowser;
}
