'use client';

import { Button, cn } from '@/shared/ui';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';
import { fetchCallback } from '../api/fetchCallback';
import { useMediaQuery } from '@/shared/hooks';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerClose,
} from '@/shared/ui';

const DATA = {
	title: 'Заказать звонок',
	description: 'Оставьте заявку, и мы свяжемся с вами в ближайшее время',
};

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Имя должно быть не меньше 2 символов' })
		.max(15, { message: 'Имя должно быть не больше 15 символов' }),
	phone: z.string().regex(/^\+375 \((29|33|44|25)\) \d{3}-\d{2}-\d{2}$/, {
		message: 'Неверный формат телефона',
	}),
});

export const CallBackDialog = ({ children }: { children: React.ReactNode }) => {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const [open, setOpen] = useState(false);

	if (isDesktop)
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<div onClick={() => setOpen(true)}>{children}</div>
				<DialogContent
					onOpenAutoFocus={(e) => e.preventDefault()}
					className="sm:max-w-[425px]"
				>
					<DialogHeader>
						<DialogTitle className="text-center">Заказать звонок</DialogTitle>
						<DialogDescription className="text-center">
							Оставьте заявку, и мы свяжемся с вами в ближайшее время
						</DialogDescription>
					</DialogHeader>
					<CallBackForm isDesktop={isDesktop} />
				</DialogContent>
			</Dialog>
		);

	return (
		<Drawer open={open} onOpenChange={setOpen} repositionInputs={false}>
			<div onClick={() => setOpen(true)}>{children}</div>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>{DATA.title}</DrawerTitle>
					<DrawerDescription>{DATA.description}</DrawerDescription>
				</DrawerHeader>
				<CallBackForm className="px-4" isDesktop={!!isDesktop} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Закрыть</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

const CallBackForm = ({
	className,
	isDesktop,
}: {
	className?: string;
	isDesktop: boolean;
}) => {
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			phone: '',
		},
	});
	const [isLoading, setIsLoading] = useState(false);
	async function onSubmit({ name, phone }: z.infer<typeof formSchema>) {
		const formattedPhone = phone.replace(/ /g, '');
		setIsLoading(true);

		try {
			await fetchCallback({ name, phone: formattedPhone });
			form.reset();
			toast.success('Спасибо! Мы свяжемся с вами в ближайшее время', {
				duration: 3000,
			});
		} catch (error) {
			toast.dismiss();
			toast.error('Произошла ошибка при отправке заявки. Попробуйте позже', {
				duration: 2000,
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('space-y-4', className)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Имя<span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									onChange={(e) => {
										form.clearErrors('name');
										field.onChange(e);
									}}
									placeholder="Ваше имя"
									disabled={isLoading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Телефон<span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<PatternFormat
									{...field}
									onChange={(e) => {
										form.clearErrors('phone');
										field.onChange(e);
									}}
									format="+375 (##) ###-##-##"
									mask="_"
									customInput={Input}
									placeholder="+375 (__) ___-__-__"
									disabled={isLoading}
									allowEmptyFormatting
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className={cn('flex justify-self-end', !isDesktop && 'w-full')}
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? 'Отправка...' : 'Отправить'}
				</Button>
			</form>
		</Form>
	);
};
