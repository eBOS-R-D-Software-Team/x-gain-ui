import { Row, Col, Card, Tooltip, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { regionalPopupcontent } from "../../Data/RegionalData";

const showInfoModal = (title, content, imageUrl) => {
	Modal.info({
		title: title,
		content: (
			<div style={{ margin: 10, marginTop: 20 }}>
				{imageUrl && <img src={imageUrl} alt="info" style={{ width: "100%", marginBottom: "10px" }} />}
				<p dangerouslySetInnerHTML={{ __html: content }} /> {/* Render HTML correctly */}
			</div>
		),
		width: 500,
		onOk() {},
		maskClosable: true, // Enables closing when clicking outside
	});
};

const CardList = ({ title, data, borderColor, hoverColor }) => {
	const [hoveredCard, setHoveredCard] = useState(null);

	return (
		<Col xs={24} xl={12}>			
			<h2 style={{ color: borderColor }}>{title}</h2>
			<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
				{data.map((item) => {
					const hasInfo = !!regionalPopupcontent[item.key];

					return (
						<Card
							key={item.key}
							title={
								<span style={{ fontSize: "25px", whiteSpace: 'normal' }}>
									{item.title}{" "}
									{hasInfo && (
										<Tooltip title="More Info">
											<InfoCircleOutlined style={{ marginLeft: 8, color: borderColor }} />
										</Tooltip>
									)}
								</span>
							}
							style={{
								whiteSpace: 'normal',
								padding: "20px 2px",
								borderRadius: "12px",
								backgroundColor: hasInfo && hoveredCard === item.key ? hoverColor : "#f9f9f9",
								borderLeft: `5px solid ${borderColor}`,
								boxShadow:
								hasInfo && hoveredCard === item.key
									? "0px 8px 20px rgba(0, 0, 0, 0.12)"
									: "0px 6px 15px rgba(0, 0, 0, 0.08)",
								transition: "all 0.3s ease",
								display: "flex",
								flexDirection: "column",
								cursor: hasInfo ? "pointer" : "default",
							}}
							onMouseEnter={() => hasInfo && setHoveredCard(item.key)}
							onMouseLeave={() => hasInfo && setHoveredCard(null)}
							onClick={() => hasInfo && showInfoModal(item.title, regionalPopupcontent[item.key], item.image)}
						>
							<p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555", flexGrow: 1 }}>{item.description}</p>
						</Card>
					);
				})}
			</div>
		</Col>
	);
};

const DynamicRow = ({ challenges, proposals }) => {
	return (
		<Row gutter={[24, 24]}>
			<CardList
				title={<span style={{ fontSize: "25px", whiteSpace: 'normal' }}>Challenges</span>}
				data={challenges}
				borderColor="rgb(5, 119, 5)"
				hoverColor="#e0f7e9"
			/>
			<CardList 
				title={<span style={{ fontSize: "25px", whiteSpace: 'normal' }}>Proposals and Solutions</span>} 
				data={proposals} 
				borderColor="#00678A" 
				hoverColor="#bce2f1" 
			/>
		</Row>
	);
};

export default DynamicRow;
