"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, CheckCircle, Zap, Shield, Users, Award, Star } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const HomePage = () => {
  const features = [
    { icon: Sparkles, title: 'AI-Powered Content', description: 'Generate professional resume content with advanced AI technology tailored to your career.' },
    { icon: Zap, title: 'Quick & Easy', description: 'Create a professional resume in minutes with our intuitive builder.' },
    { icon: CheckCircle, title: 'ATS-Optimized', description: 'Beat applicant tracking systems with intelligent formatting and keyword optimization.' },
    { icon: Shield, title: 'Privacy First', description: 'Your data is secure and private. We never share your information with third parties.' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Software Engineer', company: 'Google', content: 'This resume builder helped me land my dream job at Google. The AI suggestions were incredibly helpful!', rating: 5 },
    { name: 'Michael Chen', role: 'Marketing Manager', company: 'Amazon', content: 'The ATS checker gave me confidence that my resume would get past the initial screening. Highly recommend!', rating: 5 },
    { name: 'Emily Rodriguez', role: 'Product Designer', company: 'Apple', content: 'Beautiful templates and easy to use. I got 3 interview calls within a week of updating my resume!', rating: 5 },
  ];

  const heroImage = getPlaceholderImage('home-hero-make-com');

  return (
    <>
      <section className="bg-gradient-to-b from-blue-50/50 to-background py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-semibold text-sm mb-4">
                <Sparkles className="w-5 h-5" />
                AI-Powered Resume Builder
              </div>
              <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Create a <span className="text-blue-600">Professional</span> Resume in <span className="text-teal-500">Minutes</span>
              </h1>
              <p className="text-lg text-foreground/80 mb-8 max-w-xl">
                Build an ATS-optimized resume with AI-powered tools. Choose from 18+ professional templates and land your dream job faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link href="/builder">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                    Build My Resume
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-3xl blur-xl opacity-50"></div>
                <Image 
                  src={heroImage.imageUrl} 
                  alt={heroImage.description} 
                  width={heroImage.width} 
                  height={heroImage.height} 
                  data-ai-hint={heroImage.imageHint}
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="font-headline text-3xl lg:text-5xl font-bold mb-4">Why Choose ResumeAI?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Everything you need to create a professional, ATS-optimized resume that gets you hired.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="font-headline text-3xl lg:text-5xl font-bold mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Join thousands of successful job seekers who landed their dream jobs with ResumeAI.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-card p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="font-headline text-3xl lg:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that's right for you</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="p-8 rounded-2xl border-2 border-border hover:shadow-xl transition-shadow">
              <p className="text-lg font-semibold text-muted-foreground mb-2">Free</p>
              <p className="font-headline text-4xl font-bold mb-6">$0</p>
              <ul className="space-y-3 mb-8"><li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5" /><span className="text-muted-foreground">1 Resume</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5" /><span className="text-muted-foreground">Basic Templates</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5" /><span className="text-muted-foreground">PDF Export</span></li></ul>
              <Link href="/builder"><Button variant="outline" className="w-full">Get Started</Button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="p-8 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground relative transform md:scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
              <p className="text-lg font-semibold mb-2">Pro</p>
              <p className="font-headline text-4xl font-bold mb-6">$9.99<span className="text-lg">/mo</span></p>
              <ul className="space-y-3 mb-8"><li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-0.5" /><span>Unlimited Resumes</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-0.5" /><span>All Templates</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-0.5" /><span>AI Content Generation</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-0.5" /><span>ATS Checker</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 mr-2 mt-0.5" /><span>PDF & DOCX Export</span></li></ul>
              <Link href="/pricing"><Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">Upgrade Now</Button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="p-8 rounded-2xl border-2 border-border hover:shadow-xl transition-shadow">
              <p className="text-lg font-semibold text-muted-foreground mb-2">Annual</p>
              <p className="font-headline text-4xl font-bold mb-1">$79.99<span className="text-lg">/year</span></p>
              <p className="text-sm text-accent font-semibold mb-6">Save 33%</p>
              <ul className="space-y-3 mb-8"><li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5" /><span className="text-muted-foreground">Everything in Pro</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5" /><span className="text-muted-foreground">Priority Support</span></li><li className="flex items-start"><CheckCircle className="w-5 h-5 text-accent mr-2 mt-0.5" /><span className="text-muted-foreground">Early Access Features</span></li></ul>
              <Link href="/pricing"><Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">Choose Annual</Button></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-headline text-3xl lg:text-5xl font-bold mb-6">Ready to Build Your Perfect Resume?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of successful job seekers and create your professional resume today.</p>
            <Link href="/builder"><Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold">Get Started Free</Button></Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
