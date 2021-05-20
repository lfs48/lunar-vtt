import { handleInput } from "../../util/functions/utilFunctions"

export default function Select({optionList, field, state, setState}) {

    const options = optionList.map( (opt, i)=> {
        return(
            <option key={i} value={opt}>
                {opt}
            </option>
        )
    })

    return(
        <select value={state[field]} onChange={e => handleInput(e, field, state, setState)}>
            {options}
        </select>
    )
}