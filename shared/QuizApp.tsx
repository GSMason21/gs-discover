import React, { useState, useMemo } from 'react';
import { Question, PersonaProfile, UserData, QuizConfig } from './types';
import {
  ChevronRight, ChevronLeft, Compass, Lightbulb,
  Send, RotateCcw, User, Mail, Briefcase, Building, Loader2
} from 'lucide-react';
import GSLogo from './logo-teal.svg?url';

interface QuizAppProps {
  config: QuizConfig;
  questions: Question[];
  personas: Record<string, PersonaProfile>;
}

const SUBMISSION_ENDPOINT = '/api/submit';

export const QuizApp: React.FC<QuizAppProps> = ({ config, questions, personas }) => {
  const [step, setStep] = useState<'WELCOME' | 'QUIZ' | 'FORM' | 'RESULT'>('WELCOME');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', title: '', organization: '' });

  const handleAnswer = (val: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestionIdx].id]: val }));
    if (currentQuestionIdx < questions.length - 1) setCurrentQuestionIdx(p => p + 1);
  };

  // ── Scoring ────────────────────────────────────────────────────────────────
  const { persona, scores } = useMemo(() => {
    if (config.scoringMode === 'matrix') {
      // 2-axis: count B answers per axis category (e.g. INNOVATION / COHERENCE)
      const axisScores: Record<string, number> = {};
      questions.forEach(q => {
        if (answers[q.id] === 'B') axisScores[q.category] = (axisScores[q.category] || 0) + 1;
      });
      const axes = Object.keys(axisScores);
      const s1 = axisScores[axes[0]] || 0;
      const s2 = axisScores[axes[1]] || 0;
      const max = questions.filter(q => q.category === axes[0]).length;
      // Find matching persona — personas define minScore thresholds on both axes
      const match = Object.values(personas).find(p => {
        const ps = p as any;
        return s1 >= (ps.minScore1 ?? 0) && s2 >= (ps.minScore2 ?? 0);
      }) || Object.values(personas)[0];
      return { persona: match, scores: { s1, s2, max, axes } };
    } else {
      // Profile: count B per category, highest wins
      const tally: Record<string, number> = {};
      questions.forEach(q => {
        if (answers[q.id] === 'B') tally[q.category] = (tally[q.category] || 0) + 1;
      });
      const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
      const key = winner ? winner[0] : Object.keys(personas)[0];
      return { persona: personas[key] || Object.values(personas)[0], scores: null };
    }
  }, [answers, config.scoringMode, questions, personas]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(SUBMISSION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          org: userData.organization,
          persona: persona.name,
          innovationScore: scores?.s1 ?? null,
          coherenceScore:  scores?.s2 ?? null,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Submission failed');
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setIsSubmitting(false);
      setStep('RESULT');
    }
  };

  const reset = () => {
    setAnswers({}); setCurrentQuestionIdx(0);
    setUserData({ name: '', email: '', title: '', organization: '' });
    setStep('WELCOME');
  };

  const Icon = config.scoringMode === 'matrix' ? Compass : Lightbulb;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 py-3 px-6 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <a href="https://www.gettingsmart.com" target="_blank" rel="noopener noreferrer" className="flex items-center">
          <img src={GSLogo} alt="Getting Smart" className="h-8 w-auto" />
        </a>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {step !== 'WELCOME' && (
            <button onClick={reset} className="text-slate-500 hover:text-brand-primary flex items-center gap-1.5 text-sm font-medium transition-colors">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Restart</span>
            </button>
          )}
          <a
            href="https://www.gettingsmart.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-brand-primary border border-slate-200 hover:border-brand-accent rounded-full px-3 py-1.5 transition-all hover:bg-teal-50 whitespace-nowrap"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            GettingSmart.com
          </a>
        </div>
      </header>

      <main className="w-full max-w-3xl px-4 py-8 md:py-16">

        {/* WELCOME */}
        {step === 'WELCOME' && (
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-display text-slate-900 leading-tight">{config.pageTitle}</h1>
              <p className="text-lg text-slate-600 leading-relaxed">{config.pageSubtitle}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-left space-y-6">
              <div className="flex gap-4">
                <div className="bg-brand-accent/10 p-3 rounded-full h-fit">
                  <Icon className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{config.narrativeTitle}</h3>
                  <p className="text-slate-600 mt-1">{config.narrativeBody}</p>
                </div>
              </div>
              <button
                onClick={() => setStep('QUIZ')}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-primary/20"
              >
                Begin Assessment <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {step === 'QUIZ' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>{questions[currentQuestionIdx].category}</span>
                <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-primary transition-all duration-300 ease-out"
                  style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }} />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 min-h-[400px] flex flex-col">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">{questions[currentQuestionIdx].text}</h2>
              <div className="space-y-4 flex-grow">
                {questions[currentQuestionIdx].options.map(opt => (
                  <button key={opt.label} onClick={() => handleAnswer(opt.value)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all group ${
                      answers[questions[currentQuestionIdx].id] === opt.value
                        ? 'border-brand-primary bg-brand-accent/5 ring-4 ring-brand-accent/5'
                        : 'border-slate-100 hover:border-brand-accent/30 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex gap-4">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        answers[questions[currentQuestionIdx].id] === opt.value
                          ? 'bg-brand-primary text-white'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-brand-accent/10 group-hover:text-brand-primary'
                      }`}>{opt.label}</span>
                      <p className={`text-lg font-medium ${answers[questions[currentQuestionIdx].id] === opt.value ? 'text-brand-primary' : 'text-slate-700'}`}>
                        {opt.text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
                <button onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(p => p - 1)}
                  disabled={currentQuestionIdx === 0}
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-600 hover:text-brand-primary disabled:opacity-0 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
                {currentQuestionIdx === questions.length - 1 ? (
                  <button onClick={() => setStep('FORM')}
                    disabled={!answers[questions[currentQuestionIdx].id]}
                    className="flex items-center gap-2 px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg"
                  >
                    Complete Assessment <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button onClick={() => answers[questions[currentQuestionIdx].id] && setCurrentQuestionIdx(p => p + 1)}
                    disabled={!answers[questions[currentQuestionIdx].id]}
                    className="flex items-center gap-2 px-10 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-brand-primary/20"
                  >
                    Next Question <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        {step === 'FORM' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-brand-primary py-8 px-8 text-center text-white">
                <h2 className="text-2xl font-bold">{config.formHeading}</h2>
                <p className="opacity-90 mt-2 text-sm">{config.formSubheading}</p>
              </div>
              <form onSubmit={handleFormSubmit} className="p-8 space-y-5">
                {[
                  { key: 'name',         label: 'Full Name',       type: 'text',  icon: User,     placeholder: 'Jane Doe' },
                  { key: 'email',        label: 'Email Address',   type: 'email', icon: Mail,     placeholder: 'jane@district.org' },
                  { key: 'title',        label: 'Role / Title',    type: 'text',  icon: Briefcase,placeholder: 'Principal / Superintendent' },
                  { key: 'organization', label: 'Organization',    type: 'text',  icon: Building, placeholder: 'School District' },
                ].map(f => (
                  <div key={f.key} className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 block ml-1">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input required type={f.type} placeholder={f.placeholder}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:bg-white outline-none transition-all"
                        value={userData[f.key as keyof UserData]}
                        onChange={e => setUserData(prev => ({ ...prev, [f.key]: e.target.value }))} />
                    </div>
                  </div>
                ))}
                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {isSubmitting
                      ? <><Loader2 className="w-5 h-5 animate-spin" />{config.formLoadingText}</>
                      : <>{config.formCta}<Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                    }
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-tighter">Secure Data Submission Enabled</p>
                </div>
              </form>
            </div>
            {!isSubmitting && (
              <button onClick={() => setStep('QUIZ')}
                className="mt-6 flex items-center gap-2 text-slate-500 font-bold hover:text-brand-primary transition-colors mx-auto"
              >
                <ChevronLeft className="w-5 h-5" /> Review Answers
              </button>
            )}
          </div>
        )}

        {/* RESULT */}
        {step === 'RESULT' && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className={`${persona.color} h-32 w-full relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
              </div>
              <div className="px-8 pb-10 -mt-16 relative">
                <div className="w-32 h-32 bg-white rounded-3xl shadow-lg border-4 border-white flex items-center justify-center mx-auto mb-6">
                  <div className={`${persona.color} w-full h-full rounded-2xl flex items-center justify-center p-6`}>
                    <Compass className="w-full h-full text-white" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em]">Your Persona, {userData.name}</h4>
                  <h1 className="text-4xl md:text-5xl font-display text-slate-900">{persona.name}</h1>
                  <p className="text-slate-500 font-medium italic">{persona.subtitle}</p>
                  <p className="max-w-xl mx-auto text-slate-600 text-lg pt-4">{persona.description}</p>
                </div>
                {/* Matrix scores (only shown in matrix mode) */}
                {config.scoringMode === 'matrix' && scores && config.score1Label && (
                  <div className="mt-10 flex justify-center gap-8 md:gap-16">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">{scores.s1}/{scores.max}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{config.score1Label}</div>
                    </div>
                    <div className="w-px bg-slate-100" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900">{scores.s2}/{scores.max}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{config.score2Label}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileCard title="Core Strengths"          items={persona.strengths}     color="text-emerald-600"   />
              <ProfileCard title="Watch-Outs"              items={persona.weaknesses}    color="text-rose-600"      />
              <ProfileCard title="Strategic Opportunities" items={persona.opportunities} color="text-amber-600"     />
              <ProfileCard title="Key Habits"              items={persona.habits}        color="text-brand-primary" />
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Compass className="w-32 h-32" /></div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg"><ChevronRight className="w-6 h-6" /></div>
                Your Next Steps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {persona.nextSteps.map((s, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-primary transition-all">
                      {i + 1}
                    </span>
                    <p className="text-slate-300 group-hover:text-white transition-colors leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-slate-400 text-sm italic">{config.resultTagline}</p>
                <button onClick={reset} className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" /> Take Again
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full py-8 text-center text-slate-400 text-sm border-t border-slate-100 mt-auto">
        <p>{config.footerText}</p>
      </footer>
    </div>
  );
};

const ProfileCard: React.FC<{ title: string; items: { title: string; text: string }[]; color: string }> = ({ title, items, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
    <h4 className={`font-bold text-lg flex items-center gap-2 ${color}`}>
      <div className={`w-2 h-2 rounded-full ${color.replace('text-', 'bg-')}`} />
      {title}
    </h4>
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i}>
          <p className="font-bold text-slate-800 text-sm">{item.title}</p>
          <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
);
