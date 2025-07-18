import ImpactAssessment from "../Pages/ImpactAssessment";
import LocationDetails from "../Pages/LocationDetails";
import QuestionsList from "../Pages/QuestionsList";
import SectorServices from "../Pages/SectorServices";
import SectorServicesLevel from "../Pages/SectorServicesLevel";

export const stepsLabels = [
    {
        title: "Selection of assessment level and user type",
        subtitle: "",
        icon: "images/icons/profile-circle.svg",
        subicon: "",
        url: "/sector-services-level",
        content: <SectorServicesLevel/>,
        data: "sectorsServicesLevelDetails",
        color: "#00678A"
    },
    {
        title: "Sector and Service selection",
        subtitle: "",
        icon: "images/icons/sector.svg",
        subicon: "",
        url: "/sector-services",
        content: <SectorServices/>,
        data: "sectorsServicesDetails",
        color: "#00678A"
    },
    {
        title: "Location Details",
        subtitle: "",
        icon: "images/icons/location.png",
        subicon: "",
        url: "/location-details",
        content: <LocationDetails/>,
        data: "locationDetails",
        color: "#00678A"
    },
    {
        title: "Service Requirements",
        subtitle: "",
        icon: "images/icons/service.png",
        subicon: "",
        url: "/questions",
        content: <QuestionsList/>,
        data: "completeQuestionsFormData",
        color: "#00678A"
    },
    {
        title: "Evaluate your case",
        subtitle: "",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png",
        url: "/impact-assessment",
        content: <ImpactAssessment/>,
        data: "results",
        color: "#158D6B"
    },
    {
        title: "Impact Weights",
        subtitle: "",
        icon: "/images/icons/service.png",
        subicon: "",
        url: "",
        content: null,
        data: "",
        color: "#00678A"
    },
    {
        title: "Results:",
        subtitle: "Suggested Technology Mixes",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png",
        url: "",
        content: null,
        data: "",
        color: "#158D6B"
    },
    {
        title: "Assessment Overview",
        subtitle: "",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png",
        url: "",
        content: null,
        data: "",
        color: "#158D6B"
    },
    {
        title: "Results:",
        subtitle: "Techno-Economic Assessment",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png",
        url: "",
        content: null,
        data: "",
        color: "#158D6B"
    },
    {
        title: "Social Assessment",
        subtitle: "",
        icon: "images/icons/service.png",
        subicon: "",
        url: "",
        content: null,
        data: "",
        color: "#00678A"
    },
    {
        title: "Results:",
        subtitle: "Business Model Canvas",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png",
        url: "",
        content: null,
        data: "",
        color: "#158D6B"
    },
    {
        title: "Results:",
        subtitle: "Socio-Environmental Assessment",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png",
        url: "",
        content: null,
        data: "",
        color: "#158D6B"
    },
];


export const levels = [
    { id: 1, text: "Local", checked: false , tooltip: "This assessment focuses on the infrastructure needs of a single sector and service within a specific area, such as a farm or a small business." } ,
    { id: 2, text: "Community", checked: false , tooltip: "This level evaluates connectivity and service requirements for small communities or municipalities, covering multiple sectors and local services."},
    { id: 3, text: "Regional", checked: false , tooltip: "This assessment is desgined to provide guidelines for authorities and third parties interested in deploying broadband cellular connectivity in large regions."},
];


export const userTypes = [
    { id: 1, text: "End-User", checked: false, isActive: false, level_ids: [1, 2] , tooltip: "Select this if you are the direct user of the digital services (e.g., farmer, small business owner) looking to enhance connectivity for specific needs." },
    { id: 2, text: "Public Authority", checked: false, isActive: false, level_ids: [2] , tooltip: "Choose this option if you are a government or municipal authority planning to improve  community- or regional-level infrastructure and connectivity."},
    { id: 3, text: "Internet Service Provider (ISP)", checked: false, isActive: false, level_ids: [2], tooltip: "This option is for ISPs or network operators responsible for delivering connectivity services and planning infrastructure deployment." },
]


export const sectors = [
    { id: 1, text: "Aquaculture", checked: false, icon: "fish-food.png" ,isActive:true},
    { id: 2, text: "Agriculture", checked: false, icon: "agriculture.svg",isActive:true},
    { id: 3, text: "Forestry", checked: false, icon: "foresty.png",isActive:true},
    { id: 4, text: "Environmental monitoring", checked: false, icon: "leaf.png", isActive:true},
    { id: 5, text: "eHealth", checked: false, icon: "heart-health.png",isActive:true},
    { id: 6, text: "eGovernance", checked: false, icon: "museum.png" ,isActive:true},
    { id: 7, text: "Tourism", checked: false, icon: "agriculture.svg" ,isActive:true},
    { id: 8, text: "Education", checked: false, icon: "school.png" ,isActive:true},
];


