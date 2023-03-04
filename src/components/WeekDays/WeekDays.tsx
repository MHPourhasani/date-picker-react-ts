import { useMemo } from 'react';
import isArray from '../../common/isArray';

interface Props {customWeekDays: string[],
	weekStartDayIndex: number,
	className: string,}

const WeekDays: React.FC<Props> = ({
	customWeekDays=[],
	weekStartDayIndex=1,
	className='',
}) => {
	let weekDays = useMemo(() => {
		let weekDays: string[] = customWeekDays;

		if (isArray(weekDays) && weekDays.length >= 7) {
			weekDays.length = 7;

			weekDays = weekDays.map((weekDay) => {
				if (isArray(weekDay) && (weekDay.length > 1)) {
					weekDay = weekDay[1];
				} else if (isArray(weekDay)) {
					weekDay = weekDay[0];
				}

				return weekDay;
			});
		}

		return weekDays;
	}, [customWeekDays]);

	weekDays = [...weekDays]
		.slice(weekStartDayIndex)
		.concat([...weekDays].splice(0, weekStartDayIndex));

	return (
		// rmdp-week
		<div
			className={className}>
			{weekDays.map((weekDay:string, index:number) => (
				<span key={index} className='flex w-12 h-12 items-center justify-center'>
					{weekDay}
				</span>
			))}
		</div>
	);
};

export default WeekDays;
