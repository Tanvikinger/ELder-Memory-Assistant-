
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, Clock, AlertCircle, CheckCircle, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  taken: { [key: string]: boolean };
  important: boolean;
  instructions: string;
}

const MedicationReminders = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Blood Pressure Medication",
      dosage: "10mg",
      times: ["8:00 AM", "8:00 PM"],
      taken: {},
      important: true,
      instructions: "Take with food"
    },
    {
      id: "2",
      name: "Vitamin D",
      dosage: "1000 IU",
      times: ["8:00 AM"],
      taken: {},
      important: false,
      instructions: "Take with breakfast"
    },
    {
      id: "3",
      name: "Heart Medication",
      dosage: "5mg",
      times: ["8:00 AM", "2:00 PM", "8:00 PM"],
      taken: {},
      important: true,
      instructions: "Do not skip doses"
    }
  ]);

  const markAsTaken = (medicationId: string, time: string) => {
    setMedications(meds =>
      meds.map(med =>
        med.id === medicationId
          ? { ...med, taken: { ...med.taken, [time]: true } }
          : med
      )
    );

    const medication = medications.find(med => med.id === medicationId);
    if (medication) {
      toast({
        title: "Medication Taken ✅",
        description: `${medication.name} - ${time}`,
      });

      // Voice confirmation
      const utterance = new SpeechSynthesisUtterance(
        `Good job! You took your ${medication.name} at ${time}`
      );
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const speakReminder = (medication: Medication, time: string) => {
    const utterance = new SpeechSynthesisUtterance(
      `Reminder: It's time to take your ${medication.name}, ${medication.dosage} at ${time}. ${medication.instructions}`
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isTimeClose = (scheduledTime: string) => {
    // Simple check if current time is within 30 minutes of scheduled time
    const current = new Date();
    const scheduled = new Date();
    const [hours, minutes] = scheduledTime.split(':');
    scheduled.setHours(parseInt(hours), parseInt(minutes.split(' ')[0]), 0, 0);
    
    if (scheduledTime.includes('PM') && parseInt(hours) !== 12) {
      scheduled.setHours(scheduled.getHours() + 12);
    }

    const diff = Math.abs(current.getTime() - scheduled.getTime());
    return diff <= 30 * 60 * 1000; // 30 minutes
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Pill className="h-6 w-6" />
            Medication Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700">
            Current time: <span className="font-bold">{getCurrentTime()}</span>
          </p>
        </CardContent>
      </Card>

      {/* Medications List */}
      <div className="space-y-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="overflow-hidden">
            <CardHeader className={`${medication.important ? 'bg-red-50' : 'bg-gray-50'}`}>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  {medication.name}
                  {medication.important && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Important
                    </Badge>
                  )}
                </div>
                <span className="text-lg font-normal text-gray-600">
                  {medication.dosage}
                </span>
              </CardTitle>
              <p className="text-sm text-gray-600">{medication.instructions}</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {medication.times.map((time) => {
                  const isTaken = medication.taken[time];
                  const isNearTime = isTimeClose(time);
                  
                  return (
                    <div
                      key={time}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                        isTaken
                          ? "bg-green-50 border-green-200"
                          : isNearTime
                          ? "bg-yellow-50 border-yellow-300 animate-pulse"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5" />
                        <span className="text-lg font-medium">{time}</span>
                        {isTaken && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {isNearTime && !isTaken && (
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => speakReminder(medication, time)}
                          className="flex items-center gap-2"
                        >
                          <Volume2 className="h-4 w-4" />
                          Listen
                        </Button>
                        {!isTaken && (
                          <Button
                            onClick={() => markAsTaken(medication.id, time)}
                            className="flex items-center gap-2"
                            variant={isNearTime ? "default" : "outline"}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Mark Taken
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Information */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <h3 className="text-xl font-bold text-red-800">Important Reminder</h3>
          </div>
          <p className="text-red-700 text-lg">
            Never skip important medications without consulting your doctor. 
            If you miss a dose, contact your healthcare provider for guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationReminders;
