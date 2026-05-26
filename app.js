const { useState, useMemo } = React;

const CATEGORIES = {
  income: [
    { id: "salary", label: "Salary", icon: "💼" },
    { id: "freelance", label: "Freelance", icon: "🖥️" },
    { id: "investment", label: "Investment", icon: "📈" },
    { id: "gift", label: "Gift", icon: "🎁" },
    { id: "other_income", label: "Other", icon: "➕" },
  ],
  expense: [
    { id: "housing", label: "Housing", icon: "🏠" },
    { id: "food", label: "Food", icon: "🍽️" },
    { id: "transport", label: "Transport", icon: "🚗" },
    { id: "health", label: "Health", icon: "💊" },
    { id: "entertainment", label: "Fun", icon: "🎬" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "utilities", label: "Utilities", icon: "⚡" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "other_expense", label: "Other", icon: "📌" },
  ],
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const SEED = [
  { id: 1, type: "income", category: "salary", amount: 4200, note: "Monthly salary", date: "2026-05-01" },
  { id: 2, type: "expense", category: "housing", amount: 1350, note: "Rent", date: "2026-05-02" },
  { id: 3, type: "expense", category: "food", amount: 87.5, note: "Groceries", date: "2026-05-04" },
  { id: 4, type: "expense", category: "transport", amount: 42, note: "Gas", date: "2026-05-06" },
  { id: 5, type: "income", category: "freelance", amount: 650, note: "Design project", date: "2026-05-09" },
  { id: 6, type: "expense", category: "entertainment", amount: 29.99, note: "Streaming", date: "2026-05-10" },
  { id: 7, type: "expense", category: "food", amount: 64.2, note: "Dinner out", date: "2026-05-13" },
  { id: 8, type: "expense", category: "health", amount: 120, note: "Dentist", date: "2026-05-15" },
  { id: 9, type: "expense", category: "shopping", amount: 215, note: "Clothes", date: "2026-05-17" },
  { id: 10, type: "income", category: "investment", amount: 310, note: "Dividends", date: "2026-05-20" },
  { id: 11, type: "expense", category: "utilities", amount: 98, note: "Electric", date: "2026-05-21" },
  { id: 12, type: "expense", category: "food", amount: 55, note: "Coffee", date: "2026-05-22" },
];

const C = {
  bg: "#0d0d12", card: "#16161f", border: "#222230",
  text: "#e8e2d9", muted: "#555", green: "#c8ff57", red: "#ff6b6b", subtle: "#1e1e2a",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:${C.bg};color:${C.text};font-family:'DM Mono',monospace;min-height:100vh}
  .wrap{max-width:500px;margin:0 auto;padding:0 16px 60px}
  .header{display:flex;justify-content:space-between;align-items:flex-end;padding:24px 0 16px}
  .logo{font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#fff}
  .logo span{color:${C.green}}
  .logo-sub{font-size:10px;color:${C.muted};letter-spacing:1.5px;margin-top:2px}
  .month-nav{display:flex;align-items:center;gap:8px}
  .month-nav button{background:none;border:none;color:${C.green};font-size:22px;cursor:pointer;padding:0 2px}
  .month-label{color:${C.green};font-weight:700;font-size:13px;min-width:72px;text-align:center}
  .tabs{display:flex;gap:20px;border-bottom:1px solid #1a1a24;margin-bottom:20px}
  .tab{background:none;border:none;border-bottom:2px solid transparent;color:${C.muted};font-family:'Syne',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;padding:8px 0;cursor:pointer;transition:.2s}
  .tab.active{color:${C.green};border-bottom-color:${C.green}}
  .card{background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:18px;margin-bottom:12px}
  .label{font-size:10px;letter-spacing:1.4px;color:${C.muted}}
  .balance{font-family:'Syne',sans-serif;fo
