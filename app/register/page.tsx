'use client'

import { UserRegisteration } from '@entities/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/ui/form'
import { Input } from '@shared/ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const RegisterPage = () => {
    const form = useForm<z.infer<typeof UserRegisteration>>({
        resolver: zodResolver(UserRegisteration),
        defaultValues: {
            email: '',
            password: '',
            nickname: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof UserRegisteration>) => {
        const data = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
    }

    return (
        <section className='flex flex-col items-center justify-center my-auto'>
            <Card className='w-full max-w-md border-none shadow-none'>
                <CardHeader className='font-bold text-3xl'>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className='flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type={'email'} placeholder='Email' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={'password'} placeholder='Password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='nickname'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nickname</FormLabel>
                                        <FormControl>
                                            <Input type={'text'} placeholder='Nickname' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className='w-full' type='submit'>
                                Submit
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </section>
    )
}

export default RegisterPage
