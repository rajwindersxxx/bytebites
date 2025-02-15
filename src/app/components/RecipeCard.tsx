import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface props {
  data: RecipeData;
  baseUrlImage?: string;
}
interface RecipeData {
  image: string;
  title: string;
  readyInMinutes: number;
  id: number;
  servings: number;
  vegetarian?: boolean;
  pricePerServing?: number;
  veryPopular?: boolean;
  extendedIngredients?: unknown[];
  baseUrlImage?: string;
}

export default function RecipeCard({ data, baseUrlImage }: props) {
  const {
    id,
    image,
    title,
    readyInMinutes,
    servings,
    vegetarian,
    pricePerServing,
    veryPopular,
    extendedIngredients,
  } = data;

  return (
    <Link
      href={`/explore/${id}`}
      className="min-w-[28rem] min-h-36 bg-natural-beige rounded-md overflow-hidden grid grid-cols-[1fr_1.7fr] transition-all hover:scale-105 hover:shadow-md"
    >
      <div className="h-full relative ">
        {baseUrlImage ? (
          <Image
            src={`${baseUrlImage}/${image}`}
            alt={title}
            fill
            sizes="100%"
            className="object-cover brightness-75"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="100%"
          />
        )}
      </div>
      <div className="flex flex-col p-4 gap-2">
        <h3 className=" font-bold">
          {title.slice(0, 25)}
          {title.length > 25 && ' ...'}
        </h3>
        <div className="grid grid-cols-[1fr_0.5fr_1fr] gap-2 items-center justify-center content-center">
          <p>⏱️ {readyInMinutes} min </p>
          <p>👨‍👩‍👧‍👦 {servings} </p>
          {pricePerServing && <p>💸 {pricePerServing} $</p>}
          {!baseUrlImage && <p>{vegetarian ? '🍀 veg' : '🥩 non-veg'} </p>}
          <p className="col-start-3">{veryPopular && '🌟 popular'} </p>
          {extendedIngredients && (
            <p className="col-span-2">
              {extendedIngredients.length} Ingredients
            </p>
          )}
          <div className="col-start-3 flex justify-end gap-4">
            <button>❤️ </button>
            <button>👍 </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
