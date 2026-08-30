"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import type { SiteSettings } from "@/lib/types";

interface AuthorProps {
  settings?: Partial<SiteSettings>;
}

export function Author({ settings }: AuthorProps) {
  const authorName = settings?.authorName || "लेखक";
  const authorBio =
    settings?.authorBio && settings.authorBio !== "लेखकाबद्दल माहिती इथे जोडा."
      ? settings.authorBio
      : "आर्थिक स्वातंत्र्य, मानसिक शांतता आणि सकारात्मक विचारसरणी या विषयांवर अनेक वर्षांचा प्रत्यक्ष अभ्यास करून सामान्य माणसाच्या आर्थिक अडचणींवर व्यावहारिक उपाय देणारे लेखक व जीवन-प्रशिक्षक.";
  const authorMessage =
    settings?.authorMessage &&
    settings.authorMessage !== "लेखकाचा संदेश इथे जोडा."
      ? settings.authorMessage
      : "कर्ज ही केवळ एक तात्पुरती परिस्थिती आहे. जर तुम्ही मनाची दिशा बदलली, योग्य आर्थिक नियोजन केले आणि वर्तमानात जगायला शिकलात, तर कर्ज असतानाही मनःशांती आणि आनंद १००% शक्य आहे.";
  const authorImage = settings?.authorImage || "/uploads/author.png";

  return (
    <section id="author" className="py-20 md:py-28 bg-cream relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-gold text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            लेखकाचा परिचय
          </span>
          <h2 className="text-deva text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy leading-tight">
            लेखकाबद्दल
          </h2>
          <GoldDivider centered />
          <p className="text-main/75 text-base sm:text-lg mt-3 font-medium">
            या पुस्तकामागील विचार, अनुभव आणि प्रेरणा
          </p>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-gold/30 shadow-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Left: Author Portrait Frame */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-1.5 bg-gradient-to-br from-gold via-gold-light to-navy shadow-xl group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-navy flex items-center justify-center">
                  {authorImage && !authorImage.includes("default") && !authorImage.includes("placeholder") ? (
                    <Image
                      src={authorImage}
                      alt={authorName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-4">
                      <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center text-3xl mb-2">
                        ✍️
                      </div>
                      <span className="text-deva font-bold text-gold text-sm">
                        {authorName}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Author Badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy text-gold text-xs font-bold border border-gold/30">
                <span>✦</span>
                <span>लेखक व जीवन मार्गदर्शक</span>
              </div>
            </div>

            {/* Right: Author Content */}
            <div className="md:col-span-8 text-center md:text-left">
              <h3 className="text-deva text-2xl sm:text-3xl font-extrabold text-navy mb-2">
                {authorName}
              </h3>
              <p className="text-xs sm:text-sm font-serif-en uppercase tracking-wider text-gold font-bold mb-4">
                Author & Life Mentor
              </p>

              <p className="text-main/80 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {authorBio}
              </p>

              {/* Message Box */}
              <div className="bg-gradient-to-r from-navy via-navy to-[#0D253A] text-cream rounded-2xl p-6 border-l-4 border-gold shadow-md">
                <span className="text-xs uppercase tracking-wider text-gold font-bold block mb-1">
                  लेखकाचा खास संदेश:
                </span>
                <p className="text-deva text-cream/90 text-sm sm:text-base leading-relaxed italic">
                  “{authorMessage}”
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
