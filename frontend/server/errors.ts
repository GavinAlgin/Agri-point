// src/api/errors.ts
import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const data = error.response.data;

      // Django REST Framework default error format
      if (typeof data === 'object') {
        const messages = Object.values(data).flat().join('\n');
        return messages;
      }

      return data.detail || 'Something went wrong.';
    }
    return 'No response from server.';
  }

  return 'Unexpected error occurred.';
};
