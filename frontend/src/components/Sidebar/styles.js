import tw from "tailwind-styled-components";

export const SidebarLi = tw.li`
    px-4
    hover:px-8
    hover:text-blue-500
    py-1
    cursor-pointer
    transition-all
    duration-[300ms]
    ${ p => p.open ? "bg-green-500 even:bg-opacity-50 hover:text-black" : "bg-black even:bg-opacity-20 odd:bg-opacity-10"}
    border-b
    border-black
    font-bold
`

export const TabHeader = tw.div`
    px-4
    py-1
    border-b
    border-gray-500
    border-opacity-50
    h-16
    flex
    justify-between
    items-center
`