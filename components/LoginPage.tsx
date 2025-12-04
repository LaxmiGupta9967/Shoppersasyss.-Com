
import React, { useState, useEffect } from 'react';
import { 
    EyeIcon, 
    EyeOffIcon, 
    UserIcon, 
    MailIcon, 
    PhoneCallIcon, 
    LocationMarkerIcon, 
    BriefcaseIcon, 
    LockClosedIcon, 
    ArrowRightIcon
} from './IconComponents';
import { Logo } from './Logo';

interface LoginPageProps {
    onLogin: (details: {
        email: string;
        password?: string;
        name: string;
        phone: string;
        address: string;
        accountType: 'user' | 'business';
    }) => void;
}

// Updated Location Data for India
const LOCATION_DATA = [
    { 
        name: 'Maharashtra', 
        cities: [
            'Mumbai (All Areas)', 
            'Mumbai - South', 
            'Mumbai - Bandra/West', 
            'Mumbai - Andheri/Juhu', 
            'Mumbai - Borivali/North',
            'Navi Mumbai', 
            'Thane', 
            'Pune', 
            'Nagpur', 
            'Nashik', 
            'Aurangabad', 
            'Solapur'
        ] 
    },
    { name: 'Delhi NCR', cities: ['New Delhi', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad'] },
    { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli-Dharwad', 'Belagavi'] },
    { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'] },
    { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'] },
    { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'] },
    { name: 'West Bengal', cities: ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'] },
    { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer'] },
    { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Prayagraj'] },
    { name: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'] }
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    
    // Auth Fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [accountType, setAccountType] = useState<'user' | 'business'>('user');

    // Address Fields
    const [streetAddress, setStreetAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [availableCities, setAvailableCities] = useState<string[]>([]);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    // Update cities when state changes
    useEffect(() => {
        if (state) {
            const stateData = LOCATION_DATA.find(s => s.name === state);
            setAvailableCities(stateData ? stateData.cities : []);
            setCity(''); // Reset city when state changes
        } else {
            setAvailableCities([]);
        }
    }, [state]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Combine address fields for registration
        const fullAddress = isRegistering 
            ? `${streetAddress}, ${city}, ${state} - ${zipCode}`
            : '';

        onLogin({ 
            email, 
            password, 
            name, 
            phone, 
            address: fullAddress, 
            accountType 
        });
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Dynamic Branding */}
            <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://i.postimg.cc/PfWbs9X3/Whats-App-Image-2025-11-18-at-12-18-35-PM.jpg" 
                        alt="Shopping Lifestyle" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/20 to-gray-900/80"></div>
                </div>
                
                <div className="relative z-10 flex flex-col justify-between w-full p-12">
                    <div>
                        <Logo className="h-16 w-auto mb-8 filter brightness-0 invert" />
                        <h1 className="text-5xl font-bold leading-tight tracking-tight text-shadow-md">
                            Discover. <br/>
                            <span className="text-primary">Buy.</span> <br/>
                            Sell.
                        </h1>
                        <p className="mt-6 text-lg text-gray-100 max-w-sm leading-relaxed font-medium drop-shadow-sm">
                            Join the marketplace where opportunities meet. Find exactly what you need, or turn your items into cash in minutes.
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                                <BriefcaseIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold drop-shadow-sm">For Business</p>
                                <p className="text-sm text-gray-200">Grow your reach instantly</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                                <UserIcon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold drop-shadow-sm">For Everyone</p>
                                <p className="text-sm text-gray-200">Safe and easy transactions</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-gray-300/80">
                        &copy; {new Date().getFullYear()}. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 bg-gray-50 overflow-y-auto">
                <div className="max-w-md w-full my-auto">
                    {/* Logo - Visible on all screens */}
                    <div className="text-center mb-8">
                         <Logo className="h-32 mx-auto" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
                        <div className="mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {isRegistering ? 'Create Account' : 'Welcome Back'}
                            </h2>
                            <p className="mt-2 text-sm text-gray-500">
                                {isRegistering 
                                    ? 'Enter your details to get started' 
                                    : 'Please enter your details to sign in'
                                }
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {isRegistering && (
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setAccountType('user')}
                                        className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                                            accountType === 'user' 
                                            ? 'border-primary bg-orange-50 text-primary ring-1 ring-primary ring-opacity-50' 
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <UserIcon className="w-6 h-6" />
                                        <span className="font-bold text-sm">Personal</span>
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setAccountType('business')}
                                        className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                                            accountType === 'business' 
                                            ? 'border-primary bg-orange-50 text-primary ring-1 ring-primary ring-opacity-50' 
                                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <BriefcaseIcon className="w-6 h-6" />
                                        <span className="font-bold text-sm">Business</span>
                                    </button>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MailIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm"
                                            placeholder="e.g., yourname@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LockClosedIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            autoComplete={isRegistering ? 'new-password' : 'current-password'}
                                            required
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm"
                                            placeholder="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        >
                                            {isPasswordVisible 
                                                ? <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" /> 
                                                : <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            }
                                        </button>
                                    </div>
                                </div>

                                {isRegistering && (
                                    <>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name (for new accounts)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <UserIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    required
                                                    autoComplete="name"
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm"
                                                    placeholder="e.g., Rahul Sharma"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (for new accounts)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <PhoneCallIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    autoComplete="tel"
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm"
                                                    placeholder="e.g., +91 98765 43210"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <select
                                                        id="state"
                                                        name="state"
                                                        required
                                                        autoComplete="address-level1"
                                                        className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm appearance-none"
                                                        value={state}
                                                        onChange={(e) => setState(e.target.value)}
                                                    >
                                                        <option value="">Select State</option>
                                                        {LOCATION_DATA.map((loc) => (
                                                            <option key={loc.name} value={loc.name}>{loc.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City / Area</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <select
                                                        id="city"
                                                        name="city"
                                                        required
                                                        disabled={!state}
                                                        autoComplete="address-level2"
                                                        className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm appearance-none disabled:bg-gray-100 disabled:text-gray-400"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    >
                                                        <option value="">Select City/Area</option>
                                                        {availableCities.map((cityOption) => (
                                                            <option key={cityOption} value={cityOption}>{cityOption}</option>
                                                        ))}
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700 mb-1">Street Address (for new accounts)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="street-address"
                                                    name="street-address"
                                                    type="text"
                                                    required
                                                    autoComplete="street-address"
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm"
                                                    placeholder="e.g., Flat 201, Sunshine Apartments, MG Road"
                                                    value={streetAddress}
                                                    onChange={(e) => setStreetAddress(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    id="zip-code"
                                                    name="postal-code"
                                                    type="text"
                                                    required
                                                    autoComplete="postal-code"
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors sm:text-sm"
                                                    placeholder="e.g., 400001"
                                                    value={zipCode}
                                                    onChange={(e) => setZipCode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="group w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                {isRegistering ? 'Create Account' : 'Sign In'}
                                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                             <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">
                                        {isRegistering ? 'Already have an account?' : 'New here?'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="mt-4 font-medium text-primary hover:text-orange-600 transition-colors"
                            >
                                {isRegistering ? 'Sign In Here' : 'Create an Account'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
