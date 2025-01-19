import { ReactNode } from "react"

export type IMyState = {
    isVisible:boolean,
    Animation:IAnimation[],
    isVisibleBanner:boolean
}


export type IAnimation = {
    nameAnimation:string
    isComplete:boolean
}

export type ProvidersProps = {
 children: ReactNode;
}