import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Briefcase, Users, Award, Heart, Zap, Globe } from 'lucide-react';

const jobListings = [
    {
        id: 1,
        title: "Luxury Authentication Specialist",
        department: "Authentication",
        location: "New York, NY",
        type: "Full-time",
        description: "Join our team of experts in authenticating luxury sneakers and watches. You'll be responsible for ensuring the authenticity of our products and maintaining our high standards of quality.",
        requirements: [
            "5+ years experience in luxury goods authentication",
            "Expert knowledge of luxury sneakers and watches",
            "Strong attention to detail",
            "Excellent communication skills"
        ]
    },
    {
        id: 2,
        title: "Senior Product Photographer",
        department: "Creative",
        location: "New York, NY",
        type: "Full-time",
        description: "Create stunning visual content for our luxury products. You'll be responsible for capturing the essence of our high-end sneakers and watches through professional photography.",
        requirements: [
            "3+ years of product photography experience",
            "Portfolio demonstrating luxury product photography",
            "Proficiency in Adobe Creative Suite",
            "Experience with studio lighting"
        ]
    },
    {
        id: 3,
        title: "Customer Experience Manager",
        department: "Customer Service",
        location: "Remote",
        type: "Full-time",
        description: "Lead our customer service team in delivering exceptional experiences to our luxury clientele. You'll ensure our customers receive the highest level of service.",
        requirements: [
            "5+ years in luxury customer service",
            "Team leadership experience",
            "Strong problem-solving skills",
            "Excellent communication abilities"
        ]
    }
];

const benefits = [
    {
        icon: <Award className="text-primary" size={24} />,
        title: "Competitive Compensation",
        description: "Attractive salary packages with performance bonuses and equity options."
    },
    {
        icon: <Heart className="text-primary" size={24} />,
        title: "Health & Wellness",
        description: "Comprehensive health insurance, wellness programs, and mental health support."
    },
    {
        icon: <Zap className="text-primary" size={24} />,
        title: "Growth Opportunities",
        description: "Clear career progression paths and professional development programs."
    },
    {
        icon: <Globe className="text-primary" size={24} />,
        title: "Work-Life Balance",
        description: "Flexible working hours and remote work options where applicable."
    }
];

const Careers = () => {
    return (
        <div className="bg-dark text-light min-h-screen flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-16 flex-grow">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display text-primary mb-6">Join Our Team</h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Be part of a team that's revolutionizing the luxury resale market. We're looking for passionate individuals who share our vision for excellence.
                    </p>
                    <div className="flex items-center justify-center space-x-8 text-gray-400">
                        <div className="flex items-center">
                            <Users className="mr-2" size={20} />
                            <span>50+ Team Members</span>
                        </div>
                        <div className="flex items-center">
                            <Briefcase className="mr-2" size={20} />
                            <span>Global Opportunities</span>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="max-w-6xl mx-auto mb-16">
                    <h2 className="text-3xl font-display text-light text-center mb-12">Why Join LuxeFinds?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-gray-800 p-6 rounded-lg">
                                <div className="mb-4">{benefit.icon}</div>
                                <h3 className="text-xl font-display text-light mb-2">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Job Listings */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-display text-light text-center mb-12">Open Positions</h2>
                    <div className="space-y-8">
                        {jobListings.map((job) => (
                            <div key={job.id} className="bg-gray-800 rounded-lg p-8 hover:transform hover:scale-[1.02] transition-transform duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-display text-light mb-2">{job.title}</h3>
                                        <div className="flex items-center space-x-4 text-gray-400 text-sm">
                                            <span>{job.department}</span>
                                            <span>•</span>
                                            <span>{job.location}</span>
                                            <span>•</span>
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                    <button className="bg-primary text-dark px-6 py-2 rounded-md hover:bg-accent transition-colors">
                                        Apply Now
                                    </button>
                                </div>
                                <p className="text-gray-400 mb-4">{job.description}</p>
                                <div>
                                    <h4 className="text-light font-medium mb-2">Requirements:</h4>
                                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                                        {job.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="max-w-4xl mx-auto mt-16 text-center">
                    <h2 className="text-3xl font-display text-light mb-4">Don't See the Perfect Role?</h2>
                    <p className="text-gray-400 mb-8">
                        We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
                    </p>
                    <button className="bg-primary text-dark px-8 py-3 rounded-md hover:bg-accent transition-colors font-medium">
                        Submit Your Resume
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Careers; 