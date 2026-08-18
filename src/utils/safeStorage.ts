/**
 * Safe Browser Storage and Utilities to prevent crashes in restricted iframe / sandbox environments
 */

// Memory fallback store if localStorage or sessionStorage is blocked
const memoryStorage: Record<string, string> = {};
const memorySessionStorage: Record<string, string> = {};

export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch {
      // Storage access blocked by browser privacy or iframe sandbox
    }
    return memoryStorage[key] ?? null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch {
      // Ignore storage errors
    }
    memoryStorage[key] = value;
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch {
      // Ignore
    }
    delete memoryStorage[key];
  }
};

export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(key);
      }
    } catch {
      // Session storage blocked
    }
    return memorySessionStorage[key] ?? null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(key, value);
        return;
      }
    } catch {
      // Ignore session storage errors
    }
    memorySessionStorage[key] = value;
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(key);
        return;
      }
    } catch {
      // Ignore
    }
    delete memorySessionStorage[key];
  }
};

export const safeCopyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to execCommand
  }

  try {
    if (typeof document !== 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch {
    // Ignore clipboard errors
  }
  return false;
};

export const safeReplaceHistoryHash = (hash: string): void => {
  try {
    if (typeof window !== 'undefined' && window.history && typeof window.history.replaceState === 'function') {
      const url = hash ? `${window.location.pathname}#${hash.replace(/^#/, '')}` : window.location.pathname;
      window.history.replaceState(null, '', url);
    }
  } catch {
    // Ignore restricted iframe sandbox history errors
  }
};
