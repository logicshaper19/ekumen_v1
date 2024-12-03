import { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { documents } from '../../data/executionData';
import DocumentStats from './DocumentStats';
import DocumentList from './DocumentList';
import AIChat from './AIChat';
import { Database, FileText, Cloud } from 'lucide-react';

const cloudProviders = [
  { 
    id: 'gdrive', 
    name: 'Google Drive', 
    connected: false,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
        <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
        <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
        <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
        <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
        <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
        <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
      </svg>
    )
  },
  { 
    id: 'onedrive', 
    name: 'OneDrive', 
    connected: true,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 9.528c-.082.425-.125.86-.125 1.303 0 .298.022.587.063.87.148-.194.32-.373.512-.533.036-.03.075-.054.112-.082.235-.183.489-.337.759-.455.052-.023.106-.04.159-.059.267-.097.545-.165.834-.195.052-.006.104-.008.156-.011.32-.02.645.005.97.076-.105-.796-.04-1.484.123-2.152-.293-.089-.599-.139-.916-.139-1.684 0-3.068 1.241-3.315 2.856l.668-1.479zm6.438-1.125c1.972 0 3.567 1.595 3.567 3.567v.444c.196-.02.394-.032.595-.032.167 0 .33.009.492.024v-.436c0-2.57-2.084-4.654-4.654-4.654-.662 0-1.29.138-1.859.387.254.945.347 1.952.03 3.024.585-.214 1.22-.324 1.83-.324zm9.294 4.849c-.017-.189-.045-.376-.084-.558-.1-.473-.278-.916-.518-1.312-.421-.696-1.04-1.255-1.776-1.572-.532-.23-1.116-.357-1.73-.357-1.097 0-2.093.41-2.841 1.082-.412.37-.748.82-.984 1.327-.159-.097-.329-.179-.506-.245-.344-.128-.714-.198-1.099-.198-.348 0-.682.057-.995.162-.569.19-1.064.52-1.436.944-.173.197-.32.417-.442.652-.027.053-.049.108-.073.162-.074.17-.135.345-.182.527-.019.072-.036.144-.05.217-.032.175-.052.353-.052.535 0 .09.006.178.014.267.012.126.033.249.061.37.023.1.053.197.085.293.038.112.081.221.13.327.041.088.087.172.135.255.057.099.119.195.186.286.056.076.116.149.178.22.074.084.153.164.235.24.069.064.141.125.215.184.087.068.178.132.272.191.08.05.162.097.246.141.097.051.197.097.3.139.087.035.175.067.265.096.104.033.21.061.319.085.093.02.186.037.281.051.108.016.217.027.329.034.095.006.189.01.285.01h9.05c.099 0 .196-.005.292-.012.112-.008.221-.021.329-.039.093-.016.185-.034.275-.057.104-.026.205-.057.304-.092.087-.031.172-.065.256-.102.097-.043.191-.091.283-.143.08-.045.158-.093.234-.144.089-.06.175-.124.258-.193.072-.06.142-.122.209-.187.079-.077.154-.158.226-.243.061-.072.119-.146.174-.223.064-.089.124-.182.179-.278.047-.082.091-.165.132-.251.048-.103.089-.209.127-.318.032-.094.061-.188.085-.285.028-.113.049-.229.063-.346.01-.083.016-.166.018-.25.001-.023.003-.045.003-.068 0-.016-.002-.032-.002-.048z"/>
      </svg>
    )
  },
  { 
    id: 'dropbox', 
    name: 'Dropbox', 
    connected: false,
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L0 6L6 10L12 6L6 2M18 2L12 6L18 10L24 6L18 2M12 11L6 15L12 19L18 15L12 11M0 16L6 20L12 16L6 12L0 16M24 16L18 12L12 16L18 20L24 16Z"/>
      </svg>
    )
  }
];

export default function ExecutionDashboard() {
  const [activeTab, setActiveTab] = useState<'my-docs' | 'shared' | 'audit'>('my-docs');
  const { t } = useTranslation();

  const getTabDescription = () => {
    switch (activeTab) {
      case 'my-docs':
        return t.myData.description.myDocs;
      case 'shared':
        return t.myData.description.shared;
      case 'audit':
        return t.myData.description.audit;
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.myData.title}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {getTabDescription()}
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800">
            <Cloud className="h-4 w-4 mr-2" />
            {t.myData.uploadStorage}
          </button>
        </div>
      </div>

      {/* Cloud Storage Status */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-sm font-medium text-gray-900 mb-4">{t.myData.connectedStorage}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cloudProviders.map((provider) => (
            <div key={provider.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {provider.icon}
                <span className="text-sm text-gray-600">{provider.name}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                provider.connected 
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {provider.connected ? t.common.status.active : t.common.status.inactive}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Document Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('my-docs')}
              className={`${
                activeTab === 'my-docs'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileText className="h-4 w-4 mr-2" />
              {t.myData.tabs.myDocs}
            </button>
            <button
              onClick={() => setActiveTab('shared')}
              className={`${
                activeTab === 'shared'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Database className="h-4 w-4 mr-2" />
              {t.myData.tabs.shared}
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`${
                activeTab === 'audit'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileText className="h-4 w-4 mr-2" />
              {t.myData.tabs.audit}
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            {activeTab === 'my-docs' && (
              <p className="text-sm text-gray-600">
                Upload and manage your private farm documents. Connect cloud storage to sync files automatically.
              </p>
            )}
            {activeTab === 'shared' && (
              <p className="text-sm text-gray-600">
                Access documents shared between you and your farming partners. Updates sync automatically.
              </p>
            )}
            {activeTab === 'audit' && (
              <p className="text-sm text-gray-600">
                Store and manage official reports, certifications, and compliance documents.
              </p>
            )}
          </div>
          
          {/* Document Statistics */}
          <DocumentStats />
          
          {/* Document List */}
          <DocumentList documents={documents} />
        </div>

        {/* AI Chat Interface */}
        <div className="lg:col-span-1">
          <AIChat />
        </div>
      </div>
    </div>
  );
}