
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, RefreshCw } from "lucide-react";
import { generatePhotoUrl, PersonProfile } from "@/utils/photoGenerator";

const PhotoGenerator = () => {
  const [profile, setProfile] = useState<PersonProfile>({
    age: 30,
    gender: 'female',
    ethnicity: 'mixed'
  });
  const [generatedPhoto, setGeneratedPhoto] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePhoto = () => {
    setIsGenerating(true);
    // Add a small delay to show loading state
    setTimeout(() => {
      const photoUrl = generatePhotoUrl(profile);
      setGeneratedPhoto(photoUrl);
      setIsGenerating(false);
    }, 500);
  };

  const handleRandomize = () => {
    const randomAge = Math.floor(Math.random() * 80) + 5;
    const randomGender = Math.random() > 0.5 ? 'male' : 'female';
    const ethnicities = ['caucasian', 'asian', 'african', 'hispanic', 'indian', 'mixed'];
    const randomEthnicity = ethnicities[Math.floor(Math.random() * ethnicities.length)] as PersonProfile['ethnicity'];
    
    setProfile({
      age: randomAge,
      gender: randomGender,
      ethnicity: randomEthnicity
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Camera className="h-6 w-6" />
            Smart Photo Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700">
            Generate realistic, age-appropriate and gender-specific photos based on person details.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Person Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="100"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 1 }))}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={profile.gender}
                onValueChange={(value: 'male' | 'female') => setProfile(prev => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ethnicity">Background (Optional)</Label>
              <Select
                value={profile.ethnicity}
                onValueChange={(value: PersonProfile['ethnicity']) => setProfile(prev => ({ ...prev, ethnicity: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mixed">Mixed/Diverse</SelectItem>
                  <SelectItem value="caucasian">Caucasian</SelectItem>
                  <SelectItem value="asian">Asian</SelectItem>
                  <SelectItem value="african">African</SelectItem>
                  <SelectItem value="hispanic">Hispanic</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleGeneratePhoto}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Generate Photo
                  </>
                )}
              </Button>
              <Button onClick={handleRandomize} variant="outline">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Generated Photo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Generated Photo</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedPhoto ? (
              <div className="space-y-4">
                <img
                  src={generatedPhoto}
                  alt={`${profile.gender} aged ${profile.age}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Generated for:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Age: {profile.age} years old</li>
                    <li>• Gender: {profile.gender}</li>
                    <li>• Background: {profile.ethnicity}</li>
                    <li>• Category: {profile.age <= 12 ? 'Child' : profile.age <= 19 ? 'Teenager' : profile.age <= 35 ? 'Young Adult' : profile.age <= 55 ? 'Middle-aged' : profile.age <= 70 ? 'Senior' : 'Elderly'}</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                <div className="text-center text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Click "Generate Photo" to see a realistic photo</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Example Demonstrations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Age Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-sm font-medium">Child</div>
              <div className="text-xs text-gray-500">0-12 years</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Teenager</div>
              <div className="text-xs text-gray-500">13-19 years</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Young Adult</div>
              <div className="text-xs text-gray-500">20-35 years</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Middle-aged</div>
              <div className="text-xs text-gray-500">36-55 years</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Senior</div>
              <div className="text-xs text-gray-500">56-70 years</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Elderly</div>
              <div className="text-xs text-gray-500">71+ years</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoGenerator;
