"use client";
import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Linkedin, Link as LinkIcon } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/placeholder-images';

type PersonalInfo = {
  fullName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  photo?: string;
};

type Experience = {
  id: number;
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
};

type Education = {
  id: number;
  school?: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
};

type Skill = {
  id: number;
  name: string;
};

type Project = {
    id: number;
    name: string;
    description?: string;
    link?: string;
};

type Certification = {
    id: number;
    name: string;
    authority?: string;
    date?: string;
};

type Language = {
    id: number;
    name: string;
    proficiency?: string;
};

type ResumeData = {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
};

interface TemplateProps {
  data: ResumeData;
  color: string;
  variant?: string;
}

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (e) {
    return '';
  }
};

const SafeData = (data: Partial<ResumeData>): ResumeData => ({
  personalInfo: data.personalInfo || {},
  summary: data.summary || '',
  experience: data.experience || [],
  education: data.education || [],
  skills: data.skills || [],
  projects: data.projects || [],
  certifications: data.certifications || [],
  languages: data.languages || [],
});

const TemplateWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg ${className}`} style={{ width: '210mm', minHeight: '297mm' }}>
    {children}
  </div>
);

const Primo: React.FC<TemplateProps> = ({ data, color, variant }) => {
  const { personalInfo, summary, experience, education, skills, projects } = SafeData(data);
  const isVariant = variant === 'blue';

  return (
    <TemplateWrapper className="p-8 font-sans">
      <header className={`mb-8 pb-4 border-b-2 ${isVariant ? 'text-center' : ''}`} style={{ borderColor: color }}>
        <h1 className={`font-bold ${isVariant ? 'text-4xl' : 'text-5xl'}`} style={{ color }}>{personalInfo.fullName || 'Your Name'}</h1>
        <p className={`text-lg ${isVariant ? '' : 'font-light'}`} style={{ color }}>{personalInfo.jobTitle || 'Professional Title'}</p>
        <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-3 ${isVariant ? 'justify-center' : ''}`}>
          {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={12} />{personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={12} />{personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1.5"><MapPin size={12} />{personalInfo.location}</div>}
        </div>
      </header>
      <main>
        {summary && <section className="mb-6"><h2 className="text-lg font-bold mb-2 uppercase tracking-wider" style={{ color }}>Summary</h2><p className="text-sm text-gray-700 leading-relaxed">{summary}</p></section>}
        {experience.length > 0 && <section className="mb-6"><h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color }}>Experience</h2>{experience.map(exp => (
          <div key={exp.id} className="mb-4"><h3 className="font-semibold">{exp.position || 'Position'}</h3><div className="flex justify-between text-sm italic"><p>{exp.company || 'Company'}</p><p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p></div><p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p></div>
        ))}</section>}
        {projects.length > 0 && <section className="mb-6"><h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color }}>Projects</h2>{projects.map(proj => (
          <div key={proj.id} className="mb-4"><h3 className="font-semibold">{proj.name || 'Project Name'}</h3>{proj.link && <a href={proj.link} className="text-xs text-gray-500 flex items-center gap-1"><LinkIcon size={10} />{proj.link}</a>}<p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{proj.description}</p></div>
        ))}</section>}
        {education.length > 0 && <section className="mb-6"><h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color }}>Education</h2>{education.map(edu => (
          <div key={edu.id} className="mb-2"><div className="flex justify-between"><h3 className="font-semibold">{edu.degree || 'Degree'}</h3><p className="text-sm italic">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p></div><p className="text-sm">{edu.school || 'School'} - {edu.field || 'Field of Study'}</p></div>
        ))}</section>}
        {skills.length > 0 && <section><h2 className="text-lg font-bold mb-3 uppercase tracking-wider" style={{ color }}>Skills</h2><div className="flex flex-wrap gap-2">{skills.map(skill => (
          <span key={skill.id} className="px-3 py-1 rounded text-xs font-medium" style={{ backgroundColor: `${color}20`, color }}>{skill.name}</span>
        ))}</div></section>}
      </main>
    </TemplateWrapper>
  );
};

