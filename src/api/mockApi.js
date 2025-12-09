// Mock API layer with simulated network delays
// Replace these functions with real API calls when moving to production

import settingsData from '../mock/settings.json';
import postsData from '../mock/posts.json';
import keyPersonsData from '../mock/key_persons.json';
import districtsData from '../mock/districts.json';
import galleryData from '../mock/gallery.json';

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Random delay between 100-600ms
const randomDelay = () => delay(Math.random() * 500 + 100);

// Settings
export const getSettings = async () => {
  await randomDelay();
  return { success: true, data: settingsData };
};

// Posts
export const getPosts = async ({ page = 1, per = 6 } = {}) => {
  await randomDelay();
  const startIndex = (page - 1) * per;
  const endIndex = startIndex + per;
  const paginatedPosts = postsData.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: paginatedPosts,
    meta: {
      current_page: page,
      per_page: per,
      total: postsData.length,
      total_pages: Math.ceil(postsData.length / per)
    }
  };
};

export const getPostById = async (id) => {
  await randomDelay();
  const post = postsData.find(p => p.id === parseInt(id));
  
  if (!post) {
    return { success: false, error: 'Post not found' };
  }
  
  return { success: true, data: post };
};

export const getPostBySlug = async (slug) => {
  await randomDelay();
  const post = postsData.find(p => p.slug === slug);
  
  if (!post) {
    return { success: false, error: 'Post not found' };
  }
  
  return { success: true, data: post };
};

