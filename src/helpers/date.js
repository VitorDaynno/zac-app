import {
  differenceInMinutes,
  format,
  formatRelative,
  startOfDay,
  endOfDay,
} from 'date-fns';

import { ptBR } from 'date-fns/locale';

export const ToString = (date, mask) => {
  return format(date, mask);
};

export const toDate = (date) => {
  return new Date(date);
};

export const getDuration = (firstDate, secondDate) => {
  return differenceInMinutes(firstDate, secondDate);
};

export const getTodayStr = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

export const FormatToRelative = (firstDate, secondDate=new Date()) => {
  return formatRelative(firstDate, secondDate, {
    locale: ptBR
  });
};

export const getStartOfDay = (date) => {
  return startOfDay(date);
};

export const getEndOfDay = (date) => {
  return endOfDay(date);
};