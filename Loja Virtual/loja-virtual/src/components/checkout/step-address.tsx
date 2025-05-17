import { useCheckoutStore } from "@/stores/checkout-store"
import { Steps } from "@/types/checkout-steps"
import { Dispatch, SetStateAction } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z} from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
    setStep: Dispatch<SetStateAction<Steps>>
}

const formSchema = z.object({
    street: z.string().min(2, 'Preencha seu endereço'),
    number: z.string().min(1, 'Preencha seu número'),
    complement: z.string().optional(),
    city: z.string().min(2, 'Preencha sua cidade'),
})

export const StepAddress = ({setStep}: Props) => {

    const {address, setAddress} = useCheckoutStore(state => state)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {...address}
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setAddress(values)
        setStep('finish')
    }

    return(
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="street"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Rua</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="number"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Número</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="complement"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Complemento</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Cidade</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button variant="link" onClick={() => setStep('user')} className="cursor-pointer">Voltar</Button>
                        <Button type="submit" variant="outline" className="cursor-pointer">Concluir</Button>
                    </div>
                </form>
            </FormProvider>
        </div>  
    )
}