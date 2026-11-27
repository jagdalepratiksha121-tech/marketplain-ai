# 📰 FinNews AI – Financial News Simplifier

**Making Financial News Simple, Accessible, and Understandable with Generative AI.**

FinNews AI is an AI-powered web application that transforms complex financial news into simple, concise, and easy-to-understand summaries using Large Language Models (LLMs).

The application fetches the latest available financial news articles through NewsAPI and uses Groq's Llama 3.3 70B model to simplify technical financial information, helping users understand market trends, economic developments, and business events without requiring advanced financial knowledge.

---

## 🚀 Key Features

- **Real-Time News Fetching:** Retrieves the latest available financial news articles using NewsAPI.
- **AI-Powered Simplification:** Uses Groq's Llama 3.3 70B model to simplify complex financial content.
- **Easy-to-Understand Summaries:** Converts technical financial terminology into reader-friendly explanations.
- **Quick News Access:** Fetches and simplifies financial news with a single click.
- **Responsive User Interface:** Provides a clean and user-friendly interface.
- **REST API Integration:** Uses FastAPI endpoints for communication between frontend and backend.
- **Secure API Key Management:** Stores sensitive API credentials using environment variables.
- **Error Handling:** Handles API and application errors to improve reliability.
- **CORS Support:** Enables secure cross-origin communication between frontend and backend.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| FastAPI | Backend framework |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| NewsAPI | Financial news retrieval |
| Groq API | AI-powered content processing |
| Llama 3.3 70B | Large Language Model |
| REST API | Frontend-backend communication |
| Environment Variables | API key management |

---

## 🏗️ System Architecture

```text
             USER
               |
               v
       FRONTEND APPLICATION
        (HTML, CSS, JS)
               |
               v
        FASTAPI BACKEND
               |
         +-----+-----+
         |           |
         v           v
      NEWS API    GROQ API
         |           |
         v           v
   Financial News  Llama 3.3
     Articles        70B
         |           |
         +-----+-----+
               |
               v
       AI-PROCESSED NEWS
               |
               v
       SIMPLIFIED SUMMARIES
               |
               v
        DISPLAY TO USER
```

---

## ⚙️ How It Works

1. The user opens the FinNews AI web application.
2. The user clicks the **Fetch & Simplify** button.
3. The frontend sends a request to the FastAPI backend.
4. The backend communicates with NewsAPI to retrieve financial news articles.
5. The retrieved news content is processed using Groq's Llama 3.3 70B model.
6. The AI model generates concise and simplified explanations.
7. The backend returns the processed results through REST API endpoints.
8. The frontend displays simplified financial news to the user.

---

## 💡 Use Cases

**1. Retail Investors**

Helps retail investors understand stock market developments and financial news without reading lengthy technical articles.

**2. Finance Students**

Makes complex financial concepts such as inflation, interest rates, and market movements easier to understand.

**3. Business Professionals**

Provides quick summaries of important economic and business developments, saving time before meetings and discussions.

**4. General News Readers**

Makes financial information more accessible to people who do not have a professional background in finance.

---

## 💻 System Requirements

### Hardware Requirements

- Processor: Intel Core i5 (8th Generation or above) / AMD Ryzen 5 or equivalent.
- RAM: Minimum 8 GB (16 GB recommended).
- Storage: 256 GB SSD or equivalent.
- Internet: Stable internet connection.

### Software Requirements

- Operating System: Windows 10/11, macOS, or Linux.
- Python 3.8 or above.
- Latest version of Google Chrome, Firefox, or Microsoft Edge.
- Visual Studio Code or any preferred IDE.
- Git.

---

## 📥 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jagdalepratiksha121-tech/marketplain-ai.git
```

### 2. Navigate to the Project Directory

```bash
cd marketplain-ai
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the environment:

**Windows:**
```bash
venv\Scripts\activate
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file in the project root directory and add your API credentials:

```env
NEWS_API_KEY=your_newsapi_key
GROQ_API_KEY=your_groq_api_key
```

Replace the placeholder values with your actual API keys.

You can obtain API credentials from:

- [NewsAPI](https://newsapi.org/)
- [Groq Console](https://console.groq.com/)

**Important:** Never upload your `.env` file or expose your API keys publicly on GitHub.

### 6. Run the Backend Server

```bash
uvicorn main:app --reload
```

Open the following URL in your browser:

```text
http://127.0.0.1:8000
```

FastAPI interactive API documentation (if enabled):

```text
http://127.0.0.1:8000/docs
```

**Note:** The backend entry-point filename and frontend serving configuration may differ depending on the actual project structure. Adjust the commands accordingly.

---

## 🔐 Security

- API credentials are managed through environment variables.
- Sensitive information should not be committed to version control.
- CORS is configured for frontend-backend communication.
- Backend error handling helps manage unexpected API failures.

---

## 🔮 Future Enhancements

- Add category-based financial news filtering.
- Support multiple languages for news simplification.
- Introduce sentiment analysis for financial news.
- Add keyword-based news search.
- Provide personalized financial news recommendations.
- Implement historical news tracking and comparison.
- Add text-to-speech functionality for simplified summaries.
- Improve summarization accuracy and contextual understanding.

---

## ⚠️ Disclaimer

FinNews AI is an educational and informational application designed to simplify financial news. AI-generated summaries may occasionally contain inaccuracies or omit important context.

The application does not provide financial, investment, or trading advice. Users should refer to original news sources and consult qualified professionals before making financial decisions.

---

## 👩‍💻 Project Information

**Project Name:** FinNews AI – Financial News Simplifier

**Domain:** Artificial Intelligence / Generative AI / FinTech

**Mentor:** Sai Prathyusha Nagilla

**Developed as part of:** Project-Based Learning

---

## ⭐ Acknowledgements

- [NewsAPI](https://newsapi.org/) – For providing financial news data.
- [Groq](https://groq.com/) – For AI inference capabilities.
- [Meta AI](https://ai.meta.com/) – For the Llama language model.
- [FastAPI](https://fastapi.tiangolo.com/) – For backend API development.

---

**If you find this project interesting, consider giving it a ⭐ on GitHub!**
