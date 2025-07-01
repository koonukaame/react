import type { Conflict } from '../entities';

export const searchConflict = async (
  body: FormData
): Promise<{ conflicts: Conflict[] }> => {
  const formData = new URLSearchParams();

  for (const [key, value] of body) {
    formData.append(key, value.toString());
  }

  const response = await fetch(`https://stapi.co/api/v1/rest/conflict/search`, {
    method: 'POST',
    body: formData,
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
