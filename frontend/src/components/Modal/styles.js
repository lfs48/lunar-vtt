import tw from "tailwind-styled-components";

export const ModalContainer = tw.div`
    fixed 
    top-0 
    left-0 
    w-screen 
    h-screen 
    bg-black 
    bg-opacity-50 
    z-50 
    flex 
    justify-center 
    items-center
`

export const FooterContainer = tw.div`
    flex
    justify-between
    absolute
    w-full
    h-12
    bottom-0
    bg-white
    px-12
    py-2
    shadow-inner
    border-t
    border-gray-200
    border-black
    h-12
`