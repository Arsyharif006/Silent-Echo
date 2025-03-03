import { useEffect, useState, useRef } from 'react';
import { useGame } from '../contexts/GameContext';

const Dialog = () => {
  const { getCurrentScene } = useGame();
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [textDistortion, setTextDistortion] = useState(false);
  const typeSpeed = 30; // ms per character
  
  const scene = getCurrentScene();
  const textToType = scene?.narration || '';
  const dialogRef = useRef(null);
  const audioRef = useRef(null);
  
  useEffect(() => {
    setTypedText('');
    setIsTyping(true);
    setShowDialog(false);
    
    if (!textToType) return;
    
    let currentIndex = 0;
    let currentText = '';
    
    const distortionInterval = setInterval(() => {
      setTextDistortion(prev => !prev);
    }, 3000 + Math.random() * 5000);
    
    // Initialize audio for typing sound
    if (!audioRef.current) {
      audioRef.current = new Audio('/Silent-Echo/audio/typing.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6; // Lower volume to not be too distracting
    }
    
    // Start playing typing sound
    audioRef.current.play().catch(error => {
      console.error("Could not play audio:", error);
    });
    
    const typingInterval = setInterval(() => {
      if (currentIndex < textToType.length) {
        // Occasionally add slight typing delay for psychological effect
        if (Math.random() < 0.1) {
          setTimeout(() => {
            currentText += textToType.charAt(currentIndex);
            setTypedText(currentText);
            currentIndex++;
          }, typeSpeed * 3);
        } else {
          currentText += textToType.charAt(currentIndex);
          setTypedText(currentText);
          currentIndex++;
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Stop typing sound when typing is complete
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        
        setTimeout(() => setShowDialog(true), 700);
      }
    }, typeSpeed);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(distortionInterval);
      
      // Stop audio when component unmounts or scene changes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [scene, textToType]);
  
  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.scrollTop = dialogRef.current.scrollHeight;
    }
  }, [typedText]);
  
  const skipTyping = () => {
    if (isTyping) {
      setTypedText(textToType);
      setIsTyping(false);
      
      // Stop audio when typing is skipped
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      
      setTimeout(() => setShowDialog(true), 300);
    }
  };
  
  return (
    <div className="mb-6">
      <div 
        className={`bg-black border border-gray-800 rounded-lg p-6 mb-4 min-h-48 shadow-lg overflow-auto
        ${textDistortion ? 'text-opacity-95' : 'text-opacity-100'}`}
        onClick={skipTyping}
        ref={dialogRef}
      >
        <p className={`text-gray-400 leading-relaxed whitespace-pre-wrap font-serif text-md
         ${textDistortion ? 'blur-[0.5px]' : ''}`}>
          {typedText}
          {isTyping && <span className="animate-pulse text-gray-500">_</span>}
        </p>
        
        {!isTyping && showDialog && scene.dialog && (
          <div className="mt-6 border-t border-gray-800 pt-4">
            <p className="text-yellow-500 italic font-light">{scene.dialog}</p>
          </div>
        )}
      </div>
      
      {isTyping && (
        <div className="text-center text-xs text-gray-600 opacity-60">
          Tekan untuk lanjut
        </div>
      )}
    </div>
  );
};

export default Dialog;