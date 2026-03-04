# THE BLACK BOOK (Sovereign System Manual)
**Version:** V1.0-FINAL (Jordan/Egypt Core Migration)
**Classification:** CLASSIFIED - AI DEVELOPER EYES ONLY

## 📜 Preface for Future AI Agents
You are accessing the core architecture manual of the **AlArab 777 Unified Voice System**. This document defines the boundaries, the structure, and the absolute rules of the codebase. Your primary directive when modifying this codebase is **"Do No Harm"**. 

Before you write a single line of code, read and internalize every rule in this guide. This system is a delicate balance of UI responsiveness, multiple LLM pipelines, and highly isolated sovereign personalities.

---

## 🏗️ 1. Project Architecture

The system is a React-based Web Application (`vite`) that acts as a unified frontend for multiple conversational AI interfaces.

### Core Technologies
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite.
- **Voice APIs**:
  - **Google Gemini Native Audio**: For ultra-low latency, multimodal interaction (`gemini-2.5-flash-native-audio-preview`).
  - **Groq Llama 3 (70B) + Browser TTS**: As a robust fallback and alternative intelligence layer.

### Directory Structure Map
```text
/gemini-live-audio-interface 3
├── App.tsx                 # The core application logic, UI, and connection engine.
├── persona.ts              # The Persona Registry (Central Switchboard).
├── /Persona                # Isolated Intelligence Cores (The Brains).
│   ├── jordan_edu_core.ts  # 100% Jordan Education Logic.
│   └── malika_tourism_core.ts # Egyptian Tourism Logic.
├── /components             # Reusable UI Elements (Visualizer, VoiceOrb, HotelCard).
├── /utils                  # Helper functions (audio encoding, THE_BLACK_BOOK).
└── /public                 # Static assets (sounds, icons).
```

---

## 🧬 2. Persona Management (The Sovereign Cores)

The system supports dynamically switching "Sovereign AI Identities" at runtime. 

### The Rule of Absolute Isolation
A persona must **never** bleed its logic into another. Jordanian personas know nothing of Egypt. Egyptian personas know nothing of Jordanian universities.

### How to Add/Edit a Persona
1. **Define the Core**: Create a standalone `.ts` file in the `/Persona` folder (e.g., `saudi_tourism_core.ts`). This file must contain **only** a JSON object with the psychological profile, behavioral traits, and domains of knowledge.
2. **Register the Core**: Import this new core into `persona.ts`.
3. **Configure the Interface**: Add a new entry to the `PERSONAS` record in `persona.ts`. You must define the `id`, `name`, `theme` (determines UI color), `voice` (determines TTS voice), and the `systemInstruction` string which embeds the imported JSON core.

**Example `persona.ts` Entry:**
```typescript
  new_persona: {
    id: 'new_persona',
    name: 'New Name',
    theme: 'emerald', // red, orange, emerald, purple
    voice: 'Zephyr', // Kore, Puck, Fenrir, Zephyr
    systemInstruction: `You are [Identity]. CONTEXT: ${JSON.stringify(NEW_CORE, null, 2)}`
  }
```

---

## 🎨 3. UI Reactivity and Styling

The UI (`App.tsx`) is designed to be highly reactive, visually stunning, and completely responsive across mobile and desktop.

### Dynamic Theming
The UI colors change based on the active persona's `theme` property defined in `persona.ts`. The `getThemeColors` function in `App.tsx` maps specific themes (`emerald`, `purple`, `orange`, `red`) to a set of Tailwind classes (`bg`, `text`, `border`). 

**Warning:** If you add a new theme color to `persona.ts`, you **must** implement its corresponding mapping in `App.tsx -> getThemeColors()`.

### Mobile Responsiveness (The 100dvh Rule)
- The main container uses `h-[100dvh]` to perfectly fit mobile screens (accounting for browser address bars).
- The layout uses `flex-col lg:flex-row` to stack vertically on mobile and side-by-side on desktop.
- The `Logs Panel` acts as a bottom drawer on mobile (`h-[35vh]`) and a side panel on desktop (`lg:h-auto lg:w-[350px]`).
- The `Header` uses `flex-wrap` and `overflow-x-auto` with `no-scrollbar` to handle excessive persona buttons gracefully on small screens.

**Warning:** Do not apply absolute heights (`px`, `rem`) to major layout containers, as it breaks the flexbox scaling on mobile. 

---

## ⚖️ 4. The Golden Rules for AI Agents

When the user (Master Said) commands you to alter the system, you must follow these rules without exception:

1. **Rule of Surgical Precision**: Never rewrite an entire file if you only need to change one line. Use surgical diffs (`replace_file_content` or `multi_replace_file_content`).
2. **Rule of UI Preservation**: If you are asked to "update what Judy says," you open `Persona/jordan_edu_core.ts`. You **DO NOT** touch the CSS in `App.tsx`. Separation of content and presentation is law.
3. **Rule of The Missing Semicolon**: Before presenting code as "finished," internally verify that you haven't broken any TypeScript imports or React component props. Check your work.
4. **Rule of Verification**: If the user reports a "black screen," immediately check `index.html` for missing script tags, `index.css` for missing layout utilities, and terminal logs for `EPERM` or port conflicts.

### *End of Manual*