const Diamond: React.FC<TemplateProps> = ({ data, color, variant }) => {
  const { personalInfo, summary, experience, education, skills } = SafeData(data);
  const isVariant = variant === 'green';
  const profilePic = getPlaceholderImage('template-profile-picture');
  const imageSrc = personalInfo.photo || profilePic.imageUrl;

  return (
    <TemplateWrapper className="flex">
      <div className={`w-1/3 text-white p-6 ${isVariant ? 'bg-gray-800' : ''}`} style={!isVariant ? { backgroundColor: color } : {}}>
        <div className="text-center mb-8">
            <Image className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white object-cover" alt="Profile picture" src={imageSrc} width={profilePic.width} height={profilePic.height} data-ai-hint={profilePic.imageHint}/>
            <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
            <p className="text-sm font-light">{personalInfo.jobTitle || 'Professional Title'}</p>
        </div>
        <div className="space-y-3 text-xs">
            <h2 className="text-lg font-semibold border-b border-white/30 pb-1 mb-2">Contact</h2>
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} />{personalInfo.email}</div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} />{personalInfo.phone}</div>}
            {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={14} />{personalInfo.location}</div>}
            {personalInfo.website && <div className="flex items-center gap-2"><Globe size={14} />{personalInfo.website}</div>}
        </div>
        {skills.length > 0 && <div className="mt-6"><h2 className="text-lg font-semibold border-b border-white/30 pb-1 mb-2">Skills</h2><ul className="list-disc list-inside text-sm">{skills.map(skill => <li key={skill.id}>{skill.name}</li>)}</ul></div>}
      </div>
      <div className="w-2/3 p-8">
        {summary && <section className="mb-6"><h2 className="text-2xl font-bold mb-2" style={{ color }}>Summary</h2><p className="text-sm text-gray-700 leading-relaxed">{summary}</p></section>}
        {experience.length > 0 && <section className="mb-6"><h2 className="text-2xl font-bold mb-3" style={{ color }}>Experience</h2>{experience.map(exp => (
          <div key={exp.id} className="mb-4"><h3 className="text-lg font-semibold">{exp.position || 'Position'}</h3><div className="flex justify-between text-sm italic"><p>{exp.company || 'Company'}</p><p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p></div><p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p></div>
        ))}</section>}
        {education.length > 0 && <section><h2 className="text-2xl font-bold mb-3" style={{ color }}>Education</h2>{education.map(edu => (
          <div key={edu.id} className="mb-2"><h3 className="text-lg font-semibold">{edu.degree || 'Degree'}</h3><p className="text-sm italic">{edu.school || 'School'}</p><p className="text-sm">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p></div>
        ))}</section>}
      </div>
    </TemplateWrapper>
  );
};

