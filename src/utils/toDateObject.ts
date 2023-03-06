import DateObject, { DateType } from 'react-date-object';

const toDateObject = (date: DateType, calendar: any) => {
	if (date instanceof DateObject) {
		date.setCalendar(calendar);
	} else {
		date = new DateObject({ date, calendar });
	}

	return date;
};

export default toDateObject;
