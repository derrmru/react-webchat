A simple lightweight chat ui template component build react.

## Installation

You must set required props for this to function.

IMPORTANT: your server must emit to 'receive' and listen to 'send' at your socket endpoint.

## Usage

```
import Chatbot from 'react-webchat'

function App() {
  return (
    <>
      <Chatbot 
        endpoint={'http://localhost:5000'}
        iconSize='50'
        brandColor='#248ec2'
        brandColor2='#20365F'
        title='React Webchat'
        />
    </>
  );
}

export default App;


```
## Props

Props: 

1. endpoint: string         //Required - your server Websocket endpoint, this is built for Socket.io
2. iconSize: string         //Required - size in pixels of your chat icon
3. brandColor: string       //Required - set your brand colors, will accept normal css color values as a string
4. brandColor2: string      //Required - as above
5. title: string            //Required - the title of the component, this is shown in header section

## Dependencies

React
Socket
Typescript