export const services = [
    { id: 1, text: "Water Quality Monitoring", checked: false, icon: "water.png", sectors_ids: [1, 4] , tooltip: "Water quality monitoring in rural environments refers to the systematic collection and analysis of water samples from various sources like rivers, lakes, and groundwater. This is crucial for ensuring that the water is safe for human consumption, agriculture, and maintaining the health of the ecosystem."},
    { id: 2, text: "Remote Farming", checked: false, icon: "agriculture.svg", sectors_ids: [1, 2] , tooltip: "Remote farming, often facilitated by novel technology, allows for the management and monitoring of farms from a distance. This includes using sensors, drones, and data analytics to optimize resources and manage crops and livestock efficiently."},
    { id: 3, text: "Smart Farming", checked: false, icon: "barley.png", sectors_ids: [2] , tooltip: "Smart farming involves the application of information and data technologies to optimize complex farming systems. Unlike precision agriculture, smart farming's focus is not solely on the precise measurement within fields or among individual animals but rather on the holistic application of data. It encompasses the use of mobile devices and other technologies to access real-time data on various factors such as soil and plant conditions, climate, weather, resource usage, and overall farm management. Smart Farming goes beyond precision agriculture by basing management tasks not only on location but also on data, enhanced by context- and situation awareness, triggered by real-time events."},
    { id: 4, text: "Precision Agriculture", checked: false, icon: "grass.png", sectors_ids: [2] , tooltip: "Precision agriculture is a modern farming management concept that utilizes digital techniques to monitor and optimize agricultural production processes. It focuses on the optimization of field-level management with regard to crop farming. By measuring soil variations and other agronomic factors within a field, precision agriculture allows for the tailored application of inputs (like water, fertilizer, and pesticides) to increase efficiency, reduce costs, and minimize environmental impact." } ,
    { id: 5, text: "Farm Management", checked: false, icon: "fence.png", sectors_ids: [2] , tooltip: "Farm management in rural environments encompasses the methods, strategies, and tools used to optimize the production and profitability of farming operations. It involves decision-making related to crop and livestock, resource allocation, and financial planning."},
    { id: 6, text: "Land Use / Land Cover", checked: false, icon: "field.png", sectors_ids: [4, 6] , tooltip: "Land use refers to the management and modification of natural environment or wilderness into built environment such as settlements and semi-natural habitats such as arable fields, pastures, and managed woods. Land cover refers to the physical material at the surface of the earth, including grass, asphalt, trees, bare ground, water, etc."},
    { id: 7, text: "Livestock Health", checked: false, icon: "agriculture.svg", sectors_ids: [2] , tooltip: "Livestock health refers to the management and care of farm animals to prevent disease and maintain productivity. In rural areas, this includes veterinary care, vaccination, nutrition, breeding practices, and monitoring of health status to ensure the well-being of animals that are integral to the agricultural economy."},
    { id: 8, text: "Forest Management", checked: false, icon: "forest1.png", sectors_ids: [3] , tooltip: "Forest management in rural environments involves the application of scientific, economic, and social principles to the administration of forests. It aims to achieve a balance between society's increasing demands for forest products and benefits, and the preservation of forest health and diversity. This includes managing forest lands for wood production, wildlife habitat, water quality, recreation, and aesthetic value."},
    { id: 9, text: "Drones Operation", checked: false, icon: "grone.svg", sectors_ids: [2] , tooltip: "Drone operation in rural environments involves the use of unmanned aerial vehicles for various applications such as aerial surveillance, crop monitoring, delivery of goods, and even spraying pesticides or fertilizers. This service considers the necessary training and testing facilities"},
    { id: 10, text: "Health Monitoring", checked: false, icon: "medical-doctor.png", sectors_ids: [5] , tooltip: "Health monitoring in rural environments refers to the ongoing surveillance of individual and public health status. This service can include telehealth technologies, which facilitate remote diagnosis, treatment, and management of health conditions, often important in areas where access to healthcare facilities is limited."},
    { id: 11, text: "Government eServices", checked: false, icon: "department.png", sectors_ids: [6] , tooltip: "Government eServices in rural environments are digital services provided by the government to rural residents. These can include various online services such as registration, applications, information dissemination, and more, designed to improve accessibility, reduce bureaucracy, and increase the efficiency of government services."},
    { id: 12, text: "Leisure", checked: false, icon: "leisure.svg", sectors_ids: [7] , tooltip: "Leisure in rural environments encompasses activities that bring enjoyment and relaxation outside of work. It includes recreational, cultural, and artistic pursuits that enhance quality of life and community engagement in rural areas."},
    { id: 13, text: "Distance Learning", checked: false, icon: "book-and-pencil.png", sectors_ids: [8] , tooltip: "Distance learning in rural environments refers to educational processes where students are physically separated from instructors and peers. This method uses technology, such as the internet, broadcast, or recorded materials, to deliver education to students who may not have access to traditional, in-person education settings."},
    { id: 14, text: "Broadband Connectivity (Access)", checked: false, icon: "public.svg", sectors_ids: [1, 2, 3, 4, 5, 6, 7, 8] , tooltip: "Basic connectivity in rural environments refers to the provision of fundamental telecommunication services, including telephone and basic internet access. This connectivity is essential for communication, access to information, and it serves as the foundation for the implementation of various other digital services."},
    { id: 15, text: "High Data Rate Services", checked: false, icon: "frame.svg", sectors_ids: [8] , tooltip: "High data rate services in rural areas refer to advanced telecommunication services that provide high-speed internet access. This service enables the handling of bandwidth-intensive tasks such as video streaming, large data transfers, and the use of sophisticated cloud-based applications."},
];


