import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { StudyAssistant } from './components/StudyAssistant';
import { COURSES, SUBJECTS, MOCK_RESOURCES } from './constants';
import { ResourceType, Semester } from './types';
import { FileText, Download, Filter, Search, ChevronRight, AlertCircle, Calendar } from 'lucide-react';

const App: React.FC = () => {
  // State for Filters
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  // Derived Options
  const semesterOptions = Object.values(Semester);
  const subjectOptions = selectedCourse ? SUBJECTS[selectedCourse] || [] : [];

  // Filtering Logic
  const filteredResources = useMemo(() => {
    return MOCK_RESOURCES.filter(resource => {
      const matchCourse = selectedCourse ? resource.course === selectedCourse : true;
      const matchSemester = selectedSemester ? resource.semester === selectedSemester : true;
      const matchSubject = selectedSubject ? resource.subject === selectedSubject : true;
      const matchType = selectedType !== 'ALL' ? resource.type === selectedType : true;
      const matchSearch = searchTerm 
        ? resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return matchCourse && matchSemester && matchSubject && matchSearch && matchType;
    });
  }, [selectedCourse, selectedSemester, selectedSubject, searchTerm, selectedType]);

  return (
    <Layout>
      {/* Page Title & Breadcrumb style */}
      <div className="mb-8 border-b pb-4">
         <h2 className="text-3xl font-bold text-gray-800 font-serif mb-2">Resource Archive</h2>
         <div className="text-sm text-gray-500 flex items-center space-x-2">
            <span>Home</span>
            <ChevronRight size={14}/>
            <span>Downloads</span>
            <ChevronRight size={14}/>
            <span className="text-ru-blue font-semibold">Question Papers & Notes</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar - Filters (CBSE Style) */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-2 mb-4 text-ru-blue border-b pb-2">
              <Filter size={20} />
              <h3 className="font-bold text-lg">Filter Resources</h3>
            </div>
            
            <div className="space-y-4">
              {/* Course Select */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Select Course</label>
                <select 
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-ru-blue focus:border-ru-blue outline-none bg-gray-50"
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setSelectedSubject(''); // Reset subject on course change
                  }}
                >
                  <option value="">-- All Courses --</option>
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Semester Select */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Semester</label>
                <select 
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-ru-blue focus:border-ru-blue outline-none bg-gray-50"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                >
                  <option value="">-- All Semesters --</option>
                  {semesterOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Subject Select (Conditional) */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Subject</label>
                <select 
                  className="w-full border border-gray-300 rounded p-2 text-sm focus:ring-2 focus:ring-ru-blue focus:border-ru-blue outline-none bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={!selectedCourse}
                >
                  <option value="">-- {selectedCourse ? 'All Subjects' : 'Select Course First'} --</option>
                  {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

               {/* Resource Type */}
               <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Resource Type</label>
                <div className="flex flex-col space-y-2">
                   <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rtype" 
                        value="ALL"
                        checked={selectedType === 'ALL'}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="text-ru-blue focus:ring-ru-blue"
                      />
                      <span>All Types</span>
                   </label>
                   <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rtype" 
                        value={ResourceType.QUESTION_PAPER}
                        checked={selectedType === ResourceType.QUESTION_PAPER}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="text-ru-blue focus:ring-ru-blue"
                      />
                      <span>Question Papers</span>
                   </label>
                   <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rtype" 
                        value={ResourceType.NOTES}
                        checked={selectedType === ResourceType.NOTES}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="text-ru-blue focus:ring-ru-blue"
                      />
                      <span>Notes</span>
                   </label>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
                <button 
                  onClick={() => {
                    setSelectedCourse('');
                    setSelectedSemester('');
                    setSelectedSubject('');
                    setSelectedType('ALL');
                    setSearchTerm('');
                  }}
                  className="w-full text-center text-sm text-red-600 hover:text-red-800 font-medium underline"
                >
                  Reset Filters
                </button>
            </div>
          </div>

          {/* Quick Announcement Box */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
             <h4 className="flex items-center font-bold text-yellow-800 mb-2">
               <AlertCircle size={16} className="mr-2" />
               Notice
             </h4>
             <p className="text-xs text-yellow-900 leading-relaxed">
               Sem 5 Exams are scheduled for next month. Check the 'Exam Department' link in footer for the official routine.
             </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-3">
          
          {/* AI Assistant Section */}
          <StudyAssistant 
            course={selectedCourse} 
            semester={selectedSemester} 
            subject={selectedSubject} 
          />

          {/* Search Bar */}
          <div className="flex items-center bg-white border border-gray-300 rounded-md mb-6 p-1 focus-within:ring-2 focus-within:ring-ru-blue focus-within:border-transparent">
             <Search className="text-gray-400 ml-3" size={20} />
             <input 
                type="text" 
                placeholder="Search by title, subject or year..." 
                className="flex-grow p-3 outline-none text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          {/* Results Table - CBSE Table Style */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
               <h3 className="font-bold text-gray-700">Search Results</h3>
               <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{filteredResources.length} items found</span>
            </div>

            {filteredResources.length === 0 ? (
               <div className="p-12 text-center text-gray-500">
                  <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No resources found matching your criteria.</p>
                  <p className="text-sm mt-2">Try adjusting filters or checking the "All Resources" tab.</p>
               </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                      <th className="px-6 py-4 font-semibold w-12">#</th>
                      <th className="px-6 py-4 font-semibold">Title & Subject</th>
                      <th className="px-6 py-4 font-semibold">Details</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredResources.map((resource, index) => (
                      <tr key={resource.id} className="hover:bg-blue-50 even:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 text-gray-500 text-sm font-mono">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                             <div className={`mt-1 p-1.5 rounded text-white ${resource.type === ResourceType.QUESTION_PAPER ? 'bg-red-500' : 'bg-green-600'}`}>
                                <FileText size={16} />
                             </div>
                             <div>
                               <p className="font-semibold text-gray-800 group-hover:text-ru-blue transition-colors">{resource.title}</p>
                               <p className="text-xs text-gray-500 mt-1">{resource.subject} • {resource.course}</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col text-xs text-gray-500 space-y-1">
                              <span className="flex items-center">
                                 <span className="font-medium text-gray-700 w-16">Semester:</span> 
                                 {resource.semester}
                              </span>
                              <span className="flex items-center">
                                 <span className="font-medium text-gray-700 w-16">Year:</span> 
                                 {resource.year}
                              </span>
                              <span className="flex items-center">
                                 <span className="font-medium text-gray-700 w-16">Added:</span> 
                                 <span className="flex items-center">
                                    <Calendar size={10} className="mr-1"/>
                                    {resource.dateAdded}
                                 </span>
                              </span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a 
                            href={resource.downloadUrl}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-ru-blue hover:text-white hover:border-ru-blue text-sm font-medium text-gray-700 transition-all shadow-sm"
                            onClick={(e) => {
                                e.preventDefault();
                                alert("Downloading file: " + resource.title + "\n(This is a demo, no actual file hosted)");
                            }}
                          >
                            <Download size={16} />
                            <span>Download</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Pagination Mockup */}
            {filteredResources.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-sm text-gray-600">
                    <div>Showing 1 to {filteredResources.length} of {filteredResources.length} entries</div>
                    <div className="flex space-x-1">
                        <button className="px-3 py-1 border rounded bg-white disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 border rounded bg-ru-blue text-white">1</button>
                        <button className="px-3 py-1 border rounded bg-white disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;