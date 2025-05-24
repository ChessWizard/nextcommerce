export enum LinkTargetType {
    SELF = "_self",
    BLANK = "_blank",
    PARENT = "_parent",
    TOP = "_top"
}

export type ButtonDTO = {
    title: string,
    link: string,
    target: LinkTargetType,
    additionalClasses?: string | null
}