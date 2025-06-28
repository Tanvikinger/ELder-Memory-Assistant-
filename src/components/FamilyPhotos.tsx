import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FamilyMemberCard from "./FamilyMemberCard";
import MemoryTips from "./MemoryTips";
import { generatePhotoUrl, guessGenderFromName } from "@/utils/photoGenerator";

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

const FamilyPhotos = () => {
  const { toast } = useToast();
  
  // Generate appropriate photos for each family member
  const generateMemberPhoto = (name: string, age: number, relationship: string) => {
    const gender = guessGenderFromName(name);
    return generatePhotoUrl({ age, gender, ethnicity: 'indian' });
  };

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Priya Sharma",
      relationship: "Daughter",
      photo: generateMemberPhoto("Priya Sharma", 45, "Daughter"),
      age: 45,
      birthday: "March 15",
      phone: "+91 98765 43210",
      notes: "Lives in Mumbai, works as a teacher. Loves gardening and classical music.",
      lastContact: "Yesterday"
    },
    {
      id: "2",
      name: "Arjun Sharma",
      relationship: "Son",
      photo: generateMemberPhoto("Arjun Sharma", 42, "Son"),
      age: 42,
      birthday: "July 22",
      phone: "+91 98765 43211",
      notes: "Lives nearby, has two kids - Ananya and Rohan. Software engineer at Tech Mahindra.",
      lastContact: "3 days ago"
    },
    {
      id: "3",
      name: "Ananya Sharma",
      relationship: "Granddaughter",
      photo: generateMemberPhoto("Ananya Sharma", 12, "Granddaughter"),
      age: 12,
      birthday: "September 8",
      notes: "Arjun's daughter. Loves cricket and Bharatanatyam dance. In 7th grade.",
      lastContact: "Last week"
    },
    {
      id: "4",
      name: "Rohan Sharma",
      relationship: "Grandson",
      photo: generateMemberPhoto("Rohan Sharma", 9, "Grandson"),
      age: 9,
      birthday: "December 3",
      notes: "Arjun's son. Loves cricket and playing tabla. In 4th grade.",
      lastContact: "Last week"
    },
    {
      id: "5",
      name: "Kamala Patel",
      relationship: "Sister",
      photo: generateMemberPhoto("Kamala Patel", 78, "Sister"),
      age: 78,
      birthday: "May 10",
      phone: "+91 98765 43212",
      notes: "Lives in Pune. Retired nurse from KEM Hospital. Calls every Sunday.",
      lastContact: "Sunday"
    }
  ]);

  const handleMemberUpdate = (memberId: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers(prev => 
      prev.map(member => {
        if (member.id === memberId) {
          const updatedMember = { ...member, ...updates };
          // If age or name changed, regenerate photo
          if (updates.age !== undefined || updates.name !== undefined) {
            updatedMember.photo = generateMemberPhoto(
              updatedMember.name, 
              updatedMember.age, 
              updatedMember.relationship
            );
          }
          return updatedMember;
        }
        return member;
      })
    );
    toast({
      title: "Changes saved",
      description: "Family member information has been updated with appropriate photo.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-pink-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6" />
            Family & Friends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700">
            Remember the special people in your life. Photos are automatically matched to age and gender.
          </p>
        </CardContent>
      </Card>

      {/* Family Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {familyMembers.map((member) => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            onUpdate={handleMemberUpdate}
          />
        ))}
      </div>

      {/* Memory Tips */}
      <MemoryTips />
    </div>
  );
};

export default FamilyPhotos;
