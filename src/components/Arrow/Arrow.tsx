import { ReactComponent as ArrowRight } from '../../assets/svg/arrow-right.svg';
import { ArrowProps } from '../../types/Arrow';

const Arrow: React.FC<ArrowProps> = ({ direction, onClick, disabled }) => {
	return (
		<span
			className={`flex cursor-pointer items-center justify-center rounded-full hover:text-primary ${direction} ${
				disabled ? 'text-secondary400' : ''
			}`}
			onClick={onClick}>
			{direction === 'right' ? <ArrowRight /> : <ArrowRight className='rotate-180' />}
		</span>
	);
};

export default Arrow;
