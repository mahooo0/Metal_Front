# Next.js Auth Template

A Next.js project with authentication features built using Feature-Sliced Design (FSD) architecture.

## Architecture Guide

This project follows the **Feature-Sliced Design (FSD)** methodology. Here's how to work with this architecture:

### 📁 Folder Structure

```
src/
├── app/           # Next.js App Router (routes only)
├── widgets/       # Page compositions
├── features/      # Business logic & forms
├── entities/      # Business entities
├── shared/        # Reusable code
└── pages/         # Legacy (avoid using)
```

### 🎯 Layer Rules

#### **1. `app/` - Routes Only**
- Contains only Next.js route files
- Import and export widgets
- Handle metadata and layouts

```tsx
// ✅ Good: app/(auth)/auth/login/page.tsx
import { LoginPage } from "@/widgets/auth";

export default function LoginRoute() {
  return <LoginPage />;
}
```

```tsx
// ❌ Bad: Don't put business logic here
export default function LoginRoute() {
  const [email, setEmail] = useState('');
  // ... form logic
  return <form>...</form>;
}
```

#### **2. `widgets/` - Page Compositions**
- Compose features into complete pages
- Handle page layout and structure
- Import from features and shared

```tsx
// ✅ Good: widgets/auth/login-page.tsx
import { LoginForm } from "@/features/auth";
import { AuthWrapper } from "@/shared/ui";

export function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center">
      <AuthWrapper heading="Login">
        <LoginForm />
      </AuthWrapper>
    </main>
  );
}
```

#### **3. `features/` - Business Logic**
- Forms, API calls, business operations
- Feature-specific components
- Can import from shared and entities

```tsx
// ✅ Good: features/auth/login-form/ui/login-form.tsx
"use client";

export function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Business logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

#### **4. `shared/` - Reusable Code**
- UI components without business logic
- Utilities, hooks, configs
- No imports from upper layers

```tsx
// ✅ Good: shared/ui/button.tsx
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
```

```tsx
// ❌ Bad: Don't import from features/widgets
import { LoginForm } from "@/features/auth"; // ❌
```

### 🔄 Import Rules

**Allowed imports (top to bottom):**
- `app/` → `widgets/`
- `widgets/` → `features/`, `shared/`
- `features/` → `shared/`, `entities/`
- `shared/` → nothing from upper layers

**File organization within features:**
```
features/auth/
├── login-form/
│   ├── ui/
│   │   └── login-form.tsx
│   ├── api/
│   │   └── login-api.ts
│   ├── model/
│   │   └── login-store.ts
│   └── index.ts
└── index.ts
```

### 📋 Examples

#### Adding a New Feature

1. **Create feature structure:**
```bash
mkdir -p src/features/profile/edit-profile/ui
```

2. **Create component:**
```tsx
// features/profile/edit-profile/ui/edit-profile-form.tsx
export function EditProfileForm() {
  // Feature logic
}
```

3. **Export from feature:**
```tsx
// features/profile/edit-profile/index.ts
export { EditProfileForm } from "./ui/edit-profile-form";

// features/profile/index.ts
export { EditProfileForm } from "./edit-profile";
```

4. **Use in widget:**
```tsx
// widgets/profile/profile-page.tsx
import { EditProfileForm } from "@/features/profile";

export function ProfilePage() {
  return <EditProfileForm />;
}
```

#### Adding Shared UI Component

```tsx
// shared/ui/input.tsx
export function Input(props) {
  return <input {...props} />;
}

// shared/ui/index.ts
export { Input } from "./input";
```

### 🚫 Common Mistakes

1. **Don't put business logic in widgets:**
```tsx
// ❌ Bad
export function LoginPage() {
  const [email, setEmail] = useState(''); // Business logic
  // ...
}
```

2. **Don't import upward:**
```tsx
// ❌ Bad: shared importing from features
import { LoginForm } from "@/features/auth";
```

3. **Don't put UI components in features without business logic:**
```tsx
// ❌ Bad: Pure UI in features
// Should be in shared/ui instead
export function Button() {
  return <button>Click me</button>;
}
```

### 🎯 Quick Reference

- **Need a form?** → `features/`
- **Need a page?** → `widgets/`
- **Need a route?** → `app/`
- **Need reusable UI?** → `shared/ui/`
- **Need utilities?** → `shared/lib/`

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.