import React, { createContext, useContext } from 'react';
import { formatDecimalNumber } from '../../Utils/ResultsUtils';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

// Create the context
const PDFContext = createContext();

// Provide the context to the entire app
export const PDFProvider = ({ children }) => {
    // Function to generate PDF
    const handleStyledText = (doc, text, x = 0, y, options = {}) => {
        const {
            fontSize = 12,
            fontStyle = 'bold',
            textColor = [0, 0, 0],           // Default black text
            backgroundColor = [221, 221, 221], // Default light gray background
            padding = 4,
        } = options;
    
        // Set font size and style
        doc.setFontSize(fontSize);
        doc.setFont(undefined, fontStyle);
    
        // Calculate text width and height
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(text);
        const textHeight = fontSize / 2;  // Approximation for font height
    
        // Draw full-width background rectangle with padding
        doc.setFillColor(...backgroundColor);
        doc.rect(0, y, pageWidth, textHeight + padding, 'F'); // Full width background

        // Center the text within the background
        const textX = (pageWidth - textWidth) / 2; // Centered X position
        doc.setTextColor(...textColor);
        doc.text(text, textX, y + padding + textHeight / 2);
    };


    const handleExportTable = ({ doc, title, name, data, periods, categoryTotal, yearlyTotal, startY }) => {       
        const columns = periods ? [
            title,
            ...periods.map(period => period.label),
            ...(categoryTotal ? ['Total (€)'] : [])
        ] : [];


        const dataSource = data ? Object.keys(data).map((key) => {
            const yearlyData = data[key];
            let layer

            const solutionAnalysisData = JSON.parse(localStorage.getItem('filteredSolutionAnalysisDataBySol'))       
            const metadataExists = solutionAnalysisData?.componentMetadata && solutionAnalysisData.componentMetadata[key];
            const fetchName = metadataExists ? solutionAnalysisData.componentMetadata[key].name : undefined;         

            if(name === 'capexPerComponent') {
                layer = fetchName ?? key;
            } else {
                layer = key
            }

            const rowData = [
                layer,
                ...periods.map((_, periodIndex) => formatDecimalNumber(yearlyData[periodIndex] || 0))
            ];

            if (categoryTotal) {
                rowData.push(formatDecimalNumber(categoryTotal[key] !== null ? categoryTotal[key] : 0));
            }

            return rowData;
        }) : [];


        if (yearlyTotal && yearlyTotal.length > 0) {
            const totalRow = [
                'Total (€)',  
                ...periods.map((_, periodIndex) => formatDecimalNumber(yearlyTotal[periodIndex] !== null ? yearlyTotal[periodIndex] : 0))
            ];

            if (categoryTotal) {
                totalRow.push(formatDecimalNumber(yearlyTotal.reduce((sum, value) => sum + (value || 0), 0)));
            }

            dataSource.push(totalRow);
        }


        const columnStyles = {
            0: { cellWidth: 20 },  // Width for the 'Category' column
            // Set dynamic widths for each period column
            ...periods.reduce((acc, _, index) => {
                acc[index + 1] = { cellWidth: 16 };  // Setting width for period columns (adjust size as needed)
                return acc;
            }, {}),
            ...(categoryTotal ? { [periods.length + 1]: { cellWidth: 15 } } : {})
        };


        // Add table to the PDF
        doc.autoTable({
            startY: startY,
            margin: {left: 10},
            head: [columns],
            body: dataSource,
            theme: 'striped',
            columnStyles
        });   
    };


    const handleExportChart = async (doc, ref, startY, width, height) => {     
        if (ref.current) {
            const chartCanvas = await html2canvas(ref.current);
            const chartImage = chartCanvas.toDataURL('image/png');
            doc.addImage(chartImage, 'PNG', 8, startY, width, height); // Adjust position and size
        }
    };


    const handleExportBusinessModelImage = async (doc, ref, startY, width, height) => {     
        if (ref.current) {
            const chartCanvas = await html2canvas(ref.current);
            const chartImage = chartCanvas.toDataURL('image/png');
    
            // Calculate X position to center the image
            const pdfWidth = 397; // PDF width for landscape orientation
            const centeredX = (pdfWidth - width) / 2;
    
            // Add image to PDF at the centered position
            doc.addImage(chartImage, 'PNG', centeredX, startY, width, height);
        }
    };
    
    
    return (
        <PDFContext.Provider value={{ handleStyledText, handleExportTable, handleExportChart, handleExportBusinessModelImage }}>
            {children}
        </PDFContext.Provider>
    );
};

// Custom hook to use the PDF context
export const usePDFContext = () => useContext(PDFContext);
