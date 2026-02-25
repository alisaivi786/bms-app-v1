import differenceInYears from 'date-fns/differenceInYears';
import { getTzEndOfDay } from './getTzEndOfDay';
import { getTzStartOfDay } from './getTzStartOfDay';
import { getTzTodayDate } from './getTzTodayDate';

export const calculateAge = (birthDateValue: Date): number => {
  const endDate = getTzEndOfDay(getTzTodayDate());
  const startDate = getTzStartOfDay(birthDateValue);
  const yearsDifference = differenceInYears(endDate, startDate);

  return yearsDifference;
};