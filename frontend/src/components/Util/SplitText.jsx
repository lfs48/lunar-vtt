import { handleInput } from "../../util/functions/utilFunctions"

export default function SplitText({text, className="", id=""}) {

    return(
        <div className={className} id={id}>
        {text.split("\n").map( (line, i) => {
            return(
                <p key={i} className="mb-2 last:mb-0">{line}</p>
            )
        })}
        </div>
    )
}