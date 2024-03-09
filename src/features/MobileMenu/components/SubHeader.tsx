import PhoneNumbersList from '@/shared/components/PhoneNumbersList';
import SearchBox from '@/widgets/Header/components/SearchBox';

interface SubHeaderProps {}

export default function SubHeader({}: SubHeaderProps) {
	return (
		<div className="container mb-3 flex max-w-full items-center justify-between">
			<SearchBox />
			<PhoneNumbersList className="text-nowrap text-sm" />
		</div>
	);
}
