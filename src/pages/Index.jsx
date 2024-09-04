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
    if (!formData.age || !formData.weight || !formData.height || !formData.goal || !formData.activityLevel) {
      alert("Please fill in all fields");
      return;
    }

    const heightInMeters = formData.height / 100;
    const bmi = formData.weight / (heightInMeters * heightInMeters);

    let recommendation = `Based on your information (Age: ${formData.age}, Weight: ${formData.weight}kg, Height: ${formData.height}cm, BMI: ${bmi.toFixed(1)}), here's your personalized plan:\n\n`;

    if (formData.goal === "weight-loss") {
      recommendation += "For weight loss:\n";
      recommendation += "- Aim for a calorie deficit of 500 calories per day\n";
      recommendation += "- Focus on high-protein, low-calorie foods\n";
      recommendation += "- Incorporate 30-45 minutes of cardio 5 times a week\n";
      setFoodSuggestions(["Lean meats", "Fish", "Vegetables", "Whole grains", "Fruits"]);
      setFoodsToAvoid(["Sugary drinks", "Processed foods", "High-fat snacks"]);
    } else if (formData.goal === "muscle-gain") {
      recommendation += "For muscle gain:\n";
      recommendation += "- Increase your calorie intake by 300-500 calories per day\n";
      recommendation += "- Focus on high-protein foods and complex carbohydrates\n";
      recommendation += "- Incorporate strength training 3-4 times a week\n";
      setFoodSuggestions(["Chicken breast", "Eggs", "Greek yogurt", "Quinoa", "Sweet potatoes"]);
      setFoodsToAvoid(["Excessive sugar", "Alcohol", "Fried foods"]);
    } else {
      recommendation += "For general fitness:\n";
      recommendation += "- Maintain a balanced diet with a mix of nutrients\n";
      recommendation += "- Aim for 150 minutes of moderate exercise per week\n";
      recommendation += "- Include both cardio and strength training in your routine\n";
      setFoodSuggestions(["Mixed vegetables", "Lean proteins", "Whole grains", "Nuts", "Seeds"]);
      setFoodsToAvoid(["Excessive processed foods", "High-sugar snacks"]);
    }

    recommendation += `\nBased on your activity level (${formData.activityLevel}), adjust your calorie intake and exercise intensity accordingly.`;

    setRecommendation(recommendation);
    setEatingBenefits([
      "Improved energy levels",
      "Better nutrient absorption",
      "Enhanced muscle recovery",
      "Supports your fitness goals"
    ]);
    setAvoidingBenefits([
      "Reduced risk of weight gain",
      "Improved overall health",
      "Better blood sugar control",
      "Enhanced fitness progress"
    ]);
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
              <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
                  <TabsTrigger value="recommendations" className="px-2 py-1 text-xs sm:text-sm">Recommendations</TabsTrigger>
                  <TabsTrigger value="food-suggestions" className="px-2 py-1 text-xs sm:text-sm">Food Suggestions</TabsTrigger>
                  <TabsTrigger value="foods-to-avoid" className="px-2 py-1 text-xs sm:text-sm">Foods to Avoid</TabsTrigger>
                  <TabsTrigger value="benefits" className="px-2 py-1 text-xs sm:text-sm">Benefits</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <TabsContent value="recommendations">
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      <p className="whitespace-pre-line text-sm sm:text-base">{recommendation}</p>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="food-suggestions">
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      <ul className="space-y-2">
                        {foodSuggestions.map((food, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base">
                            <SaladIcon className="mr-2 h-4 w-4 text-green-500" />
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="foods-to-avoid">
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      <ul className="space-y-2">
                        {foodsToAvoid.map((food, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base">
                            <XCircleIcon className="mr-2 h-4 w-4 text-red-500" />
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="benefits">
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-base mb-2">Benefits of Eating Recommended Foods:</h3>
                          <ul className="space-y-2">
                            {eatingBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircleIcon className="mr-2 h-4 w-4 text-green-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base mb-2">Benefits of Avoiding Certain Foods:</h3>
                          <ul className="space-y-2">
                            {avoidingBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircleIcon className="mr-2 h-4 w-4 text-blue-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;