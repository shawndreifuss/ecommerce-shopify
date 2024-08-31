'use client';

import * as z from "zod";
import  {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: z.infer<typeof LoginSchema>) => {
    console.log(value);
  }

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonhref="/register"
      showSocial={true}
    >
     <Form {...form}>
      <form onSubmit={form.handleSubmit((onSubmit))}
      className="space-y-6">
        <div className="space-y-4">
          <FormField 
          control={form.control}
          name='email'
          render={({ field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                {...field}
                placeholder="Email"
                type='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
           <FormField 
          control={form.control}
          name='password'
          render={({ field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                {...field}
                placeholder="********"
                type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        </div>
        <FormSuccess message='' />
        <FormError message='' />
        <Button   type="submit" size="lg" className="w-full">
          Login
        </Button>
      </form>

     </Form>
    </CardWrapper>
  );
};
