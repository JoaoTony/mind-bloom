import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');
export const formatDateLabel = (dateString: any) => {
  if(!dateString || typeof dateString !== "string") return ""
  const date = moment(dateString).format('DD/MM/YYYY - hh:mm');
  const today = moment();
  const yesterday = moment().subtract(1, 'day');

  // if (date.isSame(today, 'day')) return 'Hoje';
  // if (date.isSame(yesterday, 'day')) return 'Ontem' ;
  return date;
};
