'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import AuthInput from '../_components/auth-input'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            // Sign up with Appwritte & create plaid token

            if (type === 'sign-up') {
                const newUser = await signUp(data);
                if (newUser) {
                    router.push('/')
                    setUser(newUser)
                }
            }

            if(type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                });
                if(response) router.push('/')
            }
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-6'>
                <Link href="/"
                    className='flex cursor-pointer items-center gap-1'
                >
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='Sophia logo'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Sophia</h1>
                </Link>

                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {user
                            ? (
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                                        Account Linked!
                                    </h1>
                                    <Link href={'/'} className='form-link'>
                                        Go Home
                                    </Link>
                                </div>
                            )
                            : type === 'sign-in'
                                ? 'Sign In'
                                : 'Sign Up'
                        }
                    </h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                        }
                    </p>
                </div>
            </header>
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <AuthInput control={form.control} name='firstName' label='First Name' placeholder='Enter your first name' />
                                        <AuthInput control={form.control} name='lastName' label='Last Name' placeholder='Enter your last name' />
                                    </div>

                                    <AuthInput control={form.control} name='address1' label='Address' placeholder='Enter your specific address' />
                                    <AuthInput control={form.control} name='city' label='City' placeholder='Enter your specific city' />

                                    <div className='flex gap-4'>
                                        <AuthInput control={form.control} name='postalCode' label='Postal Code' placeholder='Example: 11101' />
                                        <AuthInput control={form.control} name='state' label='State' placeholder='Example: Santo Domingo Este' />
                                    </div>

                                    <div className='flex gap-4'>
                                        <AuthInput control={form.control} name='ssn' label='Cedula or SSN' placeholder='Example: 1234' />
                                        <AuthInput control={form.control} name='dateOfBirth' label='Date of birth' placeholder='YYYY-MM-DD' />
                                    </div>
                                </>
                            )}
                            <AuthInput control={form.control} name='email' label='Email' placeholder='Enter your email' />
                            <AuthInput control={form.control} name='password' label='Password' placeholder='Enter your password' />
                            <div className='flex flex-col gap-4'>

                                <Button type="submit" className='form-btn' disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                        </>
                                    ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Alredy have an account?"
                            }
                        </p>
                        <Link className='form-link' href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
            )}
        </section>
    )
}

export default AuthForm