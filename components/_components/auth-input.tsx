import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { authFormSchema } from '@/lib/utils';
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';

const formSchema = authFormSchema('sign-up');

interface AuthInputProps {
    control: Control<z.infer<typeof formSchema>>;
    name: FieldPath<z.infer<typeof formSchema>>;
    label?: string | undefined;
    placeholder?: string | undefined;
}

const FormInput = ({ control, name, label, placeholder }: AuthInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input
                                id={name}
                                placeholder={placeholder}
                                type={name === 'password' ? 'password' : 'text'}
                                className='input-class'
                                {...field}
                            />
                        </FormControl>

                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default FormInput