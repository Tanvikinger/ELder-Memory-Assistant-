
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, Pill, Brain, Calendar, Volume2, VolumeX, Home } from "lucide-react";
import MedicationReminders from "@/components/MedicationReminders";
import FamilyPhotos from "@/components/FamilyPhotos";
import DailyRoutine from "@/components/DailyRoutine";
import MemoryQuiz from "@/components/MemoryQuiz";
import VoiceAssistant from "@/components/VoiceAssistant";
import Landing from "./Landing";

const Index = () => {
  const [activeTab, setActiveTab] = useState("routine");
  const [showLanding, setShowLanding] = useState(true);
  const [voiceAssistantEnabled, setVoiceAssistantEnabled] = useState(true);

  if (showLanding) {
    return <Landing onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Voice Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Elder Companion
            </h1>
            <p className="text-xl text-gray-600">
              Your friendly companion for daily activities and memories
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setShowLanding(true)}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              Home
            </Button>
            
            <Button
              onClick={() => setVoiceAssistantEnabled(!voiceAssistantEnabled)}
              variant={voiceAssistantEnabled ? "default" : "outline"}
              size="lg"
              className="flex items-center gap-2"
            >
              {voiceAssistantEnabled ? (
                <>
                  <Volume2 className="h-5 w-5" />
                  Voice On
                </>
              ) : (
                <>
                  <VolumeX className="h-5 w-5" />
                  Voice Off
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Voice Assistant - Always visible but can be disabled */}
        <div className="mb-6">
          <VoiceAssistant isEnabled={voiceAssistantEnabled} />
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-16 text-lg">
            <TabsTrigger value="routine" className="flex flex-col gap-1">
              <Calendar className="h-5 w-5" />
              <span>Routine</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex flex-col gap-1">
              <Pill className="h-5 w-5" />
              <span>Medications</span>
            </TabsTrigger>
            <TabsTrigger value="family" className="flex flex-col gap-1">
              <Users className="h-5 w-5" />
              <span>Family</span>
            </TabsTrigger>
            <TabsTrigger value="memory" className="flex flex-col gap-1">
              <Brain className="h-5 w-5" />
              <span>Memory Quiz</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="routine">
              <DailyRoutine />
            </TabsContent>

            <TabsContent value="medications">
              <MedicationReminders />
            </TabsContent>

            <TabsContent value="family">
              <FamilyPhotos />
            </TabsContent>

            <TabsContent value="memory">
              <MemoryQuiz />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