const Cascade: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, certifications } = SafeData(data);
    const isVariant = variant === 'purple';
    return (
        <TemplateWrapper className="p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-center" style={{ color }}>{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-center text-lg">{personalInfo.jobTitle || 'Professional Title'}</p>
                {summary && <p className="text-center text-sm text-gray-600 mt-4 max-w-2xl mx-auto">{summary}</p>}
            </header>
            <div className={`border-t-2 pt-6 ${isVariant ? 'grid grid-cols-3 gap-8' : ''}`} style={{ borderColor: color }}>
                <div className={`${isVariant ? 'col-span-1' : 'mb-6'}`}>
                    <h2 className="text-xl font-bold mb-3" style={{ color }}>Contact</h2>
                    <div className="space-y-1 text-sm">{personalInfo.email && <p>{personalInfo.email}</p>}{personalInfo.phone && <p>{personalInfo.phone}</p>}{personalInfo.location && <p>{personalInfo.location}</p>}</div>
                    {skills.length > 0 && <div className="mt-4"><h2 className="text-xl font-bold mb-2" style={{ color }}>Skills</h2><div className="flex flex-wrap gap-2">{skills.map(skill => <span key={skill.id} className="text-xs bg-gray-200 px-2 py-1 rounded">{skill.name}</span>)}</div></div>}
                    {education.length > 0 && <div className="mt-4"><h2 className="text-xl font-bold mb-2" style={{ color }}>Education</h2>{education.map(edu => <div key={edu.id} className="text-sm mb-1"><h3 className="font-semibold">{edu.degree}</h3><p>{edu.school}</p></div>)}</div>}
                    {certifications.length > 0 && <div className="mt-4"><h2 className="text-xl font-bold mb-2" style={{ color }}>Certifications</h2>{certifications.map(cert => <div key={cert.id} className="text-sm"><p className="font-semibold">{cert.name}</p></div>)}</div>}
                </div>
                <main className={`${isVariant ? 'col-span-2' : ''}`}>
                    <h2 className="text-xl font-bold mb-4" style={{ color }}>Work Experience</h2>
                    <div className="relative border-l-2 pl-6 space-y-8" style={{ borderColor: color }}>
                        {experience.map((exp) => (
                            <div key={exp.id} className="relative">
                                <div className="absolute -left-[35px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                                <p className="absolute -left-24 top-0 text-xs text-gray-500 w-20 text-right">{formatDate(exp.startDate)}</p>
                                <h3 className="font-bold text-lg">{exp.position || 'Position'}</h3>
                                <p className="italic text-gray-600">{exp.company || 'Company'}</p>
                                <p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </TemplateWrapper>
    );
};

const Concept: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, projects } = SafeData(data);
    const isVariant = variant === 'teal';
    return (
        <TemplateWrapper>
            <header className="flex items-stretch">
                <div className="w-2/3 p-8">
                    <h1 className={`text-6xl font-extrabold ${isVariant ? 'text-right' : ''}`}>{personalInfo.fullName ? personalInfo.fullName.split(' ')[0] : 'Your'}</h1>
                    <h1 className={`text-6xl font-extrabold ${isVariant ? 'text-right' : ''}`}>{personalInfo.fullName ? personalInfo.fullName.split(' ').slice(1).join(' ') : 'Name'}</h1>
                    <p className={`border-t-2 mt-2 pt-2 text-xl ${isVariant ? 'text-right' : ''}`} style={{ borderColor: color }}>{personalInfo.jobTitle || 'Professional Title'}</p>
                </div>
                <div className="w-1/3 p-6 text-white text-xs" style={{ backgroundColor: color }}>
                    <h2 className="font-bold text-lg mb-2">CONTACT</h2>
                    {personalInfo.email && <p className="mb-1 truncate">{personalInfo.email}</p>}
                    {personalInfo.phone && <p className="mb-1">{personalInfo.phone}</p>}
                    {personalInfo.location && <p>{personalInfo.location}</p>}
                </div>
            </header>
            <main className="p-8">
                {summary && <section className="mb-6"><h2 className="text-lg font-bold mb-2 uppercase" style={{ color }}>Summary</h2><p className="text-sm text-gray-700">{summary}</p></section>}
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        {experience.length > 0 && <section><h2 className="text-lg font-bold mb-3 uppercase" style={{ color }}>Experience</h2>{experience.map(exp => (
                            <div key={exp.id} className="mb-4"><h3 className="font-semibold">{exp.position} at {exp.company}</h3><p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p><p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p></div>
                        ))}</section>}
                        {projects.length > 0 && <section className="mt-6"><h2 className="text-lg font-bold mb-3 uppercase" style={{ color }}>Projects</h2>{projects.map(proj => <div key={proj.id} className="mb-2"><h3 className="font-semibold text-sm">{proj.name}</h3><p className="text-xs">{proj.description}</p></div>)}</section>}
                    </div>
                    <div>
                         {education.length > 0 && <section className="mb-6"><h2 className="text-lg font-bold mb-3 uppercase" style={{ color }}>Education</h2>{education.map(edu => <div key={edu.id}><h3 className="font-semibold text-sm">{edu.degree}</h3><p className="text-xs">{edu.school}</p></div>)}</section>}
                        {skills.length > 0 && <section><h2 className="text-lg font-bold mb-3 uppercase" style={{ color }}>Skills</h2><ul className="list-disc list-inside text-sm">{skills.map(skill => <li key={skill.id}>{skill.name}</li>)}</ul></section>}
                    </div>
                </div>
            </main>
        </TemplateWrapper>
    );
};

const Muse: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, certifications } = SafeData(data);
    return (
        <TemplateWrapper className="p-10 font-serif">
            <header className="text-center mb-8">
                <div className="inline-block p-2 border-2" style={{ borderColor: color }}>
                    <h1 className="text-4xl font-bold tracking-widest">{personalInfo.fullName || 'Your Name'}</h1>
                </div>
                <p className="text-lg mt-2">{personalInfo.jobTitle || 'Professional Title'}</p>
            </header>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 space-y-6">
                    <div><h2 className="text-lg font-bold mb-2" style={{ color }}>CONTACT</h2><div className="text-sm space-y-1">{personalInfo.email && <p>{personalInfo.email}</p>}{personalInfo.phone && <p>{personalInfo.phone}</p>}{personalInfo.location && <p>{personalInfo.location}</p>}</div></div>
                    {education.length > 0 && <div><h2 className="text-lg font-bold mb-2" style={{ color }}>EDUCATION</h2>{education.map(edu => <div key={edu.id} className="text-sm"><h3 className="font-semibold">{edu.degree}</h3><p>{edu.school}</p></div>)}</div>}
                    {skills.length > 0 && <div><h2 className="text-lg font-bold mb-2" style={{ color }}>SKILLS</h2><div className="text-sm space-y-1">{skills.map(skill => <p key={skill.id}>{skill.name}</p>)}</div></div>}
                    {certifications.length > 0 && <div><h2 className="text-lg font-bold mb-2" style={{ color }}>CERTIFICATIONS</h2><div className="text-sm space-y-1">{certifications.map(cert => <p key={cert.id}>{cert.name}</p>)}</div></div>}
                </div>
                <div className="col-span-8">
                    {summary && <section className="mb-6"><h2 className="text-lg font-bold mb-2" style={{ color }}>PROFILE</h2><p className="text-sm text-gray-700">{summary}</p></section>}
                    {experience.length > 0 && <section><h2 className="text-lg font-bold mb-3" style={{ color }}>EXPERIENCE</h2>{experience.map(exp => (
                        <div key={exp.id} className="mb-4"><h3 className="text-base font-semibold">{exp.position} | {exp.company}</h3><p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p><p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p></div>
                    ))}</section>}
                </div>
            </div>
        </TemplateWrapper>
    );
};


