import React from 'react';
import { usePDFContext } from '../../Context/PDF/PDFContext';
import { usePDFEdgeEnablersTableContext } from '../../Context/PDF/PDFEdgeEnablersTableContext';
import { Button } from 'antd'; 
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const SocioEnvironmentalIndicatorsPDF = ({ solutionData, environmentalData, carbonFootprintData, footprintChartRef, radarChartRef, scoresRef}) => {
    const { handleStyledText, handleExportChart } = usePDFContext();
    const { handleExportEdgeEnablersTable } = usePDFEdgeEnablersTableContext();

    console.log(carbonFootprintData)

    const handlePDFTemplate = async () => {
        const doc = new jsPDF();

        let finalYPosition = 15;

        handleStyledText(doc, "Socio-Environmental Assessment", 0, finalYPosition, {
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
            startY: finalYPosition + 10
        })

        finalYPosition = doc.lastAutoTable.finalY + 15;

        doc.text("Environmental Assessment", 10, finalYPosition);

        const columns = ['Tools List', 'Carbon Footprint (kg of CO2 equivalent)', 'Impact on Human Health (DALY)', 'Biodiversity Footprint (PDF)'];
 
        const body = environmentalData.map(item => [
            item.tools,
            item.Carbon,
            item.Impact,
            item.Biodiversity
        ]);

        doc.autoTable({
            startY: finalYPosition + 10,
            margin: {left: 10},
            head: [columns],   // Table headers
            body: body,        // Table data
            theme: 'striped',
            columnStyles: {
                0: { halign: 'left', fontStyle: 'bold', cellWidth: 40 },    // Align 'Name' column to the left
                1: { halign: 'left' }    // Align 'Value' column to the right
            },
            bodyStyles: { fontSize: 10 },  // Adjust font size for better fit
        });

        finalYPosition = doc.lastAutoTable.finalY;

        handleStyledText(doc, "Environmental impact (functional unit: per day of use)", 20, finalYPosition, {
            fontSize: 8,
            fontStyle: 'bold',
            textColor: [111, 111, 111], // White text
            backgroundColor: [255, 255, 255], // Blue background
            padding: 4
        });

 
        const carbonBody = carbonFootprintData.map(item => [
            'Combined carbon footprint from the network devices and edge enablers (kg of CO2 equivalent)',
            item.value   
        ]);


        doc.autoTable({
            startY: finalYPosition + 20,
            margin: {left: 10},
            head: [],   // Table headers
            body: carbonBody, // Table data
            theme: 'striped',
            columnStyles: {
                0: { halign: 'left', fillColor: [41, 128, 186], textColor: [255, 255, 255], fontStyle: 'bold' },    // Align 'Name' column to the left
                1: { halign: 'left' }    // Align 'Value' column to the right
            },
            bodyStyles: { fontSize: 10 },  // Adjust font size for better fit
        });

        if (footprintChartRef.current) {
            await handleExportChart(doc, footprintChartRef, finalYPosition + 50, 210, 60);
        } 

        doc.addPage();

        finalYPosition = 20;
        // Add subsequent text
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Reset text color to black or any desired color
        doc.text("Social Assessment", 10, finalYPosition);


        if (radarChartRef.current) {
            await handleExportChart(doc, radarChartRef, finalYPosition + 10, 190, 130);
        } 

        if (scoresRef.current) {
            await handleExportChart(doc, scoresRef, finalYPosition + 200, 180, 40);
        } 
   
        window.open(doc.output('bloburl'), '_blank');
    }
    
    
    return(
        <div className="downloadBtn">
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
        </div>
    )
}

export default SocioEnvironmentalIndicatorsPDF;