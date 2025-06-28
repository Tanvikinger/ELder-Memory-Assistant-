import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, XCircle, Volume2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  type: "family" | "routine" | "general";
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

const MemoryQuiz = () => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: "1",
      type: "family",
      question: "What is your daughter Priya's profession?",
      options: ["Doctor", "Teacher", "Engineer", "Nurse"],
      correctAnswer: "Teacher",
      hint: "She works with children and loves gardening",
      explanation: "Priya is a teacher who lives in Mumbai and loves gardening and classical music."
    },
    {
      id: "2",
      type: "routine",
      question: "What time should you take your morning medications?",
      options: ["7:00 AM", "8:30 AM", "9:00 AM", "10:00 AM"],
      correctAnswer: "8:30 AM",
      hint: "It's after breakfast time",
      explanation: "Your morning medications should be taken at 8:30 AM, after breakfast."
    },
    {
      id: "3",
      type: "family",
      question: "How many grandchildren do you have?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "2",
      hint: "Arjun has two children",
      explanation: "You have two grandchildren: Ananya and Rohan, who are Arjun's children."
    },
    {
      id: "4",
      type: "routine",
      question: "What's the first activity in your daily routine?",
      options: ["Eat breakfast", "Take morning walk", "Read newspaper", "Take medications"],
      correctAnswer: "Take morning walk",
      hint: "It's good to start the day with exercise",
      explanation: "Your day starts with a morning walk at 7:00 AM, which is great for your health."
    },
    {
      id: "5",
      type: "general",
      question: "What should you do if you miss an important medication?",
      options: ["Skip it", "Take double next time", "Contact your doctor", "Take it anytime"],
      correctAnswer: "Contact your doctor",
      hint: "Safety first when it comes to medications",
      explanation: "Always contact your healthcare provider for guidance when you miss important medications."
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const speakQuestion = () => {
    const utterance = new SpeechSynthesisUtterance(
      `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}. The options are: ${currentQuestion.options.join(', ')}`
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: currentQuestion.explanation,
      });
    } else {
      toast({
        title: "Not quite right 💭",
        description: `The correct answer is: ${currentQuestion.correctAnswer}`,
        variant: "destructive",
      });
    }

    // Voice feedback
    const utterance = new SpeechSynthesisUtterance(
      isCorrect 
        ? `Correct! ${currentQuestion.explanation}`
        : `Not quite right. The correct answer is ${currentQuestion.correctAnswer}. ${currentQuestion.explanation}`
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      
      // Final score announcement
      const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
      const utterance = new SpeechSynthesisUtterance(
        `Quiz completed! You scored ${finalScore} out of ${questions.length}. ${
          finalScore >= questions.length * 0.8 ? "Excellent work!" : 
          finalScore >= questions.length * 0.6 ? "Good job!" : "Keep practicing!"
        }`
      );
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (quizCompleted) {
    const finalScore = score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0);
    const percentage = (finalScore / questions.length) * 100;
    
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-100 to-blue-100">
          <CardContent className="text-center p-8">
            <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h2>
            <div className="text-6xl font-bold text-green-600 mb-2">
              {finalScore}/{questions.length}
            </div>
            <div className="text-2xl text-gray-700 mb-6">
              {percentage >= 80 ? "Excellent! Your memory is sharp! 🌟" :
               percentage >= 60 ? "Good work! Keep practicing! 👍" :
               "Keep practicing to improve your memory! 💪"}
            </div>
            <Button onClick={resetQuiz} size="lg" className="text-lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="h-6 w-6" />
            Memory Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <Button onClick={speakQuestion} variant="outline" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-blue-50">
          <CardTitle className="text-xl">
            {currentQuestion.question}
          </CardTitle>
          {!showResult && (
            <p className="text-sm text-gray-600">
              💡 Hint: {currentQuestion.hint}
            </p>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => !showResult && handleAnswerSelect(option)}
                disabled={showResult}
                variant={
                  showResult
                    ? option === currentQuestion.correctAnswer
                      ? "default"
                      : option === selectedAnswer && option !== currentQuestion.correctAnswer
                      ? "destructive"
                      : "outline"
                    : selectedAnswer === option
                    ? "default"
                    : "outline"
                }
                className="w-full h-12 text-left justify-start text-lg"
              >
                <div className="flex items-center gap-3">
                  {showResult && option === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  {option}
                </div>
              </Button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-lg text-blue-800">
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
              <Button onClick={nextQuestion} className="mt-4" size="lg">
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score Display */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Current Score:</span>
            <span className="text-2xl font-bold text-green-600">
              {score}/{currentQuestionIndex + (showResult && selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryQuiz;
