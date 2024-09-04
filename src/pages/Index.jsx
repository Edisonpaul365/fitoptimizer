import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRightIcon, SaladIcon, XCircleIcon, CheckCircleIcon } from 'lucide-react';

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
  const [eatingBenefits, setEatingBenefits] = useState([]);
  const [avoidingBenefits, setAvoidingBenefits] = useState([]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const generateRecommendation = () => {
    // ... (keep the existing generateRecommendation function as is)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-blue-800">FitOptimizer</h1>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">Personalized Fitness Recommendations</CardTitle>
            <CardDescription className="text-center text-sm sm:text-base">Enter your details for tailored fitness and nutrition advice</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="sm:col-span-2">
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
          <Card className="mt-6 sm:mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-center">Your Personalized Fitness Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommendations">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="food-suggestions">Food Suggestions</TabsTrigger>
                  <TabsTrigger value="foods-to-avoid">Foods to Avoid</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                </TabsList>
                <TabsContent value="recommendations">
                  <ScrollArea className="h-[250px] sm:h-[300px] w-full rounded-md border p-4">
                    <p className="whitespace-pre-line text-sm sm:text-base">{recommendation}</p>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="food-suggestions">
                  <ScrollArea className="h-[250px] sm:h-[300px] w-full rounded-md border p-4">
                    <ul className="space-y-2">
                      {foodSuggestions.map((food, index) => (
                        <li key={index} className="flex items-center text-sm sm:text-base">
                          <SaladIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="foods-to-avoid">
                  <ScrollArea className="h-[250px] sm:h-[300px] w-full rounded-md border p-4">
                    <ul className="space-y-2">
                      {foodsToAvoid.map((food, index) => (
                        <li key={index} className="flex items-center text-sm sm:text-base">
                          <XCircleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                          <span>{food}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="benefits">
                  <ScrollArea className="h-[250px] sm:h-[300px] w-full rounded-md border p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-2">Benefits of Eating Recommended Foods:</h3>
                        <ul className="space-y-2">
                          {eatingBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-center text-sm sm:text-base">
                              <CheckCircleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-2">Benefits of Avoiding Certain Foods:</h3>
                        <ul className="space-y-2">
                          {avoidingBenefits.map((benefit, index) => (
                            <li key={index} className="flex items-center text-sm sm:text-base">
                              <CheckCircleIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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