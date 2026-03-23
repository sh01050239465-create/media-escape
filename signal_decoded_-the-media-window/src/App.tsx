/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Settings, 
  Radar, 
  Play, 
  Bolt, 
  ArrowLeft, 
  Target, 
  Eye, 
  Users, 
  Terminal as TerminalIcon,
  BadgeCheck,
  Shield,
  Palette,
  Microscope,
  Video,
  MessagesSquare,
  Info,
  Send,
  RotateCcw
} from 'lucide-react';
import { cn } from './lib/utils';
import { SCENES, Scene, Team } from './constants';

export default function App() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  const [participants, setParticipants] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team>('Guardians');

  const [feedback, setFeedback] = useState('');

  // Index mapping:
  // 0: Intro (SCENES[0])
  // 1: Registration
  // 2-11: Missions (SCENES[1-10])
  // 12: Result (SCENES[11])
  const currentScene = currentSceneIndex === 1 
    ? { id: 'registration', title: '참가자 등록', avatar: '시스템', background: '', script: '참가자 명단을 입력해주세요.' } as Scene
    : currentSceneIndex >= 2 && currentSceneIndex <= 11
    ? SCENES[currentSceneIndex - 1]
    : SCENES[currentSceneIndex === 12 ? 11 : currentSceneIndex];

  const handleNext = () => {
    const maxIndex = 12; // Intro + Reg + 10 Missions + Result
    if (currentSceneIndex < maxIndex) {
      setCurrentSceneIndex(prev => prev + 1);
      setUserInput('');
      setIsCorrect(false);
      setFeedback('');
    }
  };

  const handleBack = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
      setFeedback('');
    }
  };

  const handleSubmit = (choice?: string) => {
    if (currentSceneIndex === 1) {
      // Registration logic
      const list = userInput.split(/,|\n/).map(n => n.trim()).filter(n => n.length > 0);
      if (list.length === 0) {
        setFeedback('최소 한 명 이상의 이름을 입력해주세요.');
        return;
      }
      setParticipants(list);
      handleNext();
      return;
    }

    const scene = currentSceneIndex >= 2 && currentSceneIndex <= 11 
      ? SCENES[currentSceneIndex - 1] 
      : null;
    
    if (!scene || !scene.answer) return;
    
    if (scene.answer === 'CHOICE' && choice) {
      // Map choice to team
      const teamMap: Record<string, Team> = {
        'A': 'FactCheckers',
        'B': 'Communicators',
        'C': 'Creatives',
        'D': 'Producers'
      };
      setSelectedTeam(teamMap[choice] || 'Guardians');
      setIsCorrect(true);
      setFeedback('성향 분석 완료. 마지막 단계로 이동합니다.');
      setTimeout(() => {
        handleNext();
      }, 1500);
      return;
    }

    const input = userInput.trim().toLowerCase().replace(/\s/g, '');
    const target = scene.answer.toLowerCase().replace(/\s/g, '');
    
    // Robust check: allow Korean answer, English equivalent, or exact match
    let isMatch = input === target;
    
    // Special cases for specific questions
    if (target === '프레임') {
      isMatch = isMatch || input === 'frame' || input === 'vmfpdla';
    } else if (target === '미디어리터러시') {
      isMatch = isMatch || input === 'medialiteracy' || input === 'aleldfjxjffjtl';
    } else if (target === '디지털네이티브') {
      isMatch = isMatch || input === 'digitalnative' || input === 'elwltjfsdpdlxlqm';
    } else if (target === '가짜뉴스') {
      isMatch = isMatch || input === 'fakenews' || input === 'rkWksptm';
    } else if (target === '비판적사고') {
      isMatch = isMatch || input === 'criticalthinking' || input === 'qlpkswjrtkrh';
    } else if (target === '안목') {
      isMatch = isMatch || input === '생각' || input === 'insight' || input === 'dksshr' || input === 'sodrk';
    } else if (target === '창문') {
      isMatch = isMatch || input === 'window' || input === 'ckdans';
    } else if (target === '관점') {
      isMatch = isMatch || input === 'perspective' || input === 'viewpoint' || input === 'rhswja';
    } else if (target === '민주시민') {
      isMatch = isMatch || input === 'citizen' || input === 'alswnshals';
    } else if (target === '6시간') {
      isMatch = isMatch || input === '6' || input === '6hour' || input === '6hours' || input === '6tlrks';
    }

    if (isMatch) {
      setIsCorrect(true);
      setFeedback('SIGNAL VERIFIED. ACCESS GRANTED.');
      setTimeout(() => {
        handleNext();
      }, 1500);
    } else {
      setFeedback(scene.errorHint || 'ACCESS DENIED. INVALID DECRYPTION KEY.');
      // Auto-clear feedback after a while
      setTimeout(() => {
        setFeedback(prev => (prev === scene.errorHint || prev === 'ACCESS DENIED. INVALID DECRYPTION KEY.') ? '' : prev);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary selection:text-on-primary overflow-x-hidden">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-primary/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Radio className="text-primary w-6 h-6" />
          <h1 className="font-headline font-bold tracking-tighter text-xl text-primary uppercase">
            SIGNAL_DECODED
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            {[...Array(13)].map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-500",
                  idx === currentSceneIndex ? "bg-primary w-6" : idx < currentSceneIndex ? "bg-primary/40" : "bg-outline/20"
                )} 
              />
            ))}
          </div>
          <button className="text-outline hover:text-primary transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          {currentSceneIndex === 0 ? (
            <IntroScene key="intro" onStart={handleNext} />
          ) : currentSceneIndex === 1 ? (
            <RegistrationScene 
              key="registration"
              userInput={userInput}
              setUserInput={setUserInput}
              onSubmit={() => handleSubmit()}
              onBack={handleBack}
              feedback={feedback}
            />
          ) : currentSceneIndex === 12 ? (
            <ResultScene key="result" team={selectedTeam} participants={participants} />
          ) : (
            <MissionScene 
              key={`mission-${currentSceneIndex}`}
              scene={currentScene}
              userInput={userInput}
              setUserInput={setUserInput}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isCorrect={isCorrect}
              feedback={feedback}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface/90 backdrop-blur-lg border-t border-primary/10 h-20 flex justify-around items-center">
        <NavButton 
          active={activeTab === 'mission'} 
          onClick={() => setActiveTab('mission')}
          icon={<Target className="w-5 h-5" />}
          label="MISSION"
        />
        <NavButton 
          active={activeTab === 'intel'} 
          onClick={() => setActiveTab('intel')}
          icon={<Eye className="w-5 h-5" />}
          label="INTEL"
        />
        <NavButton 
          active={activeTab === 'team'} 
          onClick={() => setActiveTab('team')}
          icon={<Users className="w-5 h-5" />}
          label="TEAM"
        />
        <NavButton 
          active={activeTab === 'terminal'} 
          onClick={() => setActiveTab('terminal')}
          icon={<TerminalIcon className="w-5 h-5" />}
          label="TERMINAL"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 transition-all duration-300 px-4 h-full border-t-2",
        active ? "text-primary border-primary bg-primary/5" : "text-outline border-transparent hover:text-primary/60"
      )}
    >
      {icon}
      <span className="font-headline text-[10px] tracking-widest uppercase">{label}</span>
    </button>
  );
}

