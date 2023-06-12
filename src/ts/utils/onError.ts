import axios from 'axios';
import { Notify } from 'notiflix';

export function onError(err: unknown) {
  if (axios.isAxiosError(err))
    Notify.failure('Failed to load weather: ' + err.message);
  else Notify.failure('Unexpected error: ' + err);
}
