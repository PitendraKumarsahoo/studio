"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const AboutPage = () => {
  const router = useRouter();
  
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower job seekers worldwide with AI-powered tools that simplify resume creation and improve their chances of landing dream jobs.',
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'We put our users first in everything we do, from design to functionality, ensuring the best possible experience.',
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain the highest standards of quality in our templates, ensuring they are professional, modern, and ATS-optimized.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate and improve our platform, leveraging the latest AI technology to stay ahead of the curve.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder' },
    { name: 'Michael Chen', role: 'CTO' },
    { name: 'Emily Rodriguez', role: 'Head of Product' },
    { name: 'David Kim', role: 'Lead Designer' },
  ];

  const stats = [
    { number: '100K+', label: 'Active Users' },
    { number: '500K+', label: 'Resumes Created' },
    { number: '18+', label: 'Templates' },
    { number: '95%', label: 'Success Rate' },
  ];

  const teamCollaborationImg = getPlaceholderImage('team-collaboration-1');
  const teamMemberImg = getPlaceholderImage('team-member-portrait-1');

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-headline text-4xl lg:text-6xl font-bold mb-6">About ResumeAI</h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              We're on a mission to revolutionize how people create resumes and advance their careers with the power of AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-headline text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-foreground/80 text-lg">
                <p>
                  ResumeAI was founded in 2023 with a simple goal: make professional resume creation accessible to everyone. We recognized that job seekers often struggle with formatting, content, and optimization—challenges that can make or break their job applications.
                </p>
                <p>
                  Our team of career experts, designers, and AI engineers came together to build a platform that combines beautiful design with intelligent automation. The result is a resume builder that not only looks great but actually helps you land more interviews.
                </p>
                <p>
                  Today, we're proud to serve over 100,000 active users worldwide, helping them create resumes that get results. But we're just getting started—we continue to innovate and add new features to stay ahead of the evolving job market.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Image className="rounded-2xl shadow-2xl w-full" alt="ResumeAI team collaborating" src={teamCollaborationImg.imageUrl} width={teamCollaborationImg.width} height={teamCollaborationImg.height} data-ai-hint={teamCollaborationImg.imageHint}/>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-card rounded-2xl shadow-lg"
              >
                <div className="font-headline text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl lg:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              These principles guide everything we do at ResumeAI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-background to-card border border-border"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-headline text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-foreground/80">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-3xl lg:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Passionate professionals dedicated to your career success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <Image
                    className="w-full aspect-square object-cover"
                    alt={`${member.name} - ${member.role}`}
                    src={teamMemberImg.imageUrl}
                    width={teamMemberImg.width}
                    height={teamMemberImg.height}
                    data-ai-hint={teamMemberImg.imageHint}
                   />
                </div>
                <h3 className="font-headline text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-foreground/80">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-headline text-3xl lg:text-4xl font-bold mb-6">
              Join Thousands of Successful Job Seekers
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start building your professional resume today with ResumeAI
            </p>
            <Button
              onClick={() => router.push('/builder')}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
            >
              Get Started Free
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