export const countries = [
    { name: 'Austria', code: 'AT' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Finland', code: 'Fi' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'Italy', code: 'IT' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Malta', code: 'MT' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Romania', code: 'RO' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SL' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sweden', code: 'SE' },
    { name: 'United Kingdom', code: 'GB' },
];


export const terrainTypes = [
    { id: 1, text: "Plain", checked: false, isActive: true },
    { id: 2, text: "Forest", checked: false, isActive: true },
    { id: 3, text: "Mountain", checked: false,  isActive: true },
    { id: 4, text: "Sea", checked: false, isActive: true },
    { id: 5, text: "River", checked: false, isActive: true },
];


export const weatherConditions = [
    { id: 1, text: "Mostly Sunny", checked: false, color: "#CD9400", isActive: true },
    { id: 2, text: "Mostly Rainy", checked: false, color: "#929292", isActive: true },
    { id: 3, text: "Mixed (Rainy/Sunny)", checked: false, color: "#072B71", isActive: true },
    { id: 4, text: "Foggy", checked: false, color: "#072B71", isActive: true },
    { id: 5, text: "Freezing Temperatures", checked: false, color: "#072B71", isActive: true },
];


export const questions = {
    dev_per_type: {
        text: "What type of device do you want to employ for deploying your service?",
        choices: [
            { id: 1, text: "Sensors", checked: false, nextQuestion: "sensor_rate" , tooltip: "Devices that monitor environmental or operational conditions (e.g., soil moisture, weather) and send data for real-time processing." },
            { id: 2, text: "Drones", checked: false, nextQuestion: "type_of_drones" , tooltip: "Unmanned aerial vehicles (UAVs) used for tasks like surveying, monitoring, or delivering services over rural areas."},
            { id: 3, text: "Personal Devices (Smartphones / Tablets / Laptops)", checked: false, nextQuestion: 'personal_dev_type' , tooltip: "Mobile devices used for personal or business activities, connecting users to digital services and applications."},
            { id: 4, text: "Cameras", checked: false, nextQuestion: "camera_rate" , tooltip: "Cameras deployed for video surveillance, monitoring, or capturing real-time imagery for various rural services." },
            { id: 5, text: "Other type of device", checked: false, nextQuestion: "robot_type" , tooltip: "Devices with custom capabilities that you can define, including specifying the type of data they generate and process." },
        ],
        input: {
            label: "Specify number of devices employed",
            value: "",
            nextQuestion: "", // Initialize with an empty string
        }
    },
    sensor_rate: {
        text: "What sensor readings do you want to produce?",
        tooltipQuestion: "The type of sensors determines the expected cost and power consumption of the sensors, as well as the data rates they can generate.",
        choices: [
            { id: 1, text: "Simple readings (e.g. soil humidity, temperature, etc.)", checked: false, nextQuestion: "sensor_freq" },
            { id: 2, text: "Complex readings (gas concentration, soil nutrient sensors, etc.)", checked: false, nextQuestion: "sensor_freq" }
        ]
    },
    sensor_freq: {
        text: "In which order of magnitude are sensor readings produced?",
        tooltipQuestion: "Please indicate the expected measurement generation rate of the sensors. If the rate is not represented, please choose the next-higher rate, i.e., smaller time interval, to yours.",
        choices: [
            { id: 1, text: "Once per second", checked: false, nextQuestion: "sensor_lat" },
            { id: 2, text: "Once per minute", checked: false, nextQuestion: "sensor_lat" },
            { id: 3, text: "Once per hour", checked: false, nextQuestion: "sensor_lat" },
            { id: 4, text: "Once per day or less", checked: false, nextQuestion: "sensor_lat" }
        ]
    },
    sensor_lat: {
        text: "Can the data be processed with some delay, or does it require immediate action?",
        choices: [
            { id: 1, text: "An immediate action is necessary (<= 2 s)", checked: false, nextQuestion: "end" },
            { id: 2, text: "It can be processed with delay (no specific requirement)", checked: false, nextQuestion: "end" }
        ]
    },
    type_of_drones: {
        text: "What type of Drones are you planning on deploying?",
        choices: [
            { id: 1, text: "Rotor-based drones", checked: false, nextQuestion: "drone_service" , tooltip: (
                <>
                    <strong>Pros:</strong> Highly maneuverable, ideal for stationary tasks like hovering, and easy to operate.<br />
                    <strong>Cons:</strong> Limited endurance and range, vulnerable to wind conditions.
                </>
            )  },
            { id: 2, text: "Wing-based drones", checked: false, nextQuestion: "drone_service" , tooltip: (
                <>
                    <strong>Pros:</strong> Capable of long-range flights and high-speed travel.<br />
                    <strong>Cons:</strong> Requires a runway or launcher for takeoff and landing, cannot hover, and is more complex to operate.
                </>
            ) }
        ]
    },
    drone_service: {
        text: "What type of data is produced by your device? In case multiple options apply, select only the first one that applies in the list.",
        choices: [
            { id: 1, text: "Images/Videos from a camera", checked: false, nextQuestion: "drone_altitude" },
            { id: 2, text: "Sensor readings", checked: false, nextQuestion: "drone_iot_lat" }
        ]
    },
    drone_altitude: {
        text: "At what altitude do you plan on recording footage?",
        tooltipQuestion: "Based on this information the tool estimates the required video resolution and as such the expected data rates the infrastructure needs to support.",
        choices: [
            { id: 1, text: "High-altitudes (100-250m)", checked: false, nextQuestion: "drone_image_proc" },
            { id: 2, text: "Medium altitudes (30-100m)", checked: false, nextQuestion: "drone_image_proc" },
            { id: 3, text: "Low altitudes (< 30m)", checked: false, nextQuestion: "drone_image_proc" }
        ]
    },
    drone_image_proc: {
        text: "What type of digital processing needs to be done with the data produced by your device?",
        choices: [
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "drone_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "end" }
        ]
    },
    drone_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 70 ms)", checked: false, nextQuestion: "end" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "end" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "end" }
        ]
    },
    drone_iot_lat: {
        text: "Can the data be processed with some delay, or does it require immediate action?",
        choices: [
            { id: 'a', text: "An immediate action is necessary (<= 2 s)", checked: false, nextQuestion: "end" },
            { id: 'b', text: "It can be processed with delay (no specific requirement)", checked: false, nextQuestion: "end" }
        ]
    },
    personal_dev_type: {
        text: "What type of personal device will you be using? Please provide the number of each.",
        choices: [
            { id: 1, text: "Smartphones / Tablets", checked: false, nextQuestion: "tablet_internet", inputType: 'tablet' },
            { id: 2, text: "Laptops", checked: false, nextQuestion: "laptop_internet", inputType: 'laptop' }
        ],
        tabletInput: {
            label: "Number of devices of Smartphones / Tablets",
            value: "", // Initialize with an empty string
            nextQuestion: "", // Initialize with an empty string
        },
        laptopInput: {
            label: "Number of devices of Laptops",
            value: "", // Initialize with an empty string
            nextQuestion: "", // Initialize with an empty string
        }
    },
    tablet_internet: {
        text: "Will you be uploading videos from your personal device?",
        choices: [
            { id: 1, text: "Yes", checked: false, nextQuestion: "tablet_image_proc" },
            { id: 2, text: "No", checked: false, nextQuestion: "tablet_rate_down" }
        ]
    },
    tablet_image_proc: {
        text: "What type of digital processing needs to be done with the data produced by your device?",
        choices: [
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "tablet_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "tablet_rate_down" }
        ]
    },
    tablet_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 70 ms)", checked: false, nextQuestion: "tablet_rate_down" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "tablet_rate_down" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "tablet_rate_down" }
        ]
    },
    tablet_rate_down: {
        text: "Will you be consuming content on your devices? If so which category of content? Select the first one that applies.",
        choices: [
            { id: 1, text: "High resolution videos", checked: false, nextQuestion: "end" },
            { id: 2, text: "Browsing the web", checked: false, nextQuestion: "end" },
            { id: 3, text: "Music streaming", checked: false, nextQuestion: "end" }
        ]
    },
    laptop_internet: {
        text: "Will you be uploading videos from your personal device?",
        choices: [
            { id: 1, text: "Yes", checked: false, nextQuestion: "laptop_image_proc" },
            { id: 2, text: "No", checked: false, nextQuestion: "laptop_rate_down"  }
        ]
    },
    laptop_image_proc: {
        text: "What type of digital processing needs to be done with the data produced by your device?",
        choices: [
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "laptop_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "laptop_rate_down" }
        ]
    },
    laptop_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 70 ms)", checked: false, nextQuestion: "laptop_rate_down" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "laptop_rate_down" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "laptop_rate_down" }
        ]
    },
    laptop_rate_down: {
        text: "Will you be consuming content on your devices? If so which category of content? Select the first one that applies.",
        choices: [
            { id: 1, text: "High resolution videos", checked: false, nextQuestion: "end" },
            { id: 2, text: "Browsing the web", checked: false, nextQuestion: "end" },
            { id: 3, text: "Music streaming", checked: false, nextQuestion: "end" }
        ]
    },
    personal_internet: {
        text: "Will you be uploading videos from your personal device?",
        choices: [
            { id: 1, text: "Yes", checked: false, nextQuestion: "personal_proc" },
            { id: 2, text: "No", checked: false, nextQuestion: "personal_rate_down"  }
        ]
    },
    personal_proc: {
        text: "What type of digital processing needs to be done with the data produced by your device?",
        choices: [
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "personal_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "personal_rate_down" }
        ]
    },
    personal_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 70 ms)", checked: false, nextQuestion: "personal_rate_down" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "personal_rate_down" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "personal_rate_down" }
        ]
    },
    personal_rate_down: {
        text: "Will you be consuming content on your devices? If so which category of content? Select the first one that applies.",
        choices: [
            { id: 1, text: "High resolution videos", checked: false, nextQuestion: "end" },
            { id: 2, text: "Browsing the web", checked: false, nextQuestion: "end" },
            { id: 3, text: "Music streaming", checked: false, nextQuestion: "end" }
        ]
    },
    camera_rate: {
        text: "What type of cameras do you want to set up?",
        tooltipQuestion: "The tool associates certain resolutions and equipment cost and power consumption depending on your choice.",
        choices: [
            { id: 1, text: "Low-medium resolution cameras (e.g. for counting livestock, surveillance, etc.)", checked: false, nextQuestion: "camera_proc" },
            { id: 2, text: "High-resolution cameras (Crop monitoring, timelapse photography, etc.)", checked: false, nextQuestion: "camera_proc" },
            { id: 3, text: "Infrared / Thermal Imaging (Water stress detection, livestock monitoring, night operation, etc.)", checked: false, nextQuestion: "camera_proc" }
        ]
    },
    camera_proc: {
        text: "What type of digital processing needs to be done with the data produced by your device?",
        choices: [
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "camera_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "camera_image_freq" }
        ]
    },
    camera_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 70 ms)", checked: false, nextQuestion: "camera_image_freq" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "camera_image_freq" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "camera_image_freq" }
        ]
    },
    camera_image_freq: {
        text: "How fluid has the footage recorded to be (frames per second)?",
        choices: [
            { id: 1, text: "High fluidity, e.g. 60 FPS", checked: false, nextQuestion: "end" },
            { id: 2, text: "Medium fluidity, e.g. 30 FPS", checked: false, nextQuestion: "end" },
            { id: 3, text: "Low fluidity, e.g. 15 FPS", checked: false, nextQuestion: "end" },
            { id: 4, text: "Very low fluidity, e.g. 1 FPS", checked: false, nextQuestion: "end" }
        ]
    },
    robot_type: {
        text: "Please specify type of device you want to deploy.",
        choices: [
        ],
        input: {
            nextQuestion: "robot_service",
            label: "",
            value: "" // Initialize with an empty string
        }
    },
    robot_service: {
        text: "What type of data is produced by your device?",
        choices: [
            { id: 1, text: "Images/Video", checked: false, nextQuestion: "robot_image_rate" },
            { id: 2, text: "IoT data", checked: false, nextQuestion: "robot_iot_rate" },
            { id: 3, text: "Speech/audio samples", checked: false, nextQuestion: "robot_speech_freq" }
        ]
    },
    robot_image_rate: {
        text: "What type of cameras does your device incorporate?",
        tooltipQuestion: "The tool associates certain resolutions and equipment cost and power consumption depending on your choice",
        choices: [
            { id: 1, text: "Low-medium resolution cameras (e.g. for counting livestock, surveillance, etc.)", checked: false, nextQuestion: "robot_image_freq" },
            { id: 2, text: "High-resolution cameras (Crop monitoring, timelapse photography, etc.)", checked: false, nextQuestion: "robot_image_freq" },
            { id: 3, text: "Infrared / Thermal Imaging (Water stress detection, livestock monitoring, night operation, etc.)", checked: false, nextQuestion: "robot_image_freq" }
        ]
    },
    robot_image_freq: {
        text: "How fluid has the footage recorded to be (frames per second)?",
        choices: [
            { id: 1, text: "High fluidity, e.g. 60 FPS", checked: false, nextQuestion: "robot_image_proc" },
            { id: 2, text: "Medium fluidity, e.g. 30 FPS", checked: false, nextQuestion: "robot_image_proc" },
            { id: 3, text: "Low fluidity, e.g. 15 FPS", checked: false, nextQuestion: "robot_image_proc" },
            { id: 4, text: "Very low fluidity, e.g. 1 FPS", checked: false, nextQuestion: "robot_image_proc" }
        ]
    },
    robot_image_proc: {
        text: "Does your data have to be processed or is it just transmitted?",
        choices: [
            { id: 1, text: "Yes, it needs to be processed", checked: false, nextQuestion: "robot_image_lat" },
            { id: 2, text: "No, it only needs to be transmitted", checked: false, nextQuestion: "robot_power" }
        ]
    },
    robot_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 70 ms)", checked: false, nextQuestion: "robot_power" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "robot_power" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "robot_power" }
        ]
    },
    robot_power: {
        text: "What is the power consumption of your device? (In Watt, W)",
        tooltipQuestion: "Please provide the maximum power consumption of your device for a conservative estimation of the techno-environmental assessment.",
        choices: [],
        input: {
            nextQuestion: "robot_cost",
            label: "",
            value: "" // Initialize with an empty string
        }
    },
    robot_cost: {
        text: "What is the cost of your device? (In Euro)",
        choices: [],
        input: {
            nextQuestion: "end",
            label: "",
            value: "" // Initialize with an empty string
        }
    },
    robot_iot_freq: {
        text: "In which order of magnitude are sensor readings produced?",
        choices: [
            { id: 1, text: "Once per second", checked: false,nextQuestion: "robot_iot_proc"  },
            { id: 2, text: "Once per minute", checked: false,nextQuestion: "robot_iot_proc" },
            { id: 3, text: "Once per hour", checked: false,nextQuestion: "robot_iot_proc" },
            { id: 4, text: "Once per day or less", checked: false ,nextQuestion: "robot_iot_proc" }
        ]
    },
    robot_iot_rate: {
        text: "What sensor readings does your device produce?",
        tooltipQuestion: "The type of sensors determines the expected cost and power consumption of the sensors, as well as the data rates they can generate.",
        choices: [
            { id: 1, text: "Simple readings (e.g. soil humidity, temperature, etc.)", checked: false ,nextQuestion: "robot_iot_freq"},
            { id: 2, text: "Complex readings (gas concentration, soil nutrient sensors, etc.)", checked: false,nextQuestion: "robot_iot_freq" }
        ]
    },
    robot_speech_freq: {
        text: "What is the type of recording?",
        tooltipQuestion: "The required quality of the audio recordings directly impacts the required data rate that needs to be supported by the infrastructure.",
        choices: [
            { id: 1, text: "For Podcast/audiobook", checked: false, nextQuestion: "robot_speech_proc" },
            { id: 2, text: "For online meeting", checked: false, nextQuestion: "robot_speech_proc" },
            { id: 3, text: "Personal recordings", checked: false, nextQuestion: "robot_speech_proc" }
        ]
    },
    robot_iot_proc: {
        text: "Does your data have to be processed or is it just transmitted?",
        choices: [
            { id: 1, text: "Yes, it needs to be processed", checked: false,nextQuestion: "robot_iot_lat" },
            { id: 2, text: "No, it only needs to be transmitted", checked: false, nextQuestion: "robot_power" }
        ]
    },
    robot_iot_lat: {
        text: "Can the data be processed with some delay, or does it require immediate action?",
        choices: [
            { id: 1, text: " An immediate action is necessary (<= 2 s)", checked: false,nextQuestion: "robot_power" },
            { id: 2, text: " It can be processed with delay (no specific requirement)", checked: false, nextQuestion: "robot_power" }
        ]
    },
    robot_speech_proc: {
        text: "Does your data have to be processed or is it just transmitted?",
        choices: [
            { id: 1, text: "Yes, it needs to be processed", checked: false,nextQuestion: "robot_speech_lat" },
            { id: 2, text: "No, it only needs to be transmitted", checked: false, nextQuestion: "robot_power" }
        ]
    },
    robot_speech_lat: {
        text: "Can the data be processed with some delay, or does it require immediate action?",
        choices: [
            { id: 1, text: "I expect a prompt reaction (<= 500 ms)", checked: false,nextQuestion: "robot_power" },
            { id: 2, text: "It can be processed with some delay (no specific requirement)", checked: false,nextQuestion: "robot_power" }
        ]
    },
    end: {
        text: "End of questions. Thank you!",
        choices: []
    }
};


