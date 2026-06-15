import React, { useState, useEffect } from 'react';
import { 
  PawPrint, 
  Inbox, 
  Settings, 
  FilePlus2, 
  HelpCircle,
  Clock,
  Sparkles,
  Users,
  LogOut
} from 'lucide-react';
import { EventRequest, Recipe, UserSession } from './types';
import { INITIAL_REQUESTS, INITIAL_RECIPES } from './data';
import ClientForm from './components/ClientForm';
import AdminInbox from './components/AdminInbox';
import AdminDetail from './components/AdminDetail';
import RecipeManagement from './components/RecipeManagement';
import PetDirectory from './components/PetDirectory';
import ScheduleView from './components/ScheduleView';
import LoginScreen from './components/LoginScreen';
import StaffManagement from './components/StaffManagement';
import ClientDashboard from './components/ClientDashboard';

export default function App() {
  // Global Application State stored safely
  const [requests, setRequests] = useState<EventRequest[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  
  // Navigation State
  const [currentView, setCurrentView] = useState<string>('inbox');
  const [selectedRequest, setSelectedRequest] = useState<EventRequest | null>(null);

  // Initialize state with preloaded mockup data
  useEffect(() => {
    // Check localStorage first
    const savedRequests = localStorage.getItem('dogsitter_requests');
    const savedRecipes = localStorage.getItem('dogsitter_recipes');
    const savedSession = localStorage.getItem('dogsitter_user_session');

    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      setRequests(INITIAL_REQUESTS);
      localStorage.setItem('dogsitter_requests', JSON.stringify(INITIAL_REQUESTS));
    }

    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    } else {
      setRecipes(INITIAL_RECIPES);
      localStorage.setItem('dogsitter_recipes', JSON.stringify(INITIAL_RECIPES));
    }

    if (savedSession) {
      const parsedSession = JSON.parse(savedSession) as UserSession;
      setUserSession(parsedSession);
      setCurrentView(parsedSession.role === 'admin' ? 'inbox' : 'client_home');
    } else {
      // Prompt with login initially by setting userSession to null
      setUserSession(null);
    }
  }, []);

  // Sync state functions back to localStorage on change
  const saveRequests = (newReqs: EventRequest[]) => {
    setRequests(newReqs);
    localStorage.setItem('dogsitter_requests', JSON.stringify(newReqs));
  };

  const saveRecipes = (newRecipes: Recipe[]) => {
    setRecipes(newRecipes);
    localStorage.setItem('dogsitter_recipes', JSON.stringify(newRecipes));
  };

  // Submit Callback for booking form
  const handleCreateRequest = (newReq: Omit<EventRequest, 'id' | 'status' | 'requesterAvatar' | 'requesterTier'>) => {
    const id = `EVT-${Math.floor(4000 + Math.random() * 999)}`;
    const fullRequest: EventRequest = {
      ...newReq,
      id,
      status: 'Pending',
      requesterAvatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newReq.requesterName}`,
      requesterTier: 'Cliente VIP • Nivel Premium'
    };

    const updated = [fullRequest, ...requests];
    saveRequests(updated);
  };

  // Administrative approval triggers
  const handleApproveEvent = (id: string) => {
    const updated = requests.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Approved' as const };
      }
      return r;
    });
    saveRequests(updated);
    
    // Update selected request view on detail sheet as well
    const found = updated.find(r => r.id === id);
    if (found) {
      setSelectedRequest(found);
    }
  };

  const handleDeclineRequest = (id: string) => {
    const updated = requests.map(r => {
      if (r.id === id) {
        return { ...r, status: 'Declined' as const };
      }
      return r;
    });
    saveRequests(updated);
    
    const found = updated.find(r => r.id === id);
    if (found) {
      setSelectedRequest(found);
    }
  };

  // Recipe saving
  const handleSaveRecipe = (updatedRecipe: Recipe) => {
    const exists = recipes.some(r => r.id === updatedRecipe.id);
    let updated: Recipe[];
    if (exists) {
      updated = recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r);
    } else {
      updated = [...recipes, updatedRecipe];
    }
    saveRecipes(updated);
  };

  // Helper selectors
  const handleSelectRequestToReview = (req: EventRequest) => {
    setSelectedRequest(req);
    setCurrentView('detail');
  };

  const handleLogin = (session: UserSession) => {
    setUserSession(session);
    localStorage.setItem('dogsitter_user_session', JSON.stringify(session));
    setCurrentView(session.role === 'admin' ? 'inbox' : 'client_home');
  };

  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem('dogsitter_user_session');
  };

  // Login Gate
  if (userSession === null) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      
      {/* Universal Sticky Top navbar with role-governed buttons */}
      <nav id="global-header-navigation" className="sticky top-0 bg-surface border-b border-outline-variant/30 px-6 h-16 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <PawPrint className="w-6 h-6 text-primary" />
          <span className="font-display text-xl font-black text-primary tracking-tight select-none">DogSitter</span>
          
          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ml-1 ${
            userSession.role === 'admin' ? 'bg-primary-container text-primary' : 'bg-tertiary-fixed text-on-tertiary-container'
          }`}>
            {userSession.role === 'admin' ? 'Coordinador' : 'Cliente VIP'}
          </span>
        </div>

        {/* Dynamic View switches controls based on current Role */}
        <div className="flex items-center gap-1 sm:gap-2 font-display font-medium text-xs select-none">
          {userSession.role === 'admin' ? (
            <>
              <button 
                type="button"
                onClick={() => setCurrentView('inbox')}
                className={`px-3 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'inbox' || currentView === 'detail'
                    ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" /> Bandeja
              </button>

              <button 
                type="button"
                onClick={() => setCurrentView('schedules')}
                className={`px-3 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'schedules'
                    ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <Clock className="w-3.5 h-3.5" /> Horarios
              </button>

              <button 
                type="button"
                onClick={() => setCurrentView('staff')}
                className={`px-3 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'staff'
                    ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> Staff / Personal
              </button>

              <button 
                type="button"
                onClick={() => setCurrentView('recipes')}
                className={`px-3 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'recipes'
                    ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <Settings className="w-3.5 h-3.5" /> Recetas
              </button>
            </>
          ) : (
            <>
              <button 
                type="button"
                onClick={() => setCurrentView('client_home')}
                className={`px-3 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'client_home'
                    ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" /> Mis Banquetes
              </button>

              <button 
                type="button"
                onClick={() => setCurrentView('booking')}
                className={`px-3 py-2 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  currentView === 'booking'
                    ? 'bg-primary-fixed text-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                }`}
              >
                <FilePlus2 className="w-3.5 h-3.5" /> Planificar Banquete
              </button>
            </>
          )}
        </div>

        {/* Profile info + LogOut action */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <span className="text-xs font-bold text-on-surface block leading-none">{userSession.name}</span>
            <span className="text-[10px] text-primary/70 font-semibold">{userSession.role === 'admin' ? 'Elena Gómez (Líder)' : 'Cliente VIP'}</span>
          </div>
          
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/40 shrink-0">
            <img src={userSession.avatar || 'https://api.dicebear.com/7.x/adventurer/svg?seed=VIP'} alt="Profile Avatar" className="w-full h-full object-cover" />
          </div>

          <button 
            type="button"
            onClick={handleLogout}
            title="Cerrar Sesión"
            className="p-1.5 rounded-full hover:bg-red-50 text-on-surface-variant hover:text-red-600 transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Dynamic View container rendering matching states */}
      <main className="flex-1">
        {/* Client Views */}
        {currentView === 'client_home' && userSession.role === 'client' && (
          <ClientDashboard 
            requests={requests}
            userSession={userSession}
            onOpenBooking={() => setCurrentView('booking')}
          />
        )}

        {currentView === 'booking' && (
          <ClientForm 
            onSubmit={(newReq) => {
              handleCreateRequest(newReq);
              setCurrentView(userSession.role === 'admin' ? 'inbox' : 'client_home');
            }}
            onNavigateToAdmin={() => {
              // Simulating admin bypass or switching
              handleLogin({
                role: 'admin',
                name: 'Elena Gómez',
                email: 'elena.gomez@dogsitter.com',
                phone: '+56 9 8765 4321',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
              });
            }}
          />
        )}

        {/* Admin Views */}
        {currentView === 'inbox' && (
          <AdminInbox 
            requests={requests}
            onSelectRequest={handleSelectRequestToReview}
            onDeclineRequest={handleDeclineRequest}
            onOpenBooking={() => setCurrentView('booking')}
            onSelectRecipes={() => setCurrentView('recipes')}
            onSelectSchedules={() => setCurrentView('schedules')}
            onSelectStaff={() => setCurrentView('staff')}
          />
        )}

        {currentView === 'detail' && selectedRequest && (
          <AdminDetail 
            request={selectedRequest}
            onGoBack={() => setCurrentView('inbox')}
            onApproveEvent={handleApproveEvent}
            onRejectEvent={handleDeclineRequest}
          />
        )}

        {currentView === 'recipes' && (
          <RecipeManagement 
            recipes={recipes}
            onSaveRecipe={handleSaveRecipe}
            onGoBack={() => setCurrentView('inbox')}
          />
        )}

        {currentView === 'pets' && (
          <PetDirectory 
            onGoBack={() => setCurrentView('inbox')}
          />
        )}

        {currentView === 'schedules' && (
          <ScheduleView 
            requests={requests}
            onGoBack={() => setCurrentView('inbox')}
          />
        )}

        {currentView === 'staff' && (
          <StaffManagement 
            requests={requests}
            onGoBack={() => setCurrentView('inbox')}
          />
        )}
      </main>

      {/* Unified footer */}
      <footer className="bg-inverse-surface border-t border-outline/20 py-4 px-6 text-center text-xs font-semibold text-outline-variant/60">
        &copy; {new Date().getFullYear()} DogSitter. Construido con Tailwind CSS v4 y React SPA.
      </footer>

    </div>
  );
}
