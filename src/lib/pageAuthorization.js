import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from './auth';

export const pageAuthorization = async (rolesAccepted) => {
  const session = await getServerSession(authOptions);
  const profile = session?.profile;

  if (!profile) {
    redirect('/login');
  }

  if (rolesAccepted && !rolesAccepted.includes(profile?.role)) {
    redirect('/jobs');
  }
};
