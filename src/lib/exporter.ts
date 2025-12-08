import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';

// --- PDF EXPORT ---
export const exportToPDF = async (element: HTMLElement, fileName: string = 'resume') => {
  if (!element) {
    throw new Error("Element to capture is not defined.");
  }

  const resumeElement = element.firstChild as HTMLElement;
  if (!resumeElement) {
    throw new Error("Resume content not found for PDF export.");
  }

  // A4 paper size in mm
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;

  // Use a higher DPI for better quality
  const DPI = 300;
  const A4_WIDTH_PX = (A4_WIDTH_MM / 25.4) * DPI;

  // Capture the canvas at a resolution that matches the A4 width at 300 DPI
  const canvas = await html2canvas(resumeElement, {
    scale: A4_WIDTH_PX / resumeElement.offsetWidth,
    useCORS: true,
    logging: false,
    width: resumeElement.offsetWidth,
    height: resumeElement.offsetHeight,
    windowWidth: resumeElement.offsetWidth,
    windowHeight: resumeElement.offsetHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = A4_WIDTH_MM;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // Check if content overflows and handle it (basic single-page handling)
  if (pdfHeight > A4_HEIGHT_MM) {
    console.warn("Content might be taller than a single A4 page.");
  }
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, A4_HEIGHT_MM));
  pdf.save(`${(fileName || 'resume').replace(/\s+/g, '_')}.pdf`);
};


// --- DOCX EXPORT ---
const formatDateForDocx = (dateString?: string) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
        return dateString; // Return original string if parsing fails
    }
};

const createSection = (title: string, children: any[]) => {
    return [
        new Paragraph({ text: '' }),
        new Paragraph({
            children: [
                new TextRun({
                    text: title.toUpperCase(),
                    bold: true,
                    size: 24,
                }),
            ],
        }),
        new Paragraph({
             border: { bottom: { color: "auto", size: 6, space: 1, style: BorderStyle.SINGLE } }
        }),
        new Paragraph({ text: '' }),
        ...children,
    ];
};

const createExperienceEntry = (exp: any) => {
    const rows = [
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({ children: [new TextRun({ text: exp.position, bold: true, size: 22 })] }),
                        new Paragraph({ children: [new TextRun({ text: exp.company, size: 22 })] })
                    ],
                    borders: { top: { style: "none", size: 0, color: "FFFFFF" }, bottom: { style: "none", size: 0, color: "FFFFFF" }, left: { style: "none", size: 0, color: "FFFFFF" }, right: { style: "none", size: 0, color: "FFFFFF" } },
                }),
                new TableCell({
                    children: [
                        new Paragraph({ text: `${formatDateForDocx(exp.startDate)} - ${exp.current ? 'Present' : formatDateForDocx(exp.endDate)}`, alignment: AlignmentType.RIGHT }),
                    ],
                    borders: { top: { style: "none", size: 0, color: "FFFFFF" }, bottom: { style: "none", size: 0, color: "FFFFFF" }, left: { style: "none", size: 0, color: "FFFFFF" }, right: { style: "none", size: 0, color: "FFFFFF" } },
                }),
            ],
        }),
    ];

    const descriptionItems = (exp.description || '').split('\n')
        .filter((line: string) => line.trim())
        .map(line => new Paragraph({
            text: line.replace(/^•\s*/, ''),
            bullet: { level: 0 },
            style: 'Normal',
        }));

    const descriptionCell = new TableCell({
        children: descriptionItems,
        columnSpan: 2,
        borders: { top: { style: "none", size: 0, color: "FFFFFF" }, bottom: { style: "none", size: 0, color: "FFFFFF" }, left: { style: "none", size: 0, color: "FFFFFF" }, right: { style: "none", size: 0, color: "FFFFFF" } },
    });

    rows.push(new TableRow({ children: [descriptionCell] }));

    return [
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: rows,
        }),
        new Paragraph({ text: '' }),
    ];
};

const createEducationEntry = (edu: any) => {
    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({ children: [new TextRun({ text: edu.school, bold: true, size: 22 })] }),
                            new Paragraph({ text: `${edu.degree || ''}${edu.degree && edu.field ? ', ' : ''}${edu.field || ''}` }),
                        ],
                        borders: { top: { style: "none", size: 0, color: "FFFFFF" }, bottom: { style: "none", size: 0, color: "FFFFFF" }, left: { style: "none", size: 0, color: "FFFFFF" }, right: { style: "none", size: 0, color: "FFFFFF" } },
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({ text: `${formatDateForDocx(edu.startDate)} - ${edu.current ? 'Present' : formatDateForDocx(edu.endDate)}`, alignment: AlignmentType.RIGHT }),
                        ],
                        borders: { top: { style: "none", size: 0, color: "FFFFFF" }, bottom: { style: "none", size: 0, color: "FFFFFF" }, left: { style: "none", size: 0, color: "FFFFFF" }, right: { style: "none", size: 0, color: "FFFFFF" } },
                    }),
                ],
            }),
        ],
    });
};

const createSkillsParagraph = (skills: any[]) => {
    const skillTextRuns: TextRun[] = [];
    (skills || []).forEach((skill, index) => {
        skillTextRuns.push(new TextRun(skill.name));
        if (index < skills.length - 1) {
            skillTextRuns.push(new TextRun(", "));
        }
    });
    return new Paragraph({ children: skillTextRuns });
};


export const exportToDOCX = async (data: any) => {
  const { personalInfo, summary, experience, education, skills } = data;

  const doc = new Document({
    sections: [{
      children: [
        new Paragraph({ text: personalInfo.fullName || 'Your Name', heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER }),
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new TextRun(personalInfo.location || ''),
                personalInfo.email ? new TextRun(' | ').break() : new TextRun(''),
                new TextRun(personalInfo.email || ''),
                personalInfo.linkedin ? new TextRun(' | ').break() : new TextRun(''),
                new TextRun(personalInfo.linkedin || ''),
            ]
        }),
        ...(summary ? createSection('Summary', [new Paragraph(summary)]) : []),
        ...(education.length > 0 ? createSection('Education', (education || []).map(createEducationEntry)) : []),
        ...(experience.length > 0 ? createSection('Experience', (experience || []).flatMap(createExperienceEntry)) : []),
        ...(skills.length > 0 ? createSection('Skills', [createSkillsParagraph(skills)]) : []),
      ],
    }],
    styles: {
        document: {
            run: {
                font: "Inter",
                size: 22, // 11pt
            }
        },
        paragraphStyles: [{
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                font: "Inter",
                size: 22, // 11pt
            },
        },
        {
            id: "Title",
            name: "Title",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                font: "Inter",
                size: 44, // 22pt
                bold: true,
            },
            paragraph: {
                spacing: { after: 120 },
            },
        },
        {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                font: "Inter",
                size: 28, // 14pt
                bold: true,
                allCaps: true,
            },
            paragraph: {
                spacing: { before: 240, after: 120 },
            },
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
