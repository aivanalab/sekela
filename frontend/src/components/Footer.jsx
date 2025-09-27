import { Link } from 'react-router-dom';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, HeartIcon } from '@heroicons/react/24/outline';
import kasukuLogo from '../assets/kasuku.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/explore', label: 'Explore Universities' },
    { to: '/compare', label: 'Compare' },
    { to: '/insights', label: 'Data Insights' },
    { to: '/wizard', label: 'Find Your Fit' },
    { to: '/about', label: 'About Us' },
    { to: '/privacy', label: 'Privacy Policy' }
  ];

  const contactInfo = [
    { icon: EnvelopeIcon, label: 'Email', value: 'info@sekela.co.tz', href: 'mailto:info@sekela.co.tz' },
    { icon: PhoneIcon, label: 'Phone', value: '+255 760 984 921', href: 'tel:+255123456789' },
    { icon: MapPinIcon, label: 'Location', value: 'Dar es Salaam, Tanzania', href: 'https://maps.google.com/?q=Dar+es+Salaam,+Tanzania' }
  ];

  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img 
                src={kasukuLogo} 
                alt="kasuku Logo" 
                className="h-10 w-auto transition-transform duration-300 hover:scale-105"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/150x50?text=kasuku')}
              />
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Your guide to Tanzanian universities. Discover, compare, and make informed decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <span className="mr-2 w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-gray-300">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-2 hover:text-white transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-green-400" />
                  <span>{value}</span>
                </a>
              ))}
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
            <span className="flex items-center">
              &copy; {currentYear} sekela.

            </span>
            <div className="flex gap-4">
              <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}








// import { Link } from 'react-router-dom';
// import { 
//   EnvelopeIcon, 
//   PhoneIcon, 
//   MapPinIcon,
//   ArrowTopRightOnSquareIcon,
//   HeartIcon
// } from '@heroicons/react/24/outline';
// import {
//   TwitterIcon,
//   LinkedInIcon,
//   GitHubIcon,
//   InstagramIcon
// } from '@heroicons/react/24/solid';

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { to: '/explore', label: 'Explore Universities', external: false },
//     { to: '/compare', label: 'Compare', external: false },
//     { to: '/insights', label: 'Data Insights', external: false },
//     { to: '/wizard', label: 'Find Your Fit', external: false },
//     { to: '/about', label: 'About Us', external: false },
//     { to: '/privacy', label: 'Privacy Policy', external: false }
//   ];

//   const socialLinks = [
//     { 
//       icon: TwitterIcon, 
//       href: 'https://twitter.com/kasuku', 
//       label: 'Twitter',
//       color: 'hover:text-blue-400' 
//     },
//     { 
//       icon: LinkedInIcon, 
//       href: 'https://linkedin.com/company/kasuku', 
//       label: 'LinkedIn',
//       color: 'hover:text-blue-500' 
//     },
//     { 
//       icon: InstagramIcon, 
//       href: 'https://instagram.com/kasuku', 
//       label: 'Instagram',
//       color: 'hover:text-pink-400' 
//     },
//     { 
//       icon: GitHubIcon, 
//       href: 'https://github.com/kasuku', 
//       label: 'GitHub',
//       color: 'hover:text-gray-300' 
//     }
//   ];

//   const contactInfo = [
//     {
//       icon: EnvelopeIcon,
//       label: 'Email',
//       value: 'hello@kasuku.co.tz',
//       href: 'mailto:hello@kasuku.co.tz'
//     },
//     {
//       icon: PhoneIcon,
//       label: 'Phone',
//       value: '+255 123 456 789',
//       href: 'tel:+255123456789'
//     },
//     {
//       icon: MapPinIcon,
//       label: 'Location',
//       value: 'Dar es Salaam, Tanzania',
//       href: 'https://maps.google.com/?q=Dar+es+Salaam,+Tanzania'
//     }
//   ];

//   return (
//     <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
//       </div>

