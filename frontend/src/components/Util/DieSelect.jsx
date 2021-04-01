import { handleInput } from "../../util/functions/utilFunctions"

export default function DieSelect({field, state, setState}) {

    const options = ['1d4', '1d6', '1d8', '1d10', '1d12'].map( (die, i)=> {
        return(
            <option key={i} value={die}>
                {die}
            </option>
        )
    })

    return(
        <select value={state[field]} onChange={e => handleInput(e, field, state, setState)}>
            {options}
        </select>
    )
}