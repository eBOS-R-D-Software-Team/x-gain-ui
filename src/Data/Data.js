export const stepsLabels = [
    {
        title: "Sector and Service selection",
        subtitle: "",
        icon: "images/icons/sector.svg",
        subicon: "",
        url: "/sector-services-level"
    },
    {
        title: "Location Details",
        subtitle: "",
        icon: "images/icons/location.png",
        subicon: ""
    },
    {
        title: "Service Requirements",
        subtitle: "",
        icon: "images/icons/service.png",
        subicon: ""
    },
    {
        title: "Evaluate your case",
        subtitle: "",
        icon: "images/icons/graph1.png",
        subicon: ""
    },
    {
        title: "Impact Weights",
        subtitle: "",
        icon: "/images/icons/service.png",
        subicon: ""
    },
    {
        title: "Results:",
        subtitle: "Suggested Technology Mixes",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png"
    },
    {
        title: "Summary Results",
        subtitle: "",
        icon: "/images/icons/graph1.png",
        subicon: "/images/icons/graph2.png"
    },
];


export const levels = [
    { id: 1, text: "Local", checked: false},
    { id: 2, text: "Community", checked: false},
    { id: 3, text: "Regional", checked: false},
];


export const userTypes = [
    { id: 1, text: "End-User", checked: false, isActive: false, level_ids: [1, 2] },
    { id: 2, text: "Public Authority", checked: false, isActive: false, level_ids: [2, 3] },
    { id: 3, text: "Internet Service Provider (ISP)", checked: false, isActive: false, level_ids: [2, 3] },
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
    { id: 1, text: "Water Quality Monitoring", checked: false, icon: "water.png", sectors_ids: [1, 4]},
    { id: 2, text: "Remote Farming", checked: false, icon: "agriculture.svg", sectors_ids: [1, 2]},
    { id: 3, text: "Smart Farming", checked: false, icon: "barley.png", sectors_ids: [2]},
    { id: 4, text: "Precision Agriculture", checked: false, icon: "grass.png", sectors_ids: [2]},
    { id: 5, text: "Farm management", checked: false, icon: "fence.png", sectors_ids: [2]},
    { id: 6, text: "Land Use / Land Cover", checked: false, icon: "field.png", sectors_ids: [4, 6]},
    { id: 7, text: "Livestock health", checked: false, icon: "agriculture.svg", sectors_ids: [2]},
    { id: 8, text: "Forest Management", checked: false, icon: "forest1.png", sectors_ids: [3]},
    { id: 9, text: "Drones Operation", checked: false, icon: "grone.svg", sectors_ids: [2]},
    { id: 10, text: "Health Monitoring", checked: false, icon: "medical-doctor.png", sectors_ids: [5]},
    { id: 11, text: "Government e-Services", checked: false, icon: "department.png", sectors_ids: [6]},
    { id: 12, text: "Leisure", checked: false, icon: "leisure.svg", sectors_ids: [7]},
    { id: 13, text: "Distance Learning", checked: false, icon: "book-and-pencil.png", sectors_ids: [8]},
    { id: 14, text: "Broadband Connectivity (Access)", checked: false, icon: "public.svg", sectors_ids: [1, 2, 3, 4, 5, 6, 7, 8]},
    { id: 15, text: "High data rate services", checked: false, icon: "frame.svg", sectors_ids: [8]},
];


export const countries = [
    { name: 'Austria', code: 'AT' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Germany', code: 'DE' },
    { name: 'Denmark', code: 'DK' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Spain', code: 'ES' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Greece', code: 'GR' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Malta', code: 'MT' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Romania', code: 'RO' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Sweden', code: 'SE' }
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
    { id: 5, text: " Freezing Temperatures", checked: false, color: "#072B71", isActive: true },
];


export const questions = {
    dev_per_type: {
        text: "What type of device do you want to employ for deploying your service?",
        choices: [
            { id: 1, text: "Sensors", checked: false, nextQuestion: "sensor_rate" },
            { id: 2, text: "Drones", checked: false, nextQuestion: "type_of_drones" },
            { id: 3, text: "Personal Devices (Smartphones / Tablets / Laptops)", checked: false, nextQuestion: 'personal_dev_type' },
            { id: 4, text: "Cameras", checked: false, nextQuestion: "camera_rate" },
            { id: 5, text: "Other type of device", checked: false, nextQuestion: "robot_type" },
        ],
        input: {
            label: "Specify number of devices employed",
            value: "",
            nextQuestion: "", // Initialize with an empty string
        }
    },
    sensor_rate: {
        text: "What sensor readings do you want to produce?",
        choices: [
            { id: 1, text: "Simple readings (e.g. soil humidity, temperature, etc.)", checked: false, nextQuestion: "sensor_freq" },
            { id: 2, text: "Complex readings (gas concentration, soil nutrient sensors, etc.)", checked: false, nextQuestion: "sensor_freq" }
        ]
    },
    sensor_freq: {
        text: "In which order of magnitude are sensor readings produced?",
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
            { id: 1, text: "Rotor-based drones", checked: false, nextQuestion: "drone_service" },
            { id: 2, text: "Wing-based drones", checked: false, nextQuestion: "drone_service" }
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
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "drone_image_lat" }
        ]
    },
    drone_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 200 ms)", checked: false, nextQuestion: "end" },
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
            { id: 'personal_dev_type_1', text: "Smartphones / Tablets", checked: false, nextQuestion: "tablet_internet" },
            { id: 'personal_dev_type_2', text: "Laptops", checked: false, nextQuestion: "laptop_internet" }
        ],
        input: {
            label: "Number of devices",
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
            { id: 1, text: "In real time (< 200 ms)", checked: false, nextQuestion: "tablet_rate_down" },
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
    personal_internet: {
        text: "Will you be uploading videos from your personal device?",
        choices: [
            { id: 1, text: "Yes", checked: false, nextQuestion: "laptop_image_proc" },
            { id: 2, text: "No", checked: false, nextQuestion: "laptop_rate_down"  }
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
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "tablet_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "tablet_rate_down" }
        ]
    },
    laptop_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 200 ms)", checked: false, nextQuestion: "tablet_rate_down" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "tablet_rate_down" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "tablet_rate_down" }
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
    camera_rate: {
        text: "What type of cameras do you want to set up?",
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
            { id: 1, text: "In real time (< 200 ms)", checked: false, nextQuestion: "camera_image_freq" },
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
        text: "What type of personal device will you be using? Please provide the number of each.",
        choices: [
        ],
        input: {
            nextQuestion: "robot_service",
            label: "Specify type of device you want to deploy",
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
        choices: [
            { id: 1, text: "Low-medium resolution cameras (e.g. for counting livestock, surveillance, etc.)", checked: false, nextQuestion: "robot_image_freq" },
            { id: 2, text: "High-resolution cameras (Crop monitoring, timelapse photography, etc.)", checked: false, nextQuestion: "robot_image_freq" },
            { id: 3, text: "Infrared / Thermal Imaging (Water stress detection, livestock monitoring, night operation, etc.)", checked: false, nextQuestion: "robot_image_freq" }
        ]
    },
    robot_image_freq: {
        text: "How fluid has the footage recorded to be (frames per second)?",
        choices: [
            { id: 1, text: "High fluidity, e.g. 60 FPS", checked: false, nextQuestion: "robot_proc" },
            { id: 2, text: "Medium fluidity, e.g. 30 FPS", checked: false, nextQuestion: "robot_proc" },
            { id: 3, text: "Low fluidity, e.g. 15 FPS", checked: false, nextQuestion: "robot_proc" },
            { id: 4, text: "Very low fluidity, e.g. 1 FPS", checked: false, nextQuestion: "robot_proc" }
        ]
    },
    robot_proc: {
        text: "What type of digital processing needs to be done with the data produced by your device?",
        choices: [
            { id: 1, text: "Image processing (e.g. object detection and recognition, image analysis)", checked: false, nextQuestion: "robot_image_lat" },
            { id: 2, text: "No processing requirements (only transmission of data)", checked: false, nextQuestion: "robot_power" }
        ]
    },
    robot_image_lat: {
        text: "How fast does the captured video have to be processed?",
        choices: [
            { id: 1, text: "In real time (< 200 ms)", checked: false, nextQuestion: "robot_power" },
            { id: 2, text: "Quick, e.g. for ad-hoc visualization purposes ( <= 3 s)", checked: false, nextQuestion: "camera_image_freq" },
            { id: 3, text: "No specific requirement (> 3 s)", checked: false, nextQuestion: "camera_image_freq" }
        ]
    },
    robot_power: {
        text: "What is the power consumption of your device? ",
        choices: [],
        input: {
            nextQuestion: "robot_cost",
            label: "What is the power consumption of your device",
            value: "" // Initialize with an empty string
        }
    },
    robot_cost: {
        text: "What is the cost of your device? ",
        choices: [],
        input: {
            nextQuestion: "end",
            label: "What is the cost of your device?",
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
        choices: [
            { id: 1, text: "Simple readings (e.g. soil humidity, temperature, etc.)", checked: false ,nextQuestion: "robot_iot_freq"},
            { id: 2, text: "Complex readings (gas concentration, soil nutrient sensors, etc.)", checked: false,nextQuestion: "robot_iot_freq" }
        ]
    },
    robot_speech_freq: {
        text: "What is the type of recording?",
        choices: [
            { id: 1, text: "For Podcast/audiobook", checked: false, nextQuestion: "robot_speech_proc" },
            { id: 2, text: "For online meeting", checked: false, nextQuestion: "robot_speech_proc" },
            { id: 3, text: "Personal recordings", checked: false, nextQuestion: "robot_speech_proc" }
        ]
    },
    robot_iot_proc: {
        text: "Does your data have to be processed or is it just transmitted?",
        choices: [
            { id: 1, text: "Yes, it needs to be processed", checked: false,nextQuestion: "robot_power" },
            { id: 2, text: "No, it only needs to be transmitted", checked: false, nextQuestion: "robot_power" }
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