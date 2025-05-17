'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUserType } from '@/lib/contexts/user-type-context';

interface Question {
  id: string;
  text: string;
  type: 'radio' | 'text' | 'select';
  options?: { value: string; label: string }[];
}

const questions: Record<string, Question[]> = {
  tourist: [
    {
      id: 'visit_duration',
      text: 'How long do you plan to stay in Saudi Arabia?',
      type: 'select',
      options: [
        { value: 'short', label: 'Less than 2 weeks' },
        { value: 'medium', label: '2-4 weeks' },
        { value: 'long', label: 'More than 1 month' }
      ]
    },
    {
      id: 'interests',
      text: 'What interests you most about Saudi Arabia?',
      type: 'radio',
      options: [
        { value: 'culture', label: 'Cultural & Historical Sites' },
        { value: 'nature', label: 'Nature & Adventure' },
        { value: 'modern', label: 'Modern Attractions' },
        { value: 'religious', label: 'Religious Sites' }
      ]
    }
  ],
  investor: [
    {
      id: 'investment_sector',
      text: 'Which sector are you interested in investing in?',
      type: 'select',
      options: [
        { value: 'tech', label: 'Technology' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'tourism', label: 'Tourism' },
        { value: 'energy', label: 'Energy' }
      ]
    },
    {
      id: 'investment_size',
      text: 'What is your expected investment size?',
      type: 'radio',
      options: [
        { value: 'small', label: 'Less than $100,000' },
        { value: 'medium', label: '$100,000 - $1,000,000' },
        { value: 'large', label: 'More than $1,000,000' }
      ]
    }
  ],
  expat: [
    {
      id: 'relocation_timeline',
      text: 'When are you planning to relocate?',
      type: 'select',
      options: [
        { value: 'immediate', label: 'Within 1 month' },
        { value: 'soon', label: '1-3 months' },
        { value: 'planning', label: '3+ months' }
      ]
    },
    {
      id: 'family_status',
      text: 'Are you relocating with family?',
      type: 'radio',
      options: [
        { value: 'single', label: 'No, just myself' },
        { value: 'couple', label: 'Yes, with spouse' },
        { value: 'family', label: 'Yes, with family' }
      ]
    }
  ]
};

interface QuestionnaireProps {
  onCompleteAction: () => void;
  onValidAction: (valid: boolean) => void;
  onDataAction: (data: Record<string, string>) => void;
  onBackAction: () => void;
}

export default function Questionnaire({ onCompleteAction, onValidAction, onDataAction, onBackAction }: QuestionnaireProps) {
  const { userType } = useUserType();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const relevantQuestions = userType ? questions[userType] : [];
  
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    onDataAction({ ...answers, [questionId]: answer });
    onValidAction(true);
  };
  
  const handleNext = () => {
    if (currentQuestion < relevantQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onCompleteAction();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onBackAction();
    }
  };
  
  if (!userType || !relevantQuestions.length) return null;
  
  const currentQ = relevantQuestions[currentQuestion];
  
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Tell us more about your plans</CardTitle>
        <CardDescription>
          Help us personalize your experience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-medium">{currentQ.text}</h3>
              
              {currentQ.type === 'radio' && (
                <RadioGroup
                  value={answers[currentQ.id]}
                  onValueChange={(value) => handleAnswer(currentQ.id, value)}
                  className="space-y-2"
                >
                  {currentQ.options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              
              {currentQ.type === 'select' && (
                <Select
                  value={answers[currentQ.id]}
                  onValueChange={(value) => handleAnswer(currentQ.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentQ.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {currentQ.type === 'text' && (
                <Input
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
                  placeholder="Type your answer"
                />
              )}
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="text-muted-foreground hover:text-foreground"
              >
                Previous Question
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentQuestion === relevantQuestions.length - 1}
                className="text-muted-foreground hover:text-foreground"
              >
                Next Question
              </Button>
            </div>
            
            <div className="pt-2">
              <div className="text-sm text-muted-foreground text-center">
                Question {currentQuestion + 1} of {relevantQuestions.length}
              </div>
              <div className="w-full bg-secondary h-2 rounded-full mt-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestion + 1) / relevantQuestions.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export { questions };

export type { Question };