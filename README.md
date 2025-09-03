# Only Digital

> Demonstration purpose only widget for "Only digital" company

## 📋 Prerequisites

Choose one of the following:

### Option A: Node.js (Direct)

- **Node.js** v24 or higher
- **npm** (comes with Node.js)

### Option B: Docker

- **Docker** v20.10 or higher
- **Docker Compose** (optional, but recommended)

## 🛠️ Installation & Setup

### Method 1: Using Node.js

1. **Clone the repository**

   ```bash
   git clone https://github.com/ukqfhf/only.digital.git
   cd only.digital
   
   ```
2. **Install dependencies**

   ```bash
   npm install
   
   ```
3. **Start development server**

   ```bash
   npm run serve
   
   ```
4. **Open your browser**

   ```
   http://localhost:5173
   
   ```

### Method 2: Using Docker

Quick Start (Production build)
1. **Clone and navigate**

   ```bash
   git clone https://github.com/ukqfhf/only.digital.git
   cd only.digital
   
   ```
2. **Build and run with Docker**

   ```bash
   docker build -t only-digital .
   docker run -p 5173:5173 only-digital
   
   ```
3. **Access the application**

   ```
   http://localhost:5173
   
   ```