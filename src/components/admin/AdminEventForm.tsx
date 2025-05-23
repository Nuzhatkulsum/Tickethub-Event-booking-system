import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../context/EventContext';
import Button from '../common/Button';
import Card, { CardContent } from '../common/Card';

type FormData = {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: string;
  category: string;
  totalSeats: string;
  availableSeats: string;
};

const AdminEventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, addEvent, updateEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormData: FormData = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    price: '',
    category: '',
    totalSeats: '',
    availableSeats: ''
  };
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  
  useEffect(() => {
    if (id && id !== 'new') {
      const event = getEvent(id);
      if (event) {
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date,
          time: event.time,
          location: event.location,
          imageUrl: event.imageUrl,
          price: String(event.price),
          category: event.category,
          totalSeats: String(event.totalSeats),
          availableSeats: String(event.availableSeats)
        });
      }
    }
  }, [id, getEvent]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        imageUrl: formData.imageUrl,
        price: parseFloat(formData.price),
        category: formData.category,
        totalSeats: parseInt(formData.totalSeats),
        availableSeats: parseInt(formData.availableSeats)
      };
      
      if (id && id !== 'new') {
        updateEvent({ ...eventData, id });
      } else {
        addEvent(eventData);
      }
      
      // Simulate a brief delay
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin/events');
      }, 500);
      
    } catch (error) {
      console.error('Error saving event:', error);
      setIsSubmitting(false);
    }
  };
  
  const isEditMode = id && id !== 'new';
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isEditMode ? 'Edit Event' : 'Add New Event'}
        </h2>
      </div>
      
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    <option value="Music">Music</option>
                    <option value="Film">Film</option>
                    <option value="Theater">Theater</option>
                    <option value="Technology">Technology</option>
                    <option value="Sports">Sports</option>
                    <option value="Comedy">Comedy</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="totalSeats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Total Seats *
                    </label>
                    <input
                      type="number"
                      id="totalSeats"
                      name="totalSeats"
                      value={formData.totalSeats}
                      onChange={handleChange}
                      min="1"
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Available Seats *
                    </label>
                    <input
                      type="number"
                      id="availableSeats"
                      name="availableSeats"
                      value={formData.availableSeats}
                      onChange={handleChange}
                      min="0"
                      max={formData.totalSeats}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/events')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Saving...' 
                  : isEditMode 
                  ? 'Update Event' 
                  : 'Create Event'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEventForm;