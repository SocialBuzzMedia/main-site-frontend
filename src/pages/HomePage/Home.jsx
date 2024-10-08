import { useEffect, useState } from "react";
import axios from "axios";

// Components Import
import Headings from "../../components/HeadingComponent/Headings";
import ContactCTA from "../../components/ContactCTAButton/ContactCTA";
import Carousel from "../../components/CarouselComponent/Carousel";
import ServiceCard from "../../components/ServiceCardComponent/ServiceCard";
import AboutCard from "../../components/AboutCardComponent/AboutCard";
import HeroSection from "../../components/HeroSection/HeroSection";
import bgVideo from "/videos/bg-hero-video-a.mp4";
import HelmetWrapper from "../../components/HelmetProviderComponent/HelmetWrapper";
import FAQSection from "../../components/FAQComponent/FAQSection";
// import FaqAccordion from "../../components/FaqAccordionComponent/FaqAccordion";

const Home = () => {
    const [serviceSection, setServiceSection] = useState([]);
    const [aboutSection, setAboutSection] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Fetch Visible Services Card
    useEffect(() => {
        const fetchVisibleServices = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/service/visible`
                );
                setServiceSection(response.data);
            } catch (error) {
                console.log("Error Fetching Visible Services", error);
            }
        };
        fetchVisibleServices();
    }, []);

    // Fetch Visible About Card
    useEffect(() => {
        const fetchVisibleAbouts = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_LOCAL_URL}/api/about/visible`
                );
                setAboutSection(response.data);
            } catch (error) {
                console.log("Error Fetching Visible Services", error);
            }
        };
        fetchVisibleAbouts();
    }, []);

    return (
        <>
            <HelmetWrapper
                title="Home"
                description="Welcome to socialbuzzmedia. Best digital Marketing agency that provides all digital media solutions sush as SEO, Social Media Marketing, Web development, Pay-per-click"
            />
            <div className="">
                <HeroSection
                    bgVideo={bgVideo}
                    heroHeading={`Amplify your digital presence with our strategy and creativity`}
                    contactLink={`Get in touch with us`}
                    appointmentLink={`Get a quick appointment`}
                    overlayClassName={`home-overlay`}
                />
            </div>

            {/* What We do Section */}
            <div className="py-10">
                <Headings
                    title={`What We Do`}
                    description={
                        "We provide personalized digital marketing plans that boost brand recognition and interaction on various online channels."
                    }
                />
                <div className="lg:w-9/12 w-11/12 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5 mx-auto md:mx-2 ">
                        {serviceSection &&
                            serviceSection.length > 0 &&
                            serviceSection.map((data) => {
                                return (
                                    <ServiceCard
                                        key={data._id}
                                        services={data}
                                        normalLink={"Learn More"}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
            <hr className="w-9/12 mx-auto" />

            {/* Why Choose Us Section */}
            <div className="">
                <div className="py-10 ">
                    <Headings
                        title={`Why Choose Us`}
                        description={
                            "At Social Buzz Media, our goal is to provide exceptional results and unmatched customer support. Why selecting us will be the right choice for your business."
                        }
                        className={`text-red-500`}
                        classNameDesc={`text-black`}
                    />
                    <div className="lg:w-9/12 w-11/12 mx-auto mt-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-7 mx-auto md:mx-2  ">
                            {aboutSection &&
                                aboutSection.length > 0 &&
                                aboutSection.map((data) => {
                                    return (
                                        <AboutCard
                                            key={data._id}
                                            about={data}
                                            linkText={"Read More"}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>

                <hr className="w-9/12 mx-auto" />

                {/* Client Carousel */}
                <div className="bg-white py-10">
                    <div className="mb-6">
                        <Headings title={`Our Clients`} />
                    </div>
                    <div className="md:w-11/12 mx-auto ">
                        <Carousel />
                    </div>
                </div>

                <hr className="w-9/12 mx-auto" />

                {/* FAQ */}
                <div className="py-10">
                    <FAQSection />
                </div>

                {/* Contact CTA Section */}
                <div className="bg-overlay-a">
                    <ContactCTA
                        ctaText="Ready to take off? Build your digital empire with us."
                        ctaBtnText="Contact Us"
                        ctaLink={`/contact-us`}
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
