
import React, { useState, useMemo } from 'react';
import { QUESTIONS, PERSONAS } from './constants';
import { PersonaType, PersonaProfile, UserData } from './types';
import { ChevronRight, ChevronLeft, Map, Compass, Send, RotateCcw, User, Mail, Briefcase, Building, Loader2 } from 'lucide-react';

/**
 * GOOGLE APPS SCRIPT EXAMPLE:
 * 
 * function doPost(e) {
 *   // 1. LockService prevents data collision
 *   var lock = LockService.getScriptLock();
 *   lock.tryLock(10000);
 * 
 *   try {
 *     // 2. Open the specific sheet
 *     var ss = SpreadsheetApp.openById('1Txo2elpDWBzv75k2eAWcxppiZmc3rCGXaEAcIXsLs5Q');
 *     var sheet = ss.getSheetByName('Sheet1');
 * 
 *     // 3. Parse the incoming JSON data
 *     var data = JSON.parse(e.postData.contents);
 * 
 *     // 4. Append the row
 *     sheet.appendRow([
 *       new Date(),
 *       data.name,
 *       data.email,
 *       data.title,
 *       data.organization,
 *       data.innovationScore,
 *       data.coherenceScore,
 *       data.persona
 *     ]);
 * 
 *     return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } finally {
 *     lock.releaseLock();
 *   }
 * }
 */
const SUBMISSION_ENDPOINT = '/api/submit';

