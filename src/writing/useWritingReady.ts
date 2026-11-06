import { useEffect } from 'react';
import { useSession } from '../auth/session';
import { switchWritingUser, useWritingDrafts } from './draftStore';

/**
 * Loads the signed-in learner's writing drafts and says when they are ready.
 * Kept out of draftStore.ts so its tests don't pull in the auth client.
 */
export function useWritingReady(): boolean {
  const userId = useSession((s) => s.userId);
  const ready = useWritingDrafts((s) => s.hydrated && s.userId === userId);
  useEffect(() => {
    void switchWritingUser(userId);
  }, [userId]);
  return ready;
}
