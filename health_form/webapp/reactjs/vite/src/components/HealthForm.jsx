import React, { useState } from 'react'
import { useController } from '../context/MyContextProvider'

function HealthForm() {
    const { state, ...api } = useController()

    const {name, temperature} = state

    async function handleSubmit() {
        console.log("handlePreview::")

        api.submitData()
    }

    return (
        <div className="container" style={{maxWidth: "400px"}}>
            <form className="form">
                <div>
                    <label>
                        Name
                    </label>
                    <input place="Name" onChange={({ target: { value } }) => api.setName(value)} value={name} />
                </div>
                <hr/>
                <div>
                    <label>
                        Temperature (ºC)
                    </label>
                    <input place="Name" onChange={({ target: { value } }) => api.setTemperature(value)} value={temperature} />
                </div>
                <hr/>
                <div>
                    <label>
                    Do you have any of the following symptoms now or within the last 14 days:
Cough, smell/taste impairment, fever, breathing difficulties, body aches,
headaches, fatigue, sore throat, diarrhoea, and / or runny nose (even if your
symptoms are mild)?
                    </label>
                    <input type="checkbox" checked={state.symptomatic} onChange={() => api.setSymptomatic(!state.symptomatic)}></input>
                </div>
                <hr/>
                <div>
                    <label>
                    Have you been in contact with anyone who is suspected to have or/has been
diagnosed with Covid-19 within the last 14 days??
                    </label>
                    <input type="checkbox" checked={state.in_contact} onChange={() => api.setInContact(!state.in_contact)}></input>
                </div>
                <hr/>
                <div className="submit">
                    <button onClick={(e) => {e.preventDefault(); handleSubmit()}}>Preview</button>
                </div>
            </form>
        </div>
    )
}

export default HealthForm