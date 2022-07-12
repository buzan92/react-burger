import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatDate = (date?: string): string => {
  if (!date) {
    return '';
  }
  return formatRelative(new Date(date), new Date(), {
    locale: ru,
  });
};