import React, { useState, useEffect } from 'react';
import { FaUsers, FaGraduationCap, FaHeartbeat, FaHandHoldingHeart, FaBullhorn, FaAward, FaEye, FaHistory, FaChevronDown, FaChevronUp, FaBalanceScale, FaGavel } from 'react-icons/fa';
import SeoHead from '../components/SeoHead';
import { getSettings } from '../api/mockApi';

const About = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    ourMalaCommunity: true,
    socialEconomicStatus: false,
    politicalParticipation: false,
    reservationDiscrimination: false,
    religiousCultural: false
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings();
        if (response.success) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const keyElements = [
    {
      icon: FaUsers,
      title: 'Unity of Dalit Communities',
      description: 'Fostering unity rather than internal fragmentation, especially between Malas and Madigas, for collective progress.'
    },
    {
      icon: FaBalanceScale,
      title: 'Fair Distribution',
      description: 'Ensuring reservation benefits are not monopolized by one sub-group but distributed fairly to uplift the entire disadvantaged community.'
    },
    {
      icon: FaHandHoldingHeart,
      title: 'Community Empowerment',
      description: 'Encouraging education, employment, and greater socio-economic mobility through collective effort.'
    }
  ];

  const missionActivities = [
    {
      icon: FaBullhorn,
      title: 'Advocacy and Agitation',
      description: 'Organizing rallies and demonstrations against policies that marginalize Malas or create divisions within Dalit communities.'
    },
    {
      icon: FaGavel,
      title: 'Legal Action',
      description: 'Challenging government orders and classifications in court to protect constitutional rights.'
    },
    {
      icon: FaGraduationCap,
      title: 'Educational Empowerment',
      description: 'Promoting education as the primary tool for community advancement and social mobility.'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="About Us - Mala Mahanadu"
        description="Learn about Mala Mahanadu organization, our mission, values, and commitment to community welfare and empowerment."
        keywords="Mala Mahanadu, about, mission, values, community welfare, social justice"
      />
      
      {/* Hero Section */}
      <div className="relative h-64 bg-primary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Mala Mahanadu
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto px-4">
              Our Journey, Our Mission, Our Commitment
            </p>
          </div>
        </div>
      </div>

      {/* About the Mala Community Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About the Mala Community
              </h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The Mala community is one of the major Scheduled Caste (SC) groups predominantly found in Andhra Pradesh and Telangana. Historically, the community faced social discrimination and economic marginalisation due to the traditional caste structure. Over time, Malas have made significant advancements in education, government jobs, politics, and various professional fields, becoming one of the more upwardly mobile Dalit sub-castes in the region.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Culturally, Malas have a rich social identity and are known for their contributions to labour, service-based occupations, and community leadership. With access to reservation policies and growing educational opportunities, many members of the community have become teachers, government officials, engineers, entrepreneurs, and public representatives. Despite progress, they continue to advocate for equality, fair opportunities, and protection of constitutional rights, especially in contexts where sub-caste divisions or policy changes may disadvantage them.
              </p>
            </div>

            {/* Vision and Mission Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Vision Column */}
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <FaEye className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Mala Mahanadu envisions a socially just and equitable society where members of the Mala community can fully realise their constitutional rights, access opportunities in education and employment, and participate in public life without discrimination or internal division. Its vision is rooted in creating unity within Dalit communities, ensuring that reservation benefits uplift all disadvantaged groups fairly, and protecting the egalitarian spirit of the Constitution. The organisation aspires to build a future where Malas are empowered, respected, and able to progress with dignity, free from policies or social structures that create fragmentation within Scheduled Castes.
                </p>
              </div>

              {/* Mission Column */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <FaBullhorn className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  The mission of Mala Mahanadu is to mobilise and represent the Mala community through collective action, advocacy, and public engagement. The organisation works to oppose policies and practices—such as sub-categorisation of SC reservations—that it believes undermine the rights of Malas or create divisions among Dalit sub-groups. It takes up legal, political, and social initiatives to safeguard constitutional protections, challenge discriminatory decisions, and ensure fair distribution of opportunities. Alongside this, Mala Mahanadu focuses on community empowerment by promoting education, awareness, and socio-economic development, while fostering unity and self-confidence within the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Elements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Key Elements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The core principles that guide our approach to community development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {keyElements.map((element, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 mx-auto">
                  <element.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {element.title}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {element.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mala Community Historical Background Headline */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mala Community of Andhra Pradesh and Telangana Historical Background
            </h2>
          </div>
        </div>
      </section>

      {/* Our Mala Community Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-gray-50 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => toggleSection('ourMalaCommunity')}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaHistory className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Mala Community
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {expandedSections.ourMalaCommunity ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  {expandedSections.ourMalaCommunity ? (
                    <FaChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expandedSections.ourMalaCommunity ? 'max-h-none opacity-100 flex-grow' : 'max-h-0 opacity-0 flex-shrink'
              }`}>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Historical Background
                  </h3>
                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Mala community is one of the two major Dalit (Scheduled Caste) groups in the Telugu-speaking regions, alongside the Madiga. Historically, Malas were considered "untouchables" under the rigid caste system and typically lived in segregated hamlets known as Malapalli on the outskirts of villages. They provided the bulk of agricultural labor for village economies and were deemed indispensable to rural life.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Traditionally, Malas worked as farmhands and weavers, and some served in menial village roles – digging graves, guarding village property, or channeling irrigation water. Notably, Mala women were known for skills like basket weaving. These occupations, considered ritually impure by higher castes, kept Malas at the bottom of the social hierarchy. In fact, the very name Mala is said to derive from the Telugu word maila ("dirt"), reflecting the stigma attached to their caste status. Some colonial ethnographers offered a different origin narrative: Edgar Thurston (1909) observed that Malas were once a tribe of hill warriors and mercenaries serving local chieftains (Polygars) in medieval times.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      There is also a local legend from the 12th-century Palnadu epic that a Mala warrior (Kannama Dasu) fought bravely in battle; his descendants, called Mala Dasu or Mala Dasari, were even appointed as temple priests in a rare break from caste norms. Such accounts, though anecdotal, highlight that Malas have diverse origin stories blending oppression with episodes of valor.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      During the British colonial period and early 20th century, Malas began to assert a new identity. In 1917, leaders Bhagya Reddy Varma and Arige Ramaswamy in Hyderabad led the Adi-Andhra movement, which encouraged Dalits (both Malas and Madigas) to reject caste-based names and call themselves "Adi-Andhra" (original inhabitants).
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      As a result, many Malas listed their caste as Adi Andhra in the 1931 census, and they were officially recorded as a Depressed Class eligible for special representation by the 1935 Government of India Act. After India's independence, the Constitution (1950) listed Malas among the Scheduled Castes, affirming their eligibility for reservations in education, jobs, and legislatures. Many Malas in coastal Andhra embraced Christianity in the 19th and early 20th centuries due to missionary efforts. Mass conversions to Protestant denominations (especially Lutheran and Anglican missions) were notable in coastal districts.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Conversion brought some Malas access to education and healthcare through mission schools, though it also meant losing their Scheduled Caste status (since only Hindus, and later Sikhs/Buddhists, could be counted as SC). By the mid-20th century, the community had a small educated cadre and a few emerging leaders, but the vast majority of Malas remained landless agricultural laborers. They often faced daily humiliation – barred from temples, made to live in separate colonies, and subjected to practices of untouchability in villages. The Green Revolution era in the 1960s–70s bypassed most Malas; while dominant peasant castes (like Reddys and Kammas) acquired land and wealth, Dalits remained largely landless and poverty-stricken. Traditional caste bonds (like bondage to landlords) continued in many areas, meaning Malas labored on farms with little hope of land ownership or upward mobility.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Despite these hardships, the Mala community has a history of social resistance and reform. The early Adi-Andhra activists laid a foundation for Dalit self-respect movements. By the late 20th century, atrocities against Dalits galvanized the Malas into activism. A notorious example was the Tsundur massacre of 1991 in coastal Andhra, where eight Mala Dalits were brutally killed by upper-caste Reddys. (Earlier, in 1985, the Karamchedu massacre in AP had seen six Madiga Dalits murdered by Kamma landlords, sparking state-wide Dalit outrage.) Such incidents underscored the violent oppression Dalits faced and led to the formation of the Andhra Pradesh Dalit Maha Sabha in the mid-1980s. Charismatic Mala leaders like Katti Padma Rao (a poet-activist) and Bojja Tarakam (a lawyer-activist) became prominent voices, organizing Dalits to fight caste atrocities and demand land reforms.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      In summary, the historical experience of the Malas has been one of oppression and poverty under caste society, but also marked by the beginnings of collective assertion through identity movements, religious change, and early political participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Political Participation and Activism Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-white rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => toggleSection('politicalParticipation')}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaBullhorn className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Political Participation and Activism
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {expandedSections.politicalParticipation ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  {expandedSections.politicalParticipation ? (
                    <FaChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expandedSections.politicalParticipation ? 'max-h-none opacity-100 flex-grow' : 'max-h-0 opacity-0 flex-shrink'
              }`}>
                <div className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Malas today constitute a significant portion of the population in Andhra Pradesh and Telangana. They are one of the largest Scheduled Caste groups in these states – roughly 40% of the SC population in the united Andhra Pradesh as per the 2011 Census (about 5.6 million people at that time). The Madiga community accounts for roughly 48% of the SC population by comparison.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Malas are distributed across both urban and rural areas. A large number still live in villages, where they typically occupy Dalit colonies and work as sharecroppers, landless farm laborers, construction workers, or other menial labor. However, owing to decades of affirmative action policies and missionary education, Malas have made greater inroads into education and formal employment than some other Dalit sub-castes.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      For example, studies in the 1980s found that Mala students were disproportionately represented among Dalits in higher education – one study noted Malas took about 40% of reserved SC seats in an engineering college, far outpacing Madiga students who took only 16.5%. This trend reflects the Mala community's relatively better access to schooling and awareness of opportunities.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Many Malas benefitted from government reservations in government jobs; over the years they have attained positions as teachers, clerks, police constables, and other public sector roles. A small but growing middle class of Malas has thus emerged, especially in urban centers and among those families who pursued education early. Despite these gains, intra-Dalit inequalities persist. Numerous assessments have observed that Madigas lag behind Malas in literacy rates, income levels, and overall development indicators.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Malas, having somewhat higher literacy and representation in jobs, are often perceived (by Madigas and others) as a relatively "forward" sub-group among Dalits. This perception is reinforced by the fact that Malas historically had more converts to Christianity (who leveraged mission schools) and more political patronage under the Congress party in the 20th century, whereas Madigas remained more marginalized.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Consequently, Malas have tended to capture a larger share of the benefits meant for all Scheduled Castes – a point of contention in recent decades. It is telling that in Telangana, the Mala community is sometimes labeled a "dominant" SC group vis-à-vis Madigas, due to their higher representation in education and public employment.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      On the whole, the socio-economic profile of Malas is a mix of progress and continuing struggle. Educationally, younger-generation Malas are increasingly completing schooling and some attain higher degrees, but dropout rates remain high in poor rural families. Economically, a section of Malas enjoys stable incomes (government salaries or urban employment), yet a majority still endure poverty, underemployment, or daily-wage labor.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Many Mala habitations lack proper infrastructure, reflecting the rural-urban divide. In villages, Malas often live in kutcha houses in segregated localities with limited access to clean water or sanitation – conditions only slowly improving through government schemes. Even in cities, Malas often reside in slums or lower-income neighborhoods.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Unemployment or menial employment is common, and many youth migrate to towns for work in construction, factories, or the service sector. That said, there are positive trends of economic mobility: for instance, some Mala Christians from coastal Andhra – often called Merugu Malas – leveraged education to enter professions like nursing, teaching, and engineering, attaining middle-class status.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Overall, the Mala community today straddles two worlds – one still marked by agrarian poverty and caste-based menial work, and another where education and reservations have enabled a measure of upward mobility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social and Economic Status Today Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-gray-50 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => toggleSection('socialEconomicStatus')}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUsers className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Social and Economic Status Today
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {expandedSections.socialEconomicStatus ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  {expandedSections.socialEconomicStatus ? (
                    <FaChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expandedSections.socialEconomicStatus ? 'max-h-none opacity-100 flex-grow' : 'max-h-0 opacity-0 flex-shrink'
              }`}>
                <div className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Malas today constitute a significant portion of the population in Andhra Pradesh and Telangana. They are one of the largest Scheduled Caste groups in these states – roughly 40% of the SC population in the united Andhra Pradesh as per the 2011 Census (about 5.6 million people at that time). The Madiga community accounts for roughly 48% of the SC population by comparison.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Malas are distributed across both urban and rural areas. A large number still live in villages, where they typically occupy Dalit colonies and work as sharecroppers, landless farm laborers, construction workers, or other menial labor. However, owing to decades of affirmative action policies and missionary education, Malas have made greater inroads into education and formal employment than some other Dalit sub-castes.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      For example, studies in the 1980s found that Mala students were disproportionately represented among Dalits in higher education – one study noted Malas took about 40% of reserved SC seats in an engineering college, far outpacing Madiga students who took only 16.5%. This trend reflects the Mala community's relatively better access to schooling and awareness of opportunities.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Many Malas benefitted from government reservations in government jobs; over the years they have attained positions as teachers, clerks, police constables, and other public sector roles. A small but growing middle class of Malas has thus emerged, especially in urban centers and among those families who pursued education early.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Despite these gains, intra-Dalit inequalities persist. Numerous assessments have observed that Madigas lag behind Malas in literacy rates, income levels, and overall development indicators. Malas, having somewhat higher literacy and representation in jobs, are often perceived (by Madigas and others) as a relatively "forward" sub-group among Dalits.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      This perception is reinforced by the fact that Malas historically had more converts to Christianity (who leveraged mission schools) and more political patronage under the Congress party in the 20th century, whereas Madigas remained more marginalized. Consequently, Malas have tended to capture a larger share of the benefits meant for all Scheduled Castes – a point of contention in recent decades.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      It is telling that in Telangana, the Mala community is sometimes labeled a "dominant" SC group vis-à-vis Madigas, due to their higher representation in education and public employment. On the whole, the socio-economic profile of Malas is a mix of progress and continuing struggle.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Educationally, younger-generation Malas are increasingly completing schooling and some attain higher degrees, but dropout rates remain high in poor rural families. Economically, a section of Malas enjoys stable incomes (government salaries or urban employment), yet a majority still endure poverty, underemployment, or daily-wage labor.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Many Mala habitations lack proper infrastructure, reflecting the rural-urban divide. In villages, Malas often live in kutcha houses in segregated localities with limited access to clean water or sanitation – conditions only slowly improving through government schemes. Even in cities, Malas often reside in slums or lower-income neighborhoods.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Unemployment or menial employment is common, and many youth migrate to towns for work in construction, factories, or the service sector. That said, there are positive trends of economic mobility: for instance, some Mala Christians from coastal Andhra – often called Merugu Malas – leveraged education to enter professions like nursing, teaching, and engineering, attaining middle-class status.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Overall, the Mala community today straddles two worlds – one still marked by agrarian poverty and caste-based menial work, and another where education and reservations have enabled a measure of upward mobility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation and Discrimination Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-white rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => toggleSection('reservationDiscrimination')}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaGavel className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Reservation and Discrimination
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {expandedSections.reservationDiscrimination ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  {expandedSections.reservationDiscrimination ? (
                    <FaChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expandedSections.reservationDiscrimination ? 'max-h-none opacity-100 flex-grow' : 'max-h-0 opacity-0 flex-shrink'
              }`}>
                <div className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Reservation Policies</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      As a Scheduled Caste, the Mala community has benefited from India's affirmative action policies in education, public employment, and electoral representation. Reservation (quota) has undeniably improved access to opportunities for Malas – many secured seats in colleges, got government jobs, and entered legislative bodies through SC-reserved constituencies since the 1950s.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      In fact, over time Malas came to be seen as the major recipients of SC reservations in Andhra Pradesh, partly due to their greater population and higher educational attainment relative to smaller SC groups. This led to a perception (especially among Madigas) that Malas were taking a "lion's share" of the quota benefits.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The conflict over sub-caste categorization discussed above was directly tied to this issue. Madiga activists argued that Malas, being more advanced, cornered jobs and college seats, leaving Madigas marginalized; they demanded proportional splitting of the SC quota. Malas, on the other hand, felt that such moves violated the solidarity of Dalits and feared that breaking the SC list would dilute the constitutional standing of the community as a whole.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The fallout from the 1996–2005 sub-categorization saga is a case study in how reservation policies affected Malas: during the few years (2000–2004) the AP sub-quota operated, some Mala candidates indeed lost out to Madiga candidates in job/college selection due to separate allocations. Although the Supreme Court reversed the policy in 2005, the debate did not end there.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Mala–Madiga divide over reservations persists, and in recent years it has become a national issue – in 2023 the central government formed a commission to examine SC sub-categorization across India, reflecting demands from communities like Madigas. Notably, 57 of 59 Scheduled Caste sub-groups in AP/Telangana reportedly support sub-categorization, with Malas being one of the only groups opposing it.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      This indicates that Malas are protective of their hard-won gains from reservations, while other SC communities seek a fairer distribution.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Discrimination and Challenges</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Mala community continues to face caste-based discrimination despite legal safeguards. In rural areas, many practices of untouchability are still encountered by Malas: segregation in housing (Malas living in Dalitwadas or colonies apart from the main village), denial of entry into temples and upper-caste homes, separate burial grounds, and social boycotts in some cases.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Inter-caste marriage, though slowly rising, often meets with violent opposition – a number of "honour killing" incidents in AP/Telangana have involved Dalit (often Mala) youths who married outside their caste. Economic discrimination is also rife: Malas often find it hard to rent houses or get jobs in the private sector due to caste prejudice.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Caste atrocities remain a serious concern. Apart from the major massacres (like Karamchedu 1985, Tsundur 1991), there have been periodic incidents of violence against Malas in villages – assaults for drawing water from common wells, attacks for asserting land rights or for sitting in temple festivals, etc.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      For example, the Tsundur case, in which Malas were slaughtered by dominant-caste men, dragged on in courts for decades with most perpetrators eventually acquitted, underscoring the difficulties Dalits face in obtaining justice. In another infamous case, the Chundur (Tsundur) massacre, it was found that the trigger was a simple assertion of equality by Dalit youth, met by brutal backlash.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      These incidents led to greater awareness and the strengthening of laws like the SC/ST (Prevention of Atrocities) Act, but enforcement at the ground level is uneven.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Within the Scheduled Castes, the Mala–Madiga rivalry is itself a source of discrimination and mutual antagonism. The split in the Dalit movement resulted in some social boycott between the communities – for instance, there have been reports (anecdotally) of Malas and Madigas not dining together at community events or each accusing the other of "betraying" Dalit unity.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Political reservations (in local bodies and assembly) also sometimes get embroiled in this rivalry, with parties balancing tickets between the two groups. Madiga leaders accuse Malas of "Manuvad" (following casteist oppression) by dominating SC organizations, while Mala leaders accuse Madigas of dividing Dalits for political gain.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The government has had to walk a tightrope: while the AP sub-quota was struck down, Telangana (after formation in 2014) passed a resolution in its assembly in 2017 favoring categorization of SC reservations, and other states like Punjab and Tamil Nadu have their own forms of internal allocation. Malas perceive such moves as threats to their entitlement, leading to continuous activism by groups like Mala Mahanadu to block any dilution of their SC status.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Another dimension of Mala's experience is religious-based discrimination in reservations. As mentioned, many Malas are Christians; however, Dalit Christians are not recognized as Scheduled Castes under Indian law (they fall under Backward Classes in some states). This means Mala Christians cannot avail SC reservations in jobs or education.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Mala community has been campaigning to change this – they argue that converting to Christianity did not end caste discrimination against them, so they too deserve SC status (similar to Sikh or Buddhist Dalits, who are included). A case on granting SC status regardless of religion has been pending in the Supreme Court since 2005, with Mala Christian organizations among the petitioners.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      In the meantime, Andhra Pradesh classifies Dalit Christians under a separate BC-C category with 1% reservation at the state level. This policy partly benefits Mala Christians (often called Adi Andhra Christians in bureaucracy), but many in the community feel it is inadequate compared to the benefits they would receive as full Scheduled Castes.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      In summary, reservation policies have been a double-edged sword for Malas – they uplifted a section of the community, but also sparked new conflicts with marginalized sub-groups like Madigas. The Mala community still confronts systemic caste discrimination both from the wider society and in the complex politics of quota-sharing. While legal protections and reservations have improved their situation, true social equality remains a work in progress.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Religious and Cultural Practices Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="bg-gray-50 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md"
              onClick={() => toggleSection('religiousCultural')}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaHeartbeat className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Religious and Cultural Practices
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {expandedSections.religiousCultural ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  {expandedSections.religiousCultural ? (
                    <FaChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                expandedSections.religiousCultural ? 'max-h-none opacity-100 flex-grow' : 'max-h-0 opacity-0 flex-shrink'
              }`}>
                <div className="px-6 pb-6">
                  <div className="prose prose-lg max-w-none space-y-4">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Mala community's religious profile is mixed, encompassing both Hindu and Christian affiliations, with each group preserving certain cultural customs. Hindu Malas form the majority and practice popular Hinduism interwoven with folk traditions. They worship village deities and family gods much like other Telugu communities.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      For instance, goddess Yellamma (Renuka Devi) is often revered, and ancestral spirit propitiation is common in Mala families (reflecting tribal and folk influences). Malas participate in mainstream festivals – Ugadi (Telugu New Year), Dussehra, Deepavali, Holi and Sankranti are widely celebrated in Mala settlements.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      At the same time, they observe certain Dalit/folk religious events: Jatara festivals of local gramadevatas (village goddesses) see Malas in important roles, sometimes as drummers, singers or facilitators. Historically, because Brahmin priests would not officiate rituals for Dalits, Malas developed their own ritual specialists.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Castes like Pambalas (drummers and shamans) and Mala Dasari (Mala priests) performed ceremonies in Mala communities. Even today, in some villages Malas have their own priests for weddings or funerals. Certain sub-groups like Mala Dasu, Mala Jangam, Mala Sanyasi are quasi-priestly or mendicant groups within the Mala fold, reflecting an internal diversity of roles.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Culturally, Malas have rich oral traditions – songs (often of protest or lament, like the "Madiga and Mala patalu" folk songs), dances (such as Dappu drum dances performed by Dalits), and lore about heroes like Palakuriki Somanatha or Chokhamela (saint revered by Dalits). These cultural expressions both celebrate their identity and critique caste hierarchy.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Family Structure and Social Customs</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Family structure and social customs of Malas are similar to other Telugu communities with a few distinctions. The Mala community is organized into numerous clans and exogamous surnames (intiperulu) such as Thimmadala, Golla, Chikkala, etc., which regulate marriages. They practice patrilineal inheritance and generally nuclear families.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Marriage customs allow cross-cousin marriages and maternal-uncle/niece alliances, which is typical in Dravidian kinship patterns. Wedding ceremonies among Hindu Malas incorporate Hindu rituals but often with simplified rites. It's common to see non-Brahmin priests or elders conducting the marriage, and in some cases rituals are adjusted (for example, using a barber or washerman caste person to tie the Mangalsutra in older times when Brahmins refused to do so).
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Bride-price (oli) is practiced in Mala marriages, albeit symbolic today. Malas also allow remarriage of widows and divorcees, reflecting more liberal social norms compared to upper castes. One notable cultural practice is that Malas bury their dead (rather than cremate). This is partly due to historical marginalization – Dalits often were not allowed to burn corpses near caste Hindu cremation grounds – and also aligns with Christian influence for those who converted.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      After a death, Malas observe pollution rites for a period (usually nine days) and then perform purification rituals. They have traditional caste panchayats (Kula Panchayat) that arbitrate community issues like marriages, divorces, or disputes, though these informal councils are weakening nowadays.
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Christian Malas</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      A substantial minority of Malas are Christian, owing to the mass conversions that began in the late 1800s. Most Mala Christians today are Protestants, affiliated with churches like the Andhra Evangelical Lutheran Church (AELC) or the Church of South India (CSI). This shift to Protestantism was in part because Mala converts found even the Catholic Church practiced caste discrimination (e.g., separate seating) in the past, so they gravitated to Protestant denominations which were perceived as slightly more egalitarian.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Mala Christians typically have Biblical first names and surnames that are not explicitly caste-identifying. Culturally, while they adopt Christian religious observances (like Christmas, Good Friday, Easter), many underlying cultural traits remain similar. For instance, Christian Malas may still partake in family deity festivals or consult traditional healers in some cases, blending folk practices with Christian faith – a form of inculturation common in Dalit Christian communities.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      The Merugu Mala subset (largely from the Godavari delta) became known for producing many educated professionals and forming an upwardly mobile group within the community. They tend to distance themselves from caste labels, yet continue to campaign for equal rights (such as the ongoing demand that Dalit Christians be given Scheduled Caste status by the government).
                    </p>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-6">Community Institutions and Cultural Identity</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Throughout their religious spectrum, Malas emphasize community solidarity through cultural institutions. There are community halls (often called "Mala Kalyana Mandapam") in some towns used for Mala weddings and meetings. The Mala Mahanadu, besides being a political outfit, also functions as a cultural organization holding events on Ambedkar Jayanti and other Dalit commemorations to instill pride in Mala heritage.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Festivals like Dr. B.R. Ambedkar's birth anniversary (April 14) and Jyotirao Phule Jayanti are observed by Malas (especially the educated and activist sections) as community events. In villages, Malas have their own small temples or shrines (for example, honoring local saints or figures like Chennayya or Mallela Thalli), and they often have exclusive rights to certain folk performances in village festivals, such as drum-beating or playing the role of Poturaju (ritual guardian) during goddess processions.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      These cultural roles historically were both a service and a marker of low status, but today many Mala youth are reclaiming them with a sense of identity (e.g., dappu drum troupes performing at Dalit rights rallies).
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      In conclusion, the Mala community's religious and cultural life is diverse yet cohesive. Their practices reflect a confluence of mainstream Hindu traditions, unique Dalit customs born of exclusion, and the influence of Christianity for a segment of the community. Whether Hindu or Christian, Malas continue to maintain certain shared cultural institutions – from endogamous clan networks to community festivals – that reinforce their group identity.
                    </p>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Despite centuries of being derogated as "untouchables," Malas have nurtured rich cultural traditions and are increasingly celebrating their heritage as part of a broader Dalit renaissance in the region.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
