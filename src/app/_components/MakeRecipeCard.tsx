import { SecondaryButton } from "./Buttons"

function MakeRecipeCard() {
  return (
     <div className="col-span-1 p-4 dark:bg-slate-800 ">
              <h1 className="text-xl uppercase mb-4">make quick recipe</h1>
              <div className="flex flex-col justify-between ">
                <div className="text-center h-36">
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient name</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                  <span className="px-1 rounded-md bg-slate-900 inline-block m-1">ingredient</span>
                </div>
                <div className="text-center">
                  <SecondaryButton>Make A.I reicpe</SecondaryButton>
                </div>
              </div>
            </div>
  )
}

export default MakeRecipeCard
