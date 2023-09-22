
import Character from './Character';
import Navbar from './Navbar';
import ChatBot from './ChatBot';
import VoiceInput from './VoiceInput';

export default function Home() {

  return (
    <div className="container-fixed">
      <Navbar />
      <ChatBot />
      <Character />
      <VoiceInput />
      
    
        {/* <NaverMap /> */}
    </div>
  )
}
