import React from 'react';
import { usePDFContext } from '../../Context/PDF/PDFContext';
import { usePDFEdgeEnablersTableContext } from '../../Context/PDF/PDFEdgeEnablersTableContext';
import { Tooltip, Button } from 'antd'; 
import { DownloadOutlined } from '@ant-design/icons';
import { formatDecimalNumber } from '../../Utils/ResultsUtils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const TechnoEconomicIndicatorsPDF = ({solutionAnalysisData, solutionData, capexChartRef, capexBreakdownChartRef, opexChartRef, opexBreakdownChartRef}) => {
    const { handleStyledText, handleExportTable, handleExportChart } = usePDFContext();
    const { handleExportEdgeEnablersTable } = usePDFEdgeEnablersTableContext();

    const handlePDFTemplate = async () => {
        const doc = new jsPDF();

        let finalYPosition = 10;

        handleStyledText(doc, "Techno-Economic Assessment", 0, finalYPosition, {
            fontSize: 18,
            fontStyle: 'bold',
            textColor: [255, 255, 255], // White text
            backgroundColor: [0, 122, 204], // Blue background
            padding: 4
        });

        finalYPosition += 30; // Additional 10 for spacing

        // Add subsequent text
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Reset text color to black or any desired color
        doc.text("Connectivity & Processing Enablers", 10, finalYPosition);

        handleExportEdgeEnablersTable({
            doc: doc,
            data: [solutionData],
            startY: finalYPosition + 5
        })

        finalYPosition = doc.lastAutoTable.finalY + 15;

        doc.text("CAPEX Analysis", 10, finalYPosition);

        handleExportTable({
            doc: doc,
            title: 'CAPEX Per Component',
            name: 'capexPerComponent',
            data: solutionAnalysisData.capexPerComponentTS,
            periods: solutionAnalysisData.periods,
            yearlyTotal: solutionAnalysisData.capexTotalTS,
            categoryTotal: null,
            startY: finalYPosition + 5
        });

        finalYPosition = doc.lastAutoTable.finalY + 10; // Adjust 10px below the last table

        handleExportTable({
            doc: doc,
            title: 'CAPEX Per Layer',
            name: 'capexPerLayer',
            data: solutionAnalysisData.capexPerLayerTS,
            periods: solutionAnalysisData.periods,
            yearlyTotal: null,
            categoryTotal: solutionAnalysisData.capexPerLayer,
            startY: finalYPosition
        });

        doc.addPage();

        finalYPosition = 10;

        if (capexChartRef.current) {
            await handleExportChart(doc, capexChartRef, finalYPosition, 150, 100);
        } 

        if (capexBreakdownChartRef.current) {
            await handleExportChart(doc, capexBreakdownChartRef, finalYPosition + 110, 130, 60);
        } 

        doc.text("OPEX Analysis", 10, finalYPosition + 180);

        handleExportTable({
            doc: doc,
            title: 'OPEX Per Category',
            name: 'opexPerCategory',
            data: solutionAnalysisData.opexPerCategoryTS,
            periods: solutionAnalysisData.periods,
            yearlyTotal: solutionAnalysisData.opexTotalTS,
            categoryTotal: solutionAnalysisData.opexPerCategory,
            startY: finalYPosition + 190
        });

        doc.addPage();

        finalYPosition = 10;

        handleExportTable({
            doc: doc,
            title: 'OPEX Per Layer',
            name: 'opexPerLayer',
            data: solutionAnalysisData.opexPerLayerTS,
            periods: solutionAnalysisData.periods,
            yearlyTotal: null,
            categoryTotal: solutionAnalysisData.opexPerLayer,
            startY: finalYPosition
        });

        finalYPosition = doc.lastAutoTable.finalY + 5; // Adjust 10px below the last table

        if (opexChartRef.current) {
            await handleExportChart(doc, opexChartRef, finalYPosition, 150, 100);
        } 

        if (opexBreakdownChartRef.current) {
            await handleExportChart(doc, opexBreakdownChartRef, finalYPosition + 110, 130, 60);
        } 

        const totalColumnsData = ['Name', 'Value'];

        const totalDataSource = [
            { name: 'Total Cost (€)', value: formatDecimalNumber(solutionAnalysisData.totalCost) },
            { name: 'Total CAPEX (€)', value: formatDecimalNumber(solutionAnalysisData.totalCapex) },
            { name: 'Total OPEX (€)', value: formatDecimalNumber(solutionAnalysisData.totalOpex) }
        ];
    
        const body = totalDataSource.map(item => [
            item.name,
            item.value
        ]);

        doc.addPage();


        // Generate the table in the PDF
        doc.autoTable({
            startY: 10,
            head: [totalColumnsData],   // Table headers
            body: body,        // Table data
            theme: 'grid',
            columnStyles: {
                0: { halign: 'left', fillColor: [221, 221, 221], fontStyle: 'bold' },    // Align 'Name' column to the left
                1: { halign: 'right', fillColor: [255, 255, 255] }    // Align 'Value' column to the right
            },
            bodyStyles: { fontSize: 10 },  // Adjust font size for better fit
        });

   
        window.open(doc.output('bloburl'), '_blank');
    }
    
    
    return(
        <div className="downloadBtn">
            <Tooltip title="Export PDF">
                <Button
                    onClick={handlePDFTemplate}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '7px',
                        background: '#00678A',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '50px',
                        whiteSpace: 'unset',
                        gap: 0,
                        lineHeight: 1,
                        fontWeight: 600
                    }}
                >
                    <DownloadOutlined style={{ fontSize: '40px' }} />
                    <span style={{ fontSize: '18px', paddingTop: '8px', paddingRight: '2%' }}>Export Results</span>
                </Button>
            </Tooltip>
        </div>
    )
}

export default TechnoEconomicIndicatorsPDF;