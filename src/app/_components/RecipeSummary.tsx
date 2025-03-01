import React from 'react';
interface props{
    summary: string
}
export default function RecipeSummary({summary}: props) {
  return (
      <div className="bg-natural-cream  col-span-3">
        <h2 className="text-2xl mb-8"> 📝 Summary</h2>
        <div className="text-xl italic">
          <p dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
      </div>
  );
}
