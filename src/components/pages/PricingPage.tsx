"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const PricingPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const plans = [
    {
      name: 'Free', price: '$0', period: 'forever', description: 'Perfect for getting started',
      features: [
        { text: '1 Resume', included: true },
        { text: 'Basic Templates (3)', included: true },
        { text: 'PDF Export', included: true },
        { text: 'Basic Formatting', included: true },
        { text: 'AI Content Generation', included: false },
        { text: 'ATS Checker', included: false },
        { text: 'Premium Templates', included: false },
        { text: 'DOCX Export', included: false },
        { text: 'Priority Support', included: false },
      ],
      cta: 'Get Started', highlighted: false,
    },
    {
      name: 'Pro', price: '$9.99', period: 'per month', description: 'For serious job seekers',
      features: [
        { text: 'Unlimited Resumes', included: true },
        { text: 'All Templates (18+)', included: true },
        { text: 'PDF & DOCX Export', included: true },
        { text: 'AI Content Generation', included: true },
        { text: 'ATS Checker', included: true },
        { text: 'Custom Colors', included: true },
        { text: 'Advanced Formatting', included: true },
        { text: 'Email Support', included: true },
        { text: 'Priority Support', included: false },
      ],
      cta: 'Upgrade to Pro', highlighted: true,
    },
    {
      name: 'Annual', price: '$79.99', period: 'per year', description: 'Best value - Save 33%', badge: 'Best Value',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: '2 Months Free', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Early Access Features', included: true },
        { text: 'Career Coaching (1 session)', included: true },
        { text: 'LinkedIn Optimization Guide', included: true },
        { text: 'Interview Preparation Pack', included: true },
        { text: 'Lifetime Updates', included: true },
        { text: 'Money Back Guarantee', included: true },
      ],
      cta: 'Choose Annual', highlighted: false,
    },
  ];

  const comparisonFeatures = [
    { category: 'Resume Creation', features: [{ name: 'Number of Resumes', free: '1', pro: 'Unlimited', annual: 'Unlimited' }, { name: 'Templates Available', free: '3 Basic', pro: '18+ All', annual: '18+ All' }, { name: 'Custom Colors', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'Custom Sections', free: 'Limited', pro: 'Yes', annual: 'Yes' }] },
    { category: 'AI Features', features: [{ name: 'AI Content Generation', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'AI Summary Writing', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'AI Skills Suggestions', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'AI Experience Descriptions', free: 'No', pro: 'Yes', annual: 'Yes' }] },
    { category: 'Export & Tools', features: [{ name: 'PDF Export', free: 'Yes', pro: 'Yes', annual: 'Yes' }, { name: 'DOCX Export', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'ATS Checker', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'Keyword Optimization', free: 'No', pro: 'Yes', annual: 'Yes' }] },
    { category: 'Support & Extras', features: [{ name: 'Email Support', free: 'No', pro: 'Yes', annual: 'Yes' }, { name: 'Priority Support', free: 'No', pro: 'No', annual: 'Yes' }, { name: 'Career Resources', free: 'Limited', pro: 'Full', annual: 'Full + Extra' }, { name: 'Money Back Guarantee', free: 'N/A', pro: 'No', annual: 'Yes' }] },
  ];

  const handleSelectPlan = (planName: string) => {
    toast({
      title: `${planName} Plan Selected`,
      description: "You're on your way to success!",
      duration: 3000,
    });
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-16">
            <h1 className="font-headline text-4xl lg:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-foreground/80">Choose the plan that's right for you</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20 items-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${plan.highlighted ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-2xl lg:scale-110' : 'bg-card shadow-lg'}`}
              >
                {plan.badge && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">{plan.badge}</div>}
                <div className="mb-6">
                  <h3 className={`font-headline text-2xl font-bold mb-2 ${plan.highlighted ? '' : 'text-foreground'}`}>{plan.name}</h3>
                  <div className="mb-2">
                    <span className="font-headline text-4xl font-bold">{plan.price}</span>
                    <span className={`text-lg ml-2 ${plan.highlighted ? 'opacity-90' : 'text-muted-foreground'}`}>{plan.period}</span>
                  </div>
                  <p className={plan.highlighted ? 'opacity-90' : 'text-muted-foreground'}>{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? <CheckCircle className={`w-5 h-5 mr-3 mt-0.5 shrink-0 ${plan.highlighted ? '' : 'text-accent'}`} /> : <X className={`w-5 h-5 mr-3 mt-0.5 shrink-0 ${plan.highlighted ? 'opacity-50' : 'text-muted-foreground'}`} />}
                      <span className={feature.included ? '' : 'opacity-50'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <Button onClick={() => handleSelectPlan(plan.name)} className={`w-full ${plan.highlighted ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>{plan.cta}</Button>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Detailed Feature Comparison</h2>
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Features</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Free</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground bg-primary/10">Pro</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Annual</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {comparisonFeatures.map((category) => (
                      <React.Fragment key={category.category}>
                        <tr className="bg-secondary/30">
                          <td colSpan={4} className="px-6 py-3 text-sm font-semibold text-foreground">{category.category}</td>
                        </tr>
                        {category.features.map((feature) => (
                          <tr key={feature.name}>
                            <td className="px-6 py-4 text-sm text-foreground">{feature.name}</td>
                            <td className="px-6 py-4 text-center text-sm text-muted-foreground">{feature.free}</td>
                            <td className="px-6 py-4 text-center text-sm font-semibold bg-primary/5 text-primary">{feature.pro}</td>
                            <td className="px-6 py-4 text-center text-sm text-muted-foreground">{feature.annual}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-primary-foreground text-center">
            <h2 className="font-headline text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl mb-8 opacity-90">Our team is here to help you choose the right plan</p>
            <Button onClick={() => router.push('/contact')} className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8">Contact Us</Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
