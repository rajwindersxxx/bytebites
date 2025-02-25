import Image from 'next/image';
import React from 'react';
import { INGREDIENT_IMAGE_URL } from '../_config/foodApiConfig';
interface Ingredient {
  name: string;
  image: string;
  consistency: string;
  amount: number;
  measures: {
    metric: {
      unitShort: string;
    };
  };
}

interface props {
  ingredient: Ingredient;
}

export default function IngredientCard({ ingredient }: props) {
  const {
    name,
    image,
    consistency,
    amount,
    measures
  }  = ingredient
  return (
    <div className="bg-natural-beige w-80 rounded-md p-4 flex item-center gap-4 ">
      <div className=' h-20 w-20 rounded-full relative overflow-hidden'>
        <Image fill src={`${INGREDIENT_IMAGE_URL}/${image}`} alt='img' sizes='100%' />
      </div>
      <div>
        <h4 className='text-xl font-bold capitalize'> {name.length > 15 ? `${name.slice(0,15)}...`: name} </h4>
        <p>Amount:  <span className="font-bold">{amount} </span>{measures.metric.unitShort}</p>
        <p>consistency: <span className="font-bold">{consistency === 'SOLID'? '🧊': '💧'} </span></p>
      </div>
    </div>
  );
}