// Key Persons
export const getKeyPersons = async () => {
  await randomDelay();
  
  // Original key persons data
  const originalKeyPersons = [
    {
      id: 1,
      name: "Chennaiah",
      role: "National President – Mala Mahanadu",
      bio: "Leading the national organization with vision and dedication for community welfare.",
      photo: "/mock images/chennaiah.jpg",
      details: {
        roleAndLeadership: "G. Chennaiah serves as the National President of Mala Mahanadu, a prominent organisation dedicated to the upliftment, rights, and welfare of the Mala (SC) community across Andhra Pradesh and Telangana. He is widely recognised for his strong organisational leadership and commitment to Ambedkarite social justice.",
        advocacyAndPublicWork: "Chennaiah is an active voice in state-level movements and SC community struggles. His work centres on:\n• Protecting SC/ST reservations and constitutional safeguards.\n• Demanding fair implementation of welfare schemes.\n• Promoting education and empowerment of marginalised communities.\n• Mobilising youth, community leaders, and district units.\n• Leading awareness campaigns and solidarity marches across both states",
        publicPositionsAndInitiatives: "He has consistently:\n• Warned political parties against any dilution of SC rights.\n• Supported educational reforms beneficial to the poor and marginalised.\n• Called for transparency in beneficiary-based schemes.\n• Insisted on stronger representation of Mala communities in political and administrative spaces.\nHis speeches highlight equality, human dignity, constitutional rights, and Dr. B.R. Ambedkar's ideals.",
        mediaAndOrganisationalPresence: "Chennaiah frequently appears in news media, press conferences, rallies, and community events. Through social media and public engagement, he amplifies community issues and unites diverse groups under the Mala Mahanadu banner."
      }
    },
    {
      id: 2,
      name: "Burugula Venkateswarlu", 
      role: "State President",
      bio: "Leading state-level initiatives and coordinating district activities.",
      photo: "/mock images/burgula-venkateswarlu.jpg"
    },
    {
      id: 3,
      name: "Dr. Ranjith Kumar Manda",
      role: "B.Tech., M.Tech., Ph.D. (JNTUH) Chairman – JNTUH JAC, State General Secretary – Mala Mahanadu",
      bio: "Educational leader and organizational coordinator with extensive academic background.",
      photo: "/mock images/Manda-Ranjith-Kumar.jpg",
      details: {
        earlyLifeAndFamilyBackground: "Dr. Manda Ranjith Kumar was born in Julurupadu village of Bhadradri Kothagudem District, Telangana. He comes from a modest agricultural family and is the son of Sri Manda Pullaiah. Growing up in a rural environment taught him the values of discipline, sincerity and perseverance. These early experiences shaped his character and laid the foundation for his academic excellence and deep sense of social responsibility.",
        primaryAndSecondaryEducation: "He completed his schooling at ZPHS Julurupadu, where he consistently excelled in his studies. His hard work earned him 2nd rank in the Mandal in his 10th Standard, making him one of the top-performing students in the region.",
        intermediateEducation: "Ranjith Kumar pursued his Intermediate at Nalanda Junior College, Kothagudem, scoring an impressive 920 out of 1000 marks. This achievement strengthened his academic reputation and opened the path for his engineering journey.",
        engineeringJourney: "With a strong EAMCET rank, he secured admission into Adams Engineering College, Palvoncha, specializing in Electrical and Electronics Engineering (EEE). Even during his B.Tech, he attempted the All India GATE Examination and secured a commendable rank—an early indication of his research capability and academic depth.",
        mtechExcellence: "He completed his M.Tech at Jawaharlal Nehru Technological University Hyderabad (JNTUH), one of India's premier technological institutions. His postgraduate years strengthened his technical knowledge and research orientation. Once again, he qualified in GATE, reinforcing his commitment to advanced studies and research.",
        doctoralResearch: "Dr. Ranjith Kumar earned admission into the prestigious Ph.D programme at JNTUH, purely on merit. His research work titled: 'Design and Analysis of SPV Systems for Higher Electrical Output with Different MPPT Techniques' stands as a notable contribution to the renewable energy sector, particularly in enhancing solar photovoltaic (SPV) efficiency and advancing MPPT technologies. Under the mentorship of Prof. Dr. K. Vijaya Kumar Reddy, Rector, JNTUH, he completed his doctoral work with scientific precision, innovation and analytical excellence. His research supports India's growing clean-energy vision and contributes valuable insights to the solar industry.",
        leadershipInStudentMovements: "Dr. Ranjith Kumar distinguished himself as an effective leader from his student days. He actively participated in various movements related to: Students' rights, University reforms, Welfare of teaching and non-teaching staff, Improvement of campus facilities. His firm voice, leadership clarity and commitment to justice earned him respect across the university community.",
        serviceInJNTUHJAC: "Recognizing his leadership skills, he was elected as: State President – JNTUH JAC, Later elevated to Chairman – JNTUH JAC. In these key roles, he worked tirelessly for the welfare of thousands of students and staff. His efforts strengthened the JNTUH JAC, making it a respected and influential body advocating equality, transparency and academic welfare.",
        socialCommitment: "Beyond academics, Dr. Ranjith Kumar is admired for his humility and commitment to social justice. He actively works for: Equality and constitutional rights, Upliftment of the Mala community, Youth empowerment and awareness, Social justice movements, Educational promotion in rural areas. As State General Secretary of Mala Mahanadu, he plays a pivotal role in community-related initiatives and public service activities.",
        personalityAndValues: "Dr. Ranjith Kumar is widely respected for his: Discipline and integrity, Honesty and ethical leadership, Humility and approachability, Passion for education and innovation, Strong social commitment, Service-oriented mindset. His remarkable journey from a small village to the academic and leadership corridors of JNTUH stands as an inspiration to students and youth across Telangana.",
        honoursAndRecognition: "Dr. Manda Ranjith Kumar's achievements have been celebrated by several distinguished leaders, institutions and communities. Their appreciation reflects the impact of his academic excellence, leadership and social service.\n\nAcademic & University Leaders:\n• Prof. Katta Narasimha Reddy – Former Vice-Chancellor, JNTUH\n• Dr. K. Vijaya Kumar Reddy, Sr.Professor– Rector, JNTUH\n• Dr. K. Venkateswarlu – Registrar, JNTUH\n• Dr. J. Suresh Kumar–, Sr.Professor-JNTUH\n• All Senior Professors, Professors, Teaching & Non-Teaching Staff of JNTUH\n\nSocial Leadership Recognition:\n• G. Chennaiah – National President, Mala Mahanadu\n• B. Venkateshwarlu – State President, Mala Mahanadu\n• Medi Papayya – State President, MRPS\n\nCommunity & Public Appreciation:\n• Student community of JNTUH, acknowledging his strong leadership\n• People of Julurupadu village, celebrating his achievements with pride\n• Well-wishers from Bhadradri Kothagudem & Khammam districts, appreciating his rise from rural roots to scholarly excellence",
        conclusion: "The life of Dr. Manda Ranjith Kumar stands as a powerful example of what dedication, discipline and social commitment can achieve. From a humble rural childhood to becoming a respected scholar, researcher, community leader and Chairman of JNTUH JAC, his journey is truly inspiring. His contributions in academics, leadership and social service continue to motivate thousands of students and youth across Telangana."
      }
    },
    {
      id: 4,
      name: "Bhaindla Srinivas",
      role: "Greater Hyderabad President",
      bio: "Leading Hyderabad region initiatives and community development programs.",
      photo: "/mock images/bhaindla-srinivas.jpg",
      details: {
        earlyLifeAndBackground: "Bhaindla Srinivas, born on 12 December 1981 in the heart of Hyderabad, is a leader shaped by struggle, compassion, and an unshakable commitment to his community. Rising from humble beginnings, he carries the strength and dignity of the SC Mala community with pride, transforming every challenge into a stepping stone for collective upliftment.",
        educationAndQualifications: "With a B.A. qualification and a life rooted in the values of justice and self-respect, he has dedicated himself to the service of people.",
        leadershipJourney: "His journey through roles such as Division President, Greater Hyderabad Vice President, and now President of Greater Hyderabad Mala Mahanadu, reflects not just leadership — but a heartfelt mission to protect the rights, voices, and dreams of thousands.",
        personalDetails: "A proud son of Banjara Hills, standing 5.6 ft tall with an unwavering spirit, Srinivas believes in lifting others as he climbs. His O+Ve blood group mirrors the positivity he carries into every struggle, every movement, and every community cause.",
        communityImpact: "To many, he is not just a leader — He is a symbol of hope. A voice for the voiceless. A strength for the oppressed. A torchbearer of Mala self-respect and unity.",
        missionAndVision: "With courage in his heart and service in his soul, Bhaindla Srinivas continues to fight for dignity, equality, and a brighter future for every Mala family."
      }
    },
    {
      id: 5,
      name: "P. Koteswara Rao",
      role: "National Employees Association President",
      bio: "Representing and advocating for employee rights and welfare at national level.",
      photo: "/mock images/p.koteshwarroa.jpg"
    }
  ];
  
  return { success: true, data: originalKeyPersons };
};

