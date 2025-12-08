"use client";
import Link from 'next/link';
import { FileText, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: [
      { label: 'Resume Builder', path: '/builder' },
      { label: 'ATS Checker', path: '/ats-checker' },
      { label: 'Templates', path: '/templates' },
      { label: 'Pricing', path: '/pricing' },
    ],
    Company: [
      { label: 'About Us', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Blog', path: '/blog' },
      { label: 'FAQs', path: '/faqs' },
    ],
    Resources: [
      { label: 'Career Advice', path: '/blog' },
      { label: 'Resume Examples', path: '/templates' },
      { label: 'Resume Tips', path: '/blog' },
      { label: 'Cover Letters', path: '/blog' },
    ],
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="font-headline text-xl font-bold">ResumeAI</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Create professional, ATS-optimized resumes in minutes with our AI-powered resume builder.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <span className="font-headline font-semibold text-lg mb-4 block">{category}</span>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={`${category}-${link.label}`}>
                    <Link
                      href={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