function IntroScene({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex-grow flex flex-col items-center justify-center text-center px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
        <img 
          src="https://picsum.photos/seed/cyber/1920/1080?blur=4" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* HUD Brackets */}
      <div className="absolute inset-10 pointer-events-none opacity-30 z-20">
        <div className="hud-bracket top-0 left-0 border-t-2 border-l-2" />
        <div className="hud-bracket top-0 right-0 border-t-2 border-r-2" />
        <div className="hud-bracket bottom-0 left-0 border-b-2 border-l-2" />
        <div className="hud-bracket bottom-0 right-0 border-b-2 border-r-2" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 shadow-[0_0_10px_#81ecff] scan-line" />
      </div>

      <div className="relative z-30 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 bg-surface px-3 py-1 border-l-2 border-primary">
          <Radar className="w-4 h-4 text-primary" />
          <span className="font-headline text-[10px] tracking-[0.2em] text-primary uppercase">ESTABLISHING CONNECTION...</span>
        </div>

        <h2 className="font-headline font-bold text-5xl md:text-8xl tracking-tighter leading-none mb-6 italic glitch-text">
          SIGNAL DECODED:<br />
          <span className="text-primary">THE MEDIA WINDOW</span>
        </h2>

        <p className="font-sans text-outline text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">
          미디어라는 창문의 비밀을 풀고 당신의 팀을 찾으세요!
        </p>

        <button 
          onClick={onStart}
          className="group relative bg-primary hover:bg-primary-container text-on-primary font-headline font-bold tracking-widest text-lg px-12 py-5 transition-all duration-300 shadow-[0_0_20px_rgba(129,236,255,0.4)]"
        >
          <span className="relative z-10">START DECODING</span>
          <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-primary-container" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-primary-container" />
        </button>
      </div>
    </motion.div>
  );
}

