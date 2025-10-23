import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaDesktop, FaLaptop, FaMobileAlt, FaRobot, FaDatabase, FaCog, FaPaintBrush, FaTag 
} from "react-icons";

 

const servicesData = [
  {
    title: "Software – Web & Retail",
    icons: [FaDesktop, FaLaptop],
    emojis: ["🖥️","💻","🌐"],
    products: [
      { title: "Smart School ERP", url: "https://estimated-pink-gexrdmzfyd.edgeone.app/" },
      { title: "Retail POS System", url: "https://strange-plum-fwsaqii4am.edgeone.app/" },
    ],
  },
  {
    title: "Software – Mobile & AI",
    icons: [FaMobileAlt, FaRobot],
    emojis: ["📱","🤖","💡"],
    products: [
      { title: "Food Delivery App", url: "https://yelling-silver-gmekct689c.edgeone.app/" },
      { title: "Event Booking App", url: "https://healthy-silver-1z1wv0edff.edgeone.app/" },
      { title: "Customer Support Bot", url: "https://gross-harlequin-b2hvbovbgo.edgeone.app/" },
      { title: "Lead Generation Bot", url: "https://misty-magenta-5uchb0osqg.edgeone.app/" },
    ],
  },
  {
    title: "Database Management",
    icons: [FaDatabase],
    emojis: ["🗄️","📊","📈"],
    products: [
      { title: "Inventory Management", url: "https://expected-sapphire-tusuknvapl.edgeone.app/" },
      { title: "Student Records System", url: "https://ready-sapphire-szs4upgpgd.edgeone.app/" },
    ],
  },
  {
    title: "Automation Tools",
    icons: [FaCog],
    emojis: ["⚙️","🔄","📑"],
    products: [
      { title: "Invoice Generator", url: "https://angry-brown-gmnknlbjex.edgeone.app/" },
      { title: "Email Scheduler", url: "https://proposed-fuchsia-92j2abyo6t.edgeone.app/" },
    ],
  },
  {
    title: "Digital Products",
    icons: [FaPaintBrush],
    emojis: ["🖌️","🎨","💻"],
    products: [
      { title: "Festival Posts", url: "#" },
      { title: "Business Posts", url: "#" },
    ],
  },
  {
    title: "Branding & Design",
    icons: [FaTag],
    emojis: ["🏷️","✨","📐"],
    products: [
      { title: "3D Lettermark Logo", url: "#" },
      { title: "Mascot Logo", url: "#" },
    ],
  },
];

const Services = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative w-full min-h-screen bg-green-900 text-white flex flex-col items-center py-20 px-4">
      <h2 className="text-4xl font-bold mb-12">Our Services</h2>

      <div className="relative w-full flex flex-wrap justify-center gap-12">
        {servicesData.map((service, idx) => (
          <motion.div
            key={idx}
            className="relative w-48 h-48 flex flex-col items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelected(idx)}
          >
            {/* Central Glowing Icon */}
            <motion.div
              className="text-6xl text-green-300 mb-2"
              animate={{ rotate: [0, 360, 0] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              {service.icons.map((Icon, i) => <Icon key={i} />)}
            </motion.div>

            <h3 className="text-xl font-semibold text-center">{service.title}</h3>

            {/* Orbiting emojis */}
            {service.emojis.map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ top: 0, left: "50%" }}
                animate={{
                  rotate: [0, 360],
                  x: [0, Math.cos(i) * 80],
                  y: [0, Math.sin(i) * 80],
                }}
                transition={{ repeat: Infinity, duration: 10 + i * 2, ease: "linear" }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Carousel Modal */}
      {selected !== null && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-green-800 p-8 rounded-xl w-96"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-2xl font-bold mb-4">{servicesData[selected].title}</h3>
            <ul className="space-y-2">
              {servicesData[selected].products.map((p, i) => (
                <li key={i}>
                  <a href={p.url} target="_blank" className="text-green-200 hover:text-green-100 underline">
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Services;

