"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'resume-tips', label: 'Resume Tips' },
    { id: 'career-advice', label: 'Career Advice' },
    { id: 'interviews', label: 'Interview Prep' },
    { id: 'job-search', label: 'Job Search' },
  ];

  const articles = [
    { id: 1, title: 'How to Write a Resume That Gets Past ATS Systems', excerpt: 'Learn the secrets to optimizing your resume for Applicant Tracking Systems and increasing your chances of landing interviews.', category: 'resume-tips', author: 'Sarah Johnson', date: '2025-11-20', readTime: '8 min read', imageId: 'blog-ats-scan' },
    { id: 2, title: '10 Common Resume Mistakes That Cost You Jobs', excerpt: 'Discover the most common resume mistakes that recruiters see and how to avoid them to stand out from the competition.', category: 'resume-tips', author: 'Michael Chen', date: '2025-11-18', readTime: '6 min read', imageId: 'blog-recruiter-review' },
    { id: 3, title: 'The Ultimate Guide to Career Change in 2025', excerpt: 'Thinking about switching careers? This comprehensive guide will help you navigate the transition successfully.', category: 'career-advice', author: 'Emily Rodriguez', date: '2025-11-15', readTime: '12 min read', imageId: 'blog-career-crossroads' },
    { id: 4, title: 'Mastering the Virtual Interview: Tips and Best Practices', excerpt: 'Remote interviews are here to stay. Learn how to prepare, present yourself professionally, and ace your next virtual interview.', category: 'interviews', author: 'David Kim', date: '2025-11-12', readTime: '10 min read', imageId: 'blog-virtual-interview' },
    { id: 5, title: 'How to Leverage LinkedIn for Your Job Search', excerpt: 'Unlock the power of LinkedIn with these proven strategies to network, find opportunities, and attract recruiters.', category: 'job-search', author: 'Jessica Liu', date: '2025-11-10', readTime: '9 min read', imageId: 'blog-linkedin-profile' },
    { id: 6, title: 'Crafting the Perfect Resume Summary Statement', excerpt: 'Your resume summary is often the first thing recruiters read. Make it count with these expert tips and examples.', category: 'resume-tips', author: 'Robert Taylor', date: '2025-11-08', readTime: '7 min read', imageId: 'blog-writing-summary' },
    { id: 7, title: 'Negotiating Your Salary: A Complete Guide', excerpt: 'Learn how to negotiate your salary effectively and get the compensation you deserve with confidence.', category: 'career-advice', author: 'Amanda White', date: '2025-11-05', readTime: '11 min read', imageId: 'blog-salary-negotiation' },
    { id: 8, title: 'Top Interview Questions and How to Answer Them', excerpt: 'Prepare for your next interview with these common questions and expert-recommended answers that impress hiring managers.', category: 'interviews', author: 'Chris Anderson', date: '2025-11-03', readTime: '15 min read', imageId: 'blog-interview-questions' },
    { id: 9, title: 'Building Your Personal Brand as a Professional', excerpt: 'Stand out in a competitive job market by developing and showcasing your unique personal brand.', category: 'career-advice', author: 'Nicole Martinez', date: '2025-11-01', readTime: '8 min read', imageId: 'blog-personal-branding' },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold mb-4">Career Blog</h1>
            <p className="text-xl text-foreground/80">
              Expert advice on resumes, career development, and job search strategies
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={selectedCategory === category.id ? 'bg-primary text-primary-foreground' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => {
                const img = getPlaceholderImage(article.imageId);
                return (
                  <motion.article
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        alt={article.title}
                        src={img.imageUrl}
                        width={img.width}
                        height={img.height}
                        data-ai-hint={img.imageHint}
                       />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <h2 className="font-headline text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">By {article.author}</span>
                        <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
