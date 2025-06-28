
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const MemoryTips = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-800">Memory Tips</h3>
        </div>
        <ul className="text-blue-700 text-lg space-y-2">
          <li>• Look at photos regularly to strengthen memories</li>
          <li>• Use the voice feature to hear details about each person</li>
          <li>• Call family members regularly to stay connected</li>
          <li>• Update photos and information when things change</li>
          <li>• Use the edit button to keep information current</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default MemoryTips;
