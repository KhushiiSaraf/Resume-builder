import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { motion,useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import CountUp from "react-countup"

export default function Landing() {
  const { user } = useAuth();

  //motion values for report preview hover effect
const cardRef = useRef(null)
const x = useMotionValue(0)
const y = useMotionValue(0)

const rotateX = useTransform(y, [-100, 100], [8, -8])
const rotateY = useTransform(x, [-100, 100], [-8, 8])

// add spring smoothing
const springConfig = { stiffness: 150, damping: 20 }
const rotateXSpring = useSpring(rotateX, springConfig)
const rotateYSpring = useSpring(rotateY, springConfig)

const handleMouseMove = (e) => {
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
}

const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
}


  const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0
  }
};

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 flex flex-col">
      <nav className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur">
        <Link to="/" className="text-lg font-bold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          ResuMatch
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 transition-all duration-150 active:scale-95">
                Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-400 hover:text-white transition active:scale-95">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-150 active:scale-95 active:shadow-[0_0_18px_rgba(99,102,241,0.35)]">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* hero section */}
      <main className="flex flex-col items-center justify-center text-center flex-1 px-4 py-16">
        <p className="text-indigo-300 uppercase tracking-[0.25em] text-xs mb-4">AI interview prep</p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 bg-linear-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">
          Ace your next interview with AI
        </h1>

        <p className="text-gray-400 max-w-2xl mb-8 text-base md:text-lg px-2">
          Get AI-powered insights, identify areas for improvement, and prepare more effectively for your next opportunity.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all duration-150 active:scale-95 active:brightness-90 shadow-[0_0_18px_rgba(99,102,241,0.25)]"
            >
              Continue to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium 
                  hover:shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all duration-150 active:scale-95 active:shadow-[0_0_18px_rgba(99,102,241,0.35)]"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="
                px-6 py-3
                rounded-xl
                border border-white/10
                bg-white/5

                transition-all duration-200

                hover:bg-white/10
                hover:border-white/20
                hover:-translate-y-px

                active:scale-95
                active:bg-white/15"
                >
                Login
              </Link>
            </>
          )}
        </div>
      </main>
      {/* how it works */}
      <section className="max-w-6xl mx-auto px-4 py-24">

        <h2 className="text-3xl font-bold text-center text-white mb-14">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Step 1 */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
              y: -8,
              scale: 1.02
            }}
            viewport={{
              amount: 0.3,
              once: true
            }}
            className="
              relative
              bg-white/5 border border-white/10 rounded-2xl p-6
              hover:border-indigo-400/30 
              "
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="
                w-10 h-10 shrink-0 rounded-full
                bg-linear-to-r from-indigo-500 to-purple-500
                flex items-center justify-center
                text-white text-sm font-bold 
              "
              >
                01
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                Upload Your Profile
              </h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Upload your resume or provide a short description about your background and skills.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
              y: -8,
              scale: 1.02
            }}
            viewport={{
              amount: 0.3,
              once: true
            }}
            className="
              relative
              bg-white/5 border border-white/10 rounded-2xl p-6
              hover:border-indigo-400/30
            "
          >
            <div className="flex items-center gap-3 mb-4">
            <div
              className="
                w-10 h-10 shrink-0 rounded-full
                bg-linear-to-r from-indigo-500 to-purple-500
                flex items-center justify-center
                text-white text-sm font-bold 
              "
            >
              02
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              AI Analysis
            </h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Our AI compares your profile against the target role and identifies important skill gaps.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
              y: -8,
              scale: 1.02
            }}
            viewport={{
              amount: 0.3,
              once: true
            }}
  
            className="
            relative
            bg-white/5 border border-white/10 rounded-2xl p-6
            hover:border-indigo-400/30
          "
          >
            <div className="flex items-center gap-3 mb-4">
            <div
              className="
                w-10 h-10 shrink-0 rounded-full
                bg-linear-to-r from-indigo-500 to-purple-500
                flex items-center justify-center
                text-white text-sm font-bold 
              "
            >
              03
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Get Your Plan
            </h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Receive tailored interview questions, preparation tasks, and actionable recommendations.
            </p>
          </motion.div>

        </div>

      </section>
      {/* what you get */}
      <section className="max-w-6xl mx-auto px-4 pb-24">

        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <motion.div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-400/30"
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            ease: "easeOut"
          }} viewport={{once:true}}>

            <h3 className="text-lg font-semibold mb-3 text-white">
              Technical Questions
            </h3>

            <p className="text-gray-400 text-sm">
              Practice questions tailored specifically to your target role.
            </p>
          </motion.div>

          <motion.div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-400/30"
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            ease: "easeOut"
          }} viewport={{once:true}}>

            <h3 className="text-lg font-semibold mb-3 text-white ">
              Skill Gap Analysis
            </h3>

            <p className="text-gray-400 text-sm">
              Discover which skills need improvement before your interview.
            </p>
          </motion.div>

          <motion.div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-400/30"
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0
          }}

          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          viewport={{once:true}}>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Preparation Plan
            </h3>

            <p className="text-gray-400 text-sm">
              Follow a personalized roadmap built around your profile.
            </p>
          </motion.div>

        </div>

      </section>
      {/* report preview */}
      <section className="max-w-5xl mx-auto px-4 pb-24">

        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Preview Your Report
        </h2>

        <motion.div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3, once: true }}
          transition={{ duration: 0.6 }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        style={{
              rotateX: rotateXSpring,
              rotateY: rotateYSpring,
              transformPerspective: 1000,
          }}>

          <div className="flex flex-col md:flex-row gap-6">

            {/* Left */}
            <div className="flex-1">

              <motion.h3 className="text-xl font-semibold text-white mb-4"  initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }} viewport={{once:true}}>

                Full Stack Developer
              </motion.h3>

              <motion.div className="space-y-3"  variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3, once: true }}>

                <motion.div className="p-3 bg-white/5 rounded-lg" variants={itemVariants}>
                  Explain React hooks and their use cases.
                </motion.div>

                <motion.div className="p-3 bg-white/5 rounded-lg" variants={itemVariants}>
                  Difference between SQL and NoSQL databases.
                </motion.div>

                <motion.div className="p-3 bg-white/5 rounded-lg" variants={itemVariants}>
                  Explain async/await in JavaScript.
                </motion.div>

              </motion.div>
            </div>

            {/* Right */}
            <div className="w-full md:w-72 space-y-4">

              <motion.div className="bg-white/5 rounded-xl p-4 border border-white/10 "  initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ amount: 0.3, once: true }}
              transition={{ duration: 0.5 }}>
                <p className="text-gray-400 text-sm mb-2">
                  Match Score
                </p>

                <p className="text-3xl font-bold text-indigo-300">
              <CountUp
                start={0}
                end={82}
                duration={2}
                enableScrollSpy
                scrollSpyOnce={true}
              />
              %
                </p>
              </motion.div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-gray-300 mb-3">
                  Skill Gaps
                </p>

                <motion.div className="space-y-2" variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ amount: 0.3, once: true }}>
                  <motion.div className="border border-yellow-400/40 rounded-lg px-3 py-2 text-sm" variants={itemVariants}>
                    System Design
                  </motion.div>

                  <motion.div className="border border-green-400/40 rounded-lg px-3 py-2 text-sm" variants={itemVariants}>
                    Testing
                  </motion.div>

                  <motion.div className="border border-red-400/40 rounded-lg px-3 py-2 text-sm" variants={itemVariants}>
                    Data Structures
                  </motion.div>
                </motion.div>
              </div>

            </div>

          </div>

        </motion.div>

      </section>
      {/* call to action */}
      <section className="text-center px-4 pb-24">

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Prepare Smarter?
        </h2>

        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Generate your personalized interview roadmap in minutes.
        </p>

        {!user && (
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all duration-150 active:scale-95 active:shadow-[0_0_18px_rgba(99,102,241,0.35)]"
          >
            Get Started Free
          </Link>
        )}

      </section>
      {/* footer */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        Built with React, Node.js, MongoDB and Gemini AI
      </footer>
    </div>
  );
}