// Districts
export const getDistricts = async () => {
  await randomDelay();
  return { success: true, data: districtsData };
};

// Gallery
export const getGallery = async () => {
  await randomDelay();
  return { success: true, data: galleryData };
};

// Forms
export const submitComplaint = async (data) => {
  await randomDelay();
  console.log('Complaint submitted:', data);
  
  // Store in localStorage for demo purposes
  const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
  complaints.push({
    ...data,
    id: Date.now(),
    submitted_at: new Date().toISOString()
  });
  localStorage.setItem('complaints', JSON.stringify(complaints));
  
  return { success: true, message: 'Complaint submitted successfully' };
};

export const submitContact = async (data) => {
  await randomDelay();
  console.log('Contact form submitted:', data);
  
  // Store in localStorage for demo purposes
  const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
  contacts.push({
    ...data,
    id: Date.now(),
    submitted_at: new Date().toISOString()
  });
  localStorage.setItem('contacts', JSON.stringify(contacts));
  
  return { success: true, message: 'Contact form submitted successfully' };
};

// Donation tracking (demo only)
export const recordDonation = async (data) => {
  await randomDelay();
  console.log('Donation recorded:', data);
  
  const donations = JSON.parse(localStorage.getItem('donations') || '[]');
  donations.push({
    ...data,
    id: Date.now(),
    submitted_at: new Date().toISOString(),
    status: 'pending'
  });
  localStorage.setItem('donations', JSON.stringify(donations));
  
  return { success: true, message: 'Donation recorded successfully' };
};

// Get stored data (for admin/demo purposes)
export const getStoredData = async (type) => {
  await randomDelay();
  const data = JSON.parse(localStorage.getItem(type) || '[]');
  return { success: true, data };
};