export const tooltips = {
    generalButton: {
        description: "Please choose the level of assessment and which user type you are. Additional information is available when hovering above the possible selections.",
    },
    sectorServiceButton: {
        description: "Please select the sector(s) and service(s) you plan on deploying and for which you would like assessment. You can hover over the possible selections to obtain additional information on each sector and service."
    },
    locationInfoButton: {
        description: "To provide an assessment adapted to the environment in which you want to deploy, please provide information about the location and the typical weather conditions of the deployment area. The tool will use this information to optimize the technology proposals and several assessment categories.",
        areaSizeTooltip: "Please provide the approximate area size. The tool assumes a circular area.",
        vegetationHeightTooltip: "Please indicate the height of the prevalent vegetation. If there is no vegetation or it is very sparse, enter 0."
    },
    deviceInfoButton: {
        description: "To find a proper technology mix, the tool requires you to indicate which type of devices you want to deploy and the expected quantity. Please hover over the possible selections for additional information.",
    },
    SocialAssessmentInfoButton: {
        description: "In these views, questions relevant for the social assessment of your deployment are requested.",
    },
    impactweightsInfoButton:{
        description:"This view allows you to assign weights to the different assessment categories the tool is providing. Please assign the desired weights for each of the three categories before proceeding. (0 - No importance, 1 - Low importance, 2 - Neutral, 3 - High importance, 4 - Very high importance).",
    },
    technologicalInfoButton:{
        description:"Adjust this slider to prioritize the technical performance and innovation of the proposed solution, including factors like reliability and future readiness.",
    },
    economicInfoButton:{
        description:"Use this slider to weigh the economic feasibility of the solution, focusing on costs, potential savings, and return on investment.",
    },
    environmentalInfoButton:{
        description:"Set this slider to emphasize the environmental impact, considering aspects such as energy consumption and the carbon footprint of the proposed solutions.",
    },
    resultsmixesInfoButton:{
        description:"This view shows the top technology mixes proposed by the tool based on your inputs. i) We assume 3 communication hops and 4 processing layers in the solutions below. If a hop/layer does not exist there is NONE in the table. ii) The allocation of processing enablers in the processing layers is based on the minizimation of the power consumption based on XGain 'Green' concept.",
    },
    existing_connectivity:{
        description: "If the user does not deploy any additional infrastructure, they can utilize the existing connectivity available in the area-provided it meets their requirements. In this case, the configuration involves only the end devices and the cloud segment, connected via public infrastructure."
    },
    networksmixes:{
        description:"We assume 3 communication hops (Access,Local,Public Internet) included in the network architecture from end devices towards cloud."    
    },
    processingEnablersmixes:{
        description:`
            Devices needed to execute the tasks of end devices. These can be located on either end devices (Extreme), or Far (e.g. close to an access point), or Near (e.g. close to an aggregator node), or  Cloud (e.g. far away from services' private infrastructure). 
            Performance of the processing enablers has been averaged from a group of similar devices to reduce complexity. A brief desctription of the indicative groups follows:
            <ul>
                <li>
                    RPI 4 / RPI 5 / NUC (Light) (e.g. Intel NUC 9) / NVIDIA-ASUS SBC (Light) (e.g. Jetson Nano)/ GPU Based System (Light) (e.g. Google Coral): Compact devices with low-power consumption with NVIDIA / without (RPI, NUC) dedicated GPU/AI accelerators for AI/ML processing tasks.
                </li>
                <li>
                    NVIDIA SBC (Medium) (e.g. Orin Nano) / (Heavy) (e.g. Orin AGX): Mid-to-high-performance embedded systems with powerful GPU/AI accelerators for demanding edge AI workloads.
                </li>
                <li>
                    GPU Based System (Heavy) (e.g. NVIDIA A100)/ PowerEdge (e.g. R640) / NUC (Heavy) (e.g. Intel NUC 12 Pro): High-performance systems with dedicated GPU capacities for intensive AI/ML workloads.
                </li>
                <li>
                    AWS: A cloud server-style device with abundant computing resources (CPU/RAM/GPU).
                </li>
            </ul>
        `  
    },
    accessmixes:{
        description:"The number of network links are based on the area size, max UEs and the total capacity"    
    },
    localmixes:{
        description:"The number of network links are based on max UEs and the total capacity and links are repeated to cover the radius of area."    
    },
    publicInternetmixes:{
        description:"Existing connectivity in the area that is able to cover the unserved rate demand."    
    },
    extrememixes:{
        description:"The processing devices are hosted on end devices."    
    },
    farmixes:{
        description:"The processing devices are hosted on access connectivity points (farther from end devices)."    
    },
    nearmixes:{
        description:"The processing devices are hosted on the aggregation point of local connectivity links (at a greater distance from end devices)."    
    },
    cloudmixes:{
        description:"The processing devices are hosted on the cloud provider (away from the end devices)."    
    },
    carbonFootprint:{
        description:"Carbon Footprint (kg CO₂ equivalent): This metric quantifies the total greenhouse gas emissions associated with an activity, expressed in kilograms of CO₂ equivalent (kg CO₂eq). It accounts for various gases' differing impacts on global warming. A higher value indicates a larger contribution to climate change. For example, transferring 1 gigabyte of data over the internet can result in approximately 3 kg CO₂eq emissions, depending on the energy sources powering the data centres and network infrastructure.  This metric helps assess the climate impact of different technologies or activities by consolidating emissions into a single comparable unit."
    },
    biodiversityfootprint:{
        description:`Biodiversity Footprint (PDF): "PDF" stands for "Potentially Disappeared Fraction of species," which estimates the percentage of species potentially lost due to environmental pressures, such as carbon emissions. PDF values range from 0 to 1, where 0 represents no impact, and 1 represents total species loss in the affected area. Even small PDF values signify an impact; for example, a PDF of 0.05 suggests that 5% of species in an area could disappear due to carbon emissions, similar to the impact of emissions from rural connectivity infrastructure. Higher PDF values reflect greater risks to biodiversity from carbon-intensive technologies and activities.`
    }, 
    impactOnHumanHealth:{
        description:`Impact on Human Health (DALY): "DALY" stands for "Disability-Adjusted Life Years," a measure that reflects the burden of disease on human health due to environmental impacts, such as pollution or emissions. DALY combines years lost due to premature death and years lived with disability, providing a single metric for overall health impact. A higher DALY indicates greater harm to human health, as it signifies more life years lost or affected by illness. For example, a DALY of 0.1 suggests that, on average, 0.1 years of healthy life per person may be lost due to exposure to specific environmental risks associated with the assessed technology.`
    },
    socialAssessment: {
        description: `
            "Relationship with your employees"
            - To what extent the company/organisation offers a formal contract legally defining their relationship and provide protection.

            "Access to (im)material resources" 
            - To what extent the company/organisation respects or improves community access to (im)material resources (such as clean water, clean soil, internet, transport, forms of cultural heritage, community services, education, etc.). If some of these resources are missing the community's quality of life will decrease. 

            "Economic development"
            - To what extent the company/organisation contributes (through their production) to the economic development in the region.

            "Technology development"
            - To what extent the company/organisation participates in joint research for the develoment of efficient and environmental sound technologies. Technology transfer is key for the improvement of social conditions.

            "Fair salary"
            - To what extent the company/organisation pays wages in compliance with industry standards and whether they can be considered a living wage.

            "Working hours"
            - To what extent the company/organisation complies with ILO standards and when overtime occurs pays compensation in money or free time.

            "Occupational health and safety"
            - To what extent the company/organisation causes incidents/accidents and the status of measures to prevent work-related incidents or ill health.

            "Safe and healthy living conditions"
            - To what extent the company/organisation affects community safety and health, including the general safety conditions of operations and their public health impacts (i.e. by using hazardous substances).

            "Community engagement"
            - To what extent the company/organisation includes the community in relevant decisions and in general.

            "Local employment"
            - To what extent the company/organisation (in)directly affects local employment, because of hiring preferences related to required skills.

            "Ethical treatment of animals"
            - To what extent the company/organisation manages the life, treatment, and death of animals (i.e. regular check-ups on the animals, good living circumstances for the animals, no serious injuries/illnesses).
        `
    },
    Selected: {
        description: "These are the sector and the service selected by the user of the KTF"
    },
    Connectivity_And_Edge_Solutions: {
        description: "The proposed solution including access infrastructure, processing and end-users devices."
    },
    Techno_Economic_Indicators: {
        description: "Quantitative metrics used to assess the technical and economic feasibility of deploying and/or operating infrastructure. They are crucial for decision-making, planning, and benchmarking."
    },
    Socio_Environmental_Indicators: {
        description: "Measurable metrics that assess the environmental and social impacts of technologies. These indicators are essential for gaining insight into environmental sustainability and social outcomes, supporting informed decision-making, and identifying strategies to mitigate negative impacts."
    },
    Business_Model: {
        description: "A framework that outlines how an entity (individual or organization) creates, delivers, and captures value. It serves as a blueprint for how it operates and sustains itself. The business model defines the key aspects of the business, including its value proposition, target customers, revenue streams, and operational structure."
    },
    CAPEX_Analysis: {
        description: "CAPEX (Capital Expenditure) analysis involves evaluating the upfront investment (fiber, connectivity infrastructure, processing enablers and end-devices) required for setting up the network/project or system as well as components/devices replacements. It helps understanding and optimizing the costs related to building, replacing or expanding network/system capabilities."
    },
    OPEX_Analysis: {
        description: "OPEX (Operational Expenditure) analysis involves evaluating the running/ongoing expenses needed to maintain and operate the system over its lifespan. These costs include maintenance, utilities (electricity cost), connectivity subscription fees and installations. The time series of OPEX breaks down the operating costs over time, which is vital for understanding long-term operational viability and optimizing resource allocation."
    },
    Total_Cost: {
        description: "Total Cost is the overall expenditure, combining both CAPEX and OPEX. It represents the total investment needed for a solution/project, including both initial and running costs. It provides an indication of the funding requirements of the project."
    },
    Public_Power_Grid: {
        description: "CAPEX, OPEX, and Total Cost are calculated under the assumption that all required power is supplied by the public power grid."
    },
    Solar_panel_System: {
        description: "CAPEX, OPEX, and Total Cost are calculated assuming the use of a solar panel system with batteries, with no electricity drawn from the public power grid."
    }
}
  

