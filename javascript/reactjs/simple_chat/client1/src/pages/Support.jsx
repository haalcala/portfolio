import React from 'react'
import Chat from './Chat'
import UseAPI from '../UseAPI'

export default function Support() {
    const api = UseAPI()

    const responses = [
        "Hi, how can I help you?",
        "The quick brown fox jumps over the lazy dog"
    ]

    function Response(text, index) {
        return (
            <li key={index} onClick={() => api.setSupportMessage(text)} className="bg-gray-300 p-2 rounded-lg mb-2 hover:text-blue-500 cursor-pointer">
                {text}
            </li>
        )
    }

    return (
        <div className="support-container">

            <Chat />
            <div className="bg-slate-200">
                <h2>Support Knoledgebase</h2>
                <div className="mt-5">
                    <ul>
                        {responses.map(Response)}
                    </ul>
                </div>
            </div>
        </div>
    )
}
