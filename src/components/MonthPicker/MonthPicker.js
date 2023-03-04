import { useMemo } from 'react';
import selectDate from '../../utils/selectDate';
import isSameDate from '../../common/isSameDate';
import isArray from '../../common/isArray';
import stringify from '../../common/stringify';
import DateObject from 'react-date-object';

const MonthPicker = ({
	state,
	onChange,
	customMonths,
	sort,
	handleMonthChange,
	handleFocusedDate,
}) => {
	const { date, today, minDate, maxDate, calendar, locale, onlyShowInRangeDates } = state,
		mustShowMonthPicker = state.mustShowMonthPicker;

	customMonths = customMonths && stringify(customMonths);

	const months = useMemo(() => {
		let months = customMonths && JSON.parse(customMonths),
			monthsArray = [],
			index = 0,
			date = new DateObject({
				calendar,
				locale,
				format: state.date._format,
				year: state.date.year,
				month: 1,
				day: 1,
			});

		if (isArray(months) && months.length >= 12) {
			months.length = 12;
			months = months.map((month) => (isArray(month) ? month[0] : month));
		} else {
			months = date.locale.months.map(([month]) => month);
		}

		let array = [];
		for (var j = 0; j < 12; j++) {
			array.push({
				date: new DateObject(date),
				name: months[index],
			});

			index++;
			date.add(1, 'month');
		}

		monthsArray.push(array);

		return monthsArray;
	}, [calendar, locale, customMonths, state.date.year, state.date._format]);

	const selectMonth = (dateObject) => {
		let { selectedDate, focused } = state,
			{ year, monthIndex } = dateObject;

		if (
			(minDate && year <= minDate.year && monthIndex < minDate.monthIndex) ||
			(maxDate && year >= maxDate.year && monthIndex > maxDate.monthIndex)
		)
			return;

		date.setMonth(monthIndex + 1);

		handleMonthChange(date);

		onChange(undefined, {
			...state,
			date,
			focused,
			selectedDate,
			mustShowMonthPicker: false,
		});
	};

	const getClassName = (dateObject) => {
		let names = ['relative px-3 py-2 cursor-pointer'], // rmdp-day
			{ year, monthIndex } = dateObject;

		if (
			(minDate &&
				(year < minDate.year ||
					(year === minDate.year && monthIndex < minDate.monthIndex))) ||
			(maxDate &&
				(year > maxDate.year || (year === maxDate.year && monthIndex > maxDate.monthIndex)))
		)
			names.push('text-secondary400'); // rmdp-disabled

		if (names.includes('text-secondary400') && onlyShowInRangeDates) return; // mdp-disabled

		if (isSameDate(today, dateObject, true)) names.push('text-primary'); // rmdp-today

		return names.join(' ');
	};

	return (
		<div
			// rmdp-month-picker
			className={`text-sm absolute top-0 flex h-auto w-1/2 items-center justify-around gap-3 rounded-md ${
				mustShowMonthPicker ? 'flex' : 'hidden'
			}`}>
			{months.map((month, i) => (
				<div key={i} className='rmdp-ym gap-10'>
					{month.map(({ date, name }, j) => (
						<div
							key={j}
							className={`${getClassName(date)}`}
							onClick={() => selectMonth(date)}>
							<span>{name}</span>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default MonthPicker;
