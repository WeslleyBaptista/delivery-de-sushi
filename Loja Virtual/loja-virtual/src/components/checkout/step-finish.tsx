import { useCheckoutStore } from "@/stores/checkout-store"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { generateMessage } from "@/lib/generate-message"


export const StepFinish = () => {
    const {name} = useCheckoutStore(state => state)

    const message = generateMessage()
    const linkZap = `https://wa.me//${process.env.NEXT_PUBLIC_ZAP}?text=${encodeURI(message)}`

    return(
        <div>
            <p>Perfeito, <strong>{name}</strong>!</p>
            <p>Agora envie seu pedido ao nosso Whatsapp para concluir, nosso atendente irá te guiar para a conclusão do pedido.</p>
            <Button className="mt-4">
                <Link target="_blank" href={linkZap}>Enviar para o Whatsapp</Link>
            </Button>
        </div>
    )
}