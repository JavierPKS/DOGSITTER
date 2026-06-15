/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import HomeLanding from './components/HomeLanding';
import ServicesView from './components/ServicesView';
import MyRequests from './components/MyRequests';
import AdminDashboard from './components/AdminDashboard';
import { EventRequest, Staff } from './types';
import { 
  getStoredRequests, 
  saveStoredRequests, 
  getStoredStaff, 
  saveStoredStaff 
} from './data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  
  // High-signal preselected theme state to pass from landing to reserving wizard
  const [selectedThemeId, setSelectedThemeId] = useState<string | undefined>(undefined);

  // Initialize and synchronize states with storage
  useEffect(() => {
    setRequests(getStoredRequests());
    setStaffList(getStoredStaff());
  }, []);

  const handleCreateRequest = (newRequestData: Omit<EventRequest, 'id' | 'status' | 'createdAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newRequest: EventRequest = {
      ...newRequestData,
      id: `req-${Date.now()}`,
      status: 'En Revisión',
      createdAt: today,
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    saveStoredRequests(updated);
  };

  const handleUpdateRequestStatus = (id: string, newStatus: EventRequest['status']) => {
    const updated = requests.map((req) => 
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
    saveStoredRequests(updated);
  };

  const handleUpdateStaffStatus = (id: number, newStatus: Staff['status']) => {
    const updated = staffList.map((worker) => 
      worker.id === id ? { ...worker, status: newStatus } : worker
    );
    setStaffList(updated);
    saveStoredStaff(updated);
  };

  const handleSelectThemeFromCatalog = (themeId: string) => {
    setSelectedThemeId(themeId);
    setCurrentTab('portal'); // Jump directly to client reservation wizard
  };

  const handleBookNowCTA = () => {
    setSelectedThemeId(undefined); // Start fresh wizard
    setCurrentTab('portal');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f8]">
      
      {/* Premium Top Navigation Bar */}
      <TopNavBar 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        onBookNow={handleBookNowCTA} 
      />

      {/* Main viewport area with transition animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentTab === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HomeLanding 
                setTab={setCurrentTab} 
                onSelectTheme={handleSelectThemeFromCatalog} 
              />
            </motion.div>
          )}

          {currentTab === 'servicios' && (
            <motion.div
              key="servicios"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ServicesView onSelectTheme={handleSelectThemeFromCatalog} />
            </motion.div>
          )}

          {currentTab === 'portal' && (
            <motion.div
              key="portal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MyRequests 
                requests={requests} 
                onSubmitRequest={handleCreateRequest} 
                selectedThemeId={selectedThemeId}
                clearSelectedTheme={() => setSelectedThemeId(undefined)}
              />
            </motion.div>
          )}

          {currentTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AdminDashboard 
                requests={requests}
                staffList={staffList}
                onUpdateRequestStatus={handleUpdateRequestStatus}
                onUpdateStaffStatus={handleUpdateStaffStatus}
                onNavigateToReservation={handleBookNowCTA}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Elegant Shared Footer */}
      <Footer setTab={setCurrentTab} />

    </div>
  );
}

