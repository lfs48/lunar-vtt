import tw from "tailwind-styled-components";

export const PanelHeaderContainer = tw.header`
    flex
    justify-between
    sticky
    top-0
    bg-white
    px-6
    py-2
    border-b-2
    border-black
    cursor-move
`

export const PanelHeader = tw.h1`
    font-bold
    text-2xl
`

export const PanelSectionHeader = tw.h2`
    font-bold
    text-xl
`

export const PanelSubsectionHeader = tw.h3`
    font-bold
    text-lg
`
export const Block = tw.div`
    ml-4
    mb-2
`
export const panelContentClassnames = `
    px-6
    py-2
    overflow-y-scroll
    overflow-x-hidden
`