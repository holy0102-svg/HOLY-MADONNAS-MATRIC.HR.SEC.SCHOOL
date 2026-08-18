/**
 * Firebase is explicitly disconnected as per user request.
 * The application operates 100% locally with high-performance local storage and in-memory SQL execution.
 */

export const db = null as any;
export const auth = null as any;

export const getFirebaseConfigSummary = () => ({
  projectId: 'hms-local-offline',
  databaseId: 'local-storage',
  authDomain: 'localhost',
  appId: 'offline-mode',
  isProvisioned: false,
  status: 'Disconnected'
});

/**
 * Connection check reflecting offline/disconnected state
 */
export async function testFirestoreConnection(): Promise<{ connected: boolean; latencyMs: number; error?: string }> {
  return {
    connected: false,
    latencyMs: 0,
    error: 'Firebase & Supabase are disconnected. Local & SQL Engine active.'
  };
}


