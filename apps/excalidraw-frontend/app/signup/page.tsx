"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Pencil, Eye, EyeOff, ArrowRight, Sparkles, User, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { HTTP_ENDPOINT } from "@/config"

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async () => {
  setIsLoading(true);

  try {
    const response = await axios.post(`${HTTP_ENDPOINT}/signup`, {
      username,
      name,
      password,
    });

    const token = response.data.token;
    localStorage.setItem("token", token);

    const room = await axios.post(
      `${HTTP_ENDPOINT}/create-room`,
      {
        roomName: username,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const roomId = room.data.roomId;
    router.push(`/canvas/${roomId}`);
  } catch (error) {
    console.error("Sign up failed:", error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-40"
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-full blur-3xl opacity-30"
          animate={{
            y: [0, 30, 0],
            x: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Creative floating shapes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${2 + (i % 4)} h-${2 + (i % 4)} ${
              i % 4 === 0
                ? "bg-blue-500"
                : i % 4 === 1
                  ? "bg-purple-500"
                  : i % 4 === 2
                    ? "bg-green-500"
                    : "border-2 border-gray-400"
            } ${i % 2 === 0 ? "rounded-full" : "rounded-xl"}`}
            style={{
              left: `${10 + ((i * 9) % 80)}%`,
              top: `${20 + ((i * 7) % 60)}%`,
            }}
            animate={{
              y: [0, -25 - (i % 4) * 5, 0],
              rotate: [0, 180 + (i % 3) * 60, 360],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Sign Up Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 relative overflow-hidden">
              {/* Form header */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-black mb-2">Join Draft Space</h2>
                <p className="text-gray-600">Create your account and start creating</p>
              </motion.div>

              {/* Form */}
              <div className="space-y-6">
                {/* Name field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>

                {/* Username field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>

                {/* Password field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-all duration-300 text-lg bg-gray-50 hover:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>

                {/* Sign Up Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <button
                    onClick={handleSignup}
                    disabled={isLoading || !username || !name || !password}
                    className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-2xl font-medium text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                    ) : (
                      <span className="flex items-center justify-center">
                        Create Account
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </span>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                    />
                  </button>
                </motion.div>

                {/* Divider */}
                <motion.div
                  className="relative my-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </motion.div>

                {/* Sign In Link */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Link
                    href="/signin"
                    className="inline-flex items-center text-black hover:text-gray-600 font-medium transition-colors group"
                  >
                    Sign in instead
                    <motion.div className="ml-1" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-20 h-20 bg-blue-100 rounded-full opacity-50"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-500 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Right side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative">
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div className="flex items-center justify-center space-x-3 mb-8" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center transform rotate-12"
                animate={{ rotate: [12, 17, 12] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Pencil className="w-8 h-8 text-white -rotate-12" />
              </motion.div>
              <span className="text-4xl font-bold text-black">Draft Space</span>
            </motion.div>

            <motion.h1
              className="text-5xl font-bold mb-6 text-black leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Start Creating
              <motion.span
                className="block text-gray-400 text-3xl mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Today
                <motion.div
                  className="inline-block ml-2 text-2xl"
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  🚀
                </motion.div>
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 font-light leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Join thousands of creators and transform your ideas into beautiful visual stories
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              className="space-y-4 text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {[
                "✨ Unlimited canvas space",
                "🎨 Professional drawing tools",
                "👥 Real-time collaboration",
                "☁️ Cloud sync across devices",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center space-x-3 text-gray-700"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                >
                  <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Floating creative elements */}
          <motion.div
            className="absolute top-1/4 left-20 w-8 h-8 text-blue-500"
            animate={{
              y: [0, -25, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-full h-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-20 w-6 h-6 bg-purple-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </div>
    </div>
  )
}
