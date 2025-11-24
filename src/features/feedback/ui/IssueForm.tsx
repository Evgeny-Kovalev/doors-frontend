import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatternFormat } from 'react-number-format';
import toast from 'react-hot-toast';

import {
	Button,
	FormItem,
	Form,
	Input,
	FormField,
	FormLabel,
	FormControl,
	cn,
	FormMessage,
	Textarea,
} from '@/shared/ui';

import { createFeedbackMutation } from '../api/createFeedbackMutation';

const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Имя должно быть не меньше 2 символов' })
		.max(15, { message: 'Имя должно быть не больше 15 символов' }),
	phone: z.string().regex(/^\+375 \((29|33|44|25)\) \d{3}-\d{2}-\d{2}$/, {
		message: 'Неверный формат телефона',
	}),
	text: z.string().min(5, { message: 'Опишите проблему более детально' }),
});

export const IssueForm = ({ onSuccess }: { onSuccess?: () => void }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			phone: '',
			text: '',
		},
	});

	const [isLoading, setIsLoading] = useState(false);

	async function onSubmit({ name, phone, text }: z.infer<typeof formSchema>) {
		const formattedPhone = phone.replace(/ /g, '');
		setIsLoading(true);

		try {
			await createFeedbackMutation({ name, phone: formattedPhone, text });
			form.reset();
			onSuccess?.();
		} catch (error) {
			toast.dismiss();
			toast.error('Произошла ошибка при отправке данных. Попробуйте позже', {
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
				className={cn('grid grid-cols-2 gap-3')}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="col-span-2 text-left md:col-span-1">
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
						<FormItem className="col-span-2 text-left md:col-span-1">
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
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem className="col-span-2 text-left">
							<FormLabel>
								Расскажите о проблеме<span className="text-red-500">*</span>
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									onChange={(e) => {
										form.clearErrors('text');
										field.onChange(e);
									}}
									placeholder="Описание"
									disabled={isLoading}
									className="min-h-28"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button className="col-span-2" type="submit" disabled={isLoading}>
					{isLoading ? 'Отправка...' : 'Отправить'}
				</Button>
			</form>
		</Form>
	);
};
