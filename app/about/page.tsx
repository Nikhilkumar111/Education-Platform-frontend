import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Search, UserCheck, MessageSquare, Shield, Star } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Find your perfect Tutor',
      description: 'Browse through our extensive database of qualified tutors across various subjects and skill levels.',
    },
    {
      icon: UserCheck,
      title: 'Verified Educators',
      description: 'All tutors go through a comprehensive verification process to ensure quality education delivery.'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule with our easy-to-use calendar integration.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Connect directly with tutors to discuss learning goals and session requirements.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and transactions are protected with industry-standard security measures.'
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'Rate and review tutors to help maintain high-quality educational experiences.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up as a student or tutor and complete your profile with relevant information.'
    },
    {
      number: '02',
      title: 'Browse & Connect',
      description: 'Students can search for tutors by subject, while tutors can showcase their expertise.'
    },
    {
      number: '03',
      title: 'Start Learning',
      description: 'Schedule sessions, communicate directly, and begin your educational journey.'
    }
  ];

  return (
    <div className="py-16 md:py-24 my-6 bg-gradient-to-b from-slate-100 to-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            How TutorConnect Works
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed py-5">
            We've created a seamless platform that makes finding quality education 
            as simple as a few clicks. Whether you're looking to learn or teach, 
            we've got you covered.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-slate-800">{step.number}</span>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-yellow-200 transform translate-x-8"></div>
                )}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutSection;
