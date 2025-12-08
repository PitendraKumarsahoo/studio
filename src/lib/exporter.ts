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
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const A4_WIDTH = 210;
  const A4_HEIGHT = 297;
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  
  const ratio = imgWidth / imgHeight;
  const pdfWidth = A4_WIDTH;
  const pdfHeight = pdfWidth / ratio;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
          children: [new TextRun({ text: personalInfo.fullName || 'Your Name', bold: true, size: 48, font: "Inter" })],
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          children: [new TextRun({ text: `${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.location || ''}`, size: 22, font: "Inter" })],
        }),
        new Paragraph({
          children: [new TextRun({ text: `${personalInfo.website || ''} | ${personalInfo.linkedin || ''}`, size: 22, font: "Inter" })],
        }),
        
        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          children: [new TextRun({ text: 'Professional Summary', bold: true, size: 28, font: "Inter" })],
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        new Paragraph({
          children: [new TextRun({ text: summary, size: 22, font: "Inter" })],
        }),

        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          children: [new TextRun({ text: 'Experience', bold: true, size: 28, font: "Inter" })],
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        ...(experience || []).flatMap((exp: any) => [
          new Paragraph({
            children: [new TextRun({ text: exp.position || 'Position', bold: true, size: 24, font: "Inter" })],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: exp.company || 'Company', size: 22, italics: true, font: "Inter" }),
              new TextRun({ text: `\t${formatDateForDocx(exp.startDate)} - ${exp.current ? 'Present' : formatDateForDocx(exp.endDate)}`, size: 22, font: "Inter" }),
            ],
            tabStops: [{ type: 'right', position: 9020 }],
          }),
          ...(exp.description || '').split('\n').map((line: string) => new Paragraph({
            children: [new TextRun({ text: line, size: 22, font: "Inter" })],
            bullet: { level: 0 },
          })),
          new Paragraph({ text: '' }),
        ]),

        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          children: [new TextRun({ text: 'Education', bold: true, size: 28, font: "Inter" })],
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        ...(education || []).map((edu: any) => 
          new Paragraph({
            children: [
              new TextRun({ text: `${edu.degree || 'Degree'} in ${edu.field || 'Field'}`, bold: true, size: 24, font: "Inter" }),
              new TextRun({ text: `\t${edu.school || 'School'}`, size: 22, italics: true, font: "Inter" }),
              new TextRun({ text: `\t${formatDateForDocx(edu.startDate)} - ${edu.current ? 'Present' : formatDateForDocx(edu.endDate)}`, size: 22, font: "Inter" }),
            ],
            tabStops: [{ type: 'right', position: 9020 }],
          })
        ),

        new Paragraph({ text: '', style: "spacer" }),
        new Paragraph({
          children: [new TextRun({ text: 'Skills', bold: true, size: 28, font: "Inter" })],
          heading: HeadingLevel.HEADING_1,
          border: { bottom: { color: "auto", space: 1, value: "single", size: 6 } },
        }),
        new Paragraph({
          children: [new TextRun({ text: (skills || []).map((skill: any) => skill.name).join(', '), size: 22, font: "Inter" })],
        }),
      ],
    }],
    styles: {
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