//       {/* Dotted pattern overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="h-full w-full" style={{
//           backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
//           backgroundSize: '50px 50px'
//         }}></div>
//       </div>

//       <div className="relative z-10">
//         {/* Main footer content */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
//             {/* Brand section */}
//             <div className="lg:col-span-2 space-y-6">
//               <div className="flex items-center space-x-3 group">
//                 <div className="relative">
//                   <img 
//                     src="/src/assets/kasuku.png" 
//                     alt="kasuku Logo" 
//                     className="h-12 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125"
//                     onError={(e) => {
//                       e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="%2315803d"><circle cx="24" cy="24" r="22"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="20" font-family="system-ui" font-weight="bold">K</text></svg>';
//                     }}
//                   />
//                   <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
//                 </div>
//                 <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-400 bg-clip-text text-transparent">
//                   kasuku
//                 </span>
//               </div>
              
//               <p className="text-lg text-gray-300 leading-relaxed max-w-md">
//                 Your intelligent guide to Tanzanian universities. Discover, compare, and make 
//                 <span className="text-emerald-400 font-medium"> data-driven decisions</span> about your educational journey.
//               </p>

//               {/* Social links */}
//               <div className="flex space-x-4">
//                 {socialLinks.map(({ icon: Icon, href, label, color }) => (
//                   <a
//                     key={label}
//                     href={href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`group p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-110 ${color}`}
//                     aria-label={label}
//                   >
//                     <Icon className="h-5 w-5 text-gray-400 group-hover:text-current transition-colors duration-300" />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div className="space-y-6">
//               <h4 className="text-xl font-semibold text-white relative">
//                 Quick Links
//                 <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-yellow-400 rounded-full"></div>
//               </h4>
//               <nav className="space-y-3">
//                 {quickLinks.map(({ to, label, external }) => {
//                   const Component = external ? 'a' : Link;
//                   const linkProps = external ? { href: to, target: '_blank', rel: 'noopener noreferrer' } : { to };
                  
//                   return (
//                     <Component
//                       key={to}
//                       {...linkProps}
//                       className="group flex items-center text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1"
//                     >
//                       <span className="mr-2 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
//                       {label}
//                       {external && (
//                         <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-200" />
//                       )}
//                     </Component>
//                   );
//                 })}
//               </nav>
//             </div>

//             {/* Contact Info */}
//             <div className="space-y-6">
//               <h4 className="text-xl font-semibold text-white relative">
//                 Get in Touch
//                 <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-yellow-400 rounded-full"></div>
//               </h4>
//               <div className="space-y-4">
//                 {contactInfo.map(({ icon: Icon, label, value, href }) => (
//                   <a
//                     key={label}
//                     href={href}
//                     target={href.startsWith('http') ? '_blank' : undefined}
//                     rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
//                     className="group flex items-start space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
//                   >
//                     <div className="flex-shrink-0 p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-300">
//                       <Icon className="h-5 w-5 text-emerald-400" />
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-400 font-medium">{label}</div>
//                       <div className="text-gray-300 group-hover:text-white transition-colors duration-200">{value}</div>
//                     </div>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Newsletter signup */}
//           <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-yellow-500/10 border border-emerald-500/20 backdrop-blur-sm">
//             <div className="text-center max-w-2xl mx-auto">
//               <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
//               <p className="text-gray-300 mb-6">Get the latest insights and updates about Tanzanian universities delivered to your inbox.</p>
//               <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all duration-200"
//                 />
//                 <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//               <div className="flex items-center text-gray-400 text-sm">
//                 <span>© {currentYear} kasuku. Made with</span>
//                 <HeartIcon className="h-4 w-4 text-red-400 mx-1 animate-pulse" />
//                 <span>in Tanzania</span>
//               </div>
              
//               <div className="flex items-center space-x-6 text-sm text-gray-400">
//                 <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
//                 <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
//                 <Link to="/cookies" className="hover:text-white transition-colors duration-200">Cookie Policy</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

