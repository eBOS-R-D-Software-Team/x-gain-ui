import React, { useState , useEffect  } from "react";
import { Layout, Menu, Card, Row, Col , Modal , Button  } from "antd";
import {
	AppstoreOutlined,
	ProfileOutlined,
	DollarOutlined,
	ToolOutlined,
	ShoppingCartOutlined,
	TeamOutlined,
	EnvironmentOutlined,
	LeftCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import DynamicRegionalCard from "./DynamicRegionalCard";
import {
	challengesDataPolicyandRegulationGuidelines,
	proposalsDataPolicyandRegulationGuidelines,
	challengesDataEconomicAspects,
	proposalsDataEconomicAspects,
	challengesDataTechnicalDeployment,
	proposalsDataTechnicalDeployment,
	challengesDataServiceOfferingsandBusinessModels,
	proposalsDataServiceOfferingsandBusinessModels,
	challengesDataSocialChallenges,
	proposalsDataSocialChallenges,
	challengesDataEnvironmentalConsiderations,
	proposalsDataEnvironmentalConsiderations,
} from "../../Data/RegionalData";
import DynamicRow from "./DynamicRow";

const { Sider, Content } = Layout;

const RegionalAssessment = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [selectedKey, setSelectedKey] = useState("1");
	const [isModalVisible, setIsModalVisible] = useState(false);

	const navigate = useNavigate();


	useEffect(() => {
		// Check if popup has already been shown
		const hasVisited = localStorage.getItem("popupShown");
		if (!hasVisited) {
			setIsModalVisible(true);
		}
	}, []);


	const handleContinue = () => {
		setIsModalVisible(false);
		localStorage.setItem("popupShown", "true"); // Store flag permanently
	};


	const handleBackpopup = () => {
		navigate("/sector-services-level"); 
		localStorage.removeItem("popupShown");
	};

  	const items = [
		{ key: "1", icon: <AppstoreOutlined />, label: "Main Challenges" },
		{ key: "2", icon: <ProfileOutlined />, label: "Policy and Regulation Guidelines" },
		{ key: "3", icon: <DollarOutlined />, label: "Economic Aspects" },
		{ key: "4", icon: <ToolOutlined />, label: "Technical Deployment" },
		{ key: "5", icon: <ShoppingCartOutlined />, label: "Service Offerings and Business Models" },
		{ key: "6", icon: <TeamOutlined />, label: "Social Challenges" },
		{ key: "7", icon: <EnvironmentOutlined />, label: "Environmental Considerations" },
		{ key: "8", icon: <LeftCircleOutlined />, label: "Back to Previous Page" },
  	];

	const contentData = {
		1: (
			<DynamicRegionalCard
				title="Main Challenges"
				body={
					<>
						{/* First Row with Two Columns */}
						<Row gutter={16}>
							{/* Left Side with Low Population Density and Geographical Barriers */}
							<Col xs={24} xl={12}>
								<Card
									title={<span style={{ fontSize: "25px", whiteSpace: 'normal' }}>Low Population Density</span>}
									style={{
										marginBottom: "20px",
										padding: "20px 2px",
										borderRadius: "12px",
										backgroundColor: "#f9f9f9",
										borderLeft: "5px solid rgb(5, 119, 5)",
										boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)",
										transition: "transform 0.3s ease, box-shadow 0.3s ease",
									}}
								>
									<p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555" }}>
										The population density of rural areas tends to be lower than that of urban areas. The cost per user
										for infrastructure deployment is higher, making such investments unattractive for telecom operators.
									</p>
								</Card>

								<Card
									title={<span style={{ fontSize: "25px", whiteSpace: 'normal' }}>Geographical Barriers</span>}
									style={{
										padding: "20px 2px",
										borderRadius: "12px",
										backgroundColor: "#f9f9f9",
										borderLeft: "5px solid rgb(5, 119, 5)",
										boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)",
										transition: "transform 0.3s ease, box-shadow 0.3s ease",
									}}
								>
									<p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555" }}>
										Because of the difficult terrains such as forests and mountains, remote locations cannot be accessed
										easily. The installation and maintenance of physical infrastructure can be challenging due to these
										barriers.
									</p>
								</Card>
							</Col>

							{/* Right Side with Absence of Existing Infrastructure */}
							<Col xs={24} xl={12}>
								<Card
									title={<span style={{ fontSize: "25px", whiteSpace: 'normal' }}>Absence of Existing Infrastructure</span>}
									style={{
										height: "100%",
										marginBottom: "20px",
										padding: "20px 2px",
										borderRadius: "12px",
										backgroundColor: "#f9f9f9",
										borderLeft: "5px solid rgb(5, 119, 5)",
										boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.08)",
										transition: "transform 0.3s ease, box-shadow 0.3s ease",
									}}
								>
									<p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555" }}>
										A lot of remote areas do not have the necessary telecom infrastructure such as towers, fibre-optic
										cables (including backhaul optical networks), or even a consistent power supply. The need to build
										the basic infrastructure leads to a significant increase in both the investment and deployment time.
									</p>
								</Card>
							</Col>
						</Row>
						{/* Additional Content */}
						<p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555", marginTop: "4%" }}>
						To tackle these challenges, the KFT proposes a series of recommendation for key aspects of regional
						deployments. Please check the different sections of the assessment to see the specific recommendations.​
						</p>
						<p style={{ fontSize: "20px", lineHeight: "1.7", color: "#555" }}>
							We also provide general guidelines and information in the following documents:
							Link to the guidelines and technology explanation .
						</p>{" "}
					</>
				}
			/>
		),
		2: (
			<DynamicRegionalCard
				title="Policy and Regulation Guidelines"
				body={
				<DynamicRow
					challenges={challengesDataPolicyandRegulationGuidelines}
					proposals={proposalsDataPolicyandRegulationGuidelines}
				/>
				}
			/>
		),
		3: (
			<DynamicRegionalCard
				title="Economic Aspects"
				body={<DynamicRow challenges={challengesDataEconomicAspects} proposals={proposalsDataEconomicAspects} />}
			/>
		),
		4: (
			<DynamicRegionalCard
				title="Technical Deployment"
				body={
				<DynamicRow challenges={challengesDataTechnicalDeployment} proposals={proposalsDataTechnicalDeployment} />
				}
			/>
		),
		5: (
			<DynamicRegionalCard
				title="Service Offerings and Business Models"
				body={
				<DynamicRow
					challenges={challengesDataServiceOfferingsandBusinessModels}
					proposals={proposalsDataServiceOfferingsandBusinessModels}
				/>
				}
			/>
		),
		6: (
			<DynamicRegionalCard
				title="Social Challenges"
				body={<DynamicRow challenges={challengesDataSocialChallenges} proposals={proposalsDataSocialChallenges} />}
			/>
		),
		7: (
			<DynamicRegionalCard
				title="Environmental Considerations"
				body={
				<DynamicRow
					challenges={challengesDataEnvironmentalConsiderations}
					proposals={proposalsDataEnvironmentalConsiderations}
				/>
				}
			/>
		),
	};

	return (
		<Layout className="regional-assessment" style={{ minHeight: "100vh" }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
				className="sticky-sidebar" // Add this class
				width={350}
			>
				<img style={{width:'40%'}} src="/images/logo.png" alt="Logo" />

				{!collapsed ? (
					<h3 style={{ color: "#fff", width: "100%", fontSize: "20px", marginBottom: "10%", marginTop: "9%" }}>
						Regional Guidance
					</h3>
				) : (
					<h3 style={{ color: "#fff", width: "100%", fontSize: "20px", marginBottom: "10%", marginTop: "9%" }}>R G</h3>
				)}

				<Menu
					theme="dark"
					defaultSelectedKeys={["1"]}
					mode="inline"
					style={{ background: "#008D6B" , fontSize:'16px' }}
					selectedKeys={[selectedKey]}
					onSelect={({ key }) => {
						if (key === "8") {
						navigate("/sector-services-level"); 
						localStorage.removeItem("popupShown");
						} else {
						setSelectedKey(key);
						}
					}}
					items={items.map((item) => ({
						...item,
						style: item.key === selectedKey ? { background: "rgb(24, 109, 31)" } : {},
					}))}
				/>
			</Sider>

			<Layout style={{ padding: "20px", background: "#f5f5f5", flex: 1 }}>
				<Content>{contentData[selectedKey]}</Content>
			</Layout>

			<Modal
				width={600}      
				title="Dear user, welcome to the Regional Level Assessment of the KFT!"
				open={isModalVisible}
				onCancel={handleContinue}
				footer={[
					<Button style={{background: '#00678A'}} key="back" type="primary" onClick={handleBackpopup}>
						Back to Previous Page
					</Button>,
					<Button style={{background: '#00678A'}} key="continue" type="primary" onClick={handleContinue}>
						Continue
					</Button>,
				]}
			>
				<p>
					Here you will find an overview of the main challenges present when targeting the deployment of novel and state-of-the art ICT in rural regions. Regional guidelines and suggestions are provided on how to tackle these challenges, including links to relevant information and complementary documentation provided by the XGain project. 
					For detailed and tailored technology proposals and for an assessment of local or medium-scale infrastructure deployments (up to areas of XX km2), please use the local or community level assessment.
				</p>
			</Modal>
		</Layout>
	);
};

export default RegionalAssessment;
