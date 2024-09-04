import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
  });
  const [recommendation, setRecommendation] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const generateRecommendation = () => {
    const { age, weight, height, goal, activityLevel } = formData;
    let recommendation = '';

    if (goal === 'weight-loss') {
      recommendation = `Based on your age (${age}), weight (${weight} kg), height (${height} cm), and ${activityLevel} activity level, here are some recommendations for weight loss:\n
      1. Aim for a calorie deficit of 500 calories per day.
      2. Focus on high-protein, low-calorie foods.
      3. Incorporate cardio exercises 3-5 times a week.
      4. Strength training 2-3 times a week to preserve muscle mass.
      5. Stay hydrated and aim for 8 hours of sleep per night.`;
    } else if (goal === 'muscle-gain') {
      recommendation = `For your goal of muscle gain, considering your age (${age}), weight (${weight} kg), height (${height} cm), and ${activityLevel} activity level:\n
      1. Increase your calorie intake by 300-500 calories above maintenance.
      2. Consume 1.6-2.2 grams of protein per kg of body weight.
      3. Focus on compound exercises like squats, deadlifts, and bench presses.
      4. Progressive overload in your strength training routine.
      5. Ensure adequate rest and recovery between workouts.`;
    } else if (goal === 'general-fitness') {
      recommendation = `To improve your general fitness at age ${age}, weight ${weight} kg, height ${height} cm, and ${activityLevel} activity level:\n
      1. Aim for 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week.
      2. Include strength training exercises 2-3 times a week.
      3. Incorporate flexibility and balance exercises.
      4. Maintain a balanced diet with plenty of fruits, vegetables, and lean proteins.
      5. Stay consistent with your routine and gradually increase intensity over time.`;
    }

    setRecommendation(recommendation);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Fitness Optimizer</CardTitle>
            <CardDescription>Enter your details for personalized fitness recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <Input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <Input type="number" id="weight" name="weight" value={formData.weight} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
                <Input type="number" id="height" name="height" value={formData.height} onChange={handleInputChange} className="mt-1" />
              </div>
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Fitness Goal</label>
                <Select name="goal" onValueChange={(value) => handleSelectChange('goal', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="general-fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700">Activity Level</label>
                <Select name="activityLevel" onValueChange={(value) => handleSelectChange('activityLevel', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly-active">Lightly Active</SelectItem>
                    <SelectItem value="moderately-active">Moderately Active</SelectItem>
                    <SelectItem value="very-active">Very Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" onClick={generateRecommendation} className="w-full">
                Get Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {recommendation && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Personalized Recommendation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{recommendation}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;