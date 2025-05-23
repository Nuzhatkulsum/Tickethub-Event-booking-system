import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import Button from '../common/Button';
import Card, { CardContent } from '../common/Card';

const AdminEventList: React.FC = () => {
  const { events, deleteEvent } = useEvents();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Events</h2>
        <Link to="/admin/events/new">
          <Button>
            <Plus size={16} className="mr-2" />
            Add New Event
          </Button>
        </Link>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Event</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Date</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Price</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Availability</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Category</th>
                <th className="p-4 font-medium text-gray-500 dark:text-gray-400 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((event) => {
                const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                
                const availabilityPercentage = Math.round((event.availableSeats / event.totalSeats) * 100);
                
                let availabilityColor = 'bg-green-500';
                if (availabilityPercentage <= 10) {
                  availabilityColor = 'bg-red-500';
                } else if (availabilityPercentage <= 30) {
                  availabilityColor = 'bg-yellow-500';
                }
                
                return (
                  <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">{formattedDate} • {event.time}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">${event.price.toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`${availabilityColor} h-2 rounded-full`} 
                            style={{ width: `${availabilityPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {event.availableSeats}/{event.totalSeats}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
                        {event.category}
                      </span>
                    </td>
                    <td className="p-4">
                      {confirmDelete === event.id ? (
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => {
                              deleteEvent(event.id);
                              setConfirmDelete(null);
                            }}
                          >
                            Confirm
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setConfirmDelete(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Link to={`/admin/events/edit/${event.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit size={16} />
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setConfirmDelete(event.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminEventList;