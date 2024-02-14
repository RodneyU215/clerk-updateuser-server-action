'use server';
import { clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

type basicUserData = {
  firstName?: string;
  lastName?: string;
};

export async function updateUser(
  clerkId: string,
  params: basicUserData
) {
  'use server';
  try {
    // Note: These logs will appear in the terminal, not the browser console.
    console.log(
      'clerkClient:',
      clerkClient,
      'updateUser method:',
      clerkClient?.users?.updateUser
    );
    const updatedUser = await clerkClient.users.updateUser(
      clerkId,
      params
    );
    console.log('User successfully updated:', updatedUser);
    revalidatePath('/');
    return null;
  } catch (error) {
    console.log(error);
  }
}
