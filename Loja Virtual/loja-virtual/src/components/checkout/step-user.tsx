import { useCheckoutStore } from "@/stores/checkout-store"
import { Steps } from "@/types/checkout-steps"
import { Dispatch, SetStateAction } from "react"
import { Form, FormProvider, useForm } from "react-hook-form"
import { z} from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
    setStep: Dispatch<SetStateAction<Steps>>
}

const formSchema = z.object({
    name: z.string().min(2, 'Preencha seu nome')
})

export const StepUser = ({setStep}: Props) => {

    const {name, setName} = useCheckoutStore(state => state)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {name}
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setName(values.name)
        setStep('address')
    }

    return(
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Seu Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        autoFocus
                                        placeholder="Qual seu nome?"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant="outline">Próximo</Button>
                </form>
            </FormProvider>
        </div>  
    )
}