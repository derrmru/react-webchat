import { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import './ChatInterface.css'

interface Props {
    endpoint: string,
    brandColor: string,
    brandColor2: string,
    title: string,
    setActive: () => void,
    messages: {[index: string]: {[index: string]: string}}, 
    setMessages: (message: {[index: string]: {[index: string]: string}}) => void
}

const ChatInterface: React.FC<Props> = (props) => {
    const [chatText, setChatText] = useState<string>('');

    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'viewport'
        meta.content = 'width=device-width, user-scalable=no'
        document.head.appendChild(meta);
    })

    //socket
    const socketRef = useRef<any>(null);
    useEffect(() => {
        socketRef.current = io(props.endpoint, {
            transports: ["websocket"]
        });
        socketRef.current.on("connect", () => {
            console.log(socketRef.current); // ojIckSD2jqNzOqIrAGzL
        });
    }, [props.endpoint])

    //send message to server
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const timestamp = new Date().toString();
        const replacement: any = {...props.messages};
        replacement['you' + timestamp] = {
            sent: chatText,
            sender: 'You'
        };
        props.setMessages(replacement)
        setChatText('')
        chatText !== '' && socketRef.current.emit('send', chatText);
    }

    //handle receipt of new message
    useEffect(() => {
        socketRef.current.on('receive', (incoming: string) => {
            console.log(incoming)
            const timestamp = new Date().toString();
            const replacement: any = {...props.messages};
            console.log(replacement)
            replacement[timestamp] = {
                sent: incoming,
                sender: 'Anjelica Wright' //replace with props when setup
            };
            props.setMessages(replacement)
            //console.log(messages)
        })
    }, [props])

    //scroll to bottom
    const messagesEnd = useRef<any>();
    useEffect(() => {
        messagesEnd.current.scrollIntoView();
    })

    return (
        <div 
            className="chat-interface-container"
            style={{borderColor: props.brandColor}}
            >
            <div
                className="chat-interface-header"
                style={{backgroundColor: props.brandColor}}
                >
                    {props.title}
                </div>
            <button
                className="chat-exit-button"
                style={{backgroundColor: props.brandColor}}
                onClick={() => props.setActive()}
                >
                    <svg style={{fill: 'white'}}width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 10.293l5.293-5.293.707.707-5.293 5.293 5.293 5.293-.707.707-5.293-5.293-5.293 5.293-.707-.707 5.293-5.293-5.293-5.293.707-.707 5.293 5.293z"/></svg>
                </button>
            <div
                className="chat-interface-sub-header"
                style={{backgroundColor: props.brandColor2}}
                >
                    You are chatting with Anjelica Wright
                </div>

            <div className="chatbot-box">
                {Object.keys(props.messages).map((message, i) => {
                    return <div 
                        key={'message' + i}
                        className="chat-message"
                        style={//determine alignment based on whether it is client or server
                            props.messages[message]['sender'] === 'You' ? 
                                {textAlign: 'left'} : 
                                    {textAlign: 'right'}}
                        >
                        <div>{props.messages[message]['sent']}</div>
                        <div 
                            style={{marginTop: '5px', fontSize: '10px'}}
                            >
                                - {props.messages[message]['sender'] + ', ' + message.split(' ')[4]}
                            </div>
                    </div>
                })}

                {/*scroll to bottom - fake div*/}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { messagesEnd.current = el }}>
                </div>
                {/************************** */}

            </div>

            <div 
                className="chatbot-input"
                style={{borderColor: props.brandColor}}
                >
                <form className="chatbot-form" onSubmit={(e: any) => handleSubmit(e)}>
                    <textarea 
                        className="chatbot-in" 
                        value={chatText} 
                        onChange={(e) => setChatText(e.target.value)} 
                        />
                    <button 
                        className="chatbot-submit" 
                        type="submit"
                        >
                            <svg style={{fill: props.brandColor}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
                        </button>
                </form>
            </div>
        </div>
    )
}

export default ChatInterface