import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportAuditPDF = async (
    elementId: string = "audit-report"
) => {
    const element = document.getElementById(elementId);

    if (!element) return;

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0B0F19",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgProps = pdf.getImageProperties(imgData);

    const pdfHeight =
        (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save("ai-spend-audit-report.pdf");
};