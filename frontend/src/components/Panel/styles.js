import tw from "tailwind-styled-components";

export const PanelHeaderContainer = tw.header`
    flex
    justify-between
    sticky
    w-full
    h-12
    top-0
    bg-white
    px-6
    py-2
    border-b-2
    border-black
    cursor-move
`

export const PanelFooterContainer = tw.footer`
    flex
    justify-between
    absolute
    bottom-0
    bg-white
    px-12
    py-2
    shadow-inner
    border-t
    border-gray-200
    border-black
    w-full
    h-12
`

export const DraggableArea = tw.div`
    absolute
    top-0
    left-0
    h-12
    w-full
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
export const panelContentClasses = `
    p-6
    h-[calc(100%-6rem)]
    overflow-y-auto
    overflow-x-hidden
    scroll
`