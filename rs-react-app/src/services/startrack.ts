import type { Conflict } from '../entities';

export const searchConflict = async (
  body: FormData
): Promise<{ conflicts: Conflict[] }> => {
  const response = await fetch(`https://stapi.co/api/v1/rest/conflict/search`, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(
    `Api error response ${response.status} ${response.statusText}`
  );
};
