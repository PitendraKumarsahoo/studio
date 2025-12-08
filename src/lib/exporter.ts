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

  // Use a standard DPI for web content
  const DPI = 96;
  const A4_WIDTH_PX = (A4_WIDTH_MM / 25.4) * DPI;

  const canvas = await html2canvas(resumeElement, {
    scale: A4_WIDTH_PX / resumeElement.offsetWidth,
    useCORS: true,
    logging: false,
    width: resumeElement.offsetWidth,
    height: resumeElement.offsetHeight,
    windowWidth: resumeElement.scrollWidth,
    windowHeight: resumeElement.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = A4_WIDTH_MM;
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = pdfHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
  heightLeft -= A4_HEIGHT_MM;

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= A4_HEIGHT_MM;
  }
  
  pdf.save(`${(fileName || 'resume').replace(/\s+/g, '_')}.pdf`);
};


// --- DOCX EXPORT ---
const formatDateForDocx = (dateString?: string, current?: boolean) => {
    if (current) return 'Present';
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        // Add a day to the date to avoid timezone issues where it might be the last day of the previous month
        const adjustedDate = new Date(date.valueOf() + 1000 * 60 * 60 * 24);
        return adjustedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
        ...children,
    ];
};

const createExperienceEntry = (exp: any) => {
    return [
        new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({ children: [new TextRun({ text: exp.position, bold: true, size: 22 })] }),
                            ],
                            borders: { top: { style: "none" }, bottom: { style: "none" }, left: { style: "none" }, right: { style: "none" } },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({ text: exp.company, alignment: AlignmentType.RIGHT }),
                            ],
                            borders: { top: { style: "none" }, bottom: { style: "none" }, left: { style: "none" }, right: { style: "none" } },
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({ children: [new TextRun({ text: formatDateForDocx(exp.startDate) })] })
                            ],
                             borders: { top: { style: "none" }, bottom: { style: "none" }, left: { style: "none" }, right: { style: "none" } },
                        }),
                        new TableCell({
                            children: [
                                new Paragraph({ text: ``, alignment: AlignmentType.RIGHT }),
                            ],
                            borders: { top: { style: "none" }, bottom: { style: "none" }, left: { style: "none" }, right: { style: "none" } },
                        }),
                    ],
                })
            ],
        }),
        ...(exp.description || '').split('\n')
            .filter((line: string) => line.trim())
            .map(line => new Paragraph({
                text: line.replace(/^•\s*/, ''),
                bullet: { level: 0 },
                style: 'Normal',
                spacing: { before: 100 }
            })),
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
                            new Paragraph({ children: [new TextRun({ text: edu.school || (edu.degree || ''), bold: true, size: 22 })] }),
                            new Paragraph({ text: `${edu.school ? edu.degree : ''}${edu.field ? ', ' + edu.field : ''}` }),
                        ],
                        borders: { top: { style: "none" }, bottom: { style: "none" }, left: { style: "none" }, right: { style: "none" } },
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({ text: `${formatDateForDocx(edu.startDate)} - ${formatDateForDocx(edu.endDate, edu.current)}`, alignment: AlignmentType.RIGHT }),
                        ],
                        borders: { top: { style: "none" }, bottom: { style: "none" }, left: { style: "none" }, right: { style: "none" } },
                    }),
                ],
            }),
        ],
    });
};

const createSkillsParagraph = (skills: any[]) => {
    const skillText = (skills || []).map(skill => skill.name).join(' | ');
    return new Paragraph({ children: [new TextRun(skillText)] });
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
                personalInfo.email ? new TextRun(' | ') : new TextRun(''),
                new TextRun(personalInfo.email || ''),
                personalInfo.linkedin ? new TextRun(' | ') : new TextRun(''),
                new TextRun(personalInfo.linkedin || ''),
                 personalInfo.website ? new TextRun(' | ') : new TextRun(''),
                new TextRun(personalInfo.website || ''),
            ]
        }),
        ...(summary ? createSection('Summary', [new Paragraph({ text: summary, spacing: { after: 200 }})]) : []),
        ...(education.length > 0 ? createSection('Education', (education || []).map(createEducationEntry)) : []),
        ...(experience.length > 0 ? createSection('Experience', (experience || []).flatMap(createExperienceEntry)) : []),
        ...(skills.length > 0 ? createSection('Skills', [createSkillsParagraph(skills)]) : []),
      ],
    }],
    styles: {
        document: {
            run: {
                font: "Times New Roman",
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
                font: "Times New Roman",
                size: 22,
            },
        },
        {
            id: "Title",
            name: "Title",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                font: "Times New Roman",
                size: 36, // 18pt
                bold: true,
            },
            paragraph: {
                spacing: { after: 120 },
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
