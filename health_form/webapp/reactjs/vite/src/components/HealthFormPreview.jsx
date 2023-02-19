import React from 'react'
import { useController } from '../context/MyContextProvider'

function HealthFormPreview() {
    const { state, ...api } = useController()

    const { temperature, name } = state

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <td>Question</td>
                        <td>Answer</td>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        Name
                    </td>
                    <td className="ans">
                        {name}
                    </td>
                </tr>
                
                <tr>
                    <td>
                        Temperature (ºC)
                    </td>
                    <td className="ans">
                        {temperature}
                    </td>
                </tr>
                
                <tr>
                    <td>
                        Do you have any of the following symptoms now or within the last 14 days:
                        Cough, smell/taste impairment, fever, breathing difficulties, body aches,
                        headaches, fatigue, sore throat, diarrhoea, and / or runny nose (even if your
                        symptoms are mild)?
                    </td>
                    <td className="ans">
                        {state.symptomatic ? "YES" : "NO"}
                    </td>
                </tr>
                
                <tr>
                    <td>
                        Have you been in contact with anyone who is suspected to have or/has been
                        diagnosed with Covid-19 within the last 14 days??
                    </td>
                    <td className="ans">
                        {state.in_contact ? "YES" : "NO"}
                    </td>
                </tr>
                
                </tbody>
            </table>

            <div className="remarks" style={{marginTop: "10px"}}>
                <div style={{fontWeight: "bold"}}>REMARKS</div>
                <div style={{marginTop: "10px", fontWeight: "bold"}} className={"submit " + (state.response_status + "_box")}>
                    {state.response_status == "success" && "PASSED" || "FAILED"}
                </div>
            </div>
        </div>
    )
}

export default HealthFormPreview