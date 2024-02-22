import Link from 'next/link';

export default function Logo() {
	return (
		<Link href={'/'} className="flex items-center text-gray-800">
			<div className="mr-3">
				<div className="h-10 w-10 rounded-full bg-primary sm:h-12 sm:w-12"></div>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center text-base font-bold leading-tight after:ml-1 after:inline-block after:h-2 after:w-2 after:rounded-full after:bg-primary after:content-[''] sm:text-lg">
					ДВЕРИ
				</div>
				<div className="text-nowrap text-xs leading-tight sm:text-sm md:text-base">
					Входные и Межкомнатные
				</div>
			</div>
		</Link>
	);
}
