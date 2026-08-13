import { Hero } from "@/components/home/Hero";
import { Purpose } from "@/components/home/Purpose";
import { SocialImpact } from "@/components/home/SocialImpact";
import { Formation } from "@/components/home/Formation";
import { Education } from "@/components/home/Education";
import { Categories } from "@/components/home/Categories";
import { Methodology } from "@/components/home/Methodology";
import { Nucleo } from "@/components/home/Nucleo";
import { Gratuity } from "@/components/home/Gratuity";
import { Future } from "@/components/home/Future";
import { Sponsors } from "@/components/home/Sponsors";
import { CTAMatricula } from "@/components/home/CTAMatricula";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Purpose />
      <SocialImpact />
      <Formation />
      <Education />
      <Categories />
      <Methodology />
      <Nucleo />
      <Gratuity />
      <Future />
      <Sponsors />
      <CTAMatricula />
    </>
  );
}
