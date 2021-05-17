import tw from "tailwind-styled-components";

export const SidebarLi = tw.li`
    px-4
    hover:px-8
    py-1
    cursor-pointer
    transition-all
    duration-500
    ${ p => p.open ? "bg-green-500" : "bg-black even:bg-opacity-20 odd:bg-opacity-10"}
    border-b
    border-black
`

export const TabHeader = tw.div`
    px-4
    py-1
    border-b-2
    border-black
    h-16
    flex
    items-center
`