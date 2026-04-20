import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineChartBar, HiOutlineArrowRight } from 'react-icons/hi';
import ThemeToggle from '../components/ui/ThemeToggle';
import { APP_NAME } from '../utils/constants';

const features = [
  { icon: HiOutlineBookOpen, title: 'Resource Library', desc: 'Organize PDFs, notes, videos, and links by subject and topic. Rate and tag everything.' },
  { icon: HiOutlineLightBulb, title: 'AI Quiz Generator', desc: 'Paste your notes and instantly generate practice quizzes with our built-in NLP engine.' },
  { icon: HiOutlineUserGroup, title: 'Study Groups', desc: 'Create groups, share resources, and collaborate with classmates in real time.' },
  { icon: HiOutlineChartBar, title: 'Analytics Dashboard', desc: 'Track study hours, quiz scores, and progress with beautiful charts and insights.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-surface-950/80 backdrop-blur-xl border-b border-surface-200/50 dark:border-surface-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-lg text-surface-900 dark:text-white">{APP_NAME}</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/login" className="text-sm font-medium text-surface-600 dark:text-surface-300 hover:text-primary-600 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white gradient-bg rounded-xl hover:opacity-90 transition-opacity shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animated-gradient opacity-10 blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-full mb-6">
              ✨ AI-Powered Study Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-surface-900 dark:text-white leading-tight mb-6">
              Study Smarter with{' '}
              <span className="gradient-text">StudyVault</span>
            </h1>
            <p className="text-lg sm:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Organize your study resources, generate AI-powered quizzes from your notes, collaborate in study groups, and track your progress — all in one beautiful platform.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white gradient-bg rounded-2xl hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
              Start for Free <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-surface-700 dark:text-surface-300 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors shadow-sm">
              I have an account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-surface-100/50 dark:bg-surface-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-3">Everything you need to ace your exams</h2>
            <p className="text-surface-500 dark:text-surface-400">Powerful features designed for serious students</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover ring-1 ring-surface-200 dark:ring-surface-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100 mb-2">{f.title}</h3>
                <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-surface-200 dark:border-surface-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-surface-400">
          <span>© 2026 {APP_NAME}. Built as an academic project.</span>
          <span>React + Tailwind + Firebase</span>
        </div>
      </footer>
    </div>
  );
}
