import { Mic, CheckCircle } from "lucide-react"
import axios from "axios"
import React, { useRef, useState, useEffect } from 'react'
import './Ollama_Microphone.css'
import audioFilePath from '../../Assets/32b Street 2.m4a'
import { toast } from 'react-toastify';


const Ollama_Microphone = () => {

    const [recording, setRecording] = useState(false)
    const [waitforResponse, setWaitforResponse] = useState(false)
    const [userAcceptance, setUserAcceptance] = useState(false)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const canvasRef = useRef(null)
    const animationIdRef = useRef(null)
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const sourceRef = useRef(null)

    // const handleClick = async () => {
    //     try {

    //         const response = await fetch(audioFilePath)
    //         if (!response.ok) throw new Error('Failed to load audio file')

    //         const audioBlob = await response.blob()

    //         const audioFile = new File([audioBlob], '32b Street 2.m4a', { type: audioBlob.type })

    //         // Prepare form data
    //         const formData = new FormData()
    //         formData.append('audio', audioFile)

    //         const serverResponse = await axios.post(process.env.REACT_APP_WHISPER_OLLAMA, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'X-API-KEY': 'your-secret-key'
    //             }
    //         })


    //         console.log('Transcription:', serverResponse.data)
    //         toast.success('Upload succeeded!');
    //         toast.info(serverResponse.data.transcription || 'Received response.');

    //     } catch (error) {
    //         console.error('Upload failed:', error)
    //         toast.error(error?.response?.data?.error || error.message || 'Upload failed');
    //     }
    // }


    const startVisualizer = (stream) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const source = audioContext.createMediaStreamSource(stream)
        const analyser = audioContext.createAnalyser()

        analyser.fftSize = 2048
        source.connect(analyser)

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const draw = () => {
            analyser.getByteTimeDomainData(dataArray)

            ctx.clearRect(0, 0, canvas.width, canvas.height) 
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.lineWidth = 1
            ctx.strokeStyle = '#fc6f03'
            ctx.beginPath()

            const sliceWidth = canvas.width / bufferLength
            let x = 0

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0
                const y = v * canvas.height / 2

                if (i === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }

                x += sliceWidth
            }

            ctx.lineTo(canvas.width, canvas.height / 2)
            ctx.stroke()

            animationIdRef.current = requestAnimationFrame(draw)
        }

        draw()

        audioContextRef.current = audioContext
        analyserRef.current = analyser
        sourceRef.current = source
    }

    const stopVisualizer = () => {
        cancelAnimationFrame(animationIdRef.current)
        audioContextRef.current?.close()
    }

    const handleClick = async () => {
        if (!recording) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            startVisualizer(stream)

            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []
            setRecording(true)

            mediaRecorder.ondataavailable = (e) => {
                audioChunksRef.current.push(e.data)
            }

            mediaRecorder.onstop = async () => {
                stopVisualizer()
                setWaitforResponse(true)
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' })

                const formData = new FormData()
                formData.append('audio', audioFile)

                try {
                    const response = await axios.post(process.env.REACT_APP_WHISPER_OLLAMA, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-API-KEY': 'your-secret-key'
                        }
                    })
                    console.log('Transcription:', response.data)


                } catch (error) {

                    console.error('Upload failed:', error)
                } finally {
                    setWaitforResponse(false)
                }
            }

            mediaRecorder.start()
        } else {
            setRecording(false)
            mediaRecorderRef.current?.stop()
        }
    }

    return (
        <div className="ripple-container" onClick={handleClick}>

            {waitforResponse
                ?
                <div className="loader"></div>
                :
                <div className={`${recording ? "invisible" : "visible"} d-flex justify-content-center align-content-center`}>
                    <Mic size={45} />
                    <span className={`${recording ? "invisible" : "visible"} ripple`}></span>
                </div>
            }

            <div className=""
                style={{
                    visibility: recording ? "visible" : "hidden",
                    width: recording ? "400px" : "0px",
                    opacity: recording ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: recording ? "auto" : "none"
                }}>
                <canvas ref={canvasRef} width={300} height={100}></canvas>
            </div>

        </div>
    )

}


export default Ollama_Microphone