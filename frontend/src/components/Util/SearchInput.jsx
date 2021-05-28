import tw from "tailwind-styled-components"
import { handleInput } from "../../util/functions/utilFunctions"

export default function SearchInput({field, input, setInput, className="", placeholder="Search"}) {
    return(
        <SearchContainer className={className}>
            <SearchIcon></SearchIcon>
            <StyledSearchInput
                type="text"
                value={input[field]}
                onChange={e => handleInput(e, field, input, setInput)}
                placeholder={placeholder}
            ></StyledSearchInput>
        </SearchContainer>
    )
}

const SearchContainer = tw.div`
    relative 
    focus:bg-opacity-20
`

const SearchIcon = tw.i`
    fas 
    fa-search 
    absolute 
    top-1/4 
    left-2
`

const StyledSearchInput = tw.input`
    w-full 
    bg-gray-300 
    py-1 
    pl-8 
    pr-2 
    transiton-opacity 
    duration-300 
    outline-none 
    focus:outline-none 
    focus:bg-opacity-50 
    rounded
`