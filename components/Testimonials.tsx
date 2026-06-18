"use client";
import ReviewsCarousel from "./ReviewsCarousel";

export default function Testimonials() {
  return (
    <div id="testimonials" className="scroll-mt-20">
      <ReviewsCarousel
        kicker="Testimonials"
        title={
          <>
            We love what we do, and{" "}
            <span className="gradient-text">they love the results.</span>
          </>
        }
        subtitle="Real words from the brands we've designed, built, and grown."
      />
    </div>
  );
}
