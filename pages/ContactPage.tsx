import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '../components/Icons';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="py-10 bg-neutral-50 dark:bg-neutral-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">Get in Touch</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-300">
                       We'd love to hear from you. Whether you have a question, feedback, or need assistance, our team is ready to help.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                     <Card className="overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Contact Form */}
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Send us a Message</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Input label="Full Name" id="name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                                    <Input label="Email Address" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                    <Input label="Subject" id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required />
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Message</label>
                                        <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="block w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md shadow-sm placeholder-neutral-400 dark:placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
                                    </div>
                                    <Button type="submit" className="w-full">Send Message</Button>
                                </form>
                            </div>
                            
                            {/* Contact Info */}
                            <div className="p-8 bg-primary-light dark:bg-primary/10">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Contact Information</h2>
                                <div className="space-y-6 text-neutral-700 dark:text-neutral-200">
                                    <div className="flex items-start">
                                        <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="font-semibold">Our Office</h3>
                                            <p className="text-neutral-600 dark:text-neutral-300">123 University Ave, Palo Alto, CA 94301</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start">
                                        <EnvelopeIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="font-semibold">Email Us</h3>
                                            <p className="text-neutral-600 dark:text-neutral-300">support@almasphere.app</p>
                                        </div>
                                    </div>
                                     <div className="flex items-start">
                                        <PhoneIcon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                        <div className="ml-4">
                                            <h3 className="font-semibold">Call Us</h3>
                                            <p className="text-neutral-600 dark:text-neutral-300">(123) 456-7890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
