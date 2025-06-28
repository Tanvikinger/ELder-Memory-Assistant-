
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Volume2, Plus, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoutineItem {
  id: string;
  task: string;
  time: string;
  completed: boolean;
  important: boolean;
}

const DailyRoutine = () => {
  const { toast } = useToast();
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([
    { id: "1", task: "Take morning walk", time: "7:00 AM", completed: false, important: true },
    { id: "2", task: "Eat breakfast", time: "8:00 AM", completed: false, important: true },
    { id: "3", task: "Take morning medications", time: "8:30 AM", completed: false, important: true },
    { id: "4", task: "Read newspaper", time: "9:00 AM", completed: false, important: false },
    { id: "5", task: "Call family", time: "2:00 PM", completed: false, important: true },
    { id: "6", task: "Afternoon rest", time: "3:00 PM", completed: false, important: false },
    { id: "7", task: "Dinner", time: "6:00 PM", completed: false, important: true },
    { id: "8", task: "Evening medications", time: "7:00 PM", completed: false, important: true },
  ]);

  const toggleComplete = (id: string) => {
    setRoutineItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    const item = routineItems.find(item => item.id === id);
    if (item && !item.completed) {
      toast({
        title: "Great job! ✅",
        description: `You completed: ${item.task}`,
      });
      
      // Voice confirmation
      const utterance = new SpeechSynthesisUtterance(`Well done! You completed ${item.task}`);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const speakTask = (task: string, time: string) => {
    const utterance = new SpeechSynthesisUtterance(`Your task: ${task} at ${time}`);
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const completedCount = routineItems.filter(item => item.completed).length;
  const progressPercentage = (completedCount / routineItems.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Clock className="h-6 w-6" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl">
              {completedCount} of {routineItems.length} tasks completed
            </span>
            <span className="text-2xl font-bold text-green-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Routine Items */}
      <div className="grid gap-4">
        {routineItems.map((item) => (
          <Card
            key={item.id}
            className={`transition-all duration-200 ${
              item.completed
                ? "bg-green-50 border-green-200"
                : item.important
                ? "bg-yellow-50 border-yellow-200"
                : "bg-white"
            }`}
          >
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleComplete(item.id)}
                  className="h-6 w-6"
                />
                <div>
                  <h3
                    className={`text-xl font-medium ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.task}
                  </h3>
                  <p className="text-lg text-gray-600 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {item.time}
                    {item.important && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                        Important
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => speakTask(item.task, item.time)}
                className="flex items-center gap-2"
              >
                <Volume2 className="h-5 w-5" />
                Listen
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Encouragement Message */}
      {completedCount === routineItems.length && (
        <Card className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-300">
          <CardContent className="text-center p-8">
            <Check className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-800 mb-2">
              Fantastic! All tasks completed! 🎉
            </h2>
            <p className="text-xl text-green-700">
              You've had a very productive day. Well done!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DailyRoutine;
