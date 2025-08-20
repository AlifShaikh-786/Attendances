import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      {/* Navbar (fixed) */}
      <Navbar />

      {/* Add top spacing to clear fixed navbar */}
      <main className="pt-40 md:pt-48 px-6 md:px-16 lg:px-24 pb-20">
        {/* Hero */}
        <section className="max-w-6xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              {" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
                Dr. D.Y. Patil Institute of Management & Entrepreneur
                Development
              </span>
            </h1>
            <p className="mt-4 text-gray-200 text-lg max-w-prose">
              Founded with a vision to nurture future-ready leaders, DYPIMED
              (Varale, Pune) combines academic excellence, industry-aligned
              programs, and a vibrant campus culture. We are committed to
              holistic education, innovation and ethical leadership.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/admissions"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition transform"
              >
                Admissions
              </Link>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center">
            <img
              src="/Assets/DYPIMED.jpg"
              alt="DYPIMED Campus"
              className="w-full max-w-xl rounded-3xl shadow-2xl object-cover"
            />
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-2 text-yellow-300">
              Our Mission
            </h3>
            <p className="text-gray-200">
              To empower students with practical skills, ethical values and an
              entrepreneurial mindset to succeed in a global economy.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-2 text-cyan-300">Our Vision</h3>
            <p className="text-gray-200">
              To be a leading institution fostering innovation, research and
              socially-responsible leadership.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-2 text-pink-300">
              Core Values
            </h3>
            <ul className="text-gray-200 list-disc list-inside space-y-1">
              <li>Integrity & Ethics</li>
              <li>Academic Excellence</li>
              <li>Industry Collaboration</li>
              <li>Inclusivity & Respect</li>
            </ul>
          </div>
        </section>

        {/* Quick Stats / Highlights */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold mb-6">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-yellow-300">20+</div>
              <div className="mt-2 text-gray-200">Years of Excellence</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-cyan-300">100+</div>
              <div className="mt-2 text-gray-200">Industry Partners</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-pink-300">5000+</div>
              <div className="mt-2 text-gray-200">Alumni Worldwide</div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold mb-6">
            Departments & Programs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "MCA - Master Of Computer Application",
                desc: "strong technical, analytical, and professional skills for dynamic careers in the IT industry.",
                img: "/Assets/MCA.jpg",
              },
              {
                title: "MBA - Management",
                desc: "Industry-aligned curriculum, internships, and live projects.",
                img: "/Assets/MBA.png",
              },
            ].map((d) => (
              <article
                key={d.title}
                className="bg-white/5 rounded-2xl overflow-hidden"
              >
                <img
                  src={d.img}
                  alt={d.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-lg">{d.title}</h3>
                  <p className="mt-2 text-gray-200 text-sm">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Campus Life */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold mb-6">Campus Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <h4 className="font-semibold text-lg mb-2">Clubs & Societies</h4>
              <p className="text-gray-200">
                Student clubs across entrepreneurship, cultural activities,
                technical societies and sports help students build soft skills
                and networks.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6">
              <h4 className="font-semibold text-lg mb-2">Facilities</h4>
              <ul className="text-gray-200 list-disc list-inside">
                <li>Modern classrooms & smart labs</li>
                <li>Library with digital resources</li>
                <li>Sports grounds & gymnasium</li>
                <li>On-campus cafeteria</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Governance / Accreditation */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold mb-6">
            Accreditations & Governance
          </h2>
          <div className="bg-white/5 rounded-2xl p-6">
            <p className="text-gray-200">
              Dr. D.Y. Patil Institute is registered and accredited by
              recognized educational authorities. We follow strict governance
              practices to ensure quality and transparency in academic and
              administrative processes.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-6xl mx-auto mb-12 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
            Join our community of changemakers
          </h3>
          <p className="text-gray-200 mb-6">
            Explore programs, scholarships and campus visits — take the next
            step today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/admissions"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition transform"
            >
              Apply Now
            </Link>
            <Link
              to="/visit"
              className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition"
            >
              Book a Campus Visit
            </Link>
          </div>
        </section>

        {/* Contact / Footer area */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-200">DYPIMED, Varale, Pune</p>
              <p className="text-gray-200 mt-1">Phone: +91 12345 67890</p>
              <p className="text-gray-200">Email: info@dypimed.edu.in</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 md:col-span-2">
              <h4 className="font-semibold mb-2">Reach Us</h4>
              <p className="text-gray-200">
                For directions and detailed contact info, visit our Contact
                page.
              </p>

              {/* Simple small map placeholder (replace with real embed if desired) */}
              <div className="mt-4 h-40 bg-white/6 rounded-md flex items-center justify-center text-gray-300">
                Map placeholder
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
