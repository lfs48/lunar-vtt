import React from 'react';
import ReactMarkdown from "react-markdown"
import gfm from 'remark-gfm';
import tw from "tailwind-styled-components";
import EntityLink from '../Entities/EntityLink';

const MarkdownText = React.memo( function({text, className="", id=""}) {

    const components = {
        h1: StyledH1,
        h2: StyledH2,
        p: StyledP,
        ul: StyledUl,
        li: StyledLi,
        a: ({href, children}) => Link(href, children[0])
    };

    const Link = (href, title) => {
        const [entityType, id] = href.split("/");
        return(
            <EntityLink
                entityType={entityType}
                id={id}
                inline={true}
            >
                {title}
            </EntityLink>
        )
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

const StyledUl = tw.ul`
    list-disc
    mb-1
`

const StyledLi = tw.li`
    ml-8
    mb-1
`

const StyledA = tw.a`

`