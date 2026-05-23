"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, Settings, LogOut, ChevronRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Basic protection (redirects to login if not authenticated)
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) return null; // Prevent hydration mismatch before redirect

  return (
    <main className="min-h-screen bg-valerie-bg-dark flex flex-col relative overflow-hidden pb-24">
      <Navbar />
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-valerie-accent-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 lg:px-24 pt-32 z-10 flex-1 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-valerie-bg-mid border border-valerie-text-metallic/20 flex items-center justify-center">
              <User size={20} className="text-valerie-accent-gold" />
            </div>
            <div>
              <p className="text-valerie-text-primary text-lg font-light tracking-wide">{user.name}</p>
              <p className="text-valerie-text-metallic text-xs tracking-widest uppercase">ID: {user.id}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {[
              { id: "overview", label: "Neural Overview", icon: <User size={16} /> },
              { id: "companions", label: "My Companions", icon: <CheckCircle2 size={16} /> },
              { id: "orders", label: "Order History", icon: <Package size={16} /> },
              { id: "settings", label: "Settings", icon: <Settings size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide transition-all ${
                  activeTab === tab.id 
                    ? "bg-valerie-accent-gold/10 text-valerie-accent-gold border border-valerie-accent-gold/20" 
                    : "text-valerie-text-secondary hover:text-valerie-text-primary hover:bg-valerie-bg-mid/50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide text-red-400/80 hover:bg-red-400/10 transition-all mt-auto"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-valerie-bg-mid/20 backdrop-blur-md border border-valerie-text-metallic/10 rounded-3xl p-6 md:p-10 lg:p-12 min-h-[600px]">
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light text-valerie-text-primary mb-2">Welcome back, {user.name}</h2>
                  <p className="text-valerie-text-secondary">Your neural sync parameters are fully optimized.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-valerie-bg-dark/50 p-6 rounded-2xl border border-valerie-text-metallic/10">
                    <p className="text-xs text-valerie-text-metallic uppercase tracking-widest mb-4">Sync Status</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl text-valerie-accent-white">{user.neuralSyncStatus}</span>
                      <div className="w-2 h-2 rounded-full bg-valerie-accent-gold mb-2 animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-valerie-bg-dark/50 p-6 rounded-2xl border border-valerie-text-metallic/10">
                    <p className="text-xs text-valerie-text-metallic uppercase tracking-widest mb-4">Companions</p>
                    <div className="text-2xl text-valerie-accent-white">0</div>
                  </div>
                  <div className="bg-valerie-bg-dark/50 p-6 rounded-2xl border border-valerie-text-metallic/10">
                    <p className="text-xs text-valerie-text-metallic uppercase tracking-widest mb-4">Compatibility Score</p>
                    <div className="text-2xl text-valerie-accent-white">99.8%</div>
                  </div>
                </div>

                <div className="bg-valerie-bg-dark/50 p-8 rounded-2xl border border-valerie-text-metallic/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-light text-valerie-text-primary mb-2">Ready for a Companion?</h3>
                    <p className="text-sm text-valerie-text-secondary max-w-md">Your profile is perfectly calibrated to begin synchronization with any of our models.</p>
                  </div>
                  <button onClick={() => router.push('/#collection')} className="px-6 py-3 bg-valerie-accent-gold text-valerie-bg-dark text-sm tracking-widest uppercase font-medium rounded-full hover:bg-valerie-accent-white transition-colors flex items-center gap-2 whitespace-nowrap">
                    View Collection <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "companions" && (
              <div>
                <h2 className="text-2xl font-light text-valerie-text-primary mb-6">My Companions</h2>
                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-valerie-text-metallic/20 rounded-2xl">
                  <User size={48} className="text-valerie-text-metallic/30 mb-4" strokeWidth={1} />
                  <p className="text-valerie-text-primary text-lg mb-2">No active companions</p>
                  <p className="text-valerie-text-secondary text-sm max-w-xs mx-auto mb-6">You have not finalized any purchases yet.</p>
                  <button onClick={() => router.push('/#collection')} className="text-valerie-accent-gold text-sm tracking-widest uppercase hover:text-valerie-accent-white transition-colors">
                    Explore Models
                  </button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-light text-valerie-text-primary mb-6">Order History</h2>
                <p className="text-valerie-text-secondary text-sm mb-6">View your secure transactions and discreet shipping statuses.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-valerie-text-secondary">
                    <thead className="text-xs uppercase tracking-widest border-b border-valerie-text-metallic/20 text-valerie-text-metallic">
                      <tr>
                        <th className="py-4 font-normal">Order ID</th>
                        <th className="py-4 font-normal">Date</th>
                        <th className="py-4 font-normal">Status</th>
                        <th className="py-4 font-normal text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-valerie-text-metallic/50">
                          No transaction history found.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-light text-valerie-text-primary mb-6">Account Settings</h2>
                <p className="text-valerie-text-secondary text-sm mb-8">Manage your secure identity and billing preferences.</p>
                
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">Email Address</label>
                    <input type="text" disabled value={user.email} className="w-full bg-valerie-bg-dark/50 border border-valerie-text-metallic/20 rounded-lg p-3 text-valerie-text-primary opacity-70" />
                  </div>
                  <div>
                    <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">Designation</label>
                    <input type="text" defaultValue={user.name} className="w-full bg-transparent border border-valerie-text-metallic/40 focus:border-valerie-accent-gold rounded-lg p-3 text-valerie-text-primary outline-none transition-colors" />
                  </div>
                  <button className="px-6 py-3 bg-valerie-bg-dark border border-valerie-text-metallic/30 text-valerie-text-primary text-sm tracking-widest uppercase rounded-full hover:border-valerie-accent-gold transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </main>
  );
}
