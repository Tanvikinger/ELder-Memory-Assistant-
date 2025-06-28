
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, X, Upload } from "lucide-react";

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

interface FamilyMemberEditorProps {
  member: FamilyMember;
  onSave: (updates: Partial<FamilyMember>) => void;
  onCancel: () => void;
}

const FamilyMemberEditor = ({ member, onSave, onCancel }: FamilyMemberEditorProps) => {
  const [editedData, setEditedData] = useState<Partial<FamilyMember>>(member);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedData(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={editedData.photo}
          alt={editedData.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute bottom-4 right-4">
          <label className="cursor-pointer">
            <Upload className="h-8 w-8 text-white bg-blue-600 p-1 rounded-full" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Input
          value={editedData.name || ""}
          onChange={(e) => setEditedData(prev => ({ ...prev, name: e.target.value }))}
          className="text-2xl font-bold"
          placeholder="Name"
        />
        <Input
          value={editedData.relationship || ""}
          onChange={(e) => setEditedData(prev => ({ ...prev, relationship: e.target.value }))}
          placeholder="Relationship"
        />
        <Input
          type="number"
          value={editedData.age || ""}
          onChange={(e) => setEditedData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
          placeholder="Age"
        />
        <Input
          value={editedData.birthday || ""}
          onChange={(e) => setEditedData(prev => ({ ...prev, birthday: e.target.value }))}
          placeholder="Birthday"
        />
        <Input
          value={editedData.phone || ""}
          onChange={(e) => setEditedData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Phone number"
        />
        <Input
          value={editedData.notes || ""}
          onChange={(e) => setEditedData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Notes"
        />
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 flex-1"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FamilyMemberEditor;
