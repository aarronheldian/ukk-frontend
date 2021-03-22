import moment from 'moment';

export default (strDate, type = null) => {
  let datetime = strDate !== '' ? moment(strDate) : moment();
  if (type === 'iso') {
    return datetime.toISOString();
  }

  if (type === 'object') {
    return datetime.toObject();
  }

  if (type === 'calendar') {
    return datetime.format('L hh:mm:ss');
  }

  if (type === 'choose') {
    return datetime.format('DD/MM/YYYY');
  }

  if (type === 'from-now') {
    return datetime.fromNow();
  }

  if (type === 'date-time') {
    return strDate && datetime.format('DD/MM/YYYY HH:mm');
  }

  if (type === 'today') {
    return datetime;
  }

  if (type === 'moment') {
    return datetime;
  }

  if (type === 'date-time-custom') {
    return strDate && datetime.format('DD MMMM YYYY HH:mm');
  }
};
