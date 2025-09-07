import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { type AlgorithmKey, getAlgorithm } from '../algorithms/registry';
import { getAlgorithmIcon } from '../utils/algorithmIcons';
import { Footer } from './Footer';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LandingPage() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Function to scroll to top when navigating
  const handleNavigation = () => {
    // Temporarily disable smooth scrolling for immediate effect
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Multiple scroll methods to ensure it works
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Restore smooth scrolling after navigation
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Optional: Add scroll-based interactions here
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // All algorithms organized by categories
  const algorithmCategories = [
    {
      name: 'Basic Algorithms',
      description: 'Perfect for learning fundamental sorting concepts',
      algorithms: ['bubble-sort', 'insertion-sort', 'selection-sort', 'gnome-sort'] as AlgorithmKey[],
      color: 'from-orange-600 to-red-600',
      icon: '📖'
    },
    {
      name: 'Efficient Algorithms',
      description: 'Optimal performance for large datasets',
      algorithms: ['quick-sort', 'merge-sort', 'heap-sort', 'introsort', 'tim-sort'] as AlgorithmKey[],
      color: 'from-blue-600 to-purple-600',
      icon: '💨'
    },
    {
      name: 'Specialized Algorithms',
      description: 'Optimized for specific data types and patterns',
      algorithms: ['counting-sort', 'radix-sort', 'bucket-sort', 'bitonic-sort'] as AlgorithmKey[],
      color: 'from-green-600 to-teal-600',
      icon: '🔬'
    },
    {
      name: 'Advanced & Experimental',
      description: 'Unique properties and specialized behaviors',
      algorithms: ['shell-sort', 'cocktail-sort', 'comb-sort', 'cycle-sort', 'pancake-sort', 'odd-even-sort'] as AlgorithmKey[],
      color: 'from-purple-600 to-pink-600',
      icon: '🧪'
    },
    {
      name: 'Educational & Novelty',
      description: 'For educational purposes and demonstration',
      algorithms: ['bogo-sort', 'stooge-sort'] as AlgorithmKey[],
      color: 'from-yellow-600 to-orange-600',
      icon: '🎪'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
        style={{ y: heroY, opacity: heroOpacity }}
        data-section="0"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold mb-6 text-white">
              SortViz
            </h1>
          </motion.div>
          
          <motion.h2
            className="text-2xl md:text-4xl font-light text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Interactive Sorting Algorithm Visualizer
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Master the art of sorting algorithms through interactive visualization and comprehensive analysis
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Platform
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-24 px-6" data-section="1">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              About SortViz
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold mb-6 text-slate-200">
                Educational Excellence
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                SortViz is a comprehensive educational platform designed to demystify sorting algorithms through 
                interactive visualization. Our mission is to transform complex algorithmic concepts into intuitive, 
                visual experiences that enhance understanding and retention.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Whether you're a computer science student, educator, or professional developer, SortViz provides 
                the tools and insights needed to master sorting algorithms from fundamental concepts to advanced 
                optimization techniques.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-300">Step-by-step visual execution</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-300">Comprehensive complexity analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">✓</span>
                  </div>
                  <span className="text-slate-300">Multiple implementation examples</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-600 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-600 rounded animate-pulse delay-100"></div>
                    <div className="h-4 bg-slate-600 rounded animate-pulse delay-200"></div>
                    <div className="h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* All Algorithms Section */}
      <section className="py-24 px-6 bg-slate-800/50" data-section="2">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              All Sorting Algorithms
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our complete collection of 21 sorting algorithms, each with interactive visualization and detailed analysis
            </p>
          </motion.div>

          <motion.div
            className="space-y-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {algorithmCategories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeInUp}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-200">
                      {category.name}
                    </h3>
                    <p className="text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.algorithms.map((algorithmKey) => (
                    <Link
                      key={algorithmKey}
                      to={`/visualize/${algorithmKey}`}
                      onClick={handleNavigation}
                      className="group relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-6 hover:border-orange-500/60 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                    >
                      {/* Background gradient animation */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/5 transition-all duration-500 rounded-2xl"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-lg">
                          {getAlgorithmIcon(algorithmKey)}
                        </div>
                        <div className="text-sm font-semibold text-amber-100 group-hover:text-orange-200 transition-colors duration-300 leading-tight">
                          {getAlgorithm(algorithmKey).name}
                        </div>
                      </div>

                      {/* Subtle shine effect */}
                      <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16 p-8 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-bold text-amber-100 mb-4">Ready to Start Learning?</h4>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Choose any algorithm above to begin your interactive learning journey. Each visualization includes step-by-step execution, complexity analysis, and implementation examples.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/comparison"
                onClick={handleNavigation}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
              >
                Compare All Algorithms
              </Link>
              <Link 
                to="/glossary"
                onClick={handleNavigation}
                className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg transition-colors"
              >
                Browse Technical Glossary
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-24 px-6" data-section="3">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Learning Resources
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive tools and references to deepen your understanding
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="group bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-700/50 hover:border-purple-600 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-200">
                Algorithm Comparison
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Compare performance characteristics, time and space complexity, and real-world applications 
                across all sorting algorithms in our comprehensive comparison table.
              </p>
              <Link
                to="/comparison"
                onClick={handleNavigation}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                View Comparison
                <span>→</span>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="group bg-gradient-to-br from-green-900/50 to-teal-900/50 rounded-2xl p-8 border border-green-700/50 hover:border-green-600 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-200">
                Technical Glossary
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Master the terminology with our comprehensive glossary of computer science and 
                algorithm-specific terms, complete with clear definitions and examples.
              </p>
              <Link
                to="/glossary"
                onClick={handleNavigation}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Browse Glossary
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
