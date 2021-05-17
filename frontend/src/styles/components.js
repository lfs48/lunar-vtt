import tw from 'tailwind-styled-components';

export const Header = tw.header`
    text-2xl
    font-bold
`

export const Label = tw.label`
    text-sm
    font-bold
`

export const Input = tw.input`
    bg-gray-100
    rounded
    px-4
    py-2
    border
    border-black
`;

export const ClearInput = tw.input`
    px-2
    py-1
    focus:outline-none
`

export const Button = tw.button`
    font-bold
    focus:outline-none
    transition-colors
    duration-200
`
export const BgButton = tw(Button)`
    rounded
    p-2
`;

export const BgButton1 = tw(BgButton)`
    bg-blue-300
    active:bg-blue-400
`

export const TextButton = tw(Button)`
    bg-none
    text-sm
`;

export const TextButton1 = tw(TextButton)`
    text-blue-400
    active:text-blue-500
`

export const TextArea = tw.textarea`
    resize-none
    w-full
    h-32
    overflow-auto
    bg-gray-300
    py-2
    px-4
    rounded
    border
    border-black
`

export const DropDown = tw.div`
    absolute
    box-border 
    shadow-lg 
    shadow-inner
    bg-white 
    text-black 
    ring-1 
    ring-black 
    ring-opacity-5 
    ${p => p.open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    z-50
    top-full
    w-full
    border
`