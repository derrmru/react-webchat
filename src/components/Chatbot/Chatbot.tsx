import { useState } from 'react'
import ChatInterface from '../../components/ChatInterface/ChatInterface'
import './Chatbot.css'

interface Props {
    endpoint: string,
    iconSize: string,
    brandColor: string,
    brandColor2: string,
    title: string
}

const Chatbot: React.FC<Props> = (props) => {
    const [hover, setHover] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    //messages object, mostly handled in chatInterface component
    const [messages, setMessages] = useState<{[index: string]: {[index: string]: string}}>({});

    return (
        <div className="chatbot-container">
            <div 
                className="chatbot-icon"
                style={
                    {
                        borderColor: !hover ? props.brandColor : props.brandColor2, 
                        width: props.iconSize + 'px', 
                        height: props.iconSize + 'px'
                    }
                }
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setActive(!active)}
                >
                        {
                            active ? 
                                <div className="chatbot-cross-icon">
                                    <div 
                                        className="cross-diagonal-1"
                                        style={
                                            {
                                                backgroundColor: props.brandColor2
                                            }
                                        }
                                        ></div>
                                    <div 
                                        className="cross-diagonal-2"
                                        style={
                                            {
                                                backgroundColor: props.brandColor2
                                            }
                                        }
                                        ></div>
                                </div>
                                :
                                <div className="chatbot-icon-container">
                                <div 
                                    className="chatbot-speech-bubble"
                                    style={
                                        {
                                            backgroundColor: !hover ? props.brandColor : props.brandColor2
                                        }
                                    }
                                    ></div>
                                <div 
                                    className="chatbot-bubble-tail"
                                    style={
                                        {
                                            borderRightColor: !hover ? props.brandColor : props.brandColor2
                                        }
                                    }
                                    ></div>   
                                </div>
                        }
            </div>
            {
                active && <ChatInterface 
                            endpoint={props.endpoint}
                            brandColor={props.brandColor}
                            brandColor2={props.brandColor2}
                            title={props.title}
                            setActive={() => setActive(!active)}
                            messages={messages}
                            setMessages={(message: {[index: string]: {[index: string]: string}}) => setMessages(message)}
                            />
            }
        </div>
    )
}

export default Chatbot