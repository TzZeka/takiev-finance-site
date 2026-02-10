"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { Calendar, ArrowLeft, ExternalLink, Tag, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { getImageUrl } from "@/lib/sanity/client";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import { BlogTableOfContents } from "@/components/blog/BlogTableOfContents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import type { BlogPost } from "@/types";

interface BlogArticleLayoutProps {
  post: BlogPost;
  headings: Array<{ id: string; text: string; level: number }>;
  categories: string[];
  relatedPosts: BlogPost[];
}

function estimateReadingTime(body: any[]): number {
  if (!body || !Array.isArray(body)) return 1;
  const text = body
    .filter((b) => b._type === "block" && b.children)
    .flatMap((b) => b.children)
    .filter((c: any) => c?.text)
    .map((c: any) => c.text)
    .join(" ");
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export function BlogArticleLayout({ post, headings, categories, relatedPosts }: BlogArticleLayoutProps) {
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);
  const readingTime = useMemo(() => estimateReadingTime(post.body), [post.body]);
  const hasTags = categories.length > 0;

  return (
    <article>
      {/* Hero Banner */}
      <div className="relative w-full min-h-[50vh] flex items-end overflow-hidden">
        {/* Background Image */}
        {post.mainImage ? (
          <Image
            src={getImageUrl(post.mainImage)}
            alt={post.mainImage.alt || post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : null}

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${post.mainImage ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10" : "bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900/80"}`} />

        {/* Hero Content */}
        <div className="relative z-10 w-full pb-10 pt-32 md:pt-40">
          <div className="container mx-auto px-4 max-w-7xl backdrop-blur-[2px] bg-black/10 rounded-2xl py-6 px-6 md:px-8">
            {/* Back Button — fade in from left */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button asChild variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Към всички статии
                </Link>
              </Button>
            </motion.div>

            {/* Title — slide up slowly */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight tracking-tight max-w-4xl"
              initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 2.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {post.title}
            </motion.h1>

            {/* Metadata row — fade in with slight scale */}
            <motion.div
              className="flex flex-wrap items-center gap-4 text-white/70 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{formatDate(post.publishedAt)}</span>
              </div>

              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image ? (
                    <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-white/30">
                      <Image
                        src={getImageUrl(post.author.image)}
                        alt={post.author.name}
                        fill
                        sizes="24px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                  <span className="text-sm font-medium text-white/90">{post.author.name}</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{readingTime} мин. четене</span>
              </div>
            </motion.div>

            {/* Tags — staggered fade in */}
            {categories.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              >
                {categories.map((category, i) => (
                  <motion.span
                    key={category}
                    className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-xs font-medium border border-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1 + i * 0.1, ease: "easeOut" }}
                  >
                    <Tag className="w-3 h-3" />
                    {category}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full px-4 py-10 md:py-14">
        {/* Article + TOC row — TOC only lives alongside the article content */}
        <div className="flex gap-4 justify-between">
          {/* Article Content + NULA.bg attribution inside */}
          <div className="flex-1 min-w-0">
            <motion.div
              className="max-w-[900px] mx-auto bg-slate-900/60 backdrop-blur-sm border border-white/[0.06] rounded-2xl px-6 md:px-12 lg:px-16 py-10 md:py-14 shadow-xl"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <PortableText value={post.body} components={portableTextComponents} />

              {/* NULA.bg Attribution — inside article container */}
              {post.nulaBgUrl && (
                <div className="mt-10 pt-8 border-t border-white/[0.08]">
                  <p className="text-sm text-muted-foreground mb-2">
                    Тази статия е публикувана също в:
                  </p>
                  <a
                    href={post.nulaBgUrl}
                    target="_blank"
                    rel="noopener noreferrer author"
                    className="inline-flex items-center text-primary hover:underline font-medium"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    NulaBG - Професионален блог
                  </a>
                </div>
              )}
            </motion.div>
          </div>

          {/* Table of Contents Sidebar — only alongside article content */}
          {headings.length > 0 && (
            <aside
              className="hidden lg:block shrink-0 transition-all duration-300"
              style={{ width: isTocCollapsed ? 56 : 280 }}
            >
              <BlogTableOfContents
                headings={headings}
                isCollapsed={isTocCollapsed}
                onToggleCollapse={() => setIsTocCollapsed((prev) => !prev)}
              />
            </aside>
          )}
        </div>

        {/* Everything below is outside the flex — TOC stops here */}
      </div>

      {/* Author Info Section — Full-width, premium footer-style */}
      {post.author && (
        <motion.div
          className="mt-12 mb-12 px-4 md:px-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl border border-white/[0.06] overflow-hidden shadow-2xl">
            {/* Decorative blurred orbs */}
            <div className="absolute -top-20 right-[10%] w-60 h-60 bg-[#19BFB7] rounded-full blur-[150px] opacity-15 pointer-events-none" />
            <div className="absolute -bottom-20 left-[5%] w-60 h-60 bg-[#40514E] rounded-full blur-[150px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col-reverse md:flex-row items-stretch">
              {/* Text + Socials — left */}
              <div className="flex-1 text-center md:text-left p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest text-primary/70 font-semibold mb-2">Автор</p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                  {post.author.name}
                </h3>
                {post.author.bio && post.author.bio.length > 0 && (
                  <p className="text-white/50 leading-relaxed mb-6 text-sm md:text-base max-w-xl">
                    {post.author.bio[0]?.children?.[0]?.text}
                  </p>
                )}

                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/n.takiev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/[0.05] hover:bg-[#1877F2]/20 border border-white/[0.08] hover:border-[#1877F2]/40 rounded-xl px-4 py-2.5 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#1877F2] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">Facebook</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/takiev-finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/[0.05] hover:bg-[#0A66C2]/20 border border-white/[0.08] hover:border-[#0A66C2]/40 rounded-xl px-4 py-2.5 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#0A66C2] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">LinkedIn</span>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@nikolaytakiev6221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/[0.05] hover:bg-[#FF0000]/20 border border-white/[0.08] hover:border-[#FF0000]/40 rounded-xl px-4 py-2.5 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-white/60 group-hover:text-[#FF0000] transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">YouTube</span>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@n.takiev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/[0.05] hover:bg-white/10 border border-white/[0.08] hover:border-white/20 rounded-xl px-4 py-2.5 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">TikTok</span>
                  </a>

                  {/* NULA.bg Blog */}
                  <a
                    href="https://blog.nula.bg/author/nikolai/"
                    target="_blank"
                    rel="author noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/[0.05] hover:bg-primary/20 border border-white/[0.08] hover:border-primary/40 rounded-xl px-4 py-2.5 transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white transition-colors">NULA.bg</span>
                  </a>
                </div>
              </div>

              {/* Divider feather */}
              <div className="hidden md:flex items-center">
                <div className="w-[1px] h-3/4 bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />
              </div>

              {/* Image — right, fully visible, no cropping */}
              <div className="w-full md:w-auto shrink-0 flex items-end justify-end">
                {post.author.image ? (
                  <Image
                    src={getImageUrl(post.author.image)}
                    alt={post.author.name}
                    width={420}
                    height={420}
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="w-full md:w-[320px] lg:w-[420px] h-auto block"
                  />
                ) : (
                  <div className="w-full md:w-[320px] lg:w-[420px] aspect-square bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-6xl font-bold text-primary">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sections below author — back in container */}
      <div className="container mx-auto px-4 max-w-7xl pb-12 md:pb-16">
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-[900px] mx-auto">
            <RelatedPosts posts={relatedPosts} hasTags={hasTags} />
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative rounded-2xl p-10 md:p-14 overflow-hidden border border-white/[0.06]">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#40514E]/30 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Text — left */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Имате въпроси?
                </h3>
                <p className="text-white/50 leading-relaxed max-w-md">
                  Свържете се с нас и ще ви помогнем с вашите финансови и счетоводни нужди.
                </p>
              </div>
              {/* Button — right */}
              <div className="shrink-0">
                <Button asChild size="lg" className="px-8 py-3 text-sm font-medium rounded-xl bg-white text-slate-950 hover:bg-white/90 border-0">
                  <Link href="/kontakti">Свържи се с нас</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
