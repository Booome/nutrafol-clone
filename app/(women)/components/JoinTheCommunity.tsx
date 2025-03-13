import Link from "next/link";
import { GrLinkNext } from "react-icons/gr";

export function JoinTheCommunity() {
  return (
    <section className="max-w-[var(--width-max)] mx-auto relative text-base-100 font-serif text-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        poster="https://images.ctfassets.net/0rbfqd9c4jdo/4ftcoJjwBZTC9fzfVbiWin/b9c3fbd2b27ad5e7ad79c526f6385c35/purpose-poster-mobile.jpg?fl=progressive"
        className="w-full md:h-[1200px] object-cover"
      >
        <source src="https://nutrafol.com/media/video_storage/purpose-video-mobile-optimized.mp4" />
      </video>

      <div className="absolute inset-0 w-full h-full bg-base-content/50 flex flex-col items-center justify-center px-6 lg:px-12 xl:px-32 text-balance">
        <h2 className="font-serif text-[28px] md:text-4xl lg:text-5xl text-center">
          It&apos;s not &quot;just&quot; hair
        </h2>

        <p className="mt-8 md:mt-10 lg:mt-18 xl:mt-20 text-lg md:text-[22px] lg:text-[28px]">
          We know firsthand the impact of hair thinning. We’ve experienced it,
          too. That’s why we’ve designed hair growth formulas that are tested,
          full of plant-based ingredients, and that actually work. Because you
          deserve results from a trusted partner - and a journey as unique as
          you are. Our commitment to you is simple: to help you feel your best,
          both inside and out. To show you how you can achieve your hair goals
          through whole-body health. And to be with you every step of the way.
          Our Shed the Silence community was created to ensure you’re never
          alone on your hair journey. It’s a place where you can share your
          experience with people who get it, offer support, and tackle hair
          struggles together. Because hair is never “just” hair. So, let’s keep
          growing together.
        </p>

        <Link
          href=""
          className="mt-8 md:mt-10 lg:mt-12 flex items-center gap-2"
        >
          <div className="bg-my-secondary text-teal-950 p-1 rounded-xs">
            <GrLinkNext />
          </div>
          <span className="text-sm lg:text-base">Join the community</span>
        </Link>
      </div>
    </section>
  );
}
