
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Checkbox } from "@/components/ui/checkbox";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      checkPasswordStrength(value);
    }
    
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
    
    if (formData.confirmPassword && formData.confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    try {
      // In a real application, you would send this data to a backend
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          role: "employee"
        }));
        
        toast({
          title: "Registration successful",
          description: "Welcome to DeskHive!",
        });
        
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-deskhive-skyblue to-white">
        <div className="glass-card w-full max-w-md p-8 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-deskhive-navy">Create an Account</h1>
            <p className="text-deskhive-darkgray mt-2">Join DeskHive to start booking workspaces</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Oluwaseun Adebayo"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee/Learner ID (Optional)</Label>
              <Input
                id="employeeId"
                name="employeeId"
                type="text"
                placeholder="EMP12345"
                value={formData.employeeId}
                onChange={handleChange}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-deskhive-darkgray/70 hover:text-deskhive-darkgray"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              {/* Password strength indicator */}
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1.5 flex-1 rounded-full ${
                        passwordStrength >= level
                          ? passwordStrength === 1
                            ? "bg-red-500"
                            : passwordStrength === 2
                            ? "bg-orange-500"
                            : passwordStrength === 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-deskhive-darkgray/70">
                  {passwordStrength === 0 && "Enter a strong password"}
                  {passwordStrength === 1 && "Weak password"}
                  {passwordStrength === 2 && "Moderate password"}
                  {passwordStrength === 3 && "Good password"}
                  {passwordStrength === 4 && "Strong password"}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`glass-input pr-10 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                />
                {formData.confirmPassword && !passwordError && (
                  <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
                )}
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-2 my-4">
              <Checkbox 
                id="terms" 
                onCheckedChange={handleCheckboxChange}
                checked={formData.agreeToTerms}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm text-deskhive-darkgray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-deskhive-royal hover:underline">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-deskhive-royal hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full btn-primary h-11" 
              disabled={isLoading || !!passwordError}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-deskhive-darkgray">
              Already have an account?{" "}
              <Link to="/login" className="text-deskhive-royal hover:underline font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
