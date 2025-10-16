'use client';

import { Button } from '@/shared/ui';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			phone: '',
		},
	});

	const [open, setOpen] = useState(false);
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
			setOpen(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
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
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? 'Отправка...' : 'Отправить'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
