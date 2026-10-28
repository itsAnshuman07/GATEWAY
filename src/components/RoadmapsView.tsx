import React, { useState } from 'react';
import { ROADMAP_SECTIONS, ALL_FREE_BOOKS } from '../data/roadmapsAndResources.ts';
import { RoadmapTopic, ExamType, FreeBook } from '../types/index.ts';
import { useStudy } from '../context/StudyContext.tsx';
import {
  CheckCircle,
  Play,
  Book,
  Download,
  ExternalLink,
  Clock,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Layers,
  ChevronDown,
  X,
  FileText,
  Search,
  BookOpen,
  Filter,
  ArrowDownToLine,
  Copy,
  Check,
} from 'lucide-react';

interface RoadmapsViewProps {
  onStartPracticeQuestion?: (topicTitle: string) => void;
}

export const RoadmapsView: React.FC<RoadmapsViewProps> = ({ onStartPracticeQuestion }) => {
  const {
    targetExam,
    setTargetExam,
    isTopicCompleted,
    toggleTopicCompletion,
    isBookmarked,
    toggleBookmark,
  } = useStudy();

  const [activeTab, setActiveTab] = useState<'roadmap' | 'books_library'>('roadmap');

  const [activeSectionId, setActiveSectionId] = useState<string>(() => {
    const match = ROADMAP_SECTIONS.find((s) => s.examTarget === targetExam);
    return match ? match.id : ROADMAP_SECTIONS[0].id;
  });

  const [activeVideoModal, setActiveVideoModal] = useState<{
    title: string;
    channel: string;
    youtubeId: string;
    url: string;
    duration?: string;
  } | null>(null);

  // In-App Book Reader & PDF Preview Modal
  const [activeBookModal, setActiveBookModal] = useState<FreeBook | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Books Library Search & Filter
  const [bookSearchQuery, setBookSearchQuery] = useState<string>('');
  const [bookSubjectFilter, setBookSubjectFilter] = useState<string>('All');

  const currentSection = ROADMAP_SECTIONS.find((s) => s.id === activeSectionId) || ROADMAP_SECTIONS[0];
  const totalTopics = currentSection.topics.length;
  const completedTopicsCount = currentSection.topics.filter((t) => isTopicCompleted(t.id)).length;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  const handleCopyPdfLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredBooks = ALL_FREE_BOOKS.filter((b) => {
    const matchesSubject = bookSubjectFilter === 'All' || b.subject.toLowerCase().includes(bookSubjectFilter.toLowerCase());
    const matchesSearch =
      b.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      b.subject.toLowerCase().includes(bookSearchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const distinctBookSubjects = Array.from(new Set(ALL_FREE_BOOKS.map((b) => b.subject)));

  return (
    <div className="space-y-6">
      {/* Top Header Strip with Mode Switch */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Structured Roadmap & Free Books Library
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Guaranteed direct PDF books, chapter summaries, and topic-wise curated YouTube lectures.
            </p>
          </div>

          {/* Sub Navigation: Roadmaps vs Books Library */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'roadmap'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Syllabus Roadmaps</span>
            </button>
            <button
              onClick={() => setActiveTab('books_library')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'books_library'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Book className="w-3.5 h-3.5" />
              <span>Free PDF Books ({ALL_FREE_BOOKS.length})</span>
            </button>
          </div>
        </div>

        {activeTab === 'roadmap' && (
          <div className="pt-2 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Select Syllabus:</span>
              <div className="flex flex-wrap gap-1.5">
                {ROADMAP_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSectionId(sec.id);
                      setTargetExam(sec.examTarget);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeSectionId === sec.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {sec.examTarget === 'CODING_DSA' && 'DSA & Coding'}
                    {sec.examTarget === 'GATE_CS' && 'GATE CS & IT'}
                    {sec.examTarget === 'NTPC_EXAM' && 'NTPC Engineering'}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Progress Counter */}
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span>
                Completed <span className="text-white font-bold tabular-nums">{completedTopicsCount}</span>/{totalTopics} topics ({progressPercent}%)
              </span>
              <div className="w-28 bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VIEW 1: ROADMAP TIMELINE */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          {currentSection.topics.map((topic, index) => {
            const completed = isTopicCompleted(topic.id);
            const bookmarked = isBookmarked(topic.id);

            return (
              <div
                key={topic.id}
                className={`bg-slate-800/90 rounded-2xl border transition-all p-6 space-y-6 ${
                  completed ? 'border-emerald-700/60' : 'border-slate-700/80'
                }`}
              >
                {/* Topic Heading Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700/70">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-700/60 flex items-center justify-center font-bold text-indigo-300 text-xs shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span>{topic.title}</span>
                        {completed && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                      </h3>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span className="text-xs text-slate-400 flex items-center gap-1 mr-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{topic.estimatedHours}h</span>
                    </span>

                    <button
                      onClick={() => toggleTopicCompletion(topic.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        completed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{completed ? 'Completed (+40 XP)' : 'Mark Complete'}</span>
                    </button>

                    <button
                      onClick={() => toggleBookmark(topic.id)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        bookmarked
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-300'
                          : 'border-slate-700 text-slate-400 hover:text-white'
                      }`}
                      title="Bookmark topic"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-indigo-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Core Syllabus Concepts */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Core Syllabus Concepts
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {topic.keyConcepts.map((concept, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curated YouTube Video Lectures */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-rose-400" />
                      <span>Curated YouTube Video Lectures</span>
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {topic.youtubeLectures.length} recommended lectures
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {topic.youtubeLectures.map((lec, lIdx) => (
                      <div
                        key={lIdx}
                        className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-medium text-indigo-300">{lec.channel}</span>
                            <span className="tabular-nums font-mono">{lec.duration}</span>
                          </div>
                          <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                            {lec.title}
                          </h5>
                        </div>

                        <div className="pt-3 flex items-center gap-2">
                          <button
                            onClick={() => setActiveVideoModal(lec)}
                            className="w-full py-1.5 px-3 rounded-lg bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Play className="w-3 h-3 fill-white" />
                            <span>Watch Lecture</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Free Textbooks & Direct PDF Links */}
                <div className="space-y-3 pt-2 border-t border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Book className="w-3.5 h-3.5 text-amber-400" />
                      <span>Free Standard Books (Direct PDF & Chapter Notes)</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topic.freeBooks.map((book) => (
                      <div
                        key={book.id}
                        className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-xs font-bold text-white truncate">{book.title}</h5>
                            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono shrink-0">
                              Direct PDF
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">By {book.author}</p>
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {book.description}
                          </p>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-1 font-mono">
                            <span>{book.pageCount} pages</span>
                            <span aria-hidden="true">·</span>
                            <span>{book.fileSize}</span>
                            <span aria-hidden="true">·</span>
                            <span className="text-indigo-400">{book.chapters.length} chapters mapped</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                          <button
                            onClick={() => setActiveBookModal(book)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Read In-App Notes</span>
                          </button>

                          <a
                            href={book.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <ArrowDownToLine className="w-3.5 h-3.5" />
                            <span>Direct PDF</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Bank Link */}
                <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span className="text-slate-300">
                      Topic Question Bank: <span className="font-bold text-white tabular-nums">{topic.questionBankCount}+ verified questions</span> available
                    </span>
                  </div>
                  {onStartPracticeQuestion && (
                    <button
                      onClick={() => onStartPracticeQuestion(topic.title)}
                      className="px-3 py-1 text-xs font-semibold text-indigo-300 hover:text-white hover:underline transition-colors shrink-0"
                    >
                      Practice Questions →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: COMPLETE FREE BOOKS & DIRECT PDF LIBRARY */}
      {activeTab === 'books_library' && (
        <div className="space-y-6">
          {/* Library Search & Filter Bar */}
          <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full md:w-96 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search books by title, author, topic..."
                value={bookSearchQuery}
                onChange={(e) => setBookSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Subject:</span>
              <select
                value={bookSubjectFilter}
                onChange={(e) => setBookSubjectFilter(e.target.value)}
                className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="All">All Subjects</option>
                {distinctBookSubjects.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="bg-slate-800/90 rounded-2xl border border-slate-700/80 p-5 flex flex-col justify-between space-y-4 hover:border-slate-600 transition-all shadow-md group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-400 truncate max-w-[180px]">
                      {book.subject}
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                      100% Free PDF
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-slate-400">By {book.author}</p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                    <span>{book.pageCount} pages</span>
                    <span aria-hidden="true">·</span>
                    <span>{book.fileSize}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400">{book.chapters.length} chapters</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60 flex items-center gap-2">
                  <button
                    onClick={() => setActiveBookModal(book)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Read In-App</span>
                  </button>

                  <a
                    href={book.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IN-APP INTERACTIVE BOOK & CHAPTER READER MODAL */}
      {activeBookModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 bg-slate-800 border-b border-slate-700 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-indigo-400 font-semibold">{activeBookModal.subject}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-xs text-emerald-400 font-mono font-bold">Guaranteed Direct PDF</span>
                </div>
                <h3 className="text-lg font-bold text-white">{activeBookModal.title}</h3>
                <p className="text-xs text-slate-300">By {activeBookModal.author} · {activeBookModal.pageCount} Pages ({activeBookModal.fileSize})</p>
              </div>

              <button
                onClick={() => setActiveBookModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Chapter Outlines and Direct Links */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
              {/* Direct PDF Download Action Card */}
              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <ArrowDownToLine className="w-4 h-4 text-emerald-400" />
                    <span>Direct Official PDF Document</span>
                  </span>
                  <p className="text-[11px] text-slate-300 font-mono break-all">
                    {activeBookModal.pdfUrl}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopyPdfLink(activeBookModal.pdfUrl)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={activeBookModal.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Open & Download PDF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Book Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Book Overview</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeBookModal.description}</p>
              </div>

              {/* Chapter-by-Chapter Syllabus Outline */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Chapter Notes & Syllabus Coverage
                </h4>

                <div className="space-y-2.5">
                  {activeBookModal.chapters.map((ch) => (
                    <div
                      key={ch.chapterNumber}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">
                          Chapter {ch.chapterNumber}: {ch.title}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{ch.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Free open education resource</span>
              <button
                onClick={() => setActiveBookModal(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition-colors"
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YOUTUBE EMBEDDED VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-700 max-w-3xl w-full overflow-hidden shadow-2xl space-y-3">
            <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
              <div className="space-y-0.5 max-w-lg truncate">
                <h3 className="text-sm font-bold text-white truncate">{activeVideoModal.title}</h3>
                <p className="text-xs text-slate-400">{activeVideoModal.channel} {activeVideoModal.duration ? `· ${activeVideoModal.duration}` : ''}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              <div className="aspect-video w-full bg-black rounded-xl overflow-hidden relative">
                {activeVideoModal.youtubeId && !activeVideoModal.youtubeId.includes('_') ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                    title={activeVideoModal.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-950">
                    <Play className="w-12 h-12 text-rose-500" />
                    <p className="text-sm font-semibold text-white">{activeVideoModal.title}</p>
                    <p className="text-xs text-slate-400">Open directly on YouTube for high-definition playback.</p>
                    <a
                      href={activeVideoModal.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="px-4 pb-4 flex justify-end">
              <a
                href={activeVideoModal.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Open in external tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
