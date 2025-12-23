import React, { useState, useRef, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import SeoHead from '../components/SeoHead';
import { FaUserFriends, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaSpinner, FaCamera, FaIdCard, FaCalendarAlt, FaUser, FaVenusMars } from 'react-icons/fa';

// State, District, and Mandal data
const locationData = {
  "Telangana": {
    "Adilabad": ["Adilabad", "Bazarhatnoor", "Bela", "Bhainsa", "Boath", "Gudihatnoor", "Ichoda", "Jainath", "Kerameri", "Kouthala", "Kubeer", "Luxettipet", "Mudhole", "Narnoor", "Nirmal", "Tamsi", "Tandur", "Utnoor", "Vemanpalle"],
    "Bhadradri Kothagudem": ["Kothagudem", "Manuguru", "Yellandu", "Burgampahad", "Chandrugonda", "Aswaraopeta", "Palwancha", "Dammapeta", "Chunchupalle", "Julurpad", "Sujathanagar", "Karakagudem", "Gundala", "Tekulapalle"],
    "Hyderabad": ["Charminar", "Khairatabad", "Kukatpally", "LB Nagar", "Secunderabad", "Serilingampally"],
    "Jagtial": ["Jagtial", "Dharmapuri", "Gollapalle", "Ibrahimpatnam", "Kathlapur", "Koratla", "Mallapur", "Mallial", "Medipalle", "Metpalle", "Pegadapalle", "Raikal", "Sarangapur", "Velgatoor"],
    "Jangaon": ["Jangaon", "Bachannapet", "Chilpur", "Devaruppula", "Kodakandla", "Lingalaghanpur", "Narmetta", "Palakurthi", "Raghunathpalle", "Tharigoppula", "Zaffergadh"],
    "Jayashankar Bhupalpally": ["Bhupalpally", "Chityal", "Ghanapur Station", "Kataram", "Mahadevpur", "Malharrao", "Mogullapalle", "Mutharam", "Tekumatla", "Toguta", "Regonda"],
    "Jogulamba Gadwal": ["Gadwal", "Alampur", "Atmakur", "Dharur", "Ghattu", "Ieeja", "Itikyal", "Kaloor", "Maddur", "Maldakal", "Rajoli", "Undavelly", "Waddepalle"],
    "Kamareddy": ["Kamareddy", "Banswada", "Bhiknoor", "Bichkunda", "Domakonda", "Jukkal", "Lingampet", "Machareddy", "Madnoor", "Nagireddipet", "Nizamsagar", "Pedda Kodapgal", "Rajampet", "Sadashivanagar", "Tadwai", "Yellareddy"],
    "Karimnagar": ["Karimnagar", "Choppadandi", "Ellanthakunta", "Gangadhara", "Ganneruvaram", "Huzurabad", "Jammikunta", "Kothapalle", "Manakondur", "Raikal", "Ramadugu", "Saidapur", "Shankarapatnam", "Thimmapur", "Veenavanka", "Vemulawada"],
    "Khammam": ["Khammam Urban", "Khammam Rural", "Chintakani", "Enkoor", "Kallur", "Kamepalle", "Kusumanchi", "Madhira", "Mudigonda", "Nelakondapalle", "Penuballi", "Raghunadhapalem", "Sathupalle", "Singareni", "Thirumalayapalem", "Tirumalayapalem", "Vemsoor", "Wyra", "Yerrupalem"],
    "Komaram Bheem": ["Asifabad", "Dahegaon", "Jannaram", "Kagaznagar", "Kerameri", "Lingapur", "Penchikalpet", "Rebbena", "Sirpur", "Tiryani"],
    "Mahabubabad": ["Mahabubabad", "Bayyaram", "Chinnagudur", "Danthalapalle", "Dornakal", "Garla", "Gudur", "Kothaguda", "Kuravi", "Maripeda", "Narsimhulapet", "Nellikudur", "Thorrur"],
    "Mahbubnagar": ["Mahbubnagar", "Addakal", "Amangal", "Balanagar", "Chinna Chintakunta", "Dhanwada", "Gandeed", "Hanwada", "Jadcherla", "Kalwakurthy", "Koilkonda", "Kothakota", "Midjil", "Mohammadabad", "Narayanpet", "Nawabpet", "Peddakothapalle", "Rajapur", "Shadnagar", "Tadoor", "Thimmajipet", "Urkonda", "Wanaparthy"],
    "Mancherial": ["Mancherial", "Bellampalle", "Bheemini", "Chennur", "Hajipur", "Jaipur", "Kannepalle", "Kasipet", "Kotapalle", "Luxettipet", "Mandamarri", "Naspur", "Nennel", "Tandur", "Vemulawada"],
    "Medak": ["Medak", "Alladurg", "Chegunta", "Chilipet", "Dubbak", "Gajwel", "Hathnoora", "Havelighanpur", "Kondapak", "Kulcharam", "Manoharabad", "Narayankhed", "Narsapur", "Papannapet", "Ramayampet", "Regode", "Shivampet", "Siddipet", "Shankarampet", "Tekmal", "Toopran", "Yelgoi", "Zaheerabad"],
    "Medchal-Malkajgiri": ["Medchal", "Malkajgiri", "Alwal", "Bachupally", "Ghatkesar", "Kapra", "Keesara", "Kukatpally", "Quthbullapur", "Shamirpet", "Uppal"],
    "Mulugu": ["Mulugu", "Eturnagaram", "Govindaraopet", "Kannaigudem", "Mangapet", "Venkatapur", "Venkatapuram", "Wajedu", "Wazeed"],
    "Nagarkurnool": ["Nagarkurnool", "Achampet", "Amrabad", "Bijinapalle", "Choudur", "Kalwakurthy", "Kodair", "Kollapur", "Lingal", "Padara", "Peddakothapalle", "Tadoor", "Telkapalle", "Thimmajipet", "Urkonda", "Vangoor"],
    "Nalgonda": ["Nalgonda", "Alair", "Anumula", "Atmakur", "Bhongir", "Chandur", "Chivvemla", "Dameracherla", "Devarakonda", "Gundlapalle", "Kangal", "Kattangoor", "Marriguda", "Miryalaguda", "Munugode", "Nakrekal", "Nampalle", "Narketpalle", "Neredcherla", "Nidamanur", "Peddavoora", "Ramannapet", "Sali Gouraram", "Thipparthi", "Thripuraram", "Yadagirigutta"],
    "Narayanpet": ["Narayanpet", "Damaragidda", "Dhanwada", "Kosgi", "Maddur", "Maganoor", "Makthal", "Marikal", "Narva", "Utkoor"],
    "Nirmal": ["Nirmal", "Basar", "Bhainsa", "Dasturabad", "Dilawarpur", "Kaddipet", "Khanapur", "Kubeer", "Laxmanchanda", "Mamda", "Mendora", "Narsapur", "Sarangapur", "Tanur", "Umri"],
    "Nizamabad": ["Nizamabad Urban", "Nizamabad Rural", "Armoor", "Bheemgal", "Bichkunda", "Bodhan", "Dichpalle", "Indalwai", "Jakranpalli", "Kamareddy", "Kotagiri", "Makloor", "Mendora", "Mortad", "Mudhole", "Nandipet", "Navipet", "Renjal", "Rudrur", "Sirkonda", "Varni", "Velpur", "Yedapalle"],
    "Peddapalli": ["Peddapalli", "Anthergaon", "Dharmaram", "Eligaid", "Julapalle", "Kamanpur", "Manthani", "Mutharam", "Odela", "Ramagiri", "Ramagundam", "Srirampur", "Sultanabad"],
    "Rajanna Sircilla": ["Sircilla", "Boinpalle", "Chandurthi", "Ellanthakunta", "Gambhiraopet", "Koheda", "Konaraopet", "Mustabad", "Navipet", "Rudrangi", "Thandur", "Thangallapalle", "Veenavanka", "Vemulawada", "Yellareddipet"],
    "Rangareddy": ["Chevella", "Ibrahimpatnam", "Kandukur", "Keshampet", "Manchal", "Marpalle", "Moinabad", "Rajendranagar", "Saroornagar", "Serilingampally", "Shamshabad", "Shankarpalle", "Vicarabad", "Yacharam"],
    "Sangareddy": ["Sangareddy", "Ameenpur", "Andole", "Arrival", "Gummadidala", "Hathnoora", "Jharasangam", "Jinnaram", "Kandi", "Kohir", "Kondapur", "Munipalle", "Narayankhed", "Nyalkal", "Patancheru", "Pulkal", "Sadasivpet", "Tupran", "Zaheerabad"],
    "Suryapet": ["Suryapet", "Atmakur", "Cheryala", "Chinthalapalem", "Garidepalle", "Huzurnagar", "Jajireddigudem", "Kodad", "Mattampalle", "Mellachervu", "Mothkur", "Munagala", "Nagaram", "Neredcherla", "Nuthankal", "Penpahad", "Thungathurthy"],
    "Vikarabad": ["Vikarabad", "Bantwaram", "Basheerabad", "Bomraspet", "Doma", "Doulatabad", "Dharur", "Kodangal", "Kulkacharla", "Marpalle", "Mogudampalle", "Pargi", "Peddemul", "Tandur", "Yalal"],
    "Wanaparthy": ["Wanaparthy", "Amangal", "Atmakur", "Bhoothpur", "Chinnambavi", "Gopalpet", "Kothakota", "Madanapur", "Pangal", "Pebbair", "Peddamandadi", "Revally", "Srirangapur", "Veepangandla", "Weepangandla"],
    "Warangal Rural": ["Warangal Rural", "Atmakur", "Chennaraopet", "Damera", "Duggondi", "Geesugonda", "Khanapur", "Nallabelly", "Narsampet", "Parkal", "Parvathagiri", "Rayaparthy", "Sangem", "Shayampet", "Wardhannapet"],
    "Warangal Urban": ["Warangal", "Hanamkonda", "Elkathurthy", "Ghanpur", "Hasanparthy", "Inavolu", "Jangaon", "Kamalapur", "Karupur", "Mahabubabad", "Nekkonda", "Palakurthy", "Raiparthy", "Thorrur", "Wardhannapet", "Zaffergadh"],
    "Yadadri Bhuvanagiri": ["Bhuvanagiri", "Alair", "Atmakur", "Bhongir", "Bibinagar", "Choutuppal", "Gundala", "Mothkur", "Ramannapet", "Thurkapalle", "Valigonda", "Yadagirigutta"]
  }
};

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    gender: '',
    dob: '',
    caste: '',
    aadhar: '',
    phone: '',
    email: '',
    state: '',
    district: '',
    mandal: '',
    village: '',
    fullAddress: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableMandals, setAvailableMandals] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  // Handle video stream when camera opens
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => console.error('Error playing video:', err));
    }
  }, [stream]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Real-time input handlers with strict validations
  const handleNameInput = (e, field) => {
    const value = e.target.value;
    // Only allow letters and spaces
    if (value === '' || /^[a-zA-Z\s]+$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleAddressInput = (e, field) => {
    const value = e.target.value;
    // Only allow letters, numbers, spaces, comma, period, hyphen
    if (value === '' || /^[a-zA-Z0-9\s,.-]+$/.test(value)) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    // Only allow numbers and max 10 digits
    if (value === '' || (/^\d+$/.test(value) && value.length <= 10)) {
      setFormData({ ...formData, phone: value });
    }
  };

  const handleAadharInput = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    // Only allow numbers and max 12 digits
    if (value === '' || (/^\d+$/.test(value) && value.length <= 12)) {
      setFormData({ ...formData, aadhar: value });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoRemove = () => {
    setFormData({ ...formData, photo: null });
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const context = canvas.getContext('2d');
      // Draw the current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get the image as data URL first
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setPhotoPreview(imageDataUrl);
      
      // Convert to blob and create file
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
          setFormData({ ...formData, photo: file });
        }
      }, 'image/jpeg', 0.9);
      
      // Close camera after capturing
      closeCamera();
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({
      ...formData,
      state: selectedState,
      district: '',
      mandal: ''
    });
    
    if (selectedState && locationData[selectedState]) {
      setAvailableDistricts(Object.keys(locationData[selectedState]));
      setAvailableMandals([]);
    } else {
      setAvailableDistricts([]);
      setAvailableMandals([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData({
      ...formData,
      district: selectedDistrict,
      mandal: ''
    });
    
    if (selectedDistrict && formData.state && locationData[formData.state][selectedDistrict]) {
      setAvailableMandals(locationData[formData.state][selectedDistrict]);
    } else {
      setAvailableMandals([]);
    }
  };

  const validateName = (name, fieldName) => {
    // Only allow letters and spaces
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!name.trim()) {
      return `${fieldName} is required`;
    }
    if (!nameRegex.test(name)) {
      return `${fieldName} should only contain letters and spaces`;
    }
    return null;
  };

  const validateAddress = (address, fieldName) => {
    // Allow letters, numbers, spaces, comma, period, hyphen
    const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;
    if (!address.trim()) {
      return `${fieldName} is required`;
    }
    if (!addressRegex.test(address)) {
      return `${fieldName} should only contain letters, numbers, spaces, comma, period, and hyphen`;
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    const fullNameError = validateName(formData.fullName, 'Full name');
    if (fullNameError) newErrors.fullName = fullNameError;
    
    const fatherNameError = validateName(formData.fatherName, "Father's/Husband's name");
    if (fatherNameError) newErrors.fatherName = fatherNameError;
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old';
      }
    }
    
    if (!formData.caste) {
      newErrors.caste = 'Caste is required';
    }
    
    if (!formData.aadhar.trim()) {
      newErrors.aadhar = 'Aadhar card number is required';
    } else if (!/^\d{12}$/.test(formData.aadhar.replace(/\s/g, ''))) {
      newErrors.aadhar = 'Please enter a valid 12-digit Aadhar card number';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (formData.email && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.district) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.mandal) {
      newErrors.mandal = 'Mandal is required';
    }
    
    const villageError = validateAddress(formData.village, 'Village');
    if (villageError) newErrors.village = villageError;
    
    const addressError = validateAddress(formData.fullAddress, 'Full address');
    if (addressError) newErrors.fullAddress = addressError;
    
    if (!formData.photo) {
      newErrors.photo = 'Photo is required';
    } else if (formData.photo.size > 5 * 1024 * 1024) {
      newErrors.photo = 'Photo size should be less than 5MB';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous error and any stored membership data
    setErrorMessage('');
    localStorage.removeItem('membershipData');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'photo') {
          formDataToSend.append('photo', formData.photo);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Debug: Log what's being sent
      console.log('Form data being sent:', formData);
      console.log('FormData entries:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }
      
      const response = await fetch(`${API_BASE_URL}/api/membership/register`, {
        method: 'POST',
        body: formDataToSend,
        headers: {} // Let browser set Content-Type for FormData
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        localStorage.setItem('membershipData', JSON.stringify({
          ...formData,
          membershipId: result.membership_id,
          idCardUrl: result.id_card_url,
          submitted_at: new Date().toISOString()
        }));
        window.location.href = '/membership-success';
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      
      // Check if it's a network/backend unavailable error
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        setErrorMessage('Unable to connect to the server. Please try again later or contact support.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead 
        title="Membership - Mala Mahanadu"
        description="Join Mala Mahanadu and become part of our community movement for social justice and empowerment."
        keywords="Mala Mahanadu, membership, join, community, social justice"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-900">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Become a Member
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Join our community and contribute to social change
            </p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-12 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <FaUserFriends className="h-8 w-8 text-primary-900 mr-3" />
              <h2 className="text-2xl font-bold text-primary-900">
                Why Join Mala Mahanadu?
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              By becoming a member of Mala Mahanadu, you join a powerful community dedicated to social justice, 
              equality, and empowerment. Together, we can make a difference in our society.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FaCheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-900 mb-2">Community Support</h3>
                <p className="text-gray-600 text-sm">
                  Get support from a strong community network and access to resources
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FaCheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-900 mb-2">Leadership Opportunities</h3>
                <p className="text-gray-600 text-sm">
                  Develop leadership skills and contribute to community development
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <FaCheckCircle className="h-8 w-8 text-gold-500 mx-auto mb-3" />
                <h3 className="font-semibold text-primary-900 mb-2">Social Impact</h3>
                <p className="text-gray-600 text-sm">
                  Be part of meaningful social change and empowerment initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-accent-50 rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <FaIdCard className="h-12 w-12 text-primary-900 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-primary-900 mb-2">
                  Membership Application
                </h2>
                <p className="text-gray-600">
                  Fill in your details to become a member of Mala Mahanadu
                </p>
              </div>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  <p className="text-center">
                    <strong>Thank you for your application!</strong> We will contact you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                  <p className="text-center">
                    <strong>Warning!</strong> {errorMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaUser className="mr-2 text-gold-500" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleNameInput(e, 'fullName')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name (letters only)"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Father's / Husband's Name *
                      </label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={(e) => handleNameInput(e, 'fatherName')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.fatherName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter father's or husband's name (letters only)"
                      />
                      {errors.fatherName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fatherName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaVenusMars className="inline mr-1 text-gold-500" />
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-1 text-gold-500" />
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={(e) => setFormData({...formData, dob: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.dob ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.dob && (
                        <p className="mt-1 text-sm text-red-600">{errors.dob}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Caste *
                      </label>
                      <input
                        type="text"
                        name="caste"
                        value={formData.caste}
                        onChange={(e) => handleNameInput(e, 'caste')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.caste ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your caste (letters only)"
                      />
                      {errors.caste && (
                        <p className="mt-1 text-sm text-red-600">{errors.caste}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhar Card Number *
                      </label>
                      <input
                        type="text"
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleAadharInput}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.aadhar ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123456789012 (12 digits only)"
                        maxLength={12}
                      />
                      {errors.aadhar && (
                        <p className="mt-1 text-sm text-red-600">{errors.aadhar}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaPhone className="mr-2 text-gold-500" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaPhone className="inline mr-1 text-gold-500" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handlePhoneInput}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="9876543210 (10 digits only)"
                        maxLength={10}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaEnvelope className="inline mr-1 text-gold-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gold-500" />
                    Address Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select state</option>
                        {Object.keys(locationData).map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        District *
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleDistrictChange}
                        disabled={!formData.state}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                          errors.district ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select district</option>
                        {availableDistricts.map((district) => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                      {errors.district && (
                        <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                      )}
                      {!formData.state && (
                        <p className="mt-1 text-sm text-gray-500">Please select a state first</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mandal *
                      </label>
                      <select
                        name="mandal"
                        value={formData.mandal}
                        onChange={(e) => setFormData({...formData, mandal: e.target.value})}
                        disabled={!formData.district}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                          errors.mandal ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select mandal</option>
                        {availableMandals.map((mandal) => (
                          <option key={mandal} value={mandal}>{mandal}</option>
                        ))}
                      </select>
                      {errors.mandal && (
                        <p className="mt-1 text-sm text-red-600">{errors.mandal}</p>
                      )}
                      {!formData.district && (
                        <p className="mt-1 text-sm text-gray-500">Please select a district first</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Village *
                      </label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={(e) => handleAddressInput(e, 'village')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                          errors.village ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your village"
                      />
                      {errors.village && (
                        <p className="mt-1 text-sm text-red-600">{errors.village}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Address *
                    </label>
                    <textarea
                      name="fullAddress"
                      value={formData.fullAddress}
                      onChange={(e) => handleAddressInput(e, 'fullAddress')}
                      rows={3}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent ${
                        errors.fullAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your complete address with house number, street, etc."
                    />
                    {errors.fullAddress && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullAddress}</p>
                    )}
                  </div>
                </div>

                {/* Photo Upload Section */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold text-primary-900 mb-6 flex items-center">
                    <FaCamera className="mr-2 text-gold-500" />
                    Photo Upload
                  </h3>
                  
                  <div className="flex flex-col items-center">
                    {isCameraOpen ? (
                      <div className="mb-4">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-80 h-80 object-cover rounded-lg border-2 border-gold-500"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="flex gap-3 mt-4 justify-center">
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="bg-gold-500 hover:bg-gold-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                          >
                            Capture Photo
                          </button>
                          <button
                            type="button"
                            onClick={closeCamera}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : photoPreview ? (
                      <div className="mb-4">
                        <img
                          src={photoPreview}
                          alt="Photo preview"
                          className="w-32 h-32 object-cover rounded-lg border-2 border-gold-500"
                        />
                        <button
                          type="button"
                          onClick={handlePhotoRemove}
                          className="mt-2 text-sm text-red-600 hover:text-red-800"
                        >
                          Remove Photo
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-400">
                        <FaCamera className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    {!isCameraOpen && !photoPreview && (
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gold-500 hover:bg-gold-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                          >
                            Choose Photo
                          </button>
                          
                          <button
                            type="button"
                            onClick={openCamera}
                            className="bg-primary-900 hover:bg-primary-800 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                          >
                            <FaCamera className="mr-2" />
                            Capture Photo
                          </button>
                        </div>
                      </>
                    )}
                    
                    <p className="mt-2 text-sm text-gray-600">
                      Upload or capture a clear photo (Max size: 5MB)
                    </p>
                    
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                    )}
                  </div>
                </div>
                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gold-500 hover:bg-gold-600 disabled:bg-gray-400 text-primary-900 font-bold py-3 px-8 rounded-lg transition-colors flex items-center justify-center text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="h-5 w-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-accent-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary-900 mb-8 text-center">
              Need More Information?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhone className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">
                  +91 98765 43210
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">
                  membership@malamahanadu.org
                </p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  Hyderabad, Telangana
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Membership;