export const socialquestiotooltips = {
    Relationship_with_your_employees: {
        description: "To what extent the company/organisation offers a formal contract legally defining their relationship and provide protection."
    },
    Immaterial_resources: {
        description: "To what extent the company/organisation respects or improves community access to (im)material resources (such as clean water, clean soil, internet, transport, forms of cultural heritage, community services, education, etc.). If some of these resources are missing the community's quality of life will decrease."
    },
    Economic_development: {
        description: "To what extent the company/organisation contributes (through their production) to the economic development in the region."
    },
    Technology_development: {
        description: "To what extent the company/organisation participates in joint research for the development of efficient and environmentally sound technologies. Technology transfer is key for the improvement of social conditions."
    },
    Fair_salary: {
        description: "To what extent the company/organisation pays wages in compliance with industry standards and whether they can be considered a living wage."
    },
    Working_hours: {
        description: "To what extent the company/organisation complies with ILO standards and when overtime occurs pays compensation in money or free time."
    },
    Occupational_health_and_safety: {
        description: "To what extent the company/organisation causes incidents/accidents and the status of measures to prevent work-related incidents or ill health."
    },
    Safe_and_healthy_living_conditions: {
        description: "To what extent the company/organisation affects community safety and health, including the general safety conditions of operations and their public health impacts (i.e. by using hazardous substances)."
    },
    Community_engagement: {
        description: "To what extent the company/organisation includes the community in relevant decisions and in general."
    },
    Local_employment: {
        description: "To what extent the company/organisation (in)directly affects local employment, because of hiring preferences related to required skills."
    },
    Ethical_treatment_of_animals: {
        description: "To what extent the company/organisation manages the life, treatment, and death of animals (i.e. regular check-ups on the animals, good living circumstances for the animals, no serious injuries/illnesses)."
    }
};


