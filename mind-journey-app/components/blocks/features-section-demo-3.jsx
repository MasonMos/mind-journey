"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "AI-Powered Journaling",
      description:
        "Our AI-powered journaling feature helps you keep track of your mental health and well-being. With our advanced AI technology, you can get personalized insights and recommendations to improve your mental health.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "AI-Personalized Mental Health Plans, Guided Meditation, and Relaxation Techniques",
      description:
        "Our AI-powered health companion offers personalized mental health plans, guided meditation, and relaxation techniques to help you improve your mental well-being. Our platform leverages cutting-edge models to deliver a seamless experience. ",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Watch our AI Demos on YouTube",
      description:
        "Watch our AI demos on YouTube to learn more about our AI technology.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "AI-Powered Health Companion",
      description:
        "Experience lightning-fast, state-of-the-art AI assistance with our cloud services. Our free tier harnesses the power of GPT-3.5 Turbo, while our paid plans elevate your experience with the advanced 4o-mini and 4o models. Deploy your personalized AI companion in seconds and take control of your mental well-being.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    (<div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
      <div className="px-8">
        <h4
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white dark:text-white">
          Packed full of features
        </h4>

        <p
          className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Packed with advanced features, our AI Health Companion offers personalized support for your mental well-being. From insightful analysis to actionable recommendations, our platform leverages cutting-edge models to deliver a seamless experience. 
        </p>
      </div>
      <div className="relative ">
        <div
          className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>)
  );
}

const FeatureCard = ({
  children,
  className
}) => {
  return (
    (<div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>)
  );
};

const FeatureTitle = ({
  children
}) => {
  return (
    (<p
      className=" max-w-5xl mx-auto text-left tracking-tight text-white dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>)
  );
};

const FeatureDescription = ({
  children
}) => {
  return (
    (<p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}>
      {children}
    </p>)
  );
};

export const SkeletonOne = () => {
  return (
    (<div className="relative flex py-8 px-2 gap-10 h-full">
      <div
        className="w-full  p-5  mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          {/* TODO */}
          <Image
            src="/linear.webp"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-left-top rounded-sm" />
        </div>
      </div>
      <div
        className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
      <div
        className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>)
  );
};

export const SkeletonThree = () => {
  return (
    (<Link
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10  h-full group/image">
      <div
        className="w-full  mx-auto bg-transparent dark:bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  relative">
          {/* TODO */}
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto " />
          <Image
            // src="https://assets.aceternity.com/fireship.jpg"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200" />
        </div>
      </div>
    </Link>)
  );
};

export const SkeletonTwo = () => {
  const images = [
    // "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <Link href="/your-desired-path" className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      {/* Existing content */}
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            key={"images-first" + idx}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="flex flex-row">
        {images.map((image, idx) => (
          <motion.div
            key={"images-second" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={image}
              alt="bali images"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div>
      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
    </Link>
  );
};

export const SkeletonFour = () => {
  return (
    (<div
      className="h-60 md:h-60  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
      <Globe className="absolute -right-15 md:-right-15 -bottom-65 md:-bottom-65" />
      <Link  className="absolute text-white h-40 md:h-40  flex flex-col items-center relative bg-transparent dark:bg-transparent mt-0" href="/ai-companion-chat">Click here to try it out.</Link>
    </div>)
  );
};

export const Globe = ({
  className
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1,
      mapSamples: 16000,
      mapBrightness: 2,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.6, 0.6, 1],
      glowColor: [0.6, 0.6, 1],
      markers: [
        // longitude latitude

        // North America
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco, USA
        { location: [40.7128, -74.0060], size: 0.1 },  // New York, USA
        { location: [34.0522, -118.2437], size: 0.05 }, // Los Angeles, USA

        // South America
        { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo, Brazil
        { location: [-34.6037, -58.3816], size: 0.06 }, // Buenos Aires, Argentina

        // Europe
        { location: [51.5074, -0.1278], size: 0.07 }, // London, UK
        { location: [48.8566, 2.3522], size: 0.06 }, // Paris, France
        { location: [52.5200, 13.4050], size: 0.05 }, // Berlin, Germany
        { location: [40.4168, -3.7038], size: 0.04 }, // Madrid, Spain

        // Africa
        { location: [30.0444, 31.2357], size: 0.05 }, // Cairo, Egypt
        { location: [6.5244, 3.3792], size: 0.04 }, // Lagos, Nigeria

        // Asia
        { location: [35.6828, 139.7590], size: 0.07 }, // Tokyo, Japan
        { location: [39.9042, 116.4074], size: 0.06 }, // Beijing, China
        { location: [28.6139, 77.2090], size: 0.05 }, // Delhi, India

        // Australia
        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney, Australia

        // Antarctica
        { location: [-90.0000, 0.0000], size: 0.03 }, // South Pole

      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.015;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    (<canvas
      ref={canvasRef}
      style={{ width: 500, height: 500, maxWidth: "100%", aspectRatio: 1 }}
      className={className} />)
  );
};
