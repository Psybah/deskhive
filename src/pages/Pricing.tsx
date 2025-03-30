
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Pricing = () => {
  const [billingAnnually, setBillingAnnually] = useState(true);

  const plans = [
    {
      name: "Basic",
      description: "For individuals and small teams",
      monthlyPrice: 8000,
      annualPrice: 80000,
      features: [
        "Up to 10 workspace bookings per month",
        "Basic workspace filtering",
        "Access to standard workspaces",
        "Email notifications",
        "Basic booking history",
      ],
      mostPopular: false,
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      description: "For growing businesses",
      monthlyPrice: 15000,
      annualPrice: 150000,
      features: [
        "Unlimited workspace bookings",
        "Advanced search and filtering",
        "Access to premium workspaces",
        "Real-time notifications",
        "Detailed booking analytics",
        "Calendar integrations",
        "Team booking management",
      ],
      mostPopular: true,
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 30000,
      annualPrice: 300000,
      features: [
        "Everything in Professional",
        "Custom workspace configurations",
        "Dedicated account manager",
        "Priority support",
        "Advanced analytics and reporting",
        "Enterprise API access",
        "Custom integrations",
        "Branded booking portal",
      ],
      mostPopular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ];

  const toggleBilling = () => {
    setBillingAnnually(!billingAnnually);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-deskhive-navy mb-6 animate-fade-in">
                Simple Pricing for Every Business
              </h1>
              <p className="text-xl text-deskhive-darkgray/80 mb-10 animate-fade-in">
                Choose the perfect plan for your workspace management needs.
              </p>
              
              <div className="flex items-center justify-center mb-12 animate-fade-in">
                <span className={`text-sm ${!billingAnnually ? 'font-bold text-deskhive-navy' : 'text-deskhive-darkgray/70'}`}>
                  Monthly
                </span>
                <Switch
                  checked={billingAnnually}
                  onCheckedChange={toggleBilling}
                  className="mx-4"
                />
                <span className={`text-sm ${billingAnnually ? 'font-bold text-deskhive-navy' : 'text-deskhive-darkgray/70'}`}>
                  Annually
                </span>
                <span className="ml-2 bg-deskhive-orange/20 text-deskhive-orange px-2 py-0.5 rounded-full text-xs font-medium">
                  Save 17%
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Plans */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`glass-card p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
                    plan.mostPopular ? 'border-deskhive-orange ring-2 ring-deskhive-orange/20 relative' : ''
                  }`}
                >
                  {plan.mostPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-deskhive-orange text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold text-deskhive-navy mb-2">{plan.name}</h3>
                  <p className="text-deskhive-darkgray/70 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-deskhive-navy">
                      {formatPrice(billingAnnually ? plan.annualPrice / 12 : plan.monthlyPrice)}
                    </span>
                    <span className="text-deskhive-darkgray/70">
                      /month
                    </span>
                    
                    {billingAnnually && (
                      <div className="text-sm text-deskhive-darkgray/70 mt-1">
                        billed {formatPrice(plan.annualPrice)} annually
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check size={18} className="text-deskhive-success mr-2 mt-1 flex-shrink-0" />
                        <span className="text-deskhive-darkgray">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <Button
                      asChild
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.buttonVariant === "default" 
                          ? "btn-primary" 
                          : "border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5"
                      }`}
                    >
                      <Link to={plan.buttonText === "Contact Sales" ? "/contact" : "/register"}>
                        {plan.buttonText}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enterprise Section */}
        <section className="section-padding bg-deskhive-skyblue">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto glass-card p-10">
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-2/3">
                  <h2 className="text-3xl font-bold text-deskhive-navy mb-4">Need a Custom Solution?</h2>
                  <p className="text-deskhive-darkgray/80 mb-6">
                    Our enterprise plan offers customizable features and dedicated support to meet 
                    the specific needs of large organizations. Contact our sales team to discuss 
                    your requirements and get a tailored quote.
                  </p>
                  <Button asChild variant="default" className="btn-primary">
                    <Link to="/contact">Contact Our Team</Link>
                  </Button>
                </div>
                <div className="w-full md:w-1/3 glass p-8 rounded-xl">
                  <h3 className="text-xl font-bold text-deskhive-navy mb-4">Enterprise Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check size={18} className="text-deskhive-success mr-2 mt-1 flex-shrink-0" />
                      <span className="text-deskhive-darkgray">Custom Branding</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-deskhive-success mr-2 mt-1 flex-shrink-0" />
                      <span className="text-deskhive-darkgray">Dedicated Support</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-deskhive-success mr-2 mt-1 flex-shrink-0" />
                      <span className="text-deskhive-darkgray">Advanced Security</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={18} className="text-deskhive-success mr-2 mt-1 flex-shrink-0" />
                      <span className="text-deskhive-darkgray">Custom Integrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQs */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-deskhive-navy text-center mb-12">
                Pricing FAQs
              </h2>
              
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">Can I change plans later?</h3>
                  <p className="text-deskhive-darkgray/80">
                    Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be 
                    charged the prorated difference. When downgrading, the new rate will apply at the 
                    start of your next billing cycle.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">What payment methods do you accept?</h3>
                  <p className="text-deskhive-darkgray/80">
                    We accept major credit cards, debit cards, and bank transfers. For enterprise plans, 
                    we also offer invoice-based payments.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">Is there a free trial?</h3>
                  <p className="text-deskhive-darkgray/80">
                    Yes, we offer a 14-day free trial for our Professional plan. No credit card is required 
                    to start your trial.
                  </p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-deskhive-navy mb-2">Can I request a refund?</h3>
                  <p className="text-deskhive-darkgray/80">
                    We offer a 30-day money-back guarantee. If you're not satisfied with our service within 
                    the first 30 days, contact our support team for a full refund.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-deskhive-navy text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Start Optimizing Your Workspaces Today</h2>
              <p className="text-lg text-white/80 mb-8">
                Join thousands of satisfied Nigerian businesses already using DeskHive.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default" className="bg-deskhive-orange hover:bg-deskhive-orange/90 text-white">
                  <Link to="/register">Start Your Free Trial</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">Schedule a Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
