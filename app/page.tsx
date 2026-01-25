
import BlogCard from "../shared/components/elements/BlogCard";

export default function Home() {
  return (
    <>
      <BlogCard
        id="1"
        title="Sample Blog Title"
        summary_image_url="/assets/sample.jpg"
        category="Finance"
        date="2026-01-25"
        title_filter="sample-blog-title"
      />
    </>
  );
}
