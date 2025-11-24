'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/shared/ui';
import { PageTitle } from '@/shared/components';
import { MAIN_CATEGORIES } from '@/shared/constants';
import { IssueForm } from './IssueForm';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

export const FeedbackForm = () => {
	const [step, setStep] = useState<number>(0);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const STEP_TITLE_MAP: Record<number, { title: string; subtitle?: string }> = {
		0: {
			title: 'Оцените нашу работу',
			subtitle:
				'Мы будем очень рады если вы оставите свой отзыв или сообщите о проблеме',
		},
		1: {
			title: 'Где вам удобно оставить отзыв?',
			// title: 'Выберите где вам удобно оставить отзыв',
			// title: 'Выберите где вы хотите оставить отзыв',
			// subtitle: 'Перед тем как оставить отзыв войдите в аккаут выбранного сервиса',
			// subtitle: 'Чтобы оставить отзыв нужно иметь аккаут в выбранном сервисе',
			// subtitle: 'Нужно иметь аккаут в выбранном сервисе',
			subtitle: 'Нужно наличие аккаута в выбранном сервисе',
		},
		2: {
			title: 'Сообщить о проблеме',
			subtitle:
				'Заполните пожалуйста форму, чтобы мы могли помочь вам максимально эффективно',
		},
		3: {
			title: 'Спасибо за оставленный отзыв!',
			subtitle: 'Хотите посмотреть другие товары?',
		},
	};

	const activeItem = STEP_TITLE_MAP[step];

	const onButtonClick = () => {
		setTimeout(() => {
			setIsButtonDisabled(false);
		}, 1000);
	};

	return (
		<div className="text-center">
			<PageTitle className="mb-0">{activeItem.title}</PageTitle>
			{activeItem.subtitle && (
				<h2 className="mb-5 text-gray-400">{activeItem.subtitle}</h2>
			)}
			{step === 0 && (
				<div className="flex justify-center gap-5 text-5xl">
					<button
						onClick={() => setStep(2)}
						className="flex aspect-square max-w-48 flex-1 cursor-pointer items-center justify-center rounded-2xl bg-red-100 transition-all focus-within:bg-opacity-75 hover:bg-opacity-75"
					>
						{/* 👎 */}
						<svg
							className="size-16 text-red-400"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M17.0001 2V13M22.0001 9.8V5.2C22.0001 4.07989 22.0001 3.51984 21.7821 3.09202C21.5903 2.71569 21.2844 2.40973 20.908 2.21799C20.4802 2 19.9202 2 18.8001 2H8.11806C6.65658 2 5.92584 2 5.33563 2.26743C4.81545 2.50314 4.37335 2.88242 4.06129 3.36072C3.70722 3.90339 3.59611 4.62564 3.37388 6.07012L2.8508 9.47012C2.5577 11.3753 2.41114 12.3279 2.69386 13.0691C2.94199 13.7197 3.4087 14.2637 4.01398 14.6079C4.70358 15 5.66739 15 7.59499 15H8.40005C8.96011 15 9.24013 15 9.45404 15.109C9.64221 15.2049 9.79519 15.3578 9.89106 15.546C10.0001 15.7599 10.0001 16.0399 10.0001 16.6V19.5342C10.0001 20.896 11.104 22 12.4659 22C12.7907 22 13.0851 21.8087 13.217 21.5119L16.5778 13.9502C16.7306 13.6062 16.807 13.4343 16.9278 13.3082C17.0346 13.1967 17.1658 13.1115 17.311 13.0592C17.4753 13 17.6635 13 18.0398 13H18.8001C19.9202 13 20.4802 13 20.908 12.782C21.2844 12.5903 21.5903 12.2843 21.7821 11.908C22.0001 11.4802 22.0001 10.9201 22.0001 9.8Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						{/* <ThumbsDown size={36} className="fill-red-400 stroke-red-400" /> */}
					</button>
					<button
						onClick={() => setStep(1)}
						className="flex aspect-square max-w-48 flex-1 cursor-pointer items-center justify-center rounded-2xl bg-green-200 transition-all focus-within:bg-opacity-75 hover:bg-opacity-75"
					>
						{/* 👍 */}
						<svg
							className="size-16 text-green-500"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7 22V11M2 13V20C2 21.1046 2.89543 22 4 22H17.4262C18.907 22 20.1662 20.9197 20.3914 19.4562L21.4683 12.4562C21.7479 10.6389 20.3418 9 18.5032 9H15C14.4477 9 14 8.55228 14 8V4.46584C14 3.10399 12.896 2 11.5342 2C11.2093 2 10.915 2.1913 10.7831 2.48812L7.26394 10.4061C7.10344 10.7673 6.74532 11 6.35013 11H4C2.89543 11 2 11.8954 2 13Z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						{/* <ThumbsUp size={36} className="fill-green-400 stroke-green-400" /> */}
					</button>
				</div>
			)}
			{step === 1 && (
				<div className="grid grid-cols-6 gap-x-3 gap-y-6">
					<Button
						className="col-span-3"
						onClick={onButtonClick}
						variant="outline"
						size="lg"
						asChild
					>
						<Link
							className="text-xl"
							href="https://yandex.by/maps/org/dveri/190108387395/reviews/?add-review=true"
							target="_blank"
						>
							<svg
								version="1.1"
								id="Yandex_Logo"
								className="h-10 py-2"
								xmlns="http://www.w3.org/2000/svg"
								x="0px"
								y="0px"
								viewBox="0 0 367 106"
							>
								<path
									id="Name"
									d="M349.9,92.3c7.2,0,12.3-1.3,16.1-4.1V75.5c-3.9,2.7-8.6,4.4-15.2,4.4c-11.1,0-15.7-8.6-15.7-22.2
	c0-14.3,5.6-21.6,15.8-21.6c6,0,11.9,2.1,15,4.1V27c-3.3-1.8-9-3.1-16.8-3.1c-19.9,0-30.2,14.3-30.2,34.3
	C319,80.1,329.1,92.3,349.9,92.3z M252.6,86.5V73.8c-4.8,3.3-13,6.2-20.5,6.2c-11.4,0-15.7-5.4-16.4-16.4h37.6v-8.2
	c0-22.9-10.1-31.5-25.6-31.5c-19,0-28,14.5-28,34.4c0,22.9,11.3,34,31.1,34C240.7,92.3,248,89.6,252.6,86.5z M109.9,25.1v26H89.1
	v-26H73.5V91h15.6V63.5h20.8V91h15.6V25.1H109.9z M195.8,78.6h-6.9V25.1h-45.4v5.6c0,16.1-1,36.9-6.5,47.9H132V106h14.4V91h34.9v15
	h14.4V78.6z M302.3,91H320l-25-35.5l22-30.4h-15.7l-22,30.4V25.1h-15.6V91h15.6V58.6L302.3,91z M227.3,36.1
	c7.7,0,10.1,6.4,10.1,14.7v1.3h-21.7C216.1,41.6,219.9,36.1,227.3,36.1z M173.3,78.6h-22c4.3-9.9,5.5-27.9,5.5-39.3v-2h16.5V78.6z"
								/>
								<path
									id="Glyph"
									className="fill-[#FC3F1D]"
									d="M60.5,91H44.6V12.3h-7.1c-13,0-19.8,6.5-19.8,16.2c0,11,4.7,16.1,14.4,22.6l8,5.4L17.1,91H0
	l20.7-30.8C8.8,51.7,2.1,43.4,2.1,29.4C2.1,11.9,14.3,0,37.4,0h23V91z"
								/>
							</svg>
						</Link>
					</Button>
					<Button
						className="col-span-3"
						onClick={onButtonClick}
						variant="outline"
						size="lg"
						asChild
					>
						<Link
							className="text-xl"
							href="https://g.page/r/Cbh5PGgKEX2FEBM/review"
							target="_blank"
						>
							<svg
								className="-mb-1 h-10 py-2"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 272 92"
							>
								<path
									fill="#EA4335"
									d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
								/>
								<path
									fill="#FBBC05"
									d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
								/>
								<path
									fill="#4285F4"
									d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
								/>
								<path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
								<path
									fill="#EA4335"
									d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
								/>
								<path
									fill="#4285F4"
									d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
								/>
							</svg>
						</Link>
					</Button>
					<Button
						className="col-span-2 col-start-3"
						size="sm"
						disabled={isButtonDisabled}
						onClick={() => setStep(3)}
					>
						Продолжить
					</Button>
				</div>
			)}
			{step === 2 && <IssueForm onSuccess={() => setStep(3)} />}
			{step === 3 && (
				<div className="flex flex-col items-center justify-center gap-3">
					<div className="flex gap-3">
						<Button variant="secondary" asChild>
							<Link href={`/categories/${MAIN_CATEGORIES.exterior.slug}`}>
								Входные двери
							</Link>
						</Button>
						<Button variant="secondary" asChild>
							<Link href={`/categories/${MAIN_CATEGORIES.interior.slug}`}>
								Межкомнатные двери
							</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
