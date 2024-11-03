import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { PapersList } from './components/PapersList';
import { LoadingPulse } from './components/LoadingPulse';

interface Paper {
  title: string;
  author: string;
  year: number;
  abstract: string;
  keywords: string[];
  doi: string;
}

interface WebhookResponse {
  papers: Paper[];
}

function App() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    setPapers([]);
    try {
      const response = await fetch('https://hook.eu1.make.com/9h9c7j8vwak2zrou66xkko4vq9nmraff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      const data: WebhookResponse = await response.json();
      setPapers(data.papers);
      setStatus('success');
      setFeedback('Papers retrieved successfully!');
      setMessage('');
      
      setTimeout(() => {
        setStatus('idle');
        setFeedback('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setFeedback('Failed to retrieve papers. Please try again.');
      setPapers([]);
      
      setTimeout(() => {
        setStatus('idle');
        setFeedback('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="max-w-md mx-auto mb-12">
          <form 
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Research Paper Generator</h1>
              <p className="text-gray-600 mt-2">Enter your topic to generate relevant papers</p>
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700"
              >
                Paper Generator
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors min-h-[120px] resize-none"
                placeholder="Type your search query here..."
                disabled={status === 'loading'}
              />
            </div>

            {feedback && (
              <div className={`text-sm ${
                status === 'success' ? 'text-green-600' : 'text-red-600'
              } text-center`}>
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={!message.trim() || status === 'loading'}
              className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all
                ${message.trim() && status !== 'loading'
                  ? 'bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-[0.98]'
                  : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Generate Papers
                </>
              )}
            </button>
          </form>
        </div>

        {status === 'loading' && <LoadingPulse />}

        {papers.length > 0 && status !== 'loading' && (
          <div className="mt-8">
            <PapersList papers={papers} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;