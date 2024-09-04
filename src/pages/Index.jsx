import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRightIcon, SaladIcon, XCircleIcon } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
  });
  const [recommendation, setRecommendation] = useState('');
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [foodsToAvoid, setFoodsToAvoid] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const generateRecommendation = () => {
    const { age, weight, height, goal, activityLevel } = formData;
    let recommendation = '';
    let suggestedFoods = [];
    let avoidFoods = [];

    if (goal === 'weight-loss') {
      recommendation = `Based on your age (${age}), weight (${weight} kg), height (${height} cm), and ${activityLevel} activity level, here are some recommendations for weight loss:\n
      1. Aim for a calorie deficit of 500 calories per day.
      2. Focus on high-protein, low-calorie foods.
      3. Incorporate cardio exercises 3-5 times a week.
      4. Strength training 2-3 times a week to preserve muscle mass.
      5. Stay hydrated and aim for 8 hours of sleep per night.`;
      suggestedFoods = ['Lean meats', 'Fish', 'Vegetables', 'Fruits', 'Whole grains', 'Greek yogurt'];
      avoidFoods = ['Sugary drinks', 'Processed snacks', 'Fast food', 'High-calorie desserts', 'Alcohol'];
    } else if (goal === 'muscle-gain') {
      recommendation = `For your goal of muscle gain, considering your age (${age}), weight (${weight} kg), height (${height} cm), and ${activityLevel} activity level:\n
      1. Increase your calorie intake by 300-500 calories above maintenance.
      2. Consume 1.6-2.2 grams of protein per kg of body weight.
      3. Focus on compound exercises like squats, deadlifts, and bench presses.
      4. Progressive overload in your strength training routine.
      5. Ensure adequate rest and recovery between workouts.`;
      suggestedFoods = ['Chicken breast', 'Lean beef', 'Eggs', 'Salmon', 'Quinoa', 'Sweet potatoes', 'Nuts and seeds'];
      avoidFoods = ['Sugary snacks', 'Excessive alcohol', 'Low-protein foods', 'Highly processed foods'];
    } else if (goal === 'general-fitness') {
      recommendation = `To improve your general fitness at age ${age}, weight ${weight} kg, height ${height} cm, and ${activityLevel} activity level:\n
      1. Aim for 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity per week.
      2. Include strength training exercises 2-3 times a week.
      3. Incorporate flexibility and balance exercises.
      4. Maintain a balanced diet with plenty of fruits, vegetables, and lean proteins.
      5. Stay consistent with your routine and gradually increase intensity over time.`;
      suggestedFoods = ['Colorful vegetables', 'Fruits', 'Lean proteins', 'Whole grains', 'Low-fat dairy', 'Healthy fats'];
      avoidFoods = ['Excessive processed foods', 'Sugary drinks', 'High-sodium foods', 'Trans fats'];
    }

    setRecommendation(recommendation);
    setFoodSuggestions(suggestedFoods);
    setFoodsToAvoid(avoidFoods);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">FitOptimizer</h1>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Personalized Fitness Recommendations</CardTitle>
            <CardDescription className="text-center">Enter your details for tailored fitness and nutrition advice</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              <Button type="button" onClick={generateRecommendation} className="w-full bg-blue-600 hover:bg-blue-700">
                Get Personalized Plan
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {recommendation && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Your Personalized Fitness Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommendations">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="food-suggestions">Food Suggestions</TabsTrigger>
                  <TabsTrigger value="foods-to-avoid">Foods to Avoid</TabsTrigger>
                </TabsList>
                <TabsContent value="recommendations">
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <p className="whitespace-pre-line">{recommendation}</p>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="food-suggestions">
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <ul className="space-y-2">
                      {foodSuggestions.map((food, index) => (
                        <li key={index} className="flex items-center">
                          <SaladIcon className="mr-2 h-5 w-5 text-green-500" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="foods-to-avoid">
                  <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                    <ul className="space-y-2">
                      {foodsToAvoid.map((food, index) => (
                        <li key={index} className="flex items-center">
                          <XCircleIcon className="mr-2 h-5 w-5 text-red-500" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;