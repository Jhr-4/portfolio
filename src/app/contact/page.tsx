"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { StarryBackground } from "@/components/ui/starry-background"
import { Github, Linkedin, Mail, MapPin, Clock, ArrowUpRight, User, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      })
    }
  }

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: "", email: "", message: "" }
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
      isValid = false
    }
    
    // Email validation (beyond HTML5 validation)
    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
        isValid = false
      }
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 50) {
      newErrors.message = "Message must be at least 50 characters long"
      isValid = false
    }
    
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // JavaScript validation
    if (!validateForm()) {
      return
    }
    
    try {
      setIsSubmitting(true)
      setFormStatus(null)
      
      // Here you would normally call an API endpoint to send the email
      // For now we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Simulate successful form submission
      setFormStatus({
        success: true,
        message: "Message sent successfully! I'll get back to you soon."
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      })
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        success: false,
        message: "Something went wrong. Please try again."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex flex-col items-center pt-16 px-4 pb-16 relative overflow-hidden">
      {/* Using the reusable StarryBackground component */}
      <StarryBackground 
        starsCount={{
          primary: 50,  // More primary stars
          secondary: 35,
          accent: 25,
          dust: 20
        }}
      />
      
      <main className="max-w-6xl w-full space-y-8 py-8 z-10">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
            Contact Me
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Have a question or want to work together? Send me a message and I'll get back to you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Form Container - Left Side */}
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6 md:p-8 shadow-lg transition-all hover:shadow-xl h-full flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field - HTML5 validation */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2 font-bold">
                    <User className="text-primary text-base" />
                    Name <span className="text-primary">*</span>
                  </Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Your name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-background/50 border-border focus:ring-primary focus:border-primary h-12" 
                    required
                    minLength={2}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                
                {/* Email Field - HTML5 validation */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2 font-bold">
                    <Mail className="text-primary text-base" />
                    Email <span className="text-primary">*</span>
                  </Label>
                  <Input 
                    id="email"
                    name="email"
                    placeholder="yourname@example.com" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-background/50 border-border focus:ring-primary focus:border-primary h-12" 
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              {/* Message Field - HTML5 validation */}
              <div className="space-y-2 flex-grow flex flex-col">
                <Label htmlFor="message" className="text-foreground flex items-center gap-2 font-bold">
                  <MessageSquare className="text-primary text-base" />
                  Message <span className="text-primary">*</span>
                </Label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="What would you like to discuss? (min. 50 characters)"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-background/50 border-border resize-none focus:ring-primary focus:border-primary flex-grow min-h-[180px]" 
                  required
                  minLength={50}
                  aria-invalid={errors.message ? "true" : "false"}
                />
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                )}
              </div>
              
              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary border border-primary/10 hover:from-primary/90 hover:to-secondary/90 transition-all hover:scale-[1.02] font-medium text-white shadow-[0_0_10px_rgba(67,97,238,0.5)] hover:shadow-[0_0_15px_rgba(67,97,238,0.65)] h-12 mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="text-base" />
                    Send Message
                  </span>
                )}
              </Button>
              
              {/* Status Message */}
              {formStatus && (
                <div className={`mt-4 p-4 rounded-md ${formStatus.success ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'} border ${formStatus.success ? 'border-green-500/30' : 'border-red-500/30'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
          
          {/* Information Panel - Right Side */}
          <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6 shadow-lg h-full">
            <h3 className="font-serif text-2xl font-semibold mb-4 text-primary">Connect With Me</h3>
            <div className="flex flex-col gap-3">
              <Link 
                href="https://github.com/jhr-4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-background/40 border border-border rounded-md hover:bg-background/70 transition-colors group"
              >
                <Github className="text-primary" size={24} />
                <div className="flex-1">
                  <span className="font-medium">GitHub</span>
                  <span className="block text-sm text-foreground/70">github.com/jhr-4</span>
                </div>
                <ArrowUpRight className="text-foreground/50 group-hover:text-primary transition-colors" size={24} />
              </Link>
              
              <Link 
                href="https://linkedin.com/in/jay-rana-23441a298" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-background/40 border border-border rounded-md hover:bg-background/70 transition-colors group"
              >
                <Linkedin className="text-primary" size={24} />
                <div className="flex-1">
                  <span className="font-medium">LinkedIn</span>
                  <span className="block text-sm text-foreground/70">linkedin.com/in/jay-rana-23441a298</span>
                </div>
                <ArrowUpRight className="text-foreground/50 group-hover:text-primary transition-colors" size={24} />
              </Link>
              
              <Link 
                href="mailto:jhr4@njit.edu" 
                className="flex items-center gap-3 p-3 bg-background/40 border border-border rounded-md hover:bg-background/70 transition-colors group"
              >
                <Mail className="text-primary" size={24} />
                <div className="flex-1">
                  <span className="font-medium">Email</span>
                  <span className="block text-sm text-foreground/70">jhr4@njit.edu</span>
                </div>
                <ArrowUpRight className="text-foreground/50 group-hover:text-primary transition-colors" size={24} />
              </Link>

              {/* Location without box */}
              <div className="flex items-start gap-3 p-3 border-t border-border pt-6 mt-3">
                <MapPin className="text-primary" size={24} />
                <div>
                  <span className="font-medium">Location</span>
                  <span className="block text-sm text-foreground/70">New Jersey, United States</span>
                </div>
              </div>

              {/* Response time without box */}
              <div className="flex items-start gap-3 p-3">
                <Clock className="text-primary" size={24} />
                <div>
                  <span className="font-medium">Response Time</span>
                  <span className="block text-sm text-foreground/70">Within 24-48 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}