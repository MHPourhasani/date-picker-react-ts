import { Fragment, useState, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';

// components
import DateObject from 'react-date-object';
import toLocaleDigits from '../../common/toLocaleDigits';

// icons
import { ReactComponent as ArrowDown } from '../../assets/svg/arrow-down.svg';

// styles
import styles from '../../styles/scrollbar.module.css';

// types
import { StateType } from '../../types/Header';

interface YearPickerProps {
	state: StateType;
	onChange: (a: any, b: any) => any;
}

const YearPicker: React.FC<YearPickerProps> = ({ state, onChange }) => {
	// const { date, today, minDate, maxDate, selectedDate, onlyShowInRangeDates, year }: State =
	// const { date, today, minDate, maxDate, selectedDate, year }: State = state,
	const { date, today, minDate, maxDate, selectedDate, year }: StateType = state,
		digits = date.digits;

	const [selectedYear, setSelectedYear] = useState<number>(today.year);
	let minYear: number = today.year - 4;

	minYear = minYear - 12 * Math.ceil((minYear - year) / 12);

	const notInRange = (year: number) => {
		return (minDate && year < minDate.year) || (maxDate && year > maxDate.year);
	};

	const years = useMemo(() => {
		let years: number[] = [],
			year: number = minYear;

		for (let i = 0; i < 10; i++) {
			years.push(year);
			year++;
		}

		return years;
	}, [minYear]);

	const selectYear = (year: number) => {
		if (notInRange(year)) return;

		// let date: DateObject = new DateObject(date).setYear(year);
		let date: DateObject = new DateObject().setYear(year);

		if (minDate && date.monthIndex < minDate.monthIndex) {
			date = date.setMonth(minDate.monthIndex + 1);
		} else if (maxDate && date.monthIndex > maxDate.monthIndex) {
			date= date.setMonth(maxDate.monthIndex + 1);
		}

		onChange(selectedDate, {
			...state,
			date,
			selectedDate,
			selectedYear,
			mustShowYearPicker: false,
		});
	};

	const getClassName = (year: number) => {
		let names = ['rmdp-day'];

		if (notInRange(year)) names.push('text-secondary400'); // rmdp-disabled

		// if (names.includes('text-secondary400') && onlyShowInRangeDates) return; // rmdp-disabled
		if (names.includes('text-secondary400')) return; // rmdp-disabled

		if (today.year === year) names.push('text-primary'); // rmdp-today

		if (year === date.year) names.push('text-primary'); // rmdp-selected

		return names.join(' ');
	};

	return (
		<div>
			<Listbox
				value={selectedDate.year !== today.year ? selectedDate.year : selectedYear}
				onChange={(e) => setSelectedYear(e)}>
				<Listbox.Button
					value={selectedDate.year !== today.year ? selectedDate.year : selectedYear}
					className='relative flex w-auto cursor-pointer items-center gap-5 bg-white py-2 text-15'>
					<span className='block'>
						{selectedDate.year !== today.year ? selectedDate.year : selectedYear}
					</span>
					<ArrowDown />
				</Listbox.Button>

				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
					// className={styles.scrollbar_hidden}
					>
					<Listbox.Options className='absolute h-60 w-36 overflow-y-scroll rounded-md border-1 border-secondary300 bg-white py-1 text-15 shadow-calendar focus:outline-none'>
						{years.map((year) => (
							<Listbox.Option
								key={year}
								value={year}
								disabled={notInRange(year)}
								onClick={() => selectYear(year)}
								className={({ active }) =>
									`${getClassName(
										year
									)} flex cursor-pointer select-none flex-col items-start py-2 pr-4 disabled:text-secondary400 ${
										active ? 'text-primary' : 'text-secondary800'
									}`
								}>
								{({ selected }) => (
									<span
										className={`font-medium ${selected ? 'text-primary' : ''}`}>
										{toLocaleDigits(year.toString(), digits)}
									</span>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</Listbox>
		</div>
	);
};

export default YearPicker;
