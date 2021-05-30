import React from 'react';
import ReactMarkdown from "react-markdown"
import gfm from 'remark-gfm';
import tw from "tailwind-styled-components";

const MarkdownText = React.memo( function({text, className="", id=""}) {

    const components = {
        h1: StyledH1,
        h2: StyledH2,
        p: StyledP,
        ul: styledUl,
        li: styledLi
    };

    return(
        <ReactMarkdown
            id={id}
            className={className}
            remarkPlugins={[gfm]}
            components={components}
            children={text}
        />
    )
});

export default MarkdownText;

const StyledH1 = tw.h1`
    text-xl
    font-bold
    mb-1
`

const StyledH2 = tw.h2`
    text-lg
    font-bold
    mb-1
`

const StyledP = tw.p`
    mb-1
`

const styledUl = tw.ul`
    list-disc
    mb-1
`

const styledLi = tw.li`
    ml-8
    mb-1
`