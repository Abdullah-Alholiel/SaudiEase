'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { userTypeDescriptions } from '@/lib/utils';
import { useUserType } from '@/lib/contexts/user-type-context';

interface ProfileSetupProps {
  onNextAction: () => void;
  onBackAction: () => void;
  onValid?: (valid: boolean) => void;
}

export default function ProfileSetup({ onNextAction, onBackAction, onValid }: ProfileSetupProps) {
  const { userType } = useUserType();
  const typeTitle = userType ? userTypeDescriptions[userType].title : 'User';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    nationality: '',
    bio: '',
  });
  
  useEffect(() => {
    if (onValid) {
      // All fields required for MVP
      const valid = formData.firstName && formData.lastName && formData.phoneNumber && formData.nationality && formData.bio;
      onValid(!!valid);
    }
  }, [formData, onValid]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Tell us a bit about yourself so we can personalize your {typeTitle.toLowerCase()} experience.
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1 (123) 456-7890"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Select value={formData.nationality} onValueChange={(value) => handleSelectChange('nationality', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="sa">Saudi Arabia</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself and your interest in Saudi Arabia"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}