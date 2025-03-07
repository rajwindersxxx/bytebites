import { uniqueId } from 'lodash';
import React from 'react';
interface props {
  tags: { id: number; name: string }[];
  heading?: string;
  color?: string;
}
export default function Tags({ tags, heading, color }: props) {
  return (
    <div className={`flex items-center gap-2`}>
      {heading && (
        <span className="font-bold">{tags.length > 0 && heading}</span>
      )}
      {tags.map((item) => {
        return (
          <div key={uniqueId()}>
            <p className={`p-2 ${color} text-center rounded-md`}>
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
