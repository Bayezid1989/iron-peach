import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

export const formatTime = (time: Date, format = 'YYYY/MM/DD HH:mm') => dayjs(time).format(format);