const Iconic: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, projects } = SafeData(data);
    return (
        <TemplateWrapper className="flex">
            <div className="w-1/3 p-6" style={{ backgroundColor: color }}>
                <h1 className="text-3xl font-bold text-white">{personalInfo.fullName || 'Your Name'}</h1>
                <p className="text-white/80">{personalInfo.jobTitle}</p>
                <hr className="my-6 border-white/30"/>
                <div className="space-y-4 text-white text-sm">
                    <h2 className="font-bold">CONTACT</h2>
                    <p>{personalInfo.email}</p><p>{personalInfo.phone}</p><p>{personalInfo.location}</p>
                </div>
                {education.length > 0 && <div className="mt-6 space-y-2 text-white text-sm"><h2 className="font-bold">EDUCATION</h2>{education.map(edu => <div key={edu.id}><p className="font-semibold">{edu.degree}</p><p className="text-xs">{edu.school}</p></div>)}</div>}
                {skills.length > 0 && <div className="mt-6 space-y-1 text-white text-sm"><h2 className="font-bold">SKILLS</h2>{skills.map(s => <p key={s.id}>{s.name}</p>)}</div>}
            </div>
            <div className="w-2/3 p-8">
                {summary && <section className="mb-6"><h2 className="text-xl font-bold border-b-2 pb-1" style={{borderColor: color}}>SUMMARY</h2><p className="text-sm mt-2">{summary}</p></section>}
                {experience.length > 0 && <section><h2 className="text-xl font-bold border-b-2 pb-1" style={{borderColor: color}}>EXPERIENCE</h2>{experience.map(exp => (
                    <div key={exp.id} className="mt-3"><h3 className="font-semibold text-lg">{exp.position}</h3><p className="italic text-sm text-gray-600">{exp.company} / {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p><p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p></div>
                ))}</section>}
                {projects.length > 0 && <section className="mt-6"><h2 className="text-xl font-bold border-b-2 pb-1" style={{borderColor: color}}>PROJECTS</h2>{projects.map(proj => (
                    <div key={proj.id} className="mt-3"><h3 className="font-semibold text-lg">{proj.name}</h3><p className="text-sm mt-1 whitespace-pre-line">{proj.description}</p></div>
                ))}</section>}
            </div>
        </TemplateWrapper>
    );
};