export const descriptionsBusinessModel = {
    "Key Partners": "The people, companies and organisations who will help in fulfilling the key activities, using the key resources.",
    "Key Activities": "The crucial actions that a business or an organisation must undertake to operate successfully, and deliver value to its customers and stakeholders.",
    "Key Resources": "The resources that are necessary to create value for the customer. These resources could be human, financial, physical, and intellectual.",
    "Value Propositions": "The value proposition showcases the value of an organisation through various elements such as newness, performance, customisation, 'getting the job done', design, brand/status, price, cost reduction, usability etc.",
    "Customer Relationships": "The type of relationship an organisation wants to create with its identified customer segments.",
    "Customer Segments": "The groups of customers that can be targeted and served (e.g., farmers or local businesses).",
    "Channels": "Effective channels that will distribute the value proposition in ways that are fast, efficient and cost-effective.",
    "Cost Structure": "Costs that are related to the development of technologies, intellectual properties, infrastructure, maintenance, procurement of equipment and services, development of online platforms and many others.",
    "Revenue Streams": "The way the potential business opportunity is expected to generate income from each customer segment.",
    "Partnerships/Suppliers/Collaborators": "The diverse partner ecosystem that Public Authorities manage, ensuring that they are able to provide reliable and effective services.",
    "Other Stakeholders": "Other stakeholders that public authorities need to take into consideration when making decisions.",
    "Resources": "The resources that are necessary to create value for beneficiaries. These resources could be human, financial, physical and intellectual.",
    "Capabilities": "Related to institutional skills (intraorganisational) and individual skills (knowledge, skills, etc.) for useful execution focused on creating value for the beneficiary.",
    "Proccesses": "The most important processes that need to happen.",
    "Products": "For a public authority these are considered to be the main legislative outputs that will come out from a project.",
    "Beneficiaries": "The segment(s) of beneficiaries (target audience) of the governance model.",
    "Outcomes": "The network of direct and indirect outcomes produced in the external environment (external to society and/or citizens) through the delivery of goods and/or services.",
    "Public Value": "The value appropriated by the beneficiaries enabling the fulfillment of their expectations, values, demands, and interests, which are key to generating trust."
};
  