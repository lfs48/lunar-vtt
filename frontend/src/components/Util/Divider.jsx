import React from 'react';
import tw from 'tailwind-styled-components';

export default function Divider() {
    return(
        <DividerContainer>
            <DividerLine></DividerLine>
        </DividerContainer>
    )
}

const DividerContainer = tw.div`
    w-full
    flex
    justify-center
    py-4
`

const DividerLine = tw.div`
    border-b
    border-black
    border-opacity-30
    w-2/3
`