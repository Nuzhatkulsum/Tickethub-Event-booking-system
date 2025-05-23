import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Calendar, MapPin, Info, Ticket, FileText, DollarSign, User } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Container from '../components/common/Container';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    videoUrl: '',
    category: '',
    price: '',
    organizerName: '',
    refundPolicy: '',
    ticketTypes: [{ name: '', price: '', quantity: '' }]
  });

  const steps = [
    {
      title: 'Add Media',
      icon: Upload,
      description: 'Upload event images and video'
    },
    {
      title: 'Event Overview',
      icon: Info,
      description: 'Basic event information'
    },
    {
      title: 'Date & Location',
      icon: Calendar,
      description: 'When and where'
    },
    {
      title: 'Event Details',
      icon: FileText,
      description: 'Detailed information'
    },
    {
      title: 'Tickets',
      icon: Ticket,
      description: 'Set up ticket types'
    },
    {
      title: 'Refund Policy',
      icon: DollarSign,
      description: 'Set refund terms'
    },
    {
      title: 'Organizer Info',
      icon: User,
      description: 'About the organizer'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle event creation logic here
    navigate('/admin/events');
  };

  return (
    <Layout>
      <Container>
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Your Event</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fill in the details below to create and publish your event.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center ${
                    index + 1 === currentStep
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-400 dark:text-gray-600'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      index + 1 === currentStep
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Media</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Drag and drop your event image here, or click to select
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Video (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Add a video to showcase your event
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit">
                    Create Event
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};

export default CreateEventPage;