function MissionScene({ scene, userInput, setUserInput, onSubmit, onBack, isCorrect, feedback }: { 
  scene: Scene, 
  userInput: string, 
  setUserInput: (v: string) => void, 
  onSubmit: (choice?: string) => void,
  onBack: () => void,
  isCorrect: boolean,
  feedback: string
}) {
  if (!scene) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCorrect) {
      onSubmit();
    }
  };

  const isChoiceType = scene.answer === 'CHOICE';

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex-grow flex flex-col px-6 py-8 max-w-6xl mx-auto w-full"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="px-3 py-1 bg-surface border-l-2 border-primary">
          <span className="font-headline text-xs tracking-widest text-primary uppercase">MISSION: {scene.id.toUpperCase()}</span>
        </div>
        <div className="h-[1px] flex-grow bg-outline/20" />
        <div className="text-xs font-headline text-outline uppercase tracking-tighter">STATUS: IN_PROGRESS</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Video Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative bg-surface p-1 border border-outline/10 group">
            <div className="hud-bracket top-0 left-0 border-t-2 border-l-2 -translate-x-1 -translate-y-1" />
            <div className="hud-bracket top-0 right-0 border-t-2 border-r-2 translate-x-1 -translate-y-1" />
            <div className="hud-bracket bottom-0 left-0 border-b-2 border-l-2 -translate-x-1 translate-y-1" />
            <div className="hud-bracket bottom-0 right-0 border-b-2 border-r-2 translate-x-1 translate-y-1" />
            
            <div className="aspect-video bg-black flex items-center justify-center relative overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src={scene.videoUrl || "https://www.youtube.com/embed/Cr0Uv3btEmo"} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
              {!isCorrect && scene.timestamp && (
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 border-b border-primary pointer-events-none z-10">
                  <span className="font-headline text-sm text-primary tracking-widest uppercase">TIMECODE: {scene.timestamp}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-surface/50 border-l-2 border-primary">
            <Info className="w-5 h-5 text-primary mt-1" />
            <div>
              <h3 className="font-headline text-primary uppercase text-xs tracking-widest mb-1">Decryption Hint</h3>
              <p className="text-outline text-sm leading-relaxed">
                {scene.hint}
              </p>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="mb-8">
            <span className="font-headline text-[10px] text-secondary tracking-[0.3em] uppercase block mb-2">Transmission Inquiry</span>
            <h2 className="font-headline text-3xl font-bold leading-tight tracking-tight">
              {scene.question}
            </h2>
          </div>

          <div className="space-y-8">
            {!isChoiceType ? (
              <div className="relative">
                <label className="font-headline text-[10px] text-outline uppercase tracking-widest block mb-4">Input Decoded Signal</label>
                <input 
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="ENTER ANSWER..."
                  className="w-full bg-transparent border-0 border-b-2 border-outline/30 focus:border-primary focus:ring-0 text-2xl font-headline tracking-widest p-0 pb-4 placeholder:text-outline/20 transition-all text-primary"
                />
                {feedback && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "absolute top-full mt-2 text-[10px] font-headline tracking-widest uppercase",
                      isCorrect ? "text-emerald-400" : "text-tertiary"
                    )}
                  >
                    {feedback}
                  </motion.p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {['A', 'B', 'C', 'D'].map((choice) => (
                  <button
                    key={choice}
                    onClick={() => onSubmit(choice)}
                    className="w-full p-4 bg-surface border border-primary/20 text-left hover:bg-primary/10 hover:border-primary transition-all group flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center font-headline text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                      {choice}
                    </div>
                    <span className="font-headline text-sm tracking-wide">
                      {choice === 'A' && '사실 확인 (팩트체크)'}
                      {choice === 'B' && '댓글 확인 (소통)'}
                      {choice === 'C' && '공유하기 (확산)'}
                      {choice === 'D' && '내용 요약 (생산)'}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {!isChoiceType && (
                <button 
                  onClick={() => onSubmit()}
                  disabled={isCorrect}
                  className={cn(
                    "w-full py-5 font-headline font-bold tracking-[0.2em] flex items-center justify-center gap-3 transition-all",
                    isCorrect ? "bg-emerald-500 text-white" : "bg-primary text-on-primary hover:brightness-110",
                    "disabled:cursor-default"
                  )}
                >
                  {isCorrect ? <BadgeCheck className="w-6 h-6" /> : <Bolt className="w-5 h-5" />}
                  {isCorrect ? "SIGNAL VERIFIED" : "SUBMIT SIGNAL"}
                </button>
              )}
              <button 
                onClick={onBack}
                className="w-full bg-surface-variant/40 border border-primary/20 text-white font-headline font-medium py-4 tracking-widest flex items-center justify-center gap-2 hover:bg-surface-variant transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RegistrationScene({ userInput, setUserInput, onSubmit, onBack, feedback }: { 
  userInput: string, 
  setUserInput: (v: string) => void, 
  onSubmit: () => void,
  onBack: () => void,
  feedback: string
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      onSubmit();
    }
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="flex-grow flex flex-col px-6 py-8 max-w-4xl mx-auto w-full"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="px-3 py-1 bg-surface border-l-2 border-primary">
          <span className="font-headline text-xs tracking-widest text-primary uppercase">REGISTRATION</span>
        </div>
        <div className="h-[1px] flex-grow bg-outline/20" />
      </div>

      <div className="bg-surface p-8 border border-primary/10 relative">
        <div className="hud-bracket top-0 left-0 border-t-2 border-l-2" />
        <div className="hud-bracket top-0 right-0 border-t-2 border-r-2" />
        <div className="hud-bracket bottom-0 left-0 border-b-2 border-l-2" />
        <div className="hud-bracket bottom-0 right-0 border-b-2 border-r-2" />

        <h2 className="font-headline text-3xl font-bold mb-6 text-primary uppercase tracking-tight">참가자 명단 입력</h2>
        <p className="text-outline mb-8 text-sm leading-relaxed">
          참가자들의 이름을 쉼표(,) 또는 줄바꿈으로 구분하여 입력해주세요.<br />
          <span className="text-secondary font-bold">'선생님'</span>이 포함된 이름은 조 편성에서 자동으로 제외됩니다.
        </p>

        <textarea 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="홍길동, 김철수, 이영희, 박선생님..."
          className="w-full h-48 bg-background/50 border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary text-xl font-sans p-4 placeholder:text-outline/20 transition-all text-white mb-2 resize-none"
        />

        <div className="flex justify-between items-center mb-6 px-1">
          <span className="text-[10px] font-headline text-outline uppercase tracking-widest">
            Detected: {userInput.split(/,|\n/).map(n => n.trim()).filter(n => n.length > 0).length} Participants
          </span>
          <span className="text-[10px] font-headline text-secondary uppercase tracking-widest">
            Excluding '선생님' in final grouping
          </span>
        </div>

        {feedback && (
          <p className="text-tertiary text-xs font-headline tracking-widest uppercase mb-4">{feedback}</p>
        )}

        <div className="flex flex-col gap-4">
          <button 
            onClick={onSubmit}
            className="w-full py-5 bg-primary text-on-primary font-headline font-bold tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 transition-all"
          >
            <Send className="w-5 h-5" />
            REGISTER PARTICIPANTS
          </button>
          <button 
            onClick={onBack}
            className="w-full bg-surface-variant/40 border border-primary/20 text-white font-headline font-medium py-4 tracking-widest flex items-center justify-center gap-2 hover:bg-surface-variant transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ResultScene({ team, participants }: { team: Team, participants: string[] }) {
  const [groups, setGroups] = useState<string[][]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Filter out "선생님"
    const students = participants.filter(name => !name.includes('선생님'));
    
    if (students.length === 0) {
      setGroups([]);
      return;
    }

    const n = students.length;
    let bestX = -1, bestY = -1;
    
    // Try to find combination of 4 and 5 that fits n
    // 4x + 5y = n
    for (let y = Math.floor(n / 5); y >= 0; y--) {
      const remaining = n - (5 * y);
      if (remaining % 4 === 0) {
        bestY = y;
        bestX = remaining / 4;
        break;
      }
    }

    const shuffled = [...students].sort(() => Math.random() - 0.5);
    const newGroups: string[][] = [];
    let current = 0;

    if (bestX !== -1) {
      for (let i = 0; i < bestY; i++) {
        newGroups.push(shuffled.slice(current, current + 5));
        current += 5;
      }
      for (let i = 0; i < bestX; i++) {
        newGroups.push(shuffled.slice(current, current + 4));
        current += 4;
      }
    } else {
      // Fallback for n < 8 or n = 11
      if (n <= 7) {
        newGroups.push(shuffled);
      } else if (n === 11) {
        newGroups.push(shuffled.slice(0, 6));
        newGroups.push(shuffled.slice(6));
      } else {
        // General fallback: chunk by 4 or 5
        const size = n >= 10 ? 5 : 4;
        for (let i = 0; i < n; i += size) {
          const chunk = shuffled.slice(i, i + size);
          if (chunk.length > 0) newGroups.push(chunk);
        }
        // If last group is too small (e.g. 1 or 2), merge it with the previous group
        if (newGroups.length > 1 && newGroups[newGroups.length - 1].length < 3) {
          const last = newGroups.pop()!;
          newGroups[newGroups.length - 1] = [...newGroups[newGroups.length - 1], ...last];
        }
      }
    }
    setGroups(newGroups);
  }, [participants]);

  const handleCopyGroups = () => {
    const text = groups.map((g, i) => `[조 ${i + 1}] ${g.join(', ')}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const teamInfo = {
    Guardians: {
      name: '가디언즈팀',
      eng: 'GUARDIANS',
      icon: <Shield className="w-16 h-16 text-primary" />,
      desc: '가디언즈팀은 디지털 정글 속에서 진실의 빛을 밝히는 파수꾼입니다. 여러분은 쏟아지는 정보 속에서 가짜 뉴스를 필터링하고, 데이터의 근거를 추적하여 사회의 미디어 문해력을 수호하는 핵심 임무를 맡게 됩니다.'
    },
    FactCheckers: {
      name: '팩트체크팀',
      eng: 'FACT CHECKERS',
      icon: <Microscope className="w-16 h-16 text-primary" />,
      desc: '팩트체크팀은 정보의 진위 여부를 가려내는 정밀 분석가들입니다. 논리적인 사고와 철저한 검증을 통해 허위 정보를 차단하고 사회에 올바른 사실을 전달하는 역할을 수행합니다.'
    },
    Producers: {
      name: '프로듀서팀',
      eng: 'PRODUCERS',
      icon: <Video className="w-16 h-16 text-primary" />,
      desc: '프로듀서팀은 새로운 가치를 창조하는 미디어 생산자들입니다. 비판적 시각을 바탕으로 유익하고 창의적인 콘텐츠를 기획하고 제작하여 긍정적인 메시지를 확산시킵니다.'
    },
    Creatives: {
      name: '크리에이티브팀',
      eng: 'CREATIVES',
      icon: <Palette className="w-16 h-16 text-primary" />,
      desc: '크리에이티브팀은 미디어를 통해 세상을 아름답고 다채롭게 표현하는 예술가들입니다. 독창적인 아이디어와 표현력으로 복잡한 정보를 이해하기 쉽고 매력적으로 전달합니다.'
    },
    Communicators: {
      name: '커뮤니케이터팀',
      eng: 'COMMUNICATORS',
      icon: <MessagesSquare className="w-16 h-16 text-primary" />,
      desc: '커뮤니케이터팀은 미디어를 통해 사람과 사람을 잇는 가교 역할을 합니다. 책임감 있는 소통과 공감을 바탕으로 건강한 디지털 커뮤니티를 형성하고 이끌어갑니다.'
    }
  };

  const info = teamInfo[team];
  const endingScene = SCENES[11];

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex-grow flex flex-col items-center px-6 py-12 max-w-6xl mx-auto w-full text-center"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-2 h-2 bg-primary animate-pulse" />
        <p className="font-headline text-primary uppercase tracking-[0.3em] text-xs">Transmission Received</p>
      </div>

      <h1 className="font-headline font-bold text-4xl md:text-6xl uppercase tracking-tighter mb-6 glitch-text">
        MISSION COMPLETE
      </h1>

      <div className="max-w-3xl mx-auto mb-12 p-6 bg-primary/5 border-y border-primary/20 italic text-outline text-lg leading-relaxed">
        "{endingScene.script}"
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left: User's Team Info */}
        <div className="lg:col-span-5 relative bg-surface p-8 border border-primary/10 h-fit">
          <div className="hud-bracket top-0 left-0 border-t-2 border-l-2" />
          <div className="hud-bracket top-0 right-0 border-t-2 border-r-2" />
          <div className="hud-bracket bottom-0 left-0 border-b-2 border-l-2" />
          <div className="hud-bracket bottom-0 right-0 border-b-2 border-r-2" />

          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/10 animate-pulse rounded-full" />
            <div className="flex items-center justify-center h-full">
              {info.icon}
            </div>
          </div>

          <h2 className="font-headline font-extrabold text-3xl uppercase tracking-tight mb-2">
            {info.name}
          </h2>
          <p className="font-headline text-primary uppercase tracking-widest text-xs mb-6 font-bold">
            {info.eng}
          </p>

          <div className="pt-6 border-t border-outline/10 text-left">
            <p className="text-outline leading-relaxed text-sm">
              {info.desc}
            </p>
          </div>
        </div>

        {/* Right: Random Groups */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-surface p-6 border border-primary/10 text-left relative">
            <div className="hud-bracket top-0 left-0 border-t-2 border-l-2 opacity-30" />
            <div className="hud-bracket bottom-0 right-0 border-b-2 border-r-2 opacity-30" />
            
            <h3 className="font-headline text-secondary text-xs uppercase tracking-[0.2em] mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Final Group Assignments (4-5 Persons)
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleCopyGroups}
                  className="text-[10px] text-primary hover:text-white transition-colors flex items-center gap-1"
                >
                  {copied ? 'COPIED!' : 'COPY LIST'}
                </button>
                <button 
                  onClick={() => window.print()}
                  className="text-[10px] text-primary hover:text-white transition-colors flex items-center gap-1"
                >
                  PRINT
                </button>
              </div>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-primary/30 bg-primary/5">
                    <th className="py-3 px-4 text-left font-headline text-primary text-[10px] tracking-widest uppercase border-r border-primary/10 w-24">Group</th>
                    <th className="py-3 px-4 text-left font-headline text-primary text-[10px] tracking-widest uppercase">Members</th>
                    <th className="py-3 px-4 text-right font-headline text-primary text-[10px] tracking-widest uppercase w-20">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group, idx) => (
                    <tr key={idx} className="border-b border-outline/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 border-r border-primary/10">
                        <span className="font-headline text-secondary text-xs font-bold">조 {String(idx + 1).padStart(2, '0')}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {group.map((name, nIdx) => (
                            <span key={nIdx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium border border-primary/20">
                              {name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-[10px] text-outline font-mono">{group.length}</span>
                      </td>
                    </tr>
                  ))}
                  {groups.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-outline text-sm italic">참가자 데이터가 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-outline/10 flex justify-between items-center">
              <div className="text-[10px] text-outline uppercase tracking-widest">
                Total Students: {participants.filter(n => !n.includes('선생님')).length}
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="text-primary hover:text-white transition-colors flex items-center gap-2 text-[10px] font-headline tracking-widest uppercase"
              >
                <RotateCcw className="w-3 h-3" />
                RESET MISSION
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TeamNode({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <li className={cn(
      "flex items-center justify-between p-3 border-l-2 transition-all",
      active ? "border-primary bg-primary/10 text-primary" : "border-outline/20 bg-background/40 text-outline opacity-60"
    )}>
      <span className="font-headline text-xs uppercase">{label}</span>
      {icon}
    </li>
  );
}
