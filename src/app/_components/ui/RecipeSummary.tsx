import DOMPurify from 'isomorphic-dompurify';

interface props {
  summary: string;
}
export default function RecipeSummary({ summary }: props) {
  const cleanHTML = DOMPurify.sanitize(summary);

  return (
    <div className="col-span-3 bg-natural-cream">
      <h2 className="mb-8 text-2xl"> 📝 Summary</h2>
      <div className="text-xl italic">
        <p dangerouslySetInnerHTML={{ __html: cleanHTML }} />
      </div>
    </div>
  );
}
