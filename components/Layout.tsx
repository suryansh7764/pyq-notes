import React from 'react';
import { BookOpen, GraduationCap, Menu, Search, Bell } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Banner - Official Style */}
      <header className="bg-white border-b-4 border-ru-blue shadow-sm relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between flex-wrap">
          <div className="flex items-center space-x-4">
            <div className="bg-ru-blue text-white p-2 rounded-full shadow-lg">
              <GraduationCap size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ru-blue font-serif tracking-tight">PYQ & NOTES</h1>
              <p className="text-xs md:text-sm text-gray-600 font-bold tracking-widest uppercase">Ranchi University Resource Portal</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm font-bold text-gray-700">
            <a href="#" className="hover:text-ru-blue hover:underline decoration-2 underline-offset-4 transition-all">HOME</a>
            <a href="#" className="hover:text-ru-blue hover:underline decoration-2 underline-offset-4 transition-all">ABOUT</a>
            <a href="#" className="hover:text-ru-blue hover:underline decoration-2 underline-offset-4 transition-all">SYLLABUS</a>
            <a href="#" className="bg-ru-blue text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors">CONTACT US</a>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 p-2 hover:bg-gray-100 rounded">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar - Secondary */}
      <div className="bg-ru-blue text-white shadow-md relative z-20">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto no-scrollbar">
            {['All Resources', 'Question Papers', 'Notes', 'Syllabus', 'Results', 'Exam Routine'].map((item) => (
              <button key={item} className="px-5 py-3 hover:bg-white/15 text-sm font-medium whitespace-nowrap transition-colors border-r border-blue-800/50 first:border-l">
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Scrolling News Ticker (Classic Indian Gov Site Feature) */}
      <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-900 text-sm font-medium py-2 overflow-hidden whitespace-nowrap relative shadow-inner">
         <div className="container mx-auto flex items-center">
            <span className="bg-ru-accent text-white text-xs font-bold px-2 py-1 rounded ml-4 mr-2 absolute left-0 z-10 shadow-sm flex items-center">
              <Bell size={12} className="mr-1" /> LATEST NEWS
            </span>
            <div className="animate-marquee inline-block">
              <span className="mx-8">• Examination Form Filling for Semester VI (Session 2021-24) starts from 20th Oct 2024</span>
              <span className="mx-8">• <span className="text-red-600 font-bold">NEW:</span> Result of B.Sc Physics Hons Semester IV declared. Check Results section.</span>
              <span className="mx-8">• Download Admit Card for Semester II Vocational Courses</span>
              <span className="mx-8">• University closed on 15th Nov on account of Birsa Munda Jayanti</span>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-10 mt-auto border-t-4 border-ru-accent">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4 text-white">
               <GraduationCap size={24} />
               <span className="font-serif font-bold text-lg">PYQ & NOTES</span>
            </div>
            <p className="mb-4 text-slate-400 leading-relaxed max-w-md">
              A student-led initiative providing a comprehensive archive of Previous Year Question (PYQ) papers, handwritten notes, and syllabus copies for all undergraduate and postgraduate courses under Ranchi University.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-ru-accent transition-colors flex items-center"><span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>Ranchi University Official</a></li>
              <li><a href="#" className="hover:text-ru-accent transition-colors flex items-center"><span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>Examination Department</a></li>
              <li><a href="#" className="hover:text-ru-accent transition-colors flex items-center"><span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>Student Portal</a></li>
              <li><a href="#" className="hover:text-ru-accent transition-colors flex items-center"><span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>Contribute Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact Us</h3>
            <p className="text-slate-400 mb-2">Email: helpdesk@pyqnotes-ru.in</p>
            <p className="text-slate-400">Ranchi, Jharkhand - 834001</p>
            <div className="mt-4 flex space-x-3">
               <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-[#1877F2] hover:text-white cursor-pointer transition-all font-bold">f</div>
               <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white cursor-pointer transition-all font-bold">t</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 pt-6 border-t border-slate-800 text-xs text-slate-600">
          © {new Date().getFullYear()} PYQ & NOTES. All rights reserved. <br/> Disclaimer: This is an educational resource portal and is not officially affiliated with Ranchi University.
        </div>
      </footer>
    </div>
  );
};