const App: React.FC = () => {
  const [step, setStep] = useState<'WELCOME' | 'QUIZ' | 'FORM' | 'RESULT'>('WELCOME');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    title: '',
    organization: ''
  });

  const handleStart = () => {
    setStep('QUIZ');
  };

  const handleAnswer = (val: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestionIdx].id]: val }));
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (answers[QUESTIONS[currentQuestionIdx].id]) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const goToForm = () => {
    setStep('FORM');
  };

  const scores = useMemo(() => {
    let innovation = 0;
    let coherence = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === 'B') {
        if (q.category === 'INNOVATION') innovation++;
        if (q.category === 'COHERENCE') coherence++;
      }
    });
    return { innovation, coherence };
  }, [answers]);

  const persona: PersonaProfile = useMemo(() => {
    const { innovation: inn, coherence: coh } = scores;
    
    if (inn === 5 && coh === 5) return PERSONAS.WAYFINDER;
    if (inn >= 2 && inn <= 3 && coh >= 4) return PERSONAS.SURVEYOR;
    if (inn >= 4 && coh >= 2 && coh <= 3) return PERSONAS.SCOUT;
    if (inn >= 2 && inn <= 4 && coh <= 2) return PERSONAS.TRAILBLAZER;
    if (inn <= 2 && coh >= 4) return PERSONAS.SENTRY;
    if (inn <= 2 && coh <= 2) return PERSONAS.DRIFTER;

    if (inn >= 3) {
      return coh >= 3 ? PERSONAS.WAYFINDER : PERSONAS.SCOUT;
    } else {
      return coh >= 3 ? PERSONAS.SURVEYOR : PERSONAS.DRIFTER;
    }
  }, [scores]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...userData,
      innovationScore: scores.innovation,
      coherenceScore: scores.coherence,
      persona: persona.name,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }
      
      const result = await response.json();
      console.log('Submission successful:', result);
    } catch (error) {
      console.error('Submission failed:', error);
      // We still move to the result page for UX, but log the error
    } finally {
      setIsSubmitting(false);
      setStep('RESULT');
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIdx(0);
    setUserData({ name: '', email: '', title: '', organization: '' });
    setStep('WELCOME');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-brand-primary p-1.5 rounded-lg">
            <Compass className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">Wayfinding Explorer</span>
        </div>
        {step !== 'WELCOME' && (
          <button 
            onClick={resetQuiz}
            className="text-slate-500 hover:text-brand-primary flex items-center gap-1.5 text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </button>
        )}
      </header>

      <main className="w-full max-w-3xl px-4 py-8 md:py-16">
        {step === 'WELCOME' && (
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display text-slate-900 leading-tight">
                Navigating What’s Next: <br/><span className="text-brand-primary">Discover Your Persona</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Move from "accumulation without alignment" toward a coherent, future-ready system. 
                Identify your current explorer persona to better align your purpose and outcomes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left space-y-6">
              <div className="flex gap-4">
                <div className="bg-brand-accent/10 p-3 rounded-full h-fit">
                  <Map className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">The Narrative: The Fog</h3>
                  <p className="text-slate-600 mt-1">
                    For generations, the educational path was well-worn. Today, a thick fog of complexity has settled. Wayfinding is the moment a team pulls out a new compass to read the terrain.
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <button 
                  onClick={handleStart}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-primary/20"
                >
                  Start Your Journey
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'QUIZ' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>{QUESTIONS[currentQuestionIdx].category}</span>
                <span>Question {currentQuestionIdx + 1} of {QUESTIONS.length}</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-primary transition-all duration-300 ease-out"
                  style={{ width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 min-h-[400px] flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                {QUESTIONS[currentQuestionIdx].text}
              </h2>

              <div className="space-y-4 flex-grow">
                {QUESTIONS[currentQuestionIdx].options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all group relative ${
                      answers[QUESTIONS[currentQuestionIdx].id] === option.value
                        ? 'border-brand-primary bg-brand-accent/5 ring-4 ring-brand-accent/5'
                        : 'border-slate-100 hover:border-brand-accent/30 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        answers[QUESTIONS[currentQuestionIdx].id] === option.value
                          ? 'bg-brand-primary text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-brand-accent/10 group-hover:text-brand-primary'
                      }`}>
                        {option.label}
                      </span>
                      <p className={`text-lg font-medium ${
                        answers[QUESTIONS[currentQuestionIdx].id] === option.value
                          ? 'text-brand-primary'
                          : 'text-slate-700'
                      }`}>
                        {option.text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIdx === 0}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-600 hover:text-brand-primary disabled:opacity-0 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                {currentQuestionIdx === QUESTIONS.length - 1 ? (
                  <button
                    onClick={goToForm}
                    disabled={!answers[QUESTIONS[currentQuestionIdx].id]}
                    className="flex items-center gap-2 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-50"
                  >
                    Complete Quiz
                    <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={!answers[QUESTIONS[currentQuestionIdx].id]}
                    className="flex items-center gap-2 px-10 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-brand-primary/20"
                  >
                    Next Question
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 'FORM' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-brand-primary py-8 px-8 text-center text-white">
                <h2 className="text-2xl font-bold">Great progress!</h2>
                <p className="opacity-90 mt-2 text-sm">Where should we send your detailed Innovation Persona report?</p>
              </div>
              <form onSubmit={handleFormSubmit} className="p-8 space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 block ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:bg-white outline-none transition-all"
                      value={userData.name}
                      onChange={e => setUserData(prev => ({...prev, name: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700 block ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required
                      type="email"
                      placeholder="jane@organization.com"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:bg-white outline-none transition-all"
                      value={userData.email}
                      onChange={e => setUserData(prev => ({...prev, email: e.target.value}))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 block ml-1">Professional Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="Principal / Director"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:bg-white outline-none transition-all"
                        value={userData.title}
                        onChange={e => setUserData(prev => ({...prev, title: e.target.value}))}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 block ml-1">Organization</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        required
                        type="text"
                        placeholder="Unified District 01"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:bg-white outline-none transition-all"
                        value={userData.organization}
                        onChange={e => setUserData(prev => ({...prev, organization: e.target.value}))}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Results...
                      </>
                    ) : (
                      <>
                        Discover My Persona
                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-tighter">
                    Secure Data Submission Enabled
                  </p>
                </div>
              </form>
            </div>
            {!isSubmitting && (
              <button 
                onClick={() => setStep('QUIZ')}
                className="mt-6 flex items-center gap-2 text-slate-500 font-bold hover:text-brand-primary transition-colors mx-auto"
              >
                <ChevronLeft className="w-5 h-5" />
                Review Answers
              </button>
            )}
          </div>
        )}

        {step === 'RESULT' && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className={`${persona.color} h-32 w-full relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
              </div>
              <div className="px-8 pb-10 -mt-16 relative">
                <div className="w-32 h-32 bg-white rounded-3xl shadow-lg border-4 border-white flex items-center justify-center mx-auto mb-6">
                  <div className={`${persona.color} w-full h-full rounded-2xl flex items-center justify-center p-6`}>
                    <Compass className="w-full h-full text-white" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em]">Congratulations, {userData.name}!</h4>
                  <h1 className="text-4xl md:text-5xl font-display text-slate-900">{persona.name}</h1>
                  <p className="text-slate-500 font-medium italic">{persona.subtitle}</p>
                  <p className="max-w-xl mx-auto text-slate-600 text-lg pt-4">
                    {persona.description}
                  </p>
                </div>

                <div className="mt-10 flex justify-center gap-8 md:gap-16">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">{scores.innovation}/5</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Innovation Depth</div>
                  </div>
                  <div className="w-px bg-slate-100"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">{scores.coherence}/5</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">System Coherence</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard title="Core Strengths" items={persona.strengths} color="text-emerald-600" bg="bg-emerald-50" />
              <ProfileCard title="Potential Weaknesses" items={persona.weaknesses} color="text-rose-600" bg="bg-rose-50" />
              <ProfileCard title="Strategic Opportunities" items={persona.opportunities} color="text-amber-600" bg="bg-amber-50" />
              <ProfileCard title="Daily Habits" items={persona.habits} color="text-brand-primary" bg="bg-brand-accent/10" />
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Compass className="w-32 h-32" />
               </div>
               <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <div className="bg-white/10 p-2 rounded-lg">
                    <ChevronRight className="w-6 h-6" />
                 </div>
                 Your Journey Forward: Next Steps
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {persona.nextSteps.map((step, idx) => (
                   <div key={idx} className="flex gap-4 group">
                     <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all">
                       {idx + 1}
                     </span>
                     <p className="text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                       {step}
                     </p>
                   </div>
                 ))}
               </div>
               <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <p className="text-slate-400 text-sm italic">
                    Wayfinding is a process, not a destination.
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Take Quiz Again
                  </button>
               </div>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-sm border-t border-slate-100 mt-auto">
        <p>© {new Date().getFullYear()} Wayfinding Explorer Quiz. Based on "Navigating What’s Next".</p>
      </footer>
    </div>
  );
};

interface ProfileCardProps {
  title: string;
  items: { title: string; text: string }[];
  color: string;
  bg: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, items, color, bg }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
    <h4 className={`font-bold text-lg flex items-center gap-2 ${color}`}>
      <div className={`w-2 h-2 rounded-full ${color.replace('text', 'bg')}`}></div>
      {title}
    </h4>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="group">
          <p className="font-bold text-slate-800 text-sm group-hover:text-brand-primary transition-colors">{item.title}</p>
          <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default App;