const Influx: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, projects } = SafeData(data);
    return (
        <TemplateWrapper className="relative p-8">
            <div className="absolute top-0 left-0 bottom-0 w-1/3" style={{ backgroundColor: `${color}20` }}></div>
            <div className="relative z-10 grid grid-cols-3 gap-8">
                <div className="col-span-1 space-y-8">
                    <h1 className="text-4xl font-bold" style={{color}}>{personalInfo.fullName}</h1>
                    <div><h2 className="font-bold">CONTACT</h2><div className="text-sm space-y-1">{personalInfo.email && <p>{personalInfo.email}</p>}{personalInfo.phone && <p>{personalInfo.phone}</p>}{personalInfo.location && <p>{personalInfo.location}</p>}</div></div>
                    {education.length > 0 && <div><h2 className="font-bold">EDUCATION</h2>{education.map(edu => <div key={edu.id} className="text-sm"><h3 className="font-semibold">{edu.degree}</h3><p>{edu.school}</p></div>)}</div>}
                    {skills.length > 0 && <div><h2 className="font-bold">SKILLS</h2><div className="text-sm space-y-1">{skills.map(s => <p key={s.id}>{s.name}</p>)}</div></div>}
                </div>
                <div className="col-span-2">
                    {summary && <section className="mb-6"><h2 className="text-xl font-bold mb-2">SUMMARY</h2><p className="text-sm">{summary}</p></section>}
                    {experience.length > 0 && <section><h2 className="text-xl font-bold mb-3">EXPERIENCE</h2>{experience.map(exp => (
                        <div key={exp.id} className="mb-4"><h3 className="font-semibold">{exp.position} at {exp.company}</h3><p className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p><p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p></div>
                    ))}</section>}
                    {projects.length > 0 && <section className="mt-6"><h2 className="text-xl font-bold mb-3">PROJECTS</h2>{projects.map(proj => (
                        <div key={proj.id} className="mb-4"><h3 className="font-semibold">{proj.name}</h3><p className="text-sm mt-1 whitespace-pre-line">{proj.description}</p></div>
                    ))}</section>}
                </div>
            </div>
        </TemplateWrapper>
    );
};

