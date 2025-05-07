import React from "react";
import { Card } from "antd"; // Assuming you're using Ant Design

const DynamicRegionalCard = ({ title, body }) => {
	return (
		<Card
			title={<span style={{ whiteSpace: 'normal' }}>{title}</span>}
			className="regionalCard"
			style={{        
				background: "#ffffff",
				boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.1)",
				borderRadius: "16px",
				maxWidth: "100%",
				fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
			}}
			styles={{
				header: {
					background: "#00678A",
					color: "#fff",
				},
				body: {
					paddingTop: "3%",
					height: "90%", // Set the body height here
					overflow: "auto", // Optional: Allows scrolling inside the body if content overflows
				},
			}}
		>
			{body}
		</Card>
	);
};

export default DynamicRegionalCard;
