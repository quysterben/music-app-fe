import moment from 'moment';
import vi from 'moment/locale/vi';

const timeFromNow = (timestamp) => {
  const time = moment(timestamp || moment.now())
    .locale('vi', vi)
    .fromNow();
  return time;
};

export default timeFromNow;
