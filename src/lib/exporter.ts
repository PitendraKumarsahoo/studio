import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

// --- PDF EXPORT ---
export const exportToPDF = async (element: HTMLElement, fileName: string = 'resume') => {
  if (!element) {
    throw new Error("Element to capture is not defined.");
  }

  // Find the actual resume component inside the scaled container.
  const resumeElement = element.firstChild as HTMLElement;
  if (!resumeElement) {
    throw new Error("Resume content not found for PDF export.");
  }

  const canvas = await html2canvas(resumeElement, {
    scale: 2, // A good balance of quality and performance
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL('image/png');
  
  // A4 paper size in mm
  const A4_WIDTH = 210;
  const A4_HEIGHT = 297;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const canvasAspectRatio = canvas.width / canvas.height;
  const a4AspectRatio = A4_WIDTH / A4_HEIGHT;

  let pdfWidth, pdfHeight;

  if (canvasAspectRatio > a4AspectRatio) {
    pdfWidth = A4_WIDTH;
    pdfHeight = A4_WIDTH / canvasAspectRatio;
  } else {
    pdfHeight = A4_HEIGHT;
    pdfWidth = A4_HEIGHT * canvasAspectRatio;
  }

  // Center the image on the page
  const xOffset = (A4_WIDTH - pdfWidth) / 2;
  const yOffset = (A4_HEIGHT - pdfHeight) / 2;
  
  pdf.addImage(imgData, 'PNG', xOffset, yOffset, pdfWidth, pdfHeight);
  pdf.save(`${(fileName || 'resume').replace(/\s+/g, '_')}.pdf`);
};

// --- DOCX EXPORT ---
const formatDateForDocx = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const exportToDOCX = async (data: any) => {
  const { personalInfo, summary, experience, education, skills } = data;

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({
          text: personalInfo.fullName || 'Your Name',
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          text: `${personalInfo.jobTitle || 'Professional Title'}`,
        }),
        new Paragraph({ text: '' }),
        new Paragraph({
          text: `${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.location || ''}`,
        }),
        new Paragraph({
          text: `${personalInfo.website || ''} | ${personalInfo.linkedin || ''}`,
        }),
        
        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          text: 'Professional Summary',
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        new Paragraph({ text: summary || '' }),

        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          text: 'Experience',
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        ...(experience || []).flatMap((exp: any) => [
          new Paragraph({ text: '' }),
          new Paragraph({
            children: [new TextRun({ text: exp.position || 'Position', bold: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: exp.company || 'Company', italics: true })],
          }),
          new Paragraph({
            children: [new TextRun({ text: `${formatDateForDocx(exp.startDate)} - ${exp.current ? 'Present' : formatDateForDocx(exp.endDate)}` })],
          }),
          ...(exp.description || '').split('\n').filter((line:string) => line.trim()).map((line: string) => new Paragraph({
            text: line.replace(/^•\s*/, ''),
            bullet: { level: 0 },
          })),
        ]),

        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          text: 'Education',
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        ...(education || []).map((edu: any) => 
          new Paragraph({
            children: [
              new TextRun({ text: `${edu.degree || 'Degree'} in ${edu.field || 'Field'}`, bold: true }),
              new TextRun({ text: `\n${edu.school || 'School'}`, italics: true }),
              new TextRun({ text: `\n${formatDateForDocx(edu.startDate)} - ${edu.current ? 'Present' : formatDateForDocx(edu.endDate)}` }),
            ],
          })
        ),

        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          text: 'Skills',
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        new Paragraph({
          text: (skills || []).map((skill: any) => skill.name).join(', '),
        }),
      ],
    }],
    styles: {
        document: {
            run: {
                font: "Inter",
                size: 22,
            }
        },
        paragraphStyles: [{
            id: "spacer",
            name: "Spacer",
            basedOn: "Normal",
            next: "Normal",
            run: {
            size: 12
            }
        }]
    }
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(personalInfo.fullName || 'resume').replace(/\s+/g, '_')}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