const Modern: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, projects } = SafeData(data);
    return (
        <TemplateWrapper className="p-10">
            <header className="mb-8"><h1 className="text-5xl font-thin tracking-wider uppercase">{personalInfo.fullName}</h1><p className="text-lg" style={{color}}>{personalInfo.jobTitle}</p></header>
            <main className="grid grid-cols-3 gap-10">
                <div className="col-span-2">
                    {summary && <section className="mb-6"><h2 className="font-bold text-lg mb-2">PROFILE</h2><p className="text-sm">{summary}</p></section>}
                    {experience.length > 0 && <section><h2 className="font-bold text-lg mb-3">EXPERIENCE</h2>{experience.map(exp => <div key={exp.id} className="mb-4"><h3 className="font-semibold">{exp.position}</h3><p className="text-sm italic">{exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p><p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p></div>)}</section>}
                    {projects.length > 0 && <section className="mt-6"><h2 className="font-bold text-lg mb-3">PROJECTS</h2>{projects.map(proj => <div key={proj.id} className="mb-4"><h3 className="font-semibold">{proj.name}</h3><p className="text-sm mt-1 whitespace-pre-line">{proj.description}</p></div>)}</section>}
                </div>
                <div className="col-span-1 space-y-6 text-sm">
                    <div><h2 className="font-bold text-lg mb-2">CONTACT</h2>{personalInfo.email && <p>{personalInfo.email}</p>}{personalInfo.phone && <p>{personalInfo.phone}</p>}{personalInfo.location && <p>{personalInfo.location}</p>}</div>
                    {education.length > 0 && <div><h2 className="font-bold text-lg mb-2">EDUCATION</h2>{education.map(edu => <div key={edu.id}><h3 className="font-semibold">{edu.degree}</h3><p>{edu.school}</p></div>)}</div>}
                    {skills.length > 0 && <div><h2 className="font-bold text-lg mb-2">SKILLS</h2>{skills.map(s => <p key={s.id}>{s.name}</p>)}</div>}
                </div>
            </main>
        </TemplateWrapper>
    );
};

const Minimo: React.FC<TemplateProps> = ({ data, color, variant }) => {
    const { personalInfo, summary, experience, education, skills, projects } = SafeData(data);
    return (
        <TemplateWrapper className="p-12 font-mono text-sm">
            <header className="mb-6"><h1 className="text-2xl font-bold">{personalInfo.fullName}</h1><div className="flex gap-4 text-xs">{personalInfo.email && <p>{personalInfo.email}</p>}{personalInfo.phone && <p>{personalInfo.phone}</p>}</div></header>
            {summary && <section className="mb-5"><h2 className="font-bold uppercase tracking-widest mb-1" style={{color}}>Summary</h2><p>{summary}</p></section>}
            {experience.length > 0 && <section className="mb-5"><h2 className="font-bold uppercase tracking-widest mb-2" style={{color}}>Experience</h2>{experience.map(exp => <div key={exp.id} className="mb-3"><h3 className="font-bold">{exp.position}, {exp.company}</h3><p className="text-xs">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p><div className="whitespace-pre-line mt-1">{exp.description}</div></div>)}</section>}
            {projects.length > 0 && <section className="mb-5"><h2 className="font-bold uppercase tracking-widest mb-2" style={{color}}>Projects</h2>{projects.map(proj => <div key={proj.id} className="mb-3"><h3 className="font-bold">{proj.name}</h3><div className="whitespace-pre-line mt-1">{proj.description}</div></div>)}</section>}
            {education.length > 0 && <section className="mb-5"><h2 className="font-bold uppercase tracking-widest mb-2" style={{color}}>Education</h2>{education.map(edu => <div key={edu.id} className="mb-2"><h3 className="font-bold">{edu.degree}, {edu.school}</h3><p className="text-xs">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p></div>)}</section>}
            {skills.length > 0 && <section><h2 className="font-bold uppercase tracking-widest mb-2" style={{color}}>Skills</h2><p>{skills.map(s => s.name).join(', ')}</p></section>}
        </TemplateWrapper>
    );
};

