     import { useEffect, useState } from "react";
     import { supabase } from "../services/supabaseClient";
     import { useNavigate } from "react-router-dom";
     import Layout from "../components/layout/Layout";
     import { LogOut, User, MapPin, Trash2 } from "lucide-react";

     export default function ProfilePage() {
       const navigate = useNavigate();
       const [user, setUser] = useState(null);
       const [orders, setOrders] = useState([]);
       const [addresses, setAddresses] = useState([]);
       const [loading, setLoading] = useState(false);
       const [isLogin, setIsLogin] = useState(true);
       const [isEditing, setIsEditing] = useState(false);
       const [editFullName, setEditFullName] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [confirmPassword, setConfirmPassword] = useState("");
       const [fullName, setFullName] = useState("");
       const [message, setMessage] = useState("");

       // Check if user is logged in and fetch data
       useEffect(() => {
         const getUser = async () => {
           const { data } = await supabase.auth.getUser();
           if (data?.user) {
             setUser(data.user);
             setEditFullName(data.user.user_metadata?.full_name || "");
             fetchOrders(data.user.id);
             fetchAddresses(data.user.id);
           }
         };
         getUser();
       }, []);

       // Fetch user's orders
       const fetchOrders = async (userId) => {
         setLoading(true);
         try {
           const { data, error } = await supabase
             .from("orders")
             .select("*")
             .eq("user_id", userId)
             .order("created_at", { ascending: false });
           if (error) throw error;
           setOrders(data);
         } catch (error) {
           console.error("Error fetching orders:", error.message);
           setMessage("❌ Failed to load orders. Please try again later.");
         } finally {
           setLoading(false);
         }
       };

       // Fetch user's saved addresses
       const fetchAddresses = async (userId) => {
         try {
           const { data, error } = await supabase
             .from("addresses")
             .select("*")
             .eq("user_id", userId);
           if (error) throw error;
           setAddresses(data || []);
         } catch (error) {
           console.error("Error fetching addresses:", error.message);
           // Suppress table not found error for user; show empty state
           setAddresses([]);
         }
       };

       // Login / Signup
       const handleAuth = async (e) => {
         e.preventDefault();
         setLoading(true);
         setMessage("");

         try {
           if (isLogin) {
             const { data, error } = await supabase.auth.signInWithPassword({
               email,
               password,
             });
             if (error) throw error;
             setUser(data.user);
             setEditFullName(data.user.user_metadata?.full_name || "");
             fetchOrders(data.user.id);
             fetchAddresses(data.user.id);
             setMessage("✅ Login successful!");
           } else {
             if (password !== confirmPassword) {
               throw new Error("Passwords do not match");
             }
             const { data, error } = await supabase.auth.signUp({
               email,
               password,
               options: { data: { full_name: fullName } },
             });
             if (error) throw error;
             setUser(data.user);
             setEditFullName(data.user.user_metadata?.full_name || "");
             setMessage("✅ Sign up successful! ");
           }
         } catch (error) {
           setMessage(`❌ ${error.message}`);
         } finally {
           setLoading(false);
         }
       };

       // Update profile
       const handleUpdateProfile = async (e) => {
         e.preventDefault();
         try {
           const { error } = await supabase.auth.updateUser({
             data: { full_name: editFullName },
           });
           if (error) throw error;
           setUser({ ...user, user_metadata: { full_name: editFullName } });
           setMessage("✅ Profile updated successfully!");
           setIsEditing(false);
         } catch (error) {
           setMessage(`❌ ${error.message}`);
         }
       };

       // Delete account
       const handleDeleteAccount = async () => {
         if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
           try {
             // Note: Supabase requires admin privileges for deleteUser; using custom deletion
             const { error: signOutError } = await supabase.auth.signOut();
             if (signOutError) throw signOutError;
             // Delete user-related data
             await supabase.from("orders").delete().eq("user_id", user.id);
             await supabase.from("addresses").delete().eq("user_id", user.id);
             setUser(null);
             setOrders([]);
             setAddresses([]);
             setMessage("✅ Account deleted successfully!");
           } catch (error) {
             setMessage(`❌ ${error.message}`);
           }
         }
       };

       // Logout
       const handleLogout = async () => {
         await supabase.auth.signOut();
         setUser(null);
         setOrders([]);
         setAddresses([]);
         setMessage("✅ Logged out successfully!");
       };

       // Skeleton loader for orders
       const OrderSkeleton = () => (
         <div className="animate-pulse border border-gray-200 p-4 rounded-lg space-y-3">
           <div className="h-4 bg-gray-200 rounded w-1/4"></div>
           <div className="h-4 bg-gray-200 rounded w-1/3"></div>
           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
           <div className="space-y-2">
             <div className="h-3 bg-gray-200 rounded w-3/4"></div>
             <div className="h-3 bg-gray-200 rounded w-2/3"></div>
           </div>
         </div>
       );

       // If user is logged in, show profile + orders
       if (user) {
         return (
           <Layout>
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
               <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm">
                 <div className="flex items-center gap-4 mb-6">
                   <User className="h-8 w-8 text-primary" aria-hidden="true" />
                   <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                     Welcome, {user.user_metadata?.full_name || user.email}
                   </h2>
                 </div>

                 {/* Profile Editing */}
                 {isEditing ? (
                   <form onSubmit={handleUpdateProfile} className="space-y-4 mb-6">
                     <div>
                       <label htmlFor="editFullName" className="sr-only">
                         Full Name
                       </label>
                       <input
                         id="editFullName"
                         type="text"
                         value={editFullName}
                         onChange={(e) => setEditFullName(e.target.value)}
                         className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                         required
                         aria-label="Edit Full Name"
                       />
                     </div>
                     <div className="flex gap-2">
                       <button
                         type="submit"
                         className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                         aria-label="Save profile changes"
                       >
                         Save
                       </button>
                       <button
                         onClick={() => setIsEditing(false)}
                         className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300/50"
                         aria-label="Cancel profile editing"
                       >
                         Cancel
                       </button>
                     </div>
                   </form>
                 ) : (
                   <button
                     onClick={() => setIsEditing(true)}
                     className="mb-6 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                     aria-label="Edit profile"
                   >
                     <User className="h-5 w-5" aria-hidden="true" />
                     Edit Profile
                   </button>
                 )}

                 {/* Logout and Delete Account */}
                 <div className="flex gap-4 mb-6">
                   <button
                     onClick={handleLogout}
                     className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                     aria-label="Log out"
                   >
                     <LogOut className="h-5 w-5" aria-hidden="true" />
                     Logout
                   </button>
                   <button
                     onClick={handleDeleteAccount}
                     className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                     aria-label="Delete account"
                   >
                     <Trash2 className="h-5 w-5" aria-hidden="true" />
                     Delete Account
                   </button>
                 </div>

                 {/* Saved Addresses */}
                 {addresses.length > 0 ? (
                   <div className="mb-6">
                     <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4">
                       Saved Addresses
                     </h3>
                     <ul className="space-y-3">
                       {addresses.map((address) => (
                         <li
                           key={address.id}
                           className="flex items-start gap-2 text-base text-gray-600"
                         >
                           <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                           <span>
                             {address.address_details.address}, {address.address_details.city},{' '}
                             {address.address_details.state}, {address.address_details.country},{' '}
                             {address.address_details.postalCode}
                           </span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 ) : (
                   <div className="mb-6">
                     <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4">
                       Saved Addresses
                     </h3>
                     <p className="text-gray-600 text-base">
                       No saved addresses yet. Add one during{' '}
                       <a
                         href="/checkout"
                         className="text-primary font-medium hover:underline"
                         aria-label="Go to checkout"
                       >
                         checkout
                       </a>
                       .
                     </p>
                   </div>
                 )}

                 {/* Order History */}
                 <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4">
                   Order History
                 </h3>
                 {loading ? (
                   <div className="space-y-4">
                     {Array.from({ length: 3 }).map((_, i) => (
                       <OrderSkeleton key={i} />
                     ))}
                   </div>
                 ) : orders.length === 0 ? (
                   <p className="text-gray-600 text-base">
                     No orders yet.{' '}
                     <a
                       href="/search"
                       className="text-primary font-medium hover:underline"
                       aria-label="Shop now"
                     >
                       Start shopping
                     </a>
                     .
                   </p>
                 ) : (
                   <div className="space-y-4">
                     {orders.map((order) => (
                       <div
                         key={order.id}
                         className="border border-gray-200 p-4 rounded-lg bg-gray-50"
                       >
                         <div className="flex justify-between items-center mb-2">
                           <p className="text-base">
                             <strong>Order ID:</strong> {order.id}
                           </p>
                           <span
                             className={`text-sm font-medium px-2 py-1 rounded-full ${
                               order.status === "paid"
                                 ? "bg-yellow-100 text-yellow-800"
                                 : order.status === "shipped"
                                 ? "bg-blue-100 text-blue-800"
                                 : order.status === "delivered"
                                 ? "bg-green-100 text-green-800"
                                 : "bg-gray-100 text-gray-800"
                             }`}
                           >
                             {order.status
                               ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                               : "Unknown"}
                           </span>
                         </div>
                         <p className="text-base">
                           <strong>Total:</strong> ${order.total?.toFixed(2)}
                         </p>
                         <p className="text-base">
                           <strong>Date:</strong>{' '}
                           {new Date(order.created_at).toLocaleDateString("en-US", {
                             year: "numeric",
                             month: "long",
                             day: "numeric",
                           })}
                         </p>
                         <p className="text-base">
                           <strong>Items:</strong>
                         </p>
                         <ul className="list-disc list-inside text-base text-gray-600">
                           {order.items?.map((item, idx) => (
                             <li key={idx}>
                               {item.title} x {item.quantity}
                             </li>
                           ))}
                         </ul>
                         {/* <a
                           href={`/order/${order.id}`}
                           className="mt-2 inline-block text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50"
                           aria-label={`View details for order ${order.id}`}
                         >
                           View Details
                         </a> */}
                       </div>
                     ))}
                   </div>
                 )}
                 {message && (
                   <p className="mt-4 text-center text-base text-gray-600">{message}</p>
                 )}
               </div>
             </div>
           </Layout>
         );
       }

       // If not logged in, show login/signup form
       return (
         <Layout>
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center min-h-[calc(100vh-64px)]">
             <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm w-full max-w-md">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 text-center mb-6">
                 {isLogin ? "Login to Your Account" : "Create an Account"}
               </h2>

               <form className="space-y-4" onSubmit={handleAuth}>
                 {!isLogin && (
                   <div>
                     <label htmlFor="fullName" className="sr-only">
                       Full Name
                     </label>
                     <input
                       id="fullName"
                       type="text"
                       placeholder="Full Name"
                       value={fullName}
                       onChange={(e) => setFullName(e.target.value)}
                       className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                       required
                       aria-label="Full Name"
                     />
                   </div>
                 )}
                 <div>
                   <label htmlFor="email" className="sr-only">
                     Email
                   </label>
                   <input
                     id="email"
                     type="email"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                     required
                     aria-label="Email"
                   />
                 </div>
                 <div>
                   <label htmlFor="password" className="sr-only">
                     Password
                   </label>
                   <input
                     id="password"
                     type="password"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                     required
                     aria-label="Password"
                   />
                 </div>
                 {!isLogin && (
                   <div>
                     <label htmlFor="confirmPassword" className="sr-only">
                       Confirm Password
                     </label>
                     <input
                       id="confirmPassword"
                       type="password"
                       placeholder="Confirm Password"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-primary/50"
                       required
                       aria-label="Confirm Password"
                     />
                   </div>
                 )}
                 <button
                   type="submit"
                   disabled={loading}
                   className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                   aria-label={isLogin ? "Login" : "Sign Up"}
                 >
                   {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
                 </button>
               </form>

               <p className="text-center mt-6 text-base text-gray-600">
                 {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                 <button
                   onClick={() => setIsLogin(!isLogin)}
                   className="text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50"
                   aria-label={isLogin ? "Switch to Sign Up" : "Switch to Login"}
                 >
                   {isLogin ? "Sign Up" : "Login"}
                 </button>
               </p>

               {message && (
                 <p className="mt-4 text-center text-base text-gray-600">{message}</p>
               )}
             </div>
           </div>
         </Layout>
       );
     }