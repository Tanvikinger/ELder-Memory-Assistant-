
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Pill, Brain, Calendar, ArrowRight } from "lucide-react";

interface LandingProps {
  onStart: () => void;
}

const Landing = ({ onStart }: LandingProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Elder Companion
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Your trusted assistant for daily routines, medications, and cherished memories
          </p>
          <div className="flex justify-center mb-8">
            <Heart className="h-16 w-16 text-rose-500" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 border-2 border-blue-200 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Daily Routine</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Gentle reminders for your daily activities and schedule
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-2 border-green-200 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <Pill className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Medications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Never miss your medications with voice reminders
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-2 border-purple-200 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Family Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Cherish memories with photos of your loved ones
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-2 border-orange-200 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <Brain className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Memory Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Keep your mind sharp with fun memory exercises
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button
            onClick={onStart}
            size="lg"
            className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
          <p className="text-gray-500 mt-4 text-lg">
            Click to begin your daily companion experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
