
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, MessageCircle, Play, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAssistantProps {
  isEnabled?: boolean;
}

const VoiceAssistant = ({ isEnabled = true }: VoiceAssistantProps) => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isAssistantActive, setIsAssistantActive] = useState(true);

  useEffect(() => {
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const speak = (text: string) => {
    if (!isAssistantActive || !isEnabled) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.volume = 0.8;
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!isSupported) {
      toast({
        title: "Voice not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive",
      });
      return;
    }

    if (!isAssistantActive) {
      toast({
        title: "Voice Assistant Stopped",
        description: "Please start the voice assistant first",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      speak("I'm listening. How can I help you?");
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
        setTranscript(finalTranscript);
        handleVoiceCommand(finalTranscript.toLowerCase());
        recognition.stop();
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice error",
        description: "There was an error with voice recognition",
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    speechSynthesis.cancel();
  };

  const startAssistant = () => {
    setIsAssistantActive(true);
    speak("Voice assistant is now active. How can I help you today?");
    toast({
      title: "Voice Assistant Started",
      description: "Voice assistant is now ready to help you",
    });
  };

  const stopAssistant = () => {
    setIsAssistantActive(false);
    setIsListening(false);
    speechSynthesis.cancel();
    toast({
      title: "Voice Assistant Stopped",
      description: "Voice assistant has been turned off",
    });
  };

  const handleVoiceCommand = (command: string) => {
    console.log("Voice command:", command);
    
    if (command.includes("medication") || command.includes("medicine") || command.includes("pill")) {
      speak("Let me remind you about your medications. Your morning blood pressure medication is due at 8 AM, and your heart medication at 8 AM, 2 PM, and 8 PM. Don't forget to take them with food.");
    } else if (command.includes("family") || command.includes("daughter") || command.includes("son")) {
      speak("Your family loves you! Sarah, your daughter, is a teacher in Seattle. Michael, your son, lives nearby with his two children Emma and Jack. Your sister Margaret calls you every Sunday from Florida.");
    } else if (command.includes("routine") || command.includes("schedule") || command.includes("today")) {
      speak("Today's routine includes your morning walk at 7 AM, breakfast at 8 AM, medications at 8:30 AM, reading the newspaper at 9 AM, calling family at 2 PM, afternoon rest at 3 PM, dinner at 6 PM, and evening medications at 7 PM.");
    } else if (command.includes("time") || command.includes("what time")) {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      speak(`The current time is ${currentTime}`);
    } else if (command.includes("quiz") || command.includes("memory") || command.includes("brain")) {
      speak("The memory quiz helps exercise your brain! It includes questions about your family, daily routine, and general health knowledge. Regular mental exercise is great for keeping your mind sharp.");
    } else if (command.includes("help") || command.includes("what can you do")) {
      speak("I can help you with medications, remind you about family members, tell you about your daily routine, announce the time, and provide memory exercises. Just speak naturally and I'll do my best to help!");
    } else if (command.includes("birthday") || command.includes("birthdays")) {
      speak("Here are some important birthdays: Sarah's birthday is March 15th, Michael's is July 22nd, Emma's is September 8th, Jack's is December 3rd, and your sister Margaret's is May 10th.");
    } else if (command.includes("emergency") || command.includes("help me")) {
      speak("If this is an emergency, please call 911 immediately. For medication questions, contact your doctor. Your family members' phone numbers are available in the family section.");
    } else {
      speak("I heard you say: " + command + ". I can help with medications, family information, daily routines, time, and memory exercises. What would you like to know about?");
    }

    toast({
      title: "Voice Assistant",
      description: `Heard: "${command}"`,
    });
  };

  const quickCommands = [
    { text: "Tell me about my medications", command: "medication" },
    { text: "What's my routine today?", command: "routine today" },
    { text: "Tell me about my family", command: "family" },
    { text: "What time is it?", command: "what time is it" }
  ];

  if (!isEnabled) {
    return (
      <Card className="bg-gray-100 border-gray-300">
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-lg">Voice Assistant is currently disabled</p>
            <p className="text-sm">Enable it from the main controls to use voice features</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-gradient-to-r ${isAssistantActive ? 'from-indigo-100 to-cyan-100 border-indigo-200' : 'from-gray-100 to-gray-200 border-gray-300'}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageCircle className={`h-6 w-6 ${isAssistantActive ? 'text-indigo-600' : 'text-gray-500'}`} />
            <h3 className={`text-xl font-bold ${isAssistantActive ? 'text-indigo-800' : 'text-gray-600'}`}>
              Voice Assistant {!isAssistantActive && '(Stopped)'}
            </h3>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={isAssistantActive ? stopAssistant : startAssistant}
              size="lg"
              variant={isAssistantActive ? "destructive" : "default"}
              className="flex items-center gap-2"
            >
              {isAssistantActive ? (
                <>
                  <Square className="h-5 w-5" />
                  Stop Assistant
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Start Assistant
                </>
              )}
            </Button>
            
            {isAssistantActive && (
              <Button
                onClick={isListening ? stopListening : startListening}
                size="lg"
                variant={isListening ? "destructive" : "outline"}
                className="flex items-center gap-2"
              >
                {isListening ? (
                  <>
                    <MicOff className="h-5 w-5" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="h-5 w-5" />
                    Listen
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {isListening && isAssistantActive && (
          <div className="mb-4 p-3 bg-green-100 rounded-lg border border-green-300">
            <p className="text-green-800 font-medium animate-pulse">
              🎤 Listening... Speak clearly and I'll help you!
            </p>
          </div>
        )}

        {transcript && (
          <div className="mb-4 p-3 bg-blue-100 rounded-lg border border-blue-300">
            <p className="text-blue-800">
              <strong>You said:</strong> "{transcript}"
            </p>
          </div>
        )}

        {isAssistantActive && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">Quick Commands:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickCommands.map((cmd, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleVoiceCommand(cmd.command)}
                  className="text-left h-auto p-3 justify-start"
                  disabled={!isAssistantActive}
                >
                  <Volume2 className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{cmd.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className={`mt-4 p-3 rounded-lg border ${isAssistantActive ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`text-sm ${isAssistantActive ? 'text-yellow-800' : 'text-gray-600'}`}>
            💡 <strong>Tip:</strong> {isAssistantActive 
              ? "You can ask about medications, family, daily routine, time, or say 'help' to learn more!"
              : "Click 'Start Assistant' to begin using voice features."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
