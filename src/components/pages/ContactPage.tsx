"use client";
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: '📧 Message Sent!',
      description: "We'll get back to you within 24 hours.",
      duration: 3000,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const mapImage = getPlaceholderImage('contact-office-map');

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-foreground/80">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-card rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="font-headline text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="John Doe" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="john@example.com" required />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" value={formData.subject} onChange={(e) => handleChange('subject', e.target.value)} placeholder="How can we help?" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="Tell us more about your inquiry..." rows={6} required />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg p-8 text-primary-foreground">
                <h3 className="font-headline text-xl font-bold mb-6">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-6 h-6 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="opacity-90">support@resumeai.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-6 h-6 mt-1" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="opacity-90">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 mt-1" />
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="opacity-90">123 Career Street<br />San Francisco, CA 94102</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card rounded-2xl shadow-lg p-8">
                <h2 className="font-headline text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">How do I get started?</h3>
                    <p className="text-muted-foreground">Simply click "Build My Resume" and start entering your information. Our intuitive builder guides you through each step.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Can I edit my resume later?</h3>
                    <p className="text-muted-foreground">Yes! Your resume is automatically saved in your browser. You can return anytime to make updates.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Is there a free version?</h3>
                    <p className="text-muted-foreground">Yes, we offer a free plan that includes 1 resume and 3 basic templates. Upgrade to Pro for unlimited resumes and AI features.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">What file formats can I export?</h3>
                    <p className="text-muted-foreground">Free users can export to PDF. Pro users can export to both PDF and DOCX formats.</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg h-[400px]">
                <Image src={mapImage.imageUrl} alt="Office location map" layout="fill" objectFit="cover" data-ai-hint={mapImage.imageHint}/>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
