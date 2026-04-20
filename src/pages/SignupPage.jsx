import { motion } from 'framer-motion';
import SignupForm from '../components/auth/SignupForm';
import { APP_NAME } from '../utils/constants';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 animated-gradient relative items-center justify-center p-12">
        <div className="relative z-10 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-black">S</span>
            </div>
            <h2 className="text-3xl font-bold mb-3">Join {APP_NAME}</h2>
            <p className="text-white/80 text-lg">Start organizing your studies today</p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-surface-950">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-surface-900 dark:text-white">{APP_NAME}</span>
            </Link>
            <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Create your account</h1>
            <p className="text-surface-500 mt-1">Join thousands of students on StudyVault</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
