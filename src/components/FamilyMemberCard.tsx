
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Volume2, Phone, Calendar, Edit } from "lucide-react";
import FamilyMemberEditor from "./FamilyMemberEditor";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  photo: string;
  age: number;
  birthday: string;
  phone?: string;
  notes: string;
  lastContact?: string;
}

interface FamilyMemberCardProps {
  member: FamilyMember;
  onUpdate: (memberId: string, updates: Partial<FamilyMember>) => void;
}

const FamilyMemberCard = ({ member, onUpdate }: FamilyMemberCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const speakAboutPerson = (member: FamilyMember) => {
    const utterance = new SpeechSynthesisUtterance(
      `This is ${member.name}, your ${member.relationship}. ${member.notes} Their birthday is ${member.birthday}. ${
        member.lastContact ? `You last spoke ${member.lastContact}.` : ""
      }`
    );
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const callPerson = (member: FamilyMember) => {
    if (member.phone) {
      const utterance = new SpeechSynthesisUtterance(
        `Calling ${member.name} at ${member.phone}`
      );
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSave = (updates: Partial<FamilyMember>) => {
    onUpdate(member.id, updates);
    setIsEditing(false);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-64 object-cover"
        />
        <Badge
          className="absolute top-4 right-4 bg-white text-gray-800"
          variant="secondary"
        >
          {member.relationship}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        {isEditing ? (
          <FamilyMemberEditor
            member={member}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-lg text-gray-600">Age: {member.age}</p>
              </div>
              
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="outline"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-pink-600">
              <Calendar className="h-4 w-4" />
              <span>Birthday: {member.birthday}</span>
            </div>

            {member.phone && (
              <div className="flex items-center gap-2 text-blue-600">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
            )}

            {member.lastContact && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-800">
                  Last contact: {member.lastContact}
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{member.notes}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => speakAboutPerson(member)}
                className="flex items-center gap-2 flex-1"
                variant="outline"
              >
                <Volume2 className="h-4 w-4" />
                Tell me about {member.name.split(' ')[0]}
              </Button>
              
              {member.phone && (
                <Button
                  onClick={() => callPerson(member)}
                  className="flex items-center gap-2"
                  variant="default"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyMemberCard;
