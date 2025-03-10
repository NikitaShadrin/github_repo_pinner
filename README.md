# GitHub Repository Finder

A responsive web application for discovering GitHub repositories by programming language, with pin/unpin functionality.

## Key Features

- **Dynamic Repository Search**  
  Fetch random repositories using GitHub's API based on selected programming languages.

- **Pinning System**  
  - Persistent storage of pinned repositories using:  
    - React Context API for state management  
    - Local storage for data persistence  
    - Interactive hover-to-unpin functionality  
    - Responsive grid layout for saved items

- **Modern Technical Implementation**  
  - Type-safe implementation with TypeScript  
  - Responsive UI built with Tailwind CSS  
  - API handling with error boundaries and loading states  
  - Component-based architecture using Next.js 15 App Router

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: React Context API
- **API**: GitHub Repository Search API

## Planned updates
- Tasteful gradient background to add visual interest
- The option to sort the repos when fetching

## If you want to run it locally

```bash
git clone https://github.com/your-username/repo-finder.git
npm install
npm run dev
```