const Academic: React.FC<TemplateProps> = ({ data, color }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = SafeData(data);
  return (
    <TemplateWrapper className="p-[1in]" style={{ fontFamily: 'Times, serif' }}>
      <header className="text-center mb-4">
        <h1 className="text-2xl font-bold">{personalInfo.fullName || 'Your Name'}</h1>
        <p className="text-sm">
          {personalInfo.location}
          {personalInfo.email && ` | ${personalInfo.email}`}
          {personalInfo.phone && ` | ${personalInfo.phone}`}
          {personalInfo.linkedin && ` | ${personalInfo.linkedin}`}
        </p>
      </header>
      <hr className="mb-4"/>

      {summary && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-2">SUMMARY</h2>
          <p className="text-sm leading-relaxed">{summary}</p>
        </section>
      )}
      <hr className="mb-4"/>
      
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-2">EXPERIENCE</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold">{exp.position}</h3>
                <p className="text-sm">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
              </div>
              <p className="text-sm italic mb-1">{exp.company}</p>
              <div className="pl-4 text-sm">
                {(exp.description || '').split('\n').filter(line => line.trim()).map((line, i) => (
                    <p key={i} className="before:content-['•'] before:mr-2">{line.replace(/^•\s*/, '')}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
       <hr className="mb-4"/>

      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-2">EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline mb-1">
              <div>
                <h3 className="text-sm font-bold">{edu.school}</h3>
                <p className="text-sm">{edu.degree}{edu.field && `, ${edu.field}`}</p>
              </div>
              <p className="text-sm">{formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}</p>
            </div>
          ))}
        </section>
      )}
      <hr className="mb-4"/>

      {projects.length > 0 && (
        <section className="mb-4">
            <h2 className="text-base font-bold mb-2">PROJECTS</h2>
            {projects.map(proj => (
                <div key={proj.id} className="mb-3">
                    <h3 className="text-sm font-bold">{proj.name}</h3>
                    {proj.link && <a href={proj.link} className="text-sm text-blue-600 italic">{proj.link}</a>}
                    <div className="pl-4 text-sm">
                        {(proj.description || '').split('\n').filter(line => line.trim()).map((line, i) => (
                            <p key={i} className="before:content-['•'] before:mr-2">{line.replace(/^•\s*/, '')}</p>
                        ))}
                    </div>
                </div>
            ))}
        </section>
      )}
      <hr className="mb-4"/>
      
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-base font-bold mb-2">SKILLS</h2>
          <p className="text-sm">{skills.map(skill => skill.name).join(' | ')}</p>
        </section>
      )}
      <hr className="mb-4"/>

      {certifications.length > 0 && (
        <section className="mb-4">
            <h2 className="text-base font-bold mb-2">CERTIFICATIONS</h2>
            {certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline mb-1 text-sm">
                    <p><span className="font-bold">{cert.name}</span>, {cert.authority}</p>
                    <p>{formatDate(cert.date)}</p>
                </div>
            ))}
        </section>
      )}
      
    </TemplateWrapper>
  );
};


const templatesMap: { [key: string]: React.FC<TemplateProps> } = {
    primo: (props) => <Primo {...props} />,
    diamond: (props) => <Diamond {...props} />,
    cascade: (props) => <Cascade {...props} />,
    concept: (props) => <Concept {...props} />,
    muse: (props) => <Muse {...props} />,
    iconic: (props) => <Iconic {...props} />,
    influx: (props) => <Influx {...props} />,
    modern: (props) => <Modern {...props} />,
    minimo: (props) => <Minimo {...props} />,
    academic: (props) => <Academic {...props} />,
    'primo-blue': (props) => <Primo {...props} variant="blue" />,
    'diamond-green': (props) => <Diamond {...props} variant="green" />,
    'cascade-purple': (props) => <Cascade {...props} variant="purple" />,
    'concept-teal': (props) => <Concept {...props} variant="teal" />,
    'muse-coral': (props) => <Muse {...props} variant="coral" />,
    'iconic-navy': (props) => <Iconic {...props} variant="navy" />,
    'influx-red': (props) => <Influx {...props} variant="red" />,
    'modern-gray': (props) => <Modern {...props} variant="gray" />,
    'minimo-black': (props) => <Minimo {...props} variant="black" />,
};

interface ResumePreviewProps {
    template: string;
    color: string;
    data: Partial<ResumeData>;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, color, data }) => {
    const TemplateComponent = templatesMap[template] || templatesMap.primo;
    return <TemplateComponent data={SafeData(data)} color={color} />;
};

export default ResumePreview;
