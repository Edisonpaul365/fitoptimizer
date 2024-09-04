import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRightIcon, SaladIcon, XCircleIcon, CheckCircleIcon, ActivityIcon, TargetIcon, ScaleIcon } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: '',
  });
  const [recommendation, setRecommendation] = useState([]);
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

    let newRecommendation = [
      {
        title: "Your Profile",
        content: `Age: ${formData.age} years\nWeight: ${formData.weight} kg\nHeight: ${formData.height} cm\nBMI: ${bmi.toFixed(1)}`,
        icon: <ScaleIcon className="h-6 w-6 text-blue-500" />
      }
    ];

    if (formData.goal === "weight-loss") {
      newRecommendation.push(
        {
          title: "Calorie Goal",
          content: "Aim for a calorie deficit of 500 calories per day",
          icon: <TargetIcon className="h-6 w-6 text-green-500" />
        },
        {
          title: "Nutrition Focus",
          content: "High-protein, low-calorie foods",
          icon: <SaladIcon className="h-6 w-6 text-orange-500" />
        },
        {
          title: "Exercise Plan",
          content: "30-45 minutes of cardio 5 times a week",
          icon: <ActivityIcon className="h-6 w-6 text-purple-500" />
        }
      );
      setFoodSuggestions(["Lean meats", "Fish", "Vegetables", "Whole grains", "Fruits"]);
      setFoodsToAvoid(["Sugary drinks", "Processed foods", "High-fat snacks"]);
    } else if (formData.goal === "muscle-gain") {
      newRecommendation.push(
        {
          title: "Calorie Goal",
          content: "Increase your calorie intake by 300-500 calories per day",
          icon: <TargetIcon className="h-6 w-6 text-green-500" />
        },
        {
          title: "Nutrition Focus",
          content: "High-protein foods and complex carbohydrates",
          icon: <SaladIcon className="h-6 w-6 text-orange-500" />
        },
        {
          title: "Exercise Plan",
          content: "Strength training 3-4 times a week",
          icon: <ActivityIcon className="h-6 w-6 text-purple-500" />
        }
      );
      setFoodSuggestions(["Chicken breast", "Eggs", "Greek yogurt", "Quinoa", "Sweet potatoes"]);
      setFoodsToAvoid(["Excessive sugar", "Alcohol", "Fried foods"]);
    } else {
      newRecommendation.push(
        {
          title: "Nutrition Goal",
          content: "Maintain a balanced diet with a mix of nutrients",
          icon: <TargetIcon className="h-6 w-6 text-green-500" />
        },
        {
          title: "Exercise Plan",
          content: "150 minutes of moderate exercise per week",
          icon: <ActivityIcon className="h-6 w-6 text-purple-500" />
        },
        {
          title: "Fitness Focus",
          content: "Include both cardio and strength training in your routine",
          icon: <SaladIcon className="h-6 w-6 text-orange-500" />
        }
      );
      setFoodSuggestions(["Mixed vegetables", "Lean proteins", "Whole grains", "Nuts", "Seeds"]);
      setFoodsToAvoid(["Excessive processed foods", "High-sugar snacks"]);
    }

    newRecommendation.push({
      title: "Activity Level Adjustment",
      content: `Based on your ${formData.activityLevel} activity level, adjust your calorie intake and exercise intensity accordingly.`,
      icon: <ActivityIcon className="h-6 w-6 text-blue-500" />
    });

    setRecommendation(newRecommendation);
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
        
        {recommendation.length > 0 && (
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
                    <ScrollArea className="h-[350px] w-full rounded-md border p-4">
                      <div className="space-y-4">
                        {recommendation.map((rec, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <div className="flex items-center mb-2">
                              {rec.icon}
                              <h3 className="text-lg font-semibold ml-2">{rec.title}</h3>
                            </div>
                            <p className="text-gray-600 whitespace-pre-line">{rec.content}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="food-suggestions">
                    <ScrollArea className="h-[350px] w-full rounded-md border p-4">
                      <ul className="space-y-2">
                        {foodSuggestions.map((food, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base bg-green-100 p-2 rounded-md">
                            <SaladIcon className="mr-2 h-5 w-5 text-green-500" />
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="foods-to-avoid">
                    <ScrollArea className="h-[350px] w-full rounded-md border p-4">
                      <ul className="space-y-2">
                        {foodsToAvoid.map((food, index) => (
                          <li key={index} className="flex items-center text-sm sm:text-base bg-red-100 p-2 rounded-md">
                            <XCircleIcon className="mr-2 h-5 w-5 text-red-500" />
                            <span>{food}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="benefits">
                    <ScrollArea className="h-[350px] w-full rounded-md border p-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-green-600">Benefits of Eating Recommended Foods:</h3>
                          <ul className="space-y-2">
                            {eatingBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm bg-green-50 p-2 rounded-md">
                                <CheckCircleIcon className="mr-2 h-5 w-5 text-green-500" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2 text-blue-600">Benefits of Avoiding Certain Foods:</h3>
                          <ul className="space-y-2">
                            {avoidingBenefits.map((benefit, index) => (
                              <li key={index} className="flex items-center text-sm bg-blue-50 p-2 rounded-md">
                                <CheckCircleIcon className="mr-2 h-5 w-5 text-blue-500" />
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