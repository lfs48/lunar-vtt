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