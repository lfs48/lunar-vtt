import tw from 'tailwind-styled-components';

export const Header = tw.header`
    text-2xl
    font-bold
`

export const Input = tw.input`
    bg-gray-100
    rounded
    px-2
    py-1
`

export const Button = tw.button`
    focus:outline-none
`
export const BgButton = tw(Button)`
    rounded
    p-4
`

export const TextButton = tw(Button)`
    font-bold
    bg-none
    text-sm
`