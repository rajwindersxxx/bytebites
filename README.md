# 🍽️ ByteBites – AI-Powered Recipe Generator & Meal Planner

## 📌 Overview

Interactive AI-powered recipe generator and meal planner. Users enter ingredients they have at home, and the system generates a recipe for them using AI. They can also save meals, plan their week, and get shopping lists based on their selections.It will recommend upcoming ingredients based on upcoming recipe scheduled.

## 🎨 Design & UX

- 🏡 **Minimalist, traditional UI** with soft gradients.
- 🎨 **Color palette:** Warm & inviting food tones (🍊 orange, 🍃 green, 🍯 beige, 🍷 deep red).
- 🔠 **Typography:** Rounded, readable font like Poppins or Inter.
- 🌙 **Dark mode toggle.**

## 🖥️ Pages & Features

### 🏠 1. Home Page

- 🌐 A Simple website about the application
  <!-- - 🏆 Hero section with search bar: *"What ingredients do you have?"* -->
  <!-- - 🎭 Dynamic background that changes based on meal category (breakfast/lunch/dinner). -->
  <!-- - 🍽️ Featured AI-generated recipes based on trending ingredients. -->

### 🧑‍🍳 2. Recipe Generator (Interactive Page)

- ✏️ Users enter available ingredients.
- 🤖 AI will generate full recipe based on ingredients.
- ❤️ Option to like, and saver recipe to database.

### 📅 3. Weekly Meal Planner

- 🔀 User can make meal planning list
- 🛒 recommend ingredient for upcoming meals.
  <!-- - 📜 Option to export as PDF or send the list via email. -->
  <!-- - 🔀 Users drag & drop recipes into a weekly planner grid. -->
  <!-- - 🛒 Auto-generates a ingredient list for missing ingredients. -->

### 💾 4. Saved Recipes & Dashboard

- 🔑 **User account system (Sign up/Login with email).**
- 🗂 **Dashboard with saved recipes , meal plans, recommended ingredients .**
<!-- - 🏅 **Streak-based reward system for tracking healthy eating habits.** -->

### 🛍️ 5. Shopping List Page

- 📌 Displays ingredients needed for planned meals.
- ✅ Option to check off items as they are bought.
<!-- - 📱 Mobile-friendly for in-store use. -->

<!-- ### ⚙️ 6. Admin Panel (Optional Feature)

- ✍️ Manage & edit AI-generated recipes.
- 📊 Track user engagement (analytics dashboard). -->

## 🛠️ Technology Stack & Features

- ⚡ **Next.js** (SSR for fast loading).
- 🧠 **Gemani API** for AI-powered recipe text generation.
- 🧠 **stable diffusion API by cloudflare** for AI-powered recipe image generation.
- 🍲 **Spoonacular API** to fetch real-world recipes, ingredient details, and nutrition data.
- 🗄️ **Supabase** for storing user data & recipes.
<!-- - 🎭 **Framer Motion** for a clean, modern look. -->
- 🔐 **NextAuth.js** for authentication (normal).

## 🌟 Extra UX Features

<!-- - 🎙️ **Voice Search** for adding ingredients. -->

- 🖼️ **Lazy loading** for images to improve performance.
<!-- - ✅ **Interactive recipe steps** (checkboxes to mark completed steps). -->

## 📄 Pages & Features Breakdown

### 🏡 Home (`/`)(under development)

- **Purpose:** Introduces users to ByteBites, showcasing the app's features.

<!-- - **Design:** Clean UI with bold typography, high-quality food images, and smooth animations.
- **Sections:**
  - ✨ Hero Section → "Generate AI Recipes & Plan Your Meals Like a Pro" + CTA buttons.
  - 🔄 How It Works → 3-step process: Enter Ingredients → Get Recipes → Save & Plan Meals.
  - ⭐ Features Overview → Highlights AI recipe generator, meal planner, and shopping list.
  - 💬 Testimonials → (Optional) User reviews.
  - 📢 Footer → Links to Contact, Privacy Policy, Socials. -->

### 🍳 Recipes (`/recipes`)

