# BrandAI

**AI-powered brand identity generator.** Create a complete brand identity in seconds, including strategy, visual assets, and social media content.

[**🚀 Live Demo**](https://robotha.netlify.app/)

## ✨ Features

-   **🤖 AI Strategy**: Generates unique brand names, taglines, descriptions, and vibe analysis using GPT-4.
-   **🎨 Visual Identity**: Creates custom logos and lifestyle imagery using DALL-E 3.
-   **📐 Design System**: Automatically suggests harmonious color palettes and typography pairings.
-   **📱 Social Media Kit**: Generates Instagram-ready post mockups with captions.
-   **💾 Smart Persistence**: Your generated brand data is automatically saved to your session, so you won't lose it if you reload.
-   **📦 Download Brand Kit**: Export all your assets (images, logos, and brand details) as a ZIP file with a single click.

## 🛠️ Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS + Framer Motion (Animations)
-   **State Management**: Redux Toolkit + Redux Persist
-   **AI Integration**: OpenAI API (GPT-4 & DALL-E 3)
-   **Utilities**: JSZip, FileSaver

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

-   Node.js 18+ installed.
-   An OpenAI API key.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd robo
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    
    We have provided a `.env.local.example` file for reference. 
    
    Create a new file named `.env.local` in the root directory and add your OpenAI API key:

    ```bash
    # .env.local
    OPENAI_API_KEY=sk-your-openai-api-key-here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Folder Structure

```
robo/
├── app/                    # Next.js App Router pages and API routes
│   ├── api/                # Backend API routes (generate, proxy-image)
│   ├── layout.tsx          # Root layout with ReduxProvider
│   └── page.tsx            # Main application page
├── components/             # React components
│   ├── features/           # Feature-specific components (BrandForm, Showcase)
│   ├── layout/             # Layout components (Navbar)
│   ├── providers/          # Context providers (Redux)
│   └── ui/                 # Reusable UI components (Button, Card, Input)
├── lib/                    # Utility functions and helpers
├── services/               # External service integrations (OpenAI)
├── store/                  # Redux store and slices
├── types/                  # TypeScript type definitions
└── public/                 # Static assets
```

## 📄 License

This project is open source and intended for assessment purposes.

---

## 📝 Technical Write-up

**Architecture & Decisions**

*   **Framework**: Built with **Next.js 15 (App Router)** to leverage React Server Components and modern routing patterns.
*   **State Management**: Utilized **Redux Toolkit** combined with `redux-persist` (Session Storage). This ensures that generated brand data persists across page reloads, providing a robust user experience without the complexity of a full database backend for this MVP.
*   **AI Integration**:
    *   **GPT-4**: Used for generating intelligent brand strategies, taglines, and color/typography recommendations.
    *   **DALL-E 3**: Integrated for generating high-quality, custom logos and social media lifestyle imagery.
*   **Asset Management**: Implemented a custom **Proxy API Route** (`/api/proxy-image`) to securely fetch images from OpenAI's servers server-side. This solves CORS issues and enables the client-side "Download Brand Kit" feature (using `JSZip` and `FileSaver`) to bundle all assets into a ZIP file.
*   **UI/UX**: Designed with **Tailwind CSS** for a responsive, glassmorphism-inspired aesthetic, enhanced with **Framer Motion** for smooth, engaging interactions.

## 🎓 Assignment Note

This project was built for the **AI Builder Intern assignment** under the **"Automation of creative workflows"** track.
