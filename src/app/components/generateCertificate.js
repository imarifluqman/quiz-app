import jsPDF from "jspdf";
import certificatBase64 from "./base64";

export function generateCertificate({ name, course, score }) {
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const pdf = new jsPDF("l", "mm", "a4", true);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  pdf.addImage(certificatBase64, "png", 0, 0, pdfWidth, pdfHeight);
  pdf.text(id.slice(0, 12), 230, 63);
  pdf.text(course.toUpperCase(), 150, 128);
  pdf.text(score.toString() + "%", 220, 128);
  pdf.setFontSize(25);
  pdf.setTextColor("#588157");
  const textWidth = pdf.getTextWidth(name);
  const xPosition = (pdfWidth - (textWidth + 20)) / 2;
  pdf.text(name.toUpperCase(), xPosition, 108);
  pdf.save(`INFINITI-${name}.pdf`);
}
