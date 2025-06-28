
export interface PersonProfile {
  age: number;
  gender: 'male' | 'female';
  ethnicity?: 'caucasian' | 'asian' | 'african' | 'hispanic' | 'indian' | 'mixed';
}

export const generatePhotoUrl = (profile: PersonProfile): string => {
  const { age, gender, ethnicity = 'mixed' } = profile;
  
  // Define age categories
  let ageCategory: string;
  if (age <= 12) {
    ageCategory = 'child';
  } else if (age <= 19) {
    ageCategory = 'teenager';
  } else if (age <= 35) {
    ageCategory = 'young-adult';
  } else if (age <= 55) {
    ageCategory = 'middle-aged';
  } else if (age <= 70) {
    ageCategory = 'senior';
  } else {
    ageCategory = 'elderly';
  }

  // Photo URL mappings for different combinations
  const photoMappings: Record<string, Record<string, string[]>> = {
    child: {
      male: [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        'https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?w=400'
      ],
      female: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        'https://images.unsplash.com/photo-1518295751549-6b4b96c8ac2c?w=400'
      ]
    },
    teenager: {
      male: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=400',
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400'
      ],
      female: [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
      ]
    },
    'young-adult': {
      male: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'
      ],
      female: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'
      ]
    },
    'middle-aged': {
      male: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400'
      ],
      female: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400'
      ]
    },
    senior: {
      male: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
      ],
      female: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
        'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400'
      ]
    },
    elderly: {
      male: [
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
      ],
      female: [
        'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
        'https://images.unsplash.com/photo-1594736797933-d0f06ba09f4b?w=400'
      ]
    }
  };

  // Get appropriate photos for the age category and gender
  const categoryPhotos = photoMappings[ageCategory]?.[gender] || photoMappings['middle-aged'][gender];
  
  // Return a random photo from the appropriate category
  const randomIndex = Math.floor(Math.random() * categoryPhotos.length);
  return categoryPhotos[randomIndex];
};

// Helper function to determine gender from name (basic implementation)
export const guessGenderFromName = (name: string): 'male' | 'female' => {
  const femaleNames = ['priya', 'kamala', 'ananya', 'maya', 'sita', 'rita', 'meera', 'kavya', 'asha', 'suma'];
  const maleNames = ['arjun', 'rohan', 'raj', 'amit', 'vikram', 'suresh', 'ravi', 'kiran', 'dev', 'anil'];
  
  const firstName = name.toLowerCase().split(' ')[0];
  
  if (femaleNames.some(fname => firstName.includes(fname))) {
    return 'female';
  } else if (maleNames.some(mname => firstName.includes(mname))) {
    return 'male';
  }
  
  // Default fallback
  return Math.random() > 0.5 ? 'female' : 'male';
};
