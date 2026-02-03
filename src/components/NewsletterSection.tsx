import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`max-w-2xl mx-auto text-center ${
            isVisible ? "" : "opacity-0"
          }`}
        >
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 ${
              isVisible ? "animate-scale-in" : ""
            }`}
          >
            <Sparkles className="h-8 w-8 text-primary-foreground" />
          </div>

          {/* Heading */}
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "100ms" }}
          >
            Get <span className="text-gradient">secret offers</span> and best prices
          </h2>

          {/* Description */}
          <p
            className={`text-muted-foreground mb-8 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "200ms" }}
          >
            Sign up for our Travel Club newsletter and be the first to receive
            exclusive deals, travel tips, and insider recommendations.
          </p>

          {/* Form */}
          <div
            className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
              />
            </div>
            <Button variant="hero" size="lg">
              Subscribe
            </Button>
          </div>

          {/* Trust badge */}
          <p
            className={`text-xs text-muted-foreground mt-4 ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
            style={{ animationDelay: "400ms" }}
          >
            Join 250,000+ travelers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
