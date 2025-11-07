import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

interface FAQProps {
  liteMode: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services does Mavon Software Solutions provide?",
    answer: "Mavon offers comprehensive software solutions including custom web development, mobile app development (iOS & Android), AI chatbot integration, branding & design services, marketing automation, POS systems, and digital product development. We specialize in creating futuristic, scalable solutions tailored to your business needs."
  },
  {
    question: "How long does it take to develop a custom software solution?",
    answer: "Development timelines vary based on project complexity. A simple web application typically takes 4-8 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed timelines during our initial consultation and maintain transparent communication throughout the development process."
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer: "Yes! We offer comprehensive post-launch support and maintenance packages. This includes bug fixes, security updates, performance optimization, feature enhancements, and 24/7 technical support to ensure your software runs smoothly and stays up-to-date with the latest technologies."
  },
  {
    question: "What technologies does Mavon use for development?",
    answer: "We work with cutting-edge technologies including React, Node.js, Python, TypeScript, AI/ML frameworks, cloud platforms (AWS, Azure, Google Cloud), and modern databases. We select the best tech stack based on your specific project requirements to ensure optimal performance and scalability."
  },
  {
    question: "How much does custom software development cost?",
    answer: "Pricing depends on project scope, complexity, features, and timeline. We offer flexible pricing models including fixed-price projects and hourly rates. Contact us for a free consultation and detailed quote tailored to your specific requirements and budget."
  },
  {
    question: "Can Mavon help migrate existing systems to modern platforms?",
    answer: "Absolutely! We specialize in system modernization and migration services. Whether you need to move from legacy systems to cloud platforms, upgrade outdated technology stacks, or consolidate multiple systems, we ensure smooth transitions with minimal downtime and data integrity."
  },
  {
    question: "Does Mavon work with startups and small businesses?",
    answer: "Yes! We work with businesses of all sizes, from startups to enterprises. We understand the unique challenges faced by startups and small businesses and offer scalable solutions that grow with your business, along with flexible payment options to fit your budget."
  },
  {
    question: "What makes Mavon different from other software companies?",
    answer: "Mavon combines futuristic innovation with sustainable practices. We focus on creating intelligent, eco-conscious software solutions that not only meet current needs but are built to adapt and scale. Our approach blends cutting-edge technology with elegant design, ensuring your software is both powerful and user-friendly."
  }
];

const FAQ = ({ liteMode }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Inject FAQ Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto max-w-4xl">
        <ScrollReveal disabled={liteMode}>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Mavon Software Solutions
              </p>
            </motion.div>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="glass-card overflow-hidden cursor-pointer"
                whileHover={!liteMode ? { 
                  boxShadow: '0 0 30px rgba(102, 187, 106, 0.2)',
                  scale: 1.01 
                } : {}}
                onClick={() => toggleFAQ(index)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0,
                      marginTop: openIndex === index ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollReveal disabled={liteMode}>
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Still have questions? We're here to help!
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold shadow-lg hover:shadow-primary/50 transition-all"
              whileHover={!liteMode ? { scale: 1.05, boxShadow: '0 0 30px rgba(102, 187, 106, 0.4)' } : {}}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQ;
