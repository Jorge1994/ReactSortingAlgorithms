import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type AlgorithmKey } from '../algorithms/registry';
import { algorithmInfoRegistry } from '../algorithms/infoRegistry';
import { AlgorithmDetails } from './AlgorithmDetailsDark';
import { Footer } from './Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function AlgorithmDetailsPage() {
  const { algorithm } = useParams<{ algorithm: string }>();
  
  if (!algorithm || !(algorithm in algorithmInfoRegistry)) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Algorithm Not Found</h1>
          <p className="text-slate-400 mb-8">The requested algorithm could not be found.</p>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const algorithmKey = algorithm as AlgorithmKey;
  const algorithmInfo = algorithmInfoRegistry[algorithmKey];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="relative py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-red-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
              >
                ← Back to Home
              </Link>
              
              <Link
                to={`/visualize/${algorithmKey}`}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Visualize Algorithm
              </Link>
            </div>
            
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text text-transparent">
                {algorithmInfo.name}
              </h1>
              
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive analysis and implementation details for {algorithmInfo.name.toLowerCase()}
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Algorithm Details */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <AlgorithmDetails algorithmInfo={algorithmInfo} isExpanded={true} />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
