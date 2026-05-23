"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, Settings, LogOut, ChevronRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function DashboardPage() {
  const { user, profile, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Fetch orders if user is loaded
    if (user) {
      const fetchOrders = async () => {
        const { createClient } = await import('@/utils/supabase/client');
        const supabase = createClient();
        const { data } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (data) setOrders(data);
      };
      fetchOrders();
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-valerie-bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-valerie-accent-gold border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  const displayName = profile?.full_name || user.user_metadata?.full_name || "User";
  const syncStatus = profile?.neural_sync_status || "Optimizing...";

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
            <div className="overflow-hidden">
              <p className="text-valerie-text-primary text-lg font-light tracking-wide truncate">{displayName}</p>
              <p className="text-valerie-text-metallic text-xs tracking-widest uppercase truncate">ID: {user.id.substring(0,8)}</p>
            </div>
          </div>

          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x">
            {[
              { id: "overview", label: "Valerie 23 Overview", icon: <User size={16} /> },
              { id: "companions", label: "My Companions", icon: <CheckCircle2 size={16} /> },
              { id: "orders", label: "Order History", icon: <Package size={16} /> },
              { id: "settings", label: "Settings", icon: <Settings size={16} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide transition-all whitespace-nowrap shrink-0 snap-start ${
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
            onClick={() => setShowDisconnectModal(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide text-red-400/80 hover:bg-red-400/10 transition-all mt-auto"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-valerie-bg-mid/20 backdrop-blur-md border border-valerie-text-metallic/10 rounded-3xl p-5 md:p-10 lg:p-12 min-h-[600px]">
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light text-valerie-text-primary mb-2">Welcome back, {displayName}</h2>
                  <p className="text-valerie-text-secondary">Your Valerie 23 parameters are fully optimized.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-valerie-bg-dark/50 p-6 rounded-2xl border border-valerie-text-metallic/10">
                    <p className="text-xs text-valerie-text-metallic uppercase tracking-widest mb-4">Sync Status</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl text-valerie-accent-white">{syncStatus}</span>
                      <div className="w-2 h-2 rounded-full bg-valerie-accent-gold mb-2 animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-valerie-bg-dark/50 p-6 rounded-2xl border border-valerie-text-metallic/10">
                    <p className="text-xs text-valerie-text-metallic uppercase tracking-widest mb-4">Companions</p>
                    <div className="text-2xl text-valerie-accent-white">
                      {orders.reduce((sum, order) => sum + (order.items?.length || 0), 0)}
                    </div>
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
                {orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-valerie-text-metallic/20 rounded-2xl">
                    <User size={48} className="text-valerie-text-metallic/30 mb-4" strokeWidth={1} />
                    <p className="text-valerie-text-primary text-lg mb-2">No active companions</p>
                    <p className="text-valerie-text-secondary text-sm max-w-xs mx-auto mb-6">You have not finalized any purchases yet.</p>
                    <button onClick={() => router.push('/#collection')} className="text-valerie-accent-gold text-sm tracking-widest uppercase hover:text-valerie-accent-white transition-colors">
                      Explore Models
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {orders.flatMap(order => order.items || []).map((item: any, idx: number) => (
                      <div key={idx} className="bg-valerie-bg-dark/50 border border-valerie-text-metallic/20 rounded-2xl p-6 flex gap-6 items-center">
                        <div className="w-20 h-20 rounded-full bg-valerie-bg-mid flex-shrink-0 flex items-center justify-center overflow-hidden border border-valerie-accent-gold/30">
                          {/* Placeholder for model image */}
                          <User size={32} className="text-valerie-accent-gold/50" />
                        </div>
                        <div>
                          <h3 className="text-lg font-light text-valerie-text-primary">{item.model?.name || 'Unknown Model'}</h3>
                          <p className="text-xs text-valerie-accent-gold uppercase tracking-widest mt-1">Status: Imprinting</p>
                          <p className="text-xs text-valerie-text-secondary mt-2">Valerie 23: 99.8% optimized</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-valerie-text-metallic/50">
                            No transaction history found.
                          </td>
                        </tr>
                      ) : (
                        orders.map(order => (
                          <tr key={order.id} className="border-b border-valerie-text-metallic/5 last:border-0">
                            <td className="py-4 font-mono text-valerie-text-primary">{order.id.substring(0,8)}</td>
                            <td className="py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                            <td className="py-4"><span className="px-2 py-1 bg-valerie-accent-gold/10 text-valerie-accent-gold rounded text-xs">{order.status}</span></td>
                            <td className="py-4 text-right">${order.total_amount?.toLocaleString()}</td>
                          </tr>
                        ))
                      )}
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
                    <label className="text-xs text-valerie-text-metallic tracking-widest uppercase block mb-2">Full Name</label>
                    <input type="text" defaultValue={displayName} className="w-full bg-transparent border border-valerie-text-metallic/40 focus:border-valerie-accent-gold rounded-lg p-3 text-valerie-text-primary outline-none transition-colors" />
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

      {showDisconnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-valerie-bg-dark border border-valerie-text-metallic/20 p-8 rounded-3xl max-w-md w-full shadow-2xl">
            <h3 className="text-xl text-valerie-text-primary font-light mb-4">Disconnect Valerie 23?</h3>
            <p className="text-valerie-text-secondary text-sm mb-8">
              Are you sure you want to disconnect? Your session will be terminated and your sync progress securely paused.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowDisconnectModal(false)}
                className="flex-1 px-4 py-3 border border-valerie-text-metallic/20 text-valerie-text-primary rounded-xl hover:bg-valerie-bg-mid transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowDisconnectModal(false);
                  logout();
                }}
                className="flex-1 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