- **Purpose:** Let users generate recipes using AI (GPT-4 API) based on available ingredients.
- **Design:** Minimalist search bar + AI-generated results with images.
- **Features:**
  - Users input ingredients (e.g., "tomatoes, chicken, garlic").
  - OpenAI API generates a custom recipe.
  - Display recipe details: title, steps, cooking time, calories.
  - ❤️ "Save Recipe" button (stores in Supabase).
  <!-- - 🔄 "Try Another Recipe" button. -->

### 🔍 Explore (`/explore`)

- **Purpose:** Fetch real-world recipes from the Spoonacular API.
- **Design:** Grid-style UI with large recipe cards featuring images, names, and details.
- **Features:**
  - Users search for specific dishes or ingredients.
  - Results show real recipes from Spoonacular.
  - "View Details" button leading to a detailed page.
  - 📌 "Add to Meal Planner" button.
  - ⭐ "Save to Favorites" button.

### 🗓️ Meal Planner (`/meal-planner`)

<!-- - **Purpose:** Users can drag & drop recipes into a weekly calendar. -->

- **Purpose:** Users can select and add recipe weekly calendar.
- **Design:** Calendar-style UI + with tooltip.
- **Features:**
  <!-- - Drag & drop saved recipes into breakfast/lunch/dinner slots. -->
  - Auto-sync meal plan with Supabase database.
    <!-- - "Clear Plan" button. -->
    <!-- - 📥 "Download Meal Plan" (PDF export option). -->
  - 🛒 "Generate Shopping List" button.

### 🛒 Shopping List (`/shopping-list`)

- **Purpose:** Creates a grocery list based on planned meals.
- **Design:** Simple list UI + checkboxes for marking items as bought.
- **Features:**
  - Auto-recommend shopping list from meal planner ingredients.
  - Users can add/remove custom items.
  - ✅ Checkbox to mark purchased items.
    <!-- - 📜 "Download List" (PDF export). -->
    <!-- - (Optional) API integration with Walmart or Amazon. -->

### ❤️ Saved Recipes (`/saved`)

- **Purpose:** Users can store & access their favorite recipes.
- **Design:** Grid or list view with recipe cards.
- **Features:**
  - Shows all saved AI-generated + real recipes.
  - Users can delete saved recipes.
  <!-- - Option to edit recipe notes. -->
  - 📌 "Add to Meal Planner" button.

### 👤 Profile (`/profile`)

- **Purpose:** Users manage account settings & preferences.
- **Design:** User profile card + saved data.
- **Features:**
  <!-- - 🔐 Google Login (via NextAuth.js). -->
  - Normal login with auth.js
  - View & update personal info.
  - Manage saved recipes & meal plans.
  - 🌙 Dark mode toggle.
  <!-- - ❌ "Delete Account" button. -->

<!-- ### 📩 Contact (`/contact`)

- **Purpose:** Allow users to ask questions, give feedback, or request features.
- **Design:** Minimalist form with a CTA button.
- **Features:**
  - 📝 Input fields for Name, Email, Message.
  - 📑 Dropdown for "What are you contacting us about?".
  - 📩 "Submit" button (Netlify Forms or Supabase).
  - 🔗 Social links (Instagram, Twitter, LinkedIn). -->

## missing feature:-

- Add drag and drop functionally to meal planning calendar
- App needs to be responsive and mobile friendly
- UI/UX need to be a improved
- Give user more options and flexibility to make search easy.
- Add notifications and user feedback
- Add feedback form for bugs.

## 🛠 Installation/setup

1. Clone the resp:

```sh
git clone https://github.com/rajwindersxxx/bytebites.git
```

2.Install dependency:

```sh
cd bytebites
npm install
```

3.Add .env.local file

```sh
FOOD_API_KEY=''
GOOGLE_AI_API_KEY=''
SUPABASE_URL=''
SUPABASE_KEY=''
AUTH_SECRET=''
NEXTAUTH_URL='http://localhost:3000'
```

4.Setup your supabase database

5.Now run project

```sh
npm run dev
```
