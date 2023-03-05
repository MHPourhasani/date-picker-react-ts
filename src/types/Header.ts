export interface HeaderProps {
	state: StateType;
	setState: any;
	onChange: (a: number, b: number) => number;
	monthAndYears: [string][];
}

export type StateType = {
	date: {
		monthIndex: number;
		year: number;
		month: { index: number, number: number };
		digits: string[];
		toFirstOfMonth(): unknown;
		setMonth(): unknown;
	};
	today: { day: number; year: number };
	minDate: {
		monthIndex: number;
		year: number;
	};
	maxDate: {
		monthIndex: number;
		year: number;
	};
	selectedDate: {
		day: number;
		monthIndex: number;
		year: number;
	};
	year: number;
};