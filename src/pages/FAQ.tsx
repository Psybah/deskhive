
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      name: "Getting Started",
      icon: "🚀",
      questions: [
        {
          question: "What is DeskHive?",
          answer: "DeskHive is Nigeria's premier workspace management solution designed for modern professionals and businesses. Our platform allows you to discover, book, and manage workspaces efficiently, helping organizations optimize their space utilization and employees find the right workspace for their needs."
        },
        {
          question: "How do I create an account?",
          answer: "Creating a DeskHive account is simple. Click on the 'Sign Up' button in the top right corner of our website, fill in your details, and verify your email address. Once verified, you can start exploring and booking workspaces immediately."
        },
        {
          question: "Is DeskHive available on mobile devices?",
          answer: "Yes, DeskHive is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android for an enhanced mobile experience. You can download them from the App Store or Google Play Store."
        },
        {
          question: "Can I try DeskHive before purchasing?",
          answer: "Absolutely! We offer a 14-day free trial of our Professional plan, which gives you access to most features. No credit card is required to start your trial. Simply sign up and select the 'Start Free Trial' option."
        }
      ]
    },
    {
      name: "Booking & Reservations",
      icon: "📅",
      questions: [
        {
          question: "How far in advance can I book a workspace?",
          answer: "You can book workspaces up to 3 months in advance on our Basic plan, and up to 6 months on our Professional and Enterprise plans. This allows for better planning and ensures you always have the workspace you need when you need it."
        },
        {
          question: "Can I cancel or reschedule my booking?",
          answer: "Yes, you can cancel or reschedule your booking through your DeskHive dashboard. For free cancellations, please ensure you cancel at least 24 hours before your scheduled booking time. Cancellations made less than 24 hours in advance may incur a cancellation fee."
        },
        {
          question: "How do I extend my booking?",
          answer: "To extend your booking, go to 'My Bookings' in your dashboard, find the booking you want to extend, and click on the 'Extend' button. If the space is available for the extended time, your booking will be updated immediately. If not, we'll suggest alternative workspaces."
        },
        {
          question: "Can I book a workspace for someone else?",
          answer: "Yes, as a team administrator, you can book workspaces on behalf of your team members. Simply select the team member during the booking process. They will receive a notification about the booking and it will appear in their calendar."
        }
      ]
    },
    {
      name: "Billing & Pricing",
      icon: "💳",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit and debit cards (including Visa, Mastercard, and Verve), bank transfers, and mobile money services like Paystack and Flutterwave. For enterprise customers, we also offer invoice-based payments."
        },
        {
          question: "How does billing work?",
          answer: "For monthly and annual subscriptions, you'll be billed automatically at the start of each billing period. For workspace bookings outside your plan, you'll be charged at the time of booking. All transactions are secured with bank-grade encryption."
        },
        {
          question: "Can I get a refund?",
          answer: "We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund. For workspace bookings, refunds are available for cancellations made at least 24 hours in advance."
        },
        {
          question: "What happens if I exceed my plan's booking limit?",
          answer: "If you exceed your plan's booking limit, you'll be charged our standard pay-as-you-go rate for additional bookings. You can always upgrade your plan if you find yourself regularly exceeding your current limits for a more cost-effective solution."
        }
      ]
    },
    {
      name: "Technical Support",
      icon: "🔧",
      questions: [
        {
          question: "How can I get technical support?",
          answer: "You can reach our technical support team via email at support@deskhive.ng, through the live chat on our website, or by calling our customer service line at +234 800 123 4567. Our support team is available Monday to Friday, 8am to 6pm WAT."
        },
        {
          question: "Is there a user guide available?",
          answer: "Yes, we have a comprehensive user guide available in our Help Center. It covers all aspects of using DeskHive, from creating an account to managing bookings and generating reports. You can access it at any time from the 'Help' section in your dashboard."
        },
        {
          question: "Do you offer onboarding for new users?",
          answer: "Yes, we offer personalized onboarding sessions for new users, especially for teams and enterprise customers. These sessions can be scheduled with our customer success team and are tailored to your specific needs and use cases."
        },
        {
          question: "How do I report a bug or issue?",
          answer: "To report a bug or technical issue, please contact our support team with details of the problem, including steps to reproduce it, screenshots if applicable, and your device and browser information. This helps us resolve the issue more quickly."
        }
      ]
    },
    {
      name: "Account Management",
      icon: "👤",
      questions: [
        {
          question: "How do I update my profile information?",
          answer: "You can update your profile information by logging into your account, clicking on your profile picture in the top right corner, and selecting 'Profile Settings'. From there, you can edit your personal information, change your password, and update your notification preferences."
        },
        {
          question: "Can I have multiple users under one account?",
          answer: "Yes, our Professional and Enterprise plans support team accounts with multiple users. As an account administrator, you can add team members, assign them roles, and manage their permissions. Each team member will have their own login credentials."
        },
        {
          question: "How do I reset my password?",
          answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account by going to 'Profile Settings' and selecting 'Delete Account'. Please note that this action is irreversible and will permanently remove all your data from our system. If you have an active subscription, you'll need to cancel it before deleting your account."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-deskhive-skyblue to-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-deskhive-navy mb-6 animate-fade-in">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-deskhive-darkgray/80 mb-10 animate-fade-in">
                Find answers to common questions about DeskHive's workspace management platform.
              </p>
              
              <div className="relative max-w-xl mx-auto animate-fade-in">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-deskhive-darkgray/50" />
                </div>
                <input
                  type="text"
                  className="glass-input w-full pl-10 focus:ring-deskhive-navy/30"
                  placeholder="Search FAQ questions..."
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Categories */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mb-16">
              {faqCategories.map((category, index) => (
                <a 
                  key={index}
                  href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="glass-card p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-deskhive-navy">{category.name}</h3>
                </a>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div 
                  key={categoryIndex} 
                  id={category.name.toLowerCase().replace(/\s+/g, '-')}
                  className="mb-16"
                >
                  <h2 className="text-2xl font-bold text-deskhive-navy mb-6 flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    {category.name}
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`} className="glass-card">
                        <AccordionTrigger className="text-lg font-medium text-deskhive-navy px-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-deskhive-darkgray/80 px-6 pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Still Have Questions */}
        <section className="section-padding bg-deskhive-skyblue">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center glass-card p-10">
              <h2 className="text-3xl font-bold text-deskhive-navy mb-6">Still Have Questions?</h2>
              <p className="text-lg text-deskhive-darkgray/80 mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="default" className="btn-primary">
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button asChild variant="outline" className="border-deskhive-navy text-deskhive-navy hover:bg-deskhive-navy/5">
                  <a href="mailto:support@deskhive.ng">Email Us</a>
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

export default FAQ;
