'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	cn,
} from '@/shared/ui';

import { fetchCallback } from '@/features/callback';

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Имя должно быть не меньше 2 символов' })
		.max(15, { message: 'Имя должно быть не больше 15 символов' }),
	phone: z.string().regex(/^\+375 \((29|33|44|25)\) \d{3}-\d{2}-\d{2}$/, {
		message: 'Неверный формат телефона',
	}),
});

export const CallbackSection = ({ className }: { className?: string }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		resolver: zodResolver(formSchema),
		defaultValues: { name: '', phone: '' },
	});
	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit({ name, phone }: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			await fetchCallback({ name, phone: phone.replace(/ /g, '') });
			form.reset();
			toast.success('Спасибо! Мы свяжемся с вами в ближайшее время', {
				duration: 3000,
			});
		} catch {
			toast.dismiss();
			toast.error('Произошла ошибка при отправке заявки. Попробуйте позже', {
				duration: 2000,
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section className={cn('rounded-lg border bg-card px-6 py-6 sm:py-8', className)}>
			<div className="mx-auto max-w-2xl text-center">
				<h2 className="text-2xl font-bold sm:text-3xl">
					Поможем сделать идеальный выбор
				</h2>
				<p className="mb-6 text-muted-foreground">
					Перезвоним в ближайшее время, уточним все детали и подберем удобное время
					для&nbsp;бесплатного замера дверей
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
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
						<Button type="submit" disabled={isLoading} className="shrink-0">
							{isLoading ? 'Отправка...' : 'Заказать звонок'}
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
};
