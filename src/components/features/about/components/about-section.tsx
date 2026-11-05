import type { ReactNode } from 'react'

type AboutSectionProps = {
    title: string
    children: ReactNode
}

export const AboutSection = ({ title, children }: AboutSectionProps) => {
    return (
        <section className="space-y-2">
            <h2 className="text-base leading-[22px] font-bold text-gray-950">{title}</h2>
            <div className="space-y-2.5 text-[15px] leading-[22px] text-gray-600">{children}</div>
        </section>
    )
}
