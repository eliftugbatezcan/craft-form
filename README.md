# CraftForm: High-Performance Schema-Driven UI Builder

**CraftForm** is a specialized low-code tool designed to eliminate the overhead of hardcoded form development. The project is built on the **Schema-Driven UI** architecture, where the interface is dynamically constructed based on an external data model (**JSON Schema**) rather than being hardcoded into the frontend logic.

## Technical Implementation & Engineering Highlights

- **State Management (Zustand):** Implemented a centralized global state to ensure real-time synchronization between the form schema, organizational metadata, and UI visibility states (Preview/Publish).
- **Drag & Drop Engine (@dnd-kit):** Leveraged `@dnd-kit/core` and `@dnd-kit/sortable` with custom sensor configurations to manage real-time layout reordering and field injections on the canvas.
- **Dynamic Component Architecture:** Engineered a modular system where form fields (Text, Email, Date, Phone, etc.) are dynamically instantiated based on schema definitions.
- **Custom Business Logic:** Developed specialized handling for international phone codes (`+90`) and custom date formats (`DD-MM-YYYY`) to overcome standard browser input limitations.
- **Isolated Preview System:** Designed a simulated end-user environment using a modal-driven approach, allowing users to validate the form without disrupting the builder's state.

## Tech Stack

- **Frontend:** React 18 (Functional Components & Hooks).
- **Language:** TypeScript (Strict mode for type-safe schema definitions and interface hierarchy).
- **State Management:** Zustand.
- **Styling:** Tailwind CSS (Component-driven responsive design).
- **Routing:** React Router DOM (Architectural separation of Landing and Builder routes).

## Key Engineering Solutions Provided

- **White-Labeling Support:** Integrated an Organization Settings module that allows embedding corporate identity (Name & Logo) directly into the exported data.
- **Type-Safe Schemas:** Defined robust `FormSchema` and `FormField` interfaces to ensure data integrity across the entire application lifecycle.
- **Instant Portability:** Developed a "Publish" flow that delivers a complete JSON configuration ready for integration into any external frontend system.

## Installation

To run this project locally:

```bash
# Clone the repository
git clone [https://github.com/yourusername/craftform.git](https://github.com/yourusername/craftform.git)

# Install dependencies
npm install

# Start the development server
npm run dev
```
