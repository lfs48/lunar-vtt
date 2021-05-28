import { handleInput } from "../../util/functions/utilFunctions"

export default function Select({optionList, field, state, setState, className=""}) {

    const options = optionList.map( (opt, i)=> {
        return(
            <option key={i} value={opt}>
                {opt}
            </option>
        )
    })

    return(
        <select 
            value={state[field]} 
            onChange={e => handleInput(e, field, state, setState)}
            className={className}
        >
            {options}
        </select>
    )
}