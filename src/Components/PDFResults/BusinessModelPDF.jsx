import React from 'react';
import { usePDFContext } from '../../Context/PDF/PDFContext';
import { Button } from 'antd'; 
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const BusinessModelPDF = ({ businessModelRef }) => {
    const { handleStyledText, handleExportBusinessModelImage } = usePDFContext();

    const handlePDFTemplate = async () => {
        const doc = new jsPDF('l', 'mm', [397, 400]);

        let finalYPosition = 15;

        handleStyledText(doc, "Business Model", 0, finalYPosition, {
            fontSize: 18,
            fontStyle: 'bold',
            textColor: [255, 255, 255], // White text
            backgroundColor: [0, 122, 204], // Blue background
            padding: 4
        });

        const screenWidth = window.innerWidth;

        if (businessModelRef.current) {
            if (screenWidth >= 1900) {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 20, 400, 150);
            } else if (screenWidth >= 1200) {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 20, 400, 340);
            } else if(screenWidth >= 992) {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 50, 300, 330);
            } else if(screenWidth >= 767) {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 50, 200, 220);
            } else if(screenWidth >= 576) {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 50, 130, 330);
            } else if(screenWidth >= 424) {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 50, 100, 320);
            } else {
                await handleExportBusinessModelImage(doc, businessModelRef, finalYPosition + 20, 40, 330);
            }
        } 

        window.open(doc.output('bloburl'), '_blank');
        
        // Save the PDF
        //doc.save('techno-economic-indicators.pdf');
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

export default BusinessModelPDF;