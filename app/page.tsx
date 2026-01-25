



import Section1 from "../modules/dashboard/components/section1";
import BlogCard from "../shared/components/elements/BlogCard";
import Counter from "../modules/dashboard/components/counter";
import CentralHub from "../modules/dashboard/components/centralhub";
import Revolution from "../modules/dashboard/components/revolution";

export default function Home() {
  return (
    <>
      <Section1 />
      <Counter />
      <CentralHub />
      <Revolution />
    </>
  